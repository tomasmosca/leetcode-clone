import React from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';

type PlaygroundProps = {
    
};

const Playground:React.FC<PlaygroundProps> = () => {
    
    return <div className='flex flex-col relative mr-2'>
            <PreferenceNav />
            <div className='w-full overflow-auto mt-2 rounded-md'>
                <CodeMirror 
                    value="const a = 1;"
                    theme={vscodeDark}
                    extensions={[javascript()]}
                    style={{fontSize:16}}
                    height='565px'
                />
            </div>
        </div>
}
export default Playground;