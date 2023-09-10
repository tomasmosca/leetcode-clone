import React, { useState, useEffect } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

type TimerProps = {
    
};

const Timer:React.FC<TimerProps> = () => {

    const [showTimer, setShowTimer] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0); // in seconds

    useEffect(() => {
        let intervalId: any;

        if (timerStarted) {
            intervalId = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [timerStarted]);

    const startTimer = () => {
        setTimerStarted(true);
        setShowTimer(true);
    }

    const hideTimerDisplay = () => {
        setShowTimer(false);
    }

    const resetTimer = () => {
        setTimerStarted(false);
        setElapsedTime(0);
        setShowTimer(false);
    }

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            secs: secs.toString().padStart(2, '0')
        };
    }

    const { hours, minutes, secs } = formatTime(elapsedTime);
    
    
    return <div onClick={!showTimer ? startTimer : undefined}>
            {showTimer ? 
                <div className='flex p-1.5 justify-center items-center gap-2 cursor-pointer bg-dark-fill-2 rounded-md'>
                    <div data-tooltip-id="my-tooltip" data-tooltip-content="Hide timer" data-tooltip-place="bottom" onClick={hideTimerDisplay} className='hover:text-dark-gray-8 flex space-x-1'>
                        <span className='w-6 text-center'>{hours.toString().padStart(2, '0')}</span>
                        <span>:</span>
                        <span className='w-6 text-center'>{minutes.toString().padStart(2, '0')}</span>
                        <span>:</span>
                        <span className='w-6 text-center'>{secs.toString().padStart(2, '0')}</span>
                    </div>
                    <div data-tooltip-id="my-tooltip" data-tooltip-content="Reset timer" data-tooltip-place="bottom" onClick={resetTimer} className='hover:text-dark-gray-8'>
                        <FiRefreshCcw />
                    </div>
                </div> : 
                <div data-tooltip-id="my-tooltip" data-tooltip-content={`${timerStarted ? 'Show timer' : 'Start timer'}`} data-tooltip-place="bottom" className={`cursor-pointer p-1.5 rounded-md ${timerStarted ? 'text-dark-blue-s' : ''} outline-none text-sm hover:bg-dark-fill-2 duration-300 ease-in-out transition-text-none`}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        className='h-6 w-6'
                    >
                        <path
                            fillRule='evenodd'
                            d='M12 4a9 9 0 110 18 9 9 0 010-18zm0 2a7 7 0 100 14 7 7 0 000-14zm0 1.634a1 1 0 01.993.883l.007.117-.001 3.774 2.111 1.162a1 1 0 01.445 1.253l-.05.105a1 1 0 01-1.254.445l-.105-.05-2.628-1.447a1 1 0 01-.51-.756L11 13V8.634a1 1 0 011-1zM16.235 2.4a1 1 0 011.296-.269l.105.07 4 3 .095.08a1 1 0 01-1.19 1.588l-.105-.069-4-3-.096-.081a1 1 0 01-.105-1.319zM7.8 2.4a1 1 0 01-.104 1.319L7.6 3.8l-4 3a1 1 0 01-1.296-1.518L2.4 5.2l4-3a1 1 0 011.4.2z'
                            clipRule='evenodd'
                        ></path>
                    </svg>
                </div>
            }
            </div>
}
export default Timer;