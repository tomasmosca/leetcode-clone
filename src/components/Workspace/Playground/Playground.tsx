import React, { useEffect, useState } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { Problem } from '@/utils/types/problems'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';

type PlaygroundProps = {
    problem: Problem
};

const Playground:React.FC<PlaygroundProps> = ({ problem }) => {

    const [userCode, setUserCode] = useState<string>();
    const [user] = useAuthState(auth);
    const [height, setHeight] = useState('567px'); // default height

    useEffect(() => {
        if (user) {
            setUserCode(localStorage.getItem(user.uid + problem.id) ? JSON.parse(localStorage.getItem(user.uid + problem.id) as string) : problem.starterCode)
        } else {
            setUserCode(problem.starterCode);
        }
    }, [problem.id, problem.starterCode, user])

    const onCodeChange = (value: string) => {
        if (user) {
            localStorage.setItem(user.uid + problem.id, JSON.stringify(value));
        }
    }

    useEffect(() => {
        const updateHeight = () => {
            setHeight(`${window.innerHeight - 125}px`);
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    
    return <div className='flex flex-col relative mr-2'>
            <PreferenceNav />
            <div className='w-full overflow-auto mt-2 rounded-md'>
                <CodeMirror 
                    value={userCode}
                    theme={vscodeDark}
                    extensions={[javascript()]}
                    style={{fontSize:16}}
                    onChange={onCodeChange}
                    height={height}
                />
            </div>
        </div>
}
export default Playground;