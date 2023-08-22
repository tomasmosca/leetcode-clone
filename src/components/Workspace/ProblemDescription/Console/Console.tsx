import React from 'react';
import { BsChevronUp } from 'react-icons/bs';

type ConsoleProps = {
    
};

const Console:React.FC<ConsoleProps> = () => {
    
    return (
        <div className='w-full px-5 overflow-auto bg-dark-layer-1 rounded-md'>
                <div className='sticky top-0 z-10 flex h-10 items-center space-x-6 bg-dark-layer-1'>
                    <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                        <div className='text-sm font-medium leading-5 text-white'>Testcases</div>
                        <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                    </div>
                    <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                        <div className='text-sm font-medium leading-5 text-white'>Result</div>
                    </div>
                </div>
                <div className='flex'>
                        <div className='mr-2 items-start mt-4 '>
                            <div className='flex flex-wrap items-center gap-y-4 space-x-2'>
                                <div
                                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap text-white`}
                                >
                                    Case 1
                                </div>
                                <div
                                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap text-white`}
                                >
                                    Case 2
                                </div>
                                <div
                                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap text-white`}
                                >
                                    Case 3
                                </div>
                            </div>
                        </div>
                </div>
                <div className='font-semibold my-4'>
                    <p className='text-sm font-medium mt-4 text-white'>Input:</p>
                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                        [7,2,5,1]
                    </div>
                    <p className='text-sm font-medium mt-4 text-white'>Output:</p>
                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                        9
                    </div>
                </div>
                <div className='sticky bottom-0 z-10 flex h-12 items-center justify-between space-x-6 bg-dark-layer-1'>
                    <div className='flex items-center transition-all cursor-pointer rounded-lg bg-dark-fill-3 hover:bg-dark-fill-2 text-dark-label-2 text-sm font-medium px-4 py-1.5'>
                        Console
                        <BsChevronUp className='ml-2 fill-dark-gray-6 fill-gray-6'/>
                    </div>
                    <div className='flex space-x-2'>
                        <div className='transition-all cursor-pointer rounded-lg bg-dark-fill-3 hover:bg-dark-fill-2 text-dark-label-2 text-sm font-medium px-4 py-1.5'>
                            Run
                        </div>
                        <div className='transition-all cursor-pointer rounded-lg bg-dark-green-s hover:bg-green-400 text-white text-sm font-medium px-4 py-1.5'>
                            Submit
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default Console;