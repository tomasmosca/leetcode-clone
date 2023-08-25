import React from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import Split from 'react-split';
import Console from './Console/Console';
import { Problem } from '@/utils/types/problems'

type ProblemDescriptionProps = {
    problem: Problem
};

const ProblemDescription:React.FC<ProblemDescriptionProps> = ({problem}) => {
    
    return <div className='bg-dark-layer-2 h-[calc(100vh-67px)] flex flex-col pl-2 pb-2.5'>
        <div className='flex'>
            <p className='text-white text-xs font-light bg-dark-layer-1 rounded-t-md p-3 mt-2 px-5'>Description</p>
        </div>
        <Split className='flex-grow overflow-hidden' sizes={[70, 30]} direction="vertical" minSize={180}>
            <div className='bg-dark-layer-1 w-full p-5 overflow-y-auto rounded-e-md rounded-bl-md'>
                <h1 className="text-white text-lg font-medium">{problem.title}</h1>
                <div className='flex items-center mt-3 space-x-4'>
                    <div className='text-xs text-olive bg-olive rounded-[21px] bg-opacity-[.15] px-2 py-1 font-medium capitalize'>
                        Easy
                    </div>
                    <div data-tooltip-id="my-tooltip" data-tooltip-content="Solved" data-tooltip-place="bottom" className='rounded transition-colors duration-200 text-green-s text-dark-green-s text-lg'>
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
                    <div data-tooltip-id="my-tooltip" data-tooltip-content="Add to List" data-tooltip-place="bottom" className='text-dark-gray-6 cursor-pointer rounded hover:bg-dark-fill-3 p-[3px] transition-colors duration-200 text-xl'>
                        <TiStarOutline />
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
            <Console problem={problem} />
        </Split>
    </div>
}
export default ProblemDescription;