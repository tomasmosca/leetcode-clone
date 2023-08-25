import Topbar from '@/components/Topbar/Topbar';
import Workspace from '@/components/Workspace/Workspace';
import { Problem } from '@/utils/types/problems'
import { problems } from "@/utils/problems";
import React from 'react';

type ProblemPageProps = {
    problem: Problem
};

const ProblemPage:React.FC<ProblemPageProps> = ({problem}) => {
    
    return <div>
        <Topbar problemPage />
        <Workspace problem={problem} />
    </div>
}
export default ProblemPage;

export async function getStaticPaths() {
    const paths = Object.keys(problems).map((key) => ({
        params: {pid: key}
    }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: { params: { pid: string } }) {
    const { pid } = params;
	const problem = problems[pid];

    if (!problem) {
        return {
            notFound: true
        }
    }
    problem.handlerFunction = problem.handlerFunction.toString();
    return {
        props: {
            problem
        }
    }
}