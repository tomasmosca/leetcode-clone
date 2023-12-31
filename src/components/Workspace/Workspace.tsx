import React, { useEffect, useState } from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playground/Playground';
import { Problem } from '@/utils/types/problems'
import Confetti from 'react-confetti';

type WorkspaceProps = {
    problem: Problem
};

const Workspace:React.FC<WorkspaceProps> = ({problem}) => {

    const [success, setSuccess] = useState<boolean>(false);
    const [height, setHeight] = useState('567px');

    useEffect(() => {
        const updateHeight = () => {
            setHeight(`${window.innerHeight}px`);
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    
    return (<>
            <Split className='split' minSize={400}>
                <ProblemDescription problem={problem} setSuccess={setSuccess}/>
                <Playground problem={problem} />
            </Split>
            {success && <Confetti 
                gravity={0.3}
                tweenDuration={4000}
                height={height as unknown as number}
            />}
        </>
    );
}
export default Workspace;