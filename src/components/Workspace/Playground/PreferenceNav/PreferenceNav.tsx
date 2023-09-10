import React, { useEffect, useState } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai';
import SettingsModal from '@/components/Modals/SettingsModal';
import { ISettings } from '../Playground';

type PreferenceNavProps = {
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>,
    settings: ISettings
};

const PreferenceNav:React.FC<PreferenceNavProps> = ({ setSettings, settings }) => {

    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const handleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    }

    const handleSettingsModal = () => {
        setSettings(prev => ({...prev, isModalOpen: true}))
    }

    useEffect(() => {
        if (document.fullscreenElement) setIsFullscreen(true)
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullscreen(false);
				return;
			}
			setIsFullscreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullscreen]);
    
    return <div className='editor-container'>
        <div className='flex items-center justify-between mt-2'>
            <div className='text-xs text-white bg-dark-fill-3 rounded py-2 px-3 cursor-pointer hover:bg-dark-fill-2 transition duration-200 ease-in-out'>
                JavaScript
            </div>
            <div className='flex'>
                <button onClick={handleSettingsModal} data-tooltip-id="my-tooltip" data-tooltip-content="Settings" data-tooltip-place="bottom" className='preferenceBtn'>
                    <AiOutlineSetting />
                </button>
                <button onClick={handleFullscreen} data-tooltip-id="my-tooltip" data-tooltip-content="Full screen" data-tooltip-place="bottom" className='preferenceBtn'>
                    {!isFullscreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
                </button>
            </div>
        </div>
        {settings.isModalOpen && <SettingsModal setSettings={setSettings} settings={settings}/>}
    </div>
}
export default PreferenceNav;