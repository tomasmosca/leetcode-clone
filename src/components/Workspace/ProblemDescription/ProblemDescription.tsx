import React from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';

type ProblemDescriptionProps = {
    
};

const ProblemDescription:React.FC<ProblemDescriptionProps> = () => {
    
    return <div className='bg-dark-layer-2 h-[calc(100vh-67px)] flex flex-col pl-2'>
        <div className='flex'>
            <p className='text-white text-xs font-light bg-dark-layer-1 rounded-t-md p-3 mt-2 px-5'>Description</p>
        </div>
        <div className='flex-grow overflow-y-auto overflow-hidden rounded-e-md rounded-bl-md'>
            <div className='bg-dark-layer-1 w-full p-5'>
                <h1 className="text-white text-lg font-medium">1. Two Sum</h1>
                <div className='flex items-center mt-3 space-x-4'>
                    <div className='text-xs text-olive bg-olive rounded-[21px] bg-opacity-[.15] px-2 py-1 font-medium capitalize'>
                        Easy
                    </div>
                    <div className='rounded transition-colors duration-200 text-green-s text-dark-green-s text-lg'>
                        <BsCheck2Circle />
                    </div>
                    <div className='flex items-center space-x-1 cursor-pointer text-dark-gray-6 hover:bg-dark-fill-3 rounded p-[3px] transition-colors duration-200 text-lg'>
                        <AiFillLike />
                        <span className='text-xs'>120</span>
                    </div>
                    <div className='flex items-center space-x-1 cursor-pointer text-dark-gray-6 hover:bg-dark-fill-3 rounded p-[3px] transition-colors duration-200 text-lg'>
                        <AiFillDislike />
                        <span className='text-xs'>20</span>
                    </div>
                    <div className='text-dark-gray-6 cursor-pointer rounded hover:bg-dark-fill-3 p-[3px] transition-colors duration-200 text-xl'>
                        <TiStarOutline />
                    </div>
                </div>
                <div className='text-white text-sm'>
                    <p className='mt-3'>
                        Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers
                        such that they add up to</em> <code>target</code>.
                    </p>
                    <p className='mt-3'>
                        You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
                    </p>
                    <p className='mt-3'>
                        You can return the answer in any order.
                    </p>
                </div>
                <div className='mt-4'>
                    <div>
                        <p className='text-white font-medium'>Example 1:</p>
                        <div className='example-card'>
                            <pre>
                                <strong>Input:  </strong>nums = [2,7,11,15], target = 9
                                <br />
                                <strong>Output: </strong>[0,1]
                                <br />
                                <strong>Explanation: </strong>Because nums[0] + nums[1] == 9, we return [0, 1].
                            </pre>
                        </div>
                        <p className='text-white font-medium'>Example 2:</p>
                        <div className='example-card'>
                            <pre>
                                <strong>Input:  </strong>nums = [2,7,11,15], target = 9
                                <br />
                                <strong>Output: </strong>[0,1]
                                <br />
                                <strong>Explanation: </strong>Because nums[0] + nums[1] == 9, we return [0, 1].
                            </pre>
                        </div>
                        <p className='text-white font-medium'>Example 3:</p>
                        <div className='example-card'>
                            <pre>
                                <strong>Input:  </strong>nums = [2,7,11,15], target = 9
                                <br />
                                <strong>Output: </strong>[0,1]
                                <br />
                                <strong>Explanation: </strong>Because nums[0] + nums[1] == 9, we return [0, 1].
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='text-white bg-dark-layer-1 mt-2 rounded-md px-5 py-2.5 mb-2 cursor-pointer'>
            <p className=''>Console</p>
        </div>
    </div>
}
export default ProblemDescription;