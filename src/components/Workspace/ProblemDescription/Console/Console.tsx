import React, { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { Problem } from '@/utils/types/problems'
import { problems } from '@/utils/problems';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firstore } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

type ConsoleProps = {
    problem: Problem,
    setConsoleOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setUserData: React.Dispatch<React.SetStateAction<{ liked: boolean; disliked: boolean; starred: boolean; solved: boolean; }>>
};

const Console:React.FC<ConsoleProps> = ({ problem, setConsoleOpen, setSuccess, setUserData }) => {

    const [testIndex, setTestIndex] = useState<number>(0);
    const {query: {pid}} = useRouter();
    const [user] = useAuthState(auth);

    const handleSubmit = async() => {
        if (!user) {
            toast.error("Please log in to submit code", { position: "top-right", autoClose: 5000, theme: "dark", });
            return;
        }
        try {
            let userCode: string = localStorage.getItem(user.uid + problem.id) ? JSON.parse(localStorage.getItem(user.uid + problem.id) as string) : problem.starterCode;
            if (userCode) userCode = problem.starterFunctionName + userCode.split(problem.starterFunctionName)[1];
            const cb = new Function(`return ${userCode}`)();
            const handler = problems[pid as string].handlerFunction;

            if (typeof handler === "function") {
                const result = handler(cb);
                if (result) {
                    toast.success("Congrats! All test cases passed!", { position: "top-right", autoClose: 5000, theme: "dark", });
                    setSuccess(true);
                    setTimeout(() => {setSuccess(false)}, 4000)
    
                    const userRef = doc(firstore, "users", user.uid);
                    await updateDoc(userRef, {
                        solvedProblems: arrayUnion(problem.id)
                    });
                    setUserData(prev => ({...prev, solved: true}));
                }
            }
        } catch (error:any) {
            console.log(error.message);
            if (error.message.startsWith("AssertionError")) {
                toast.error("One or more test cases failed!", { position: "top-right", autoClose: 5000, theme: "dark", });
            } else {
                toast.error(error.message, { position: "top-right", autoClose: 5000, theme: "dark", });
            }
        }
    }
    
    return (
        <div className='flex flex-col w-full px-5 overflow-auto bg-dark-layer-1 rounded-md'>
                <div className='flex-none sticky top-0 z-10 flex h-10 items-center space-x-6 bg-dark-layer-1'>
                    <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                        <div className='text-sm font-medium leading-5 text-white'>Testcases</div>
                        <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                    </div>
                    <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                        <div className='text-sm font-medium leading-5 text-white'>Result</div>
                    </div>
                </div>
                <div className='flex flex-col flex-grow'>
                        <div className='mr-2 items-start mt-4 '>
                            <div className='flex flex-wrap items-center gap-y-4 space-x-2'>
                                {problem.examples.map((example, index) => {
                                    return (
                                        <div key={example.id} onClick={() => setTestIndex(index)}
                                    className={`font-medium items-center transition-all focus:outline-none inline-flex ${index === testIndex ? "bg-dark-fill-3" : ""} hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap text-white`}
                                        >
                                            Case {index + 1}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='font-semibold my-4'>
                            <p className='text-sm font-medium text-white'>Input:</p>
                            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                                {problem.examples[testIndex].inputText}
                            </div>
                            <p className='text-sm font-medium mt-4 text-white'>Output:</p>
                            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                                {problem.examples[testIndex].outputText}
                            </div>
                        </div>
                </div>
                <div className='flex-none sticky bottom-0 z-10 flex h-12 items-center justify-between space-x-6 bg-dark-layer-1'>
                    <div onClick={() => setConsoleOpen(false)} className='flex items-center transition-all cursor-pointer rounded-lg bg-dark-fill-3 hover:bg-dark-fill-2 text-dark-label-2 text-sm font-medium px-4 py-1.5'>
                        Console
                        <BsChevronDown className='ml-2 fill-dark-gray-6 fill-gray-6'/>
                    </div>
                    <div className='flex space-x-2'>
                        <div className='transition-all cursor-pointer rounded-lg bg-dark-fill-3 hover:bg-dark-fill-2 text-dark-label-2 text-sm font-medium px-4 py-1.5'>
                            Run
                        </div>
                        <div onClick={handleSubmit} className='transition-all cursor-pointer rounded-lg bg-dark-green-s hover:bg-green-400 text-white text-sm font-medium px-4 py-1.5'>
                            Submit
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default Console;