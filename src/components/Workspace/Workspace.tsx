import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';

type WorkspaceProps = {
    
};

const Workspace:React.FC<WorkspaceProps> = () => {
    
    return (
        <Split className='split' minSize={400}>
            <ProblemDescription />
            <div className='bg-dark-layer-2 text-white'>Code Editor</div>
        </Split>
    );
}
export default Workspace;