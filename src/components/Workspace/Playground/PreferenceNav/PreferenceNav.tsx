import React from 'react';
import { AiOutlineFullscreen, AiOutlineSetting } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';

type PreferenceNavProps = {
    
};

const PreferenceNav:React.FC<PreferenceNavProps> = () => {
    
    return <div className='editor-container'>
        <div className='flex items-center justify-between mt-2'>
            <div className='text-xs text-white bg-dark-fill-3 rounded py-2 px-3 cursor-pointer hover:bg-dark-fill-2 transition duration-200 ease-in-out'>
                JavaScript
            </div>
            <div className='flex'>
                <button data-tooltip-id="my-tooltip" data-tooltip-content="Settings" data-tooltip-place="bottom" className='preferenceBtn'>
                    <AiOutlineSetting />
                </button>
                <button data-tooltip-id="my-tooltip" data-tooltip-content="Full screen" data-tooltip-place="bottom" className='preferenceBtn'>
                    <AiOutlineFullscreen />
                </button>
            </div>
        </div>
        <Tooltip id="my-tooltip" className='tooltip-styling' arrowColor="transparent" offset={8}/>
    </div>
}
export default PreferenceNav;