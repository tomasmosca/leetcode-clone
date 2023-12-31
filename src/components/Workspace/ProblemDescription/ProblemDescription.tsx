/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { AiFillDislike, AiFillLike, AiFillStar, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import Split from 'react-split';
import Console from './Console/Console';
import { DBProblem, Problem } from '@/utils/types/problems'
import { firstore } from '@/firebase/firebase';
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, updateDoc } from 'firebase/firestore';
import Skeleton from 'react-loading-skeleton'
import { auth } from '@/firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

type ProblemDescriptionProps = {
    problem: Problem,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
};

const ProblemDescription:React.FC<ProblemDescriptionProps> = ({problem, setSuccess}) => {

    const [isConsoleOpen, setConsoleOpen] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {problemData, setProblemData, loadProblemData} = useGetProblemData(problem.id);
    const {liked, disliked, starred, solved, setUserData, loadUserData} = useGetUserActions(problem.id);
    const [user] = useAuthState(auth);
    const [updating, setUpdating] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
      
        Promise.all([
          loadUserData(),
          loadProblemData()
        ]).then(() => {
          setIsLoading(false);
        });
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [problem.id]);

    const returnUserAndProblemData = async(transaction: any) => {
        const userRef = doc(firstore, "users", user!.uid);
        const problemRef = doc(firstore, "problems", problem.id);
        const userDoc = await transaction.get(userRef);
        const problemDoc = await transaction.get(problemRef);
        return {userDoc, problemDoc, userRef, problemRef}
    }

    const handleLike = async() => {
        if (!user) {
            toast.error("Please log in to like the problem", { position: "top-right", autoClose: 5000, theme: "dark", });
            return;
        }
        if (updating || isLoading) {return;}
        setUpdating(true);
        await runTransaction(firstore, async(transaction) => {
            const {userDoc, problemDoc, userRef, problemRef} = await returnUserAndProblemData(transaction);
            if (userDoc.exists() && problemDoc.exists()) {
                if (liked) {
                    transaction.update(userRef,{
                            likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id)
                        }
                     );
                    transaction.update(problemRef, {
                            likes: problemDoc.data().likes - 1
                        }
                    )
                    setProblemData(prev => prev ? {...prev, likes: prev.likes - 1} : null);
                    setUserData(prev => ({...prev, liked: false}));
                } else if (disliked) {
                    transaction.update(userRef, {
                            likedProblems: [...userDoc.data().likedProblems, problem.id],
                            dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id)
                        }
                    )
                    transaction.update(problemRef, {
                            likes: problemDoc.data().likes + 1,
                            dislikes: problemDoc.data().dislikes - 1
                        }
                    )
                    setProblemData(prev => prev ? {...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1} : null);
                    setUserData(prev => ({...prev, liked: true, disliked: false}));
                } else {
                    transaction.update(userRef, {
                            likedProblems: [...userDoc.data().likedProblems, problem.id]
                        }
                    )
                    transaction.update(problemRef, {
                            likes: problemDoc.data().likes + 1
                        }
                    )
                    setProblemData(prev => prev ? {...prev, likes: prev.likes + 1} : null);
                    setUserData(prev => ({...prev, liked: true}));
                }
            }
        });
        setUpdating(false);
    }

    const handleDislike = async() => {
        if (!user) {
            toast.error("Please log in to dislike the problem", { position: "top-right", autoClose: 5000, theme: "dark", });
            return;
        }
        if (updating || isLoading) {return;}
        setUpdating(true);
        await runTransaction(firstore, async(transaction) => {
            const {userDoc, problemDoc, userRef, problemRef} = await returnUserAndProblemData(transaction);
            if (userDoc.exists() && problemDoc.exists()) {
                if (disliked) {
                    transaction.update(userRef,{
                        dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id)
                    }
                    );
                    transaction.update(problemRef, {
                            dislikes: problemDoc.data().dislikes - 1
                        }
                    )
                    setProblemData(prev => prev ? {...prev, dislikes: prev.dislikes - 1} : null);
                    setUserData(prev => ({...prev, disliked: false}));
                } else if (liked) {
                    transaction.update(userRef, {
                            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
                            likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id)
                        }
                    )
                    transaction.update(problemRef, {
                            likes: problemDoc.data().likes - 1,
                            dislikes: problemDoc.data().dislikes + 1
                        }
                    )
                    setProblemData(prev => prev ? {...prev, likes: prev.likes - 1, dislikes: prev.dislikes + 1} : null);
                    setUserData(prev => ({...prev, liked: false, disliked: true}));
                } else {
                    transaction.update(userRef, {
                            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id]
                        }
                    )
                    transaction.update(problemRef, {
                            dislikes: problemDoc.data().dislikes + 1
                        }
                    )
                    setProblemData(prev => prev ? {...prev, dislikes: prev.dislikes + 1} : null);
                    setUserData(prev => ({...prev, disliked: true}));
                }
            }
        });
        setUpdating(false);
    }

    const handleStar = async() => {
        if (!user) {
            toast.error("Please log in to star the problem", { position: "top-right", autoClose: 5000, theme: "dark", });
            return;
        }
        if (updating || isLoading) {return;}
        setUpdating(true);
        if (!starred) {
            const userRef = doc(firstore, "users", user.uid);
            await updateDoc(userRef, {
                starredProblems: arrayUnion(problem.id)
            });
            setUserData(prev => ({...prev, starred: true}));
        } else {
            const userRef = doc(firstore, "users", user.uid);
            await updateDoc(userRef, {
                starredProblems: arrayRemove(problem.id)
            });
            setUserData(prev => ({...prev, starred: false}));
        }
        setUpdating(false);
    }
    
    return <div className='bg-dark-layer-2 h-[calc(100vh-67px)] flex flex-col pl-2 pb-2.5'>
        <div className='flex'>
            <p className='text-white text-xs font-light bg-dark-layer-1 rounded-t-md p-3 mt-2 px-5'>Description</p>
        </div>
        <Split className='flex-grow overflow-hidden' sizes={[70, 30]} direction="vertical" minSize={180}>
            <div className='bg-dark-layer-1 w-full p-5 overflow-y-auto rounded-e-md rounded-bl-md'>
                <h1 className="text-white text-lg font-medium">{problem.title}</h1>
                <div className='flex items-center mt-3 space-x-4 min-h-[40px]'>
                    <div className={`text-xs ${problemData?.difficulty === 'Easy' && !isLoading ? "text-olive bg-olive" :
                     problemData?.difficulty === 'Medium' && !isLoading ? "bg-dark-yellow text-dark-yellow" : problemData?.difficulty === 'Hard' && !isLoading ?
                      "bg-dark-pink text-dark-pink" : ""} rounded-[21px] bg-opacity-[.15] ${problemData?.difficulty ? "px-2 py-1" : ""} font-medium capitalize`}>
                        {isLoading ? <Skeleton width={40} height={25} borderRadius={20}/> : problemData?.difficulty}
                    </div>
                    {isLoading ? <Skeleton circle={true} height={20} width={20} /> : 
                        (solved && user &&
                            <div data-tooltip-id="my-tooltip" data-tooltip-content="Solved" data-tooltip-place="bottom" className='rounded transition-colors duration-200 text-green-s text-dark-green-s text-lg'>
                                <BsCheck2Circle />
                            </div>
                        )
                    }
                    <div onClick={handleLike} className={`flex items-center space-x-1 cursor-pointer text-dark-gray-6 ${!isLoading ? "hover:bg-dark-fill-3" : ""} rounded p-[3px] transition-colors duration-200 text-lg ${isLoading ? "mb-1" : ""}`}>
                        {isLoading ? <Skeleton width={40} height={25} borderRadius={20}/> : (
                        <>

                            {liked && !updating && user ? <AiFillLike className="text-dark-blue-s" /> : updating ? <AiOutlineLoading3Quarters className="animate-spin" /> : <AiFillLike />}
                            <span className='text-xs'>{problemData?.likes}</span>
                        </>
                        )}
                    </div>
                    <div onClick={handleDislike} className={`flex items-center space-x-1 cursor-pointer text-dark-gray-6 ${!isLoading ? "hover:bg-dark-fill-3" : ""} rounded p-[3px] transition-colors duration-200 text-lg ${isLoading ? "mb-1" : ""}`}>
                        {isLoading ? <Skeleton width={40} height={25} borderRadius={20}/> : (
                            <>
                                {disliked && !updating && user ? <AiFillDislike className="text-dark-blue-s" /> : updating ? <AiOutlineLoading3Quarters className="animate-spin" /> : <AiFillDislike />}
                                <span className='text-xs'>{problemData?.dislikes}</span>
                            </>
                        )}
                    </div>
                    <div onClick={handleStar} data-tooltip-id="my-tooltip" data-tooltip-content="Add to List" data-tooltip-place="bottom" className={`text-dark-gray-6 cursor-pointer rounded ${!isLoading ? "hover:bg-dark-fill-3" : ""} p-[3px] transition-colors duration-200 text-xl`}>
                        {isLoading ? <Skeleton circle={true} height={20} width={20} /> : 
                        (
                            <>
                                {starred && !updating && user ? <AiFillStar className="text-dark-yellow" /> : updating ? <AiOutlineLoading3Quarters className="animate-spin" /> : <TiStarOutline />}
                            </>
                        )}
                    </div>
                </div>
                <div className='text-white text-sm'>
                    <div dangerouslySetInnerHTML={{__html: problem.problemStatement}}></div>
                </div>
                <div className='mt-4'>
                    {problem.examples.map((example, index) => {
                        return (
                            <div key={example.id}>
                                <p className='text-white font-medium'>Example {index + 1}:</p>
                                {example.img && <img src={example.img} alt='' className='mt-3'></img>}
                                <div className='example-card'>
                                    <pre>
                                        <strong>Input:  </strong>{example.inputText}
                                        <br />
                                        <strong>Output: </strong>{example.outputText}
                                        <br />
                                        {example.explanation && (<>
                                            <strong>Explanation: </strong>{example.explanation}
                                        </>)}
                                    </pre>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <p className='text-white text-sm font-medium'>Constraints</p>
                    <ul className='text-white ml-5 list-disc'>
                        <div dangerouslySetInnerHTML={{__html: problem.constraints}}></div>
                    </ul>
                </div>
            </div>
            <Console problem={problem} setConsoleOpen={setConsoleOpen} setSuccess={setSuccess} setUserData={setUserData}/>
        </Split>
    </div>
}
export default ProblemDescription;

function useGetProblemData(problemId: string) {
    const [problemData, setProblemData] = useState<DBProblem | null>(null);
  
    const loadProblemData = async () => {
      const docRef = doc(firstore, "problems", problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        setProblemData({id: docSnap.id, ...docSnap.data()} as DBProblem);
      }
    };
  
    useEffect(() => {
      loadProblemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [problemId]);
  
    return {problemData, setProblemData, loadProblemData};
  }
  
  function useGetUserActions(problemId: string) {
    const [userData, setUserData] = useState({liked: false, disliked: false, starred: false, solved: false});
    const [user] = useAuthState(auth);
  
    const loadUserData = async () => {
        if (user) {
          const docRef = doc(firstore, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              liked: data.likedProblems.includes(problemId),
              disliked: data.dislikedProblems.includes(problemId),
              starred: data.starredProblems.includes(problemId),
              solved: data.solvedProblems.includes(problemId)
            });
          }
        }
    };
      
  
    useEffect(() => {
      if (user) loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [problemId, user]);
  
    return {...userData, setUserData, loadUserData};
  }
  