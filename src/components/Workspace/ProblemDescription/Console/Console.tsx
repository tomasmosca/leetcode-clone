import React, { useEffect, useMemo, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
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

export type Testcase = {
    input: string,
    output: string,
    testNumber: number
}

const Console:React.FC<ConsoleProps> = ({ problem, setConsoleOpen, setSuccess, setUserData }) => {

    const [testIndex, setTestIndex] = useState<number>(0);
    const [customTestcases, setCustomTestcases] = useState<Testcase[]>([])
    const {query: {pid}} = useRouter();
    const [user] = useAuthState(auth);

    useEffect(() => {
        setTestIndex(0);
        setCustomTestcases([]);
    }, [problem])

    const handleSubmit = async(individualTest: boolean) => {
        if (!user) {
            if (individualTest) {
                toast.error("Please log in to run a test", { position: "top-right", autoClose: 5000, theme: "dark", });
            } else {
                toast.error("Please log in to submit code", { position: "top-right", autoClose: 5000, theme: "dark", });
            }
            return;
        }
        try {
            let userCode: string = localStorage.getItem(user.uid + problem.id) ? JSON.parse(localStorage.getItem(user.uid + problem.id) as string) : problem.starterCode;
            if (userCode) userCode = problem.starterFunctionName + userCode.split(problem.starterFunctionName)[1];
            const cb = new Function(`return ${userCode}`)();
            const handler = problems[pid as string].handlerFunction;

            if (typeof handler === "function") {
                if (individualTest) {
                    const result = handler(cb, testIndex, customTestcases);
                    if (result) {
                        toast.success(`Congrats! Test case ${testIndex + 1} passed!`, { position: "top-right", autoClose: 5000, theme: "dark", });
                    }
                } else {
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
            }
        } catch (error:any) {
            console.log(error.message);
            if (error.message.startsWith("AssertionError")) {
                if (individualTest) {
                    toast.error(`Test case ${testIndex + 1} failed!`, { position: "top-right", autoClose: 5000, theme: "dark", });
                } else {
                    toast.error("One or more test cases failed!", { position: "top-right", autoClose: 5000, theme: "dark", });
                }
            } else {
                toast.error(error.message, { position: "top-right", autoClose: 5000, theme: "dark", });
            }
        }
    }

    const handleCloneTestcase = () => {
        const newTestcase = {
            input: problem.examples[testIndex] ? problem.examples[testIndex].inputText : customTestcases[testIndex - problem.examples.length].input,
            output: problem.examples[testIndex] ? problem.examples[testIndex].outputText : customTestcases[testIndex - problem.examples.length].output,
            testNumber: customTestcases ? customTestcases.length + problem.examples.length + 1 : problem.examples.length + 1
        }
        setCustomTestcases(prev => [...prev, newTestcase]);
    }

    const handleDeleteTestcase = (testcase: Testcase, index: number) => {
        if (testcase.testNumber - 1 === testIndex) {
            setTestIndex(testIndex - 1);
        } else {
            setTestIndex(testIndex);
        }
        setCustomTestcases(customTestcases.filter(tc => tc.testNumber !== testcase.testNumber));
        for (let i = index; i < customTestcases.length; i++) {
            customTestcases[i].testNumber--;
        }
    }

    const handleContentChange = (
        index: number, 
        type: 'input' | 'output', 
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const updatedCases = [...customTestcases];
    
        if (type === 'input') {
            updatedCases[index - problem.examples.length].input = event.target.value;
        } else if (type === 'output') {
            updatedCases[index - problem.examples.length].output = event.target.value;
        }
    
        setCustomTestcases(updatedCases);
    };
    
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
                                {customTestcases.map((testcase, index) => {
                                    return (
                                        <div className="relative hoverable-container group" key={testcase.testNumber}>
                                            <div 
                                                onClick={() => setTestIndex(testcase.testNumber - 1)} 
                                                className={`font-medium items-center transition-all focus:outline-none inline-flex ${testIndex === testcase.testNumber - 1 ? "bg-dark-fill-3" : ""} group-hover:bg-dark-fill-2 rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap text-white`}
                                            >
                                                Case {testcase.testNumber}
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gray-5 hover:bg-gray-7 rounded-full cursor-pointer opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-180">
                                                <IoClose 
                                                    className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm cursor-pointer opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-180 text-dark-gray-8"
                                                    onClick={() => handleDeleteTestcase(testcase, index)}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}

                                {problem.examples.length + customTestcases.length < 6 && (
                                    <div onClick={handleCloneTestcase} data-tooltip-id="my-tooltip" data-tooltip-content="Clone current testcase" data-tooltip-place="bottom" className='cursor-pointer font-bold w-4 h-4 text-gray-5 hover:text-dark-gray-6'>
                                        <AiOutlinePlus />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='font-semibold my-4'>
                            <p className='text-sm font-medium text-white'>Input:</p>
                            <input 
                                type="text"
                                value={
                                    problem.examples[testIndex]
                                        ? problem.examples[testIndex].inputText
                                        : customTestcases[testIndex - problem.examples.length]
                                        ? customTestcases[testIndex - problem.examples.length].input
                                        : ''
                                }
                                onChange={(e) => handleContentChange(testIndex, 'input', e)}
                                className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2 outline-none focus:border-blue-500'
                                readOnly={problem.examples[testIndex] !== undefined}
                            />
                            <p className='text-sm font-medium mt-4 text-white'>Output:</p>
                            <input 
                                type="text"
                                value={
                                    problem.examples[testIndex]
                                        ? problem.examples[testIndex].outputText
                                        : customTestcases[testIndex - problem.examples.length]
                                        ? customTestcases[testIndex - problem.examples.length].output
                                        : ''
                                }
                                onChange={(e) => handleContentChange(testIndex, 'output', e)}
                                className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2 outline-none focus:border-blue-500'
                                readOnly={problem.examples[testIndex] !== undefined}
                            />
                        </div>


                </div>
                <div className='flex-none sticky bottom-0 z-10 flex h-12 items-center justify-between space-x-6 bg-dark-layer-1'>
                    <div onClick={() => setConsoleOpen(false)} className='flex items-center transition-all cursor-pointer rounded-lg bg-dark-fill-3 hover:bg-dark-fill-2 text-dark-label-2 text-sm font-medium px-4 py-1.5'>
                        Console
                        <BsChevronDown className='ml-2 fill-dark-gray-6 fill-gray-6'/>
                    </div>
                    <div className='flex space-x-2'>
                        <div onClick={() => handleSubmit(true)} className='transition-all cursor-pointer rounded-lg bg-dark-fill-3 hover:bg-dark-fill-2 text-dark-label-2 text-sm font-medium px-4 py-1.5'>
                            Run
                        </div>
                        <div onClick={() => handleSubmit(false)} className='transition-all cursor-pointer rounded-lg bg-dark-green-s hover:bg-green-400 text-white text-sm font-medium px-4 py-1.5'>
                            Submit
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default Console;