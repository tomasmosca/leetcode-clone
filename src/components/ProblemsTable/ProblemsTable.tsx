import React, { useEffect, useState } from 'react';
import { BsCheckCircle } from "react-icons/bs"
import { AiFillYoutube } from "react-icons/ai"
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube';
import Skeleton from 'react-loading-skeleton'
import { collection, orderBy, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, firstore } from '@/firebase/firebase'
import { DBProblem } from '@/utils/types/problems'
import { useAuthState } from 'react-firebase-hooks/auth';

type ProblemsTableProps = {
    
};

const ProblemsTable:React.FC<ProblemsTableProps> = () => {

    const [youtubePlayer, setYoutubePlayer] = useState({
		isOpen: false,
		videoId: "",
	});
    const [user] = useAuthState(auth);

    const closeModal = () => {
		setYoutubePlayer({ isOpen: false, videoId: "" });
	};

    const handleChangeVideoId = (id: string) => {
        setYoutubePlayer({ isOpen: true, videoId: id})
    }

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {problems, userSolvedProblems} = useGetProblemsAndUserData(setIsLoading);
    
    return <>
        <tbody className='text-white'>
            {isLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <tr key={index}>
                        <th className='px-2 py-4'>
                            <Skeleton circle={true} height={20} width={20} />
                        </th>
                        <td className='px-6 py-4'><Skeleton width={100} height={17} borderRadius={10} /></td>
                        <td className='px-6 py-4'><Skeleton width={50} height={17} borderRadius={10} /></td>
                        <td className='px-6 py-4'><Skeleton width={50} height={17} borderRadius={10} /></td>
                        <td className='px-6 py-4'><Skeleton width={30} height={17} borderRadius={10} /></td>
                    </tr>
                    ))
                : problems.map((problem, idx) => {
                return (
                    <tr key={problem.id} className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`}>
                        <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                            {user && userSolvedProblems?.includes(problem.id) && <BsCheckCircle fontSize={"18"} width='18' />}
                        </th>
                        <td className='px-6 py-4'>
                            <Link className='hover:text-blue-600 cursor-pointer' href={`${problem.link ? problem.link : '/problems/' + problem.id}`}>
                                {problem.order + '. ' + problem.title}
                            </Link>
                        </td>
                        <td className={`px-6 py-4 ${problem.difficulty === 'Easy' ? "text-dark-green-s" : problem.difficulty === 'Medium' ? 
                        "text-dark-yellow" : "text-dark-pink"}`}>{problem.difficulty}</td>
                        <td className='px-6 py-4'>{problem.category}</td>
                        <td className='px-6 py-4'>{problem.videoId ?
                         <AiFillYoutube onClick={() => handleChangeVideoId(problem.videoId ? problem.videoId : "")} 
                         fontSize={"28"} 
                         className='cursor-pointer hover:text-red-600'/> : 
                        (<p className='text-gray-400'>Coming soon</p>)}</td>
                    </tr>
                )
            })}
        </tbody>
        {youtubePlayer.isOpen && (
				<tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
					<div
						className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'
						onClick={closeModal}
					></div>
					<div className='w-full z-50 h-full px-6 relative max-w-4xl'>
						<div className='w-full h-full flex items-center justify-center relative'>
							<div className='w-full relative'>
								<IoClose
									fontSize={"35"}
									className='cursor-pointer absolute -top-16 right-0'
									onClick={closeModal}
								/>
								<YouTube
									videoId={youtubePlayer.videoId}
									loading='lazy'
									iframeClassName='w-full min-h-[500px]'
								/>
							</div>
						</div>
					</div>
				</tfoot>
		)}
    </>
}
export default ProblemsTable;

function useGetProblemsAndUserData(setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    const [problems, setProblems] = useState<DBProblem[]>([]);
    const [userSolvedProblems, setUserSolvedProblems] = useState<string[]>();
    const [user] = useAuthState(auth);

    useEffect(() => {
        setIsLoading(true)
        const getProblems = async () => {
            const q = query(collection(firstore, "problems"), orderBy("order", "asc"));
            const querySnapshot = await getDocs(q);
            const temp: DBProblem[] = []
            querySnapshot.forEach((doc) => {
                temp.push({id: doc.id, ...doc.data()} as DBProblem)
            });
            setProblems(temp);
        }

        const getUserData = async () => {
            if (user) {
                const docRef = doc(firstore, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                  const data = docSnap.data();
                  setUserSolvedProblems(data.solvedProblems)
                }
            }
        }

        Promise.all([getProblems(), getUserData()]).then(() => {
            setIsLoading(false);
        });
    }, [setIsLoading, user])

    return {problems, userSolvedProblems};
}