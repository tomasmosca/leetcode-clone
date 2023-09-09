import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { auth, firstore } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logout from '../Buttons/Logout';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import Timer from '../Timer/Timer';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsList } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { collection, orderBy, query, getDocs, where } from 'firebase/firestore';
import { DBProblem } from '@/utils/types/problems';

type TopbarProps = {
    problemPage?: boolean
};

const Topbar:React.FC<TopbarProps> = ({problemPage}) => {

    const [user] = useAuthState(auth);
    const setModalState = useSetRecoilState(authModalState);
    const router = useRouter();

    const useGetSortedIds = () => {
        const problems = useGetProblems();
      
        const ids: string[] = [];
      
        problems.forEach((doc:any) => {
          ids.push(doc.id);
        });
      
        return ids;
    };

    const problemIds = useGetSortedIds();

    const handleSwitchProblem = (isForward: boolean) => {
        let problemId = "";
        const currentProblem = router.query;
        let currProblemIndex = problemIds.indexOf(currentProblem.pid as string);
        if (isForward) {
            currProblemIndex === problemIds.length - 1 ? currProblemIndex = 0 : currProblemIndex++;
            problemId = problemIds.at(currProblemIndex) as string;
        } else {
            currProblemIndex--;
            problemId = problemIds.at(currProblemIndex) as string;
        }
        router.push(`/problems/${problemId}`);
    }
    
    return <div className='bg-dark-layer-1 text-dark-gray-7 flex justify-between'>
        <div className={`${problemPage ? 'md:ml-0' : 'md:ml-28'}`}>
            <Link href='/' className='flex items-center justify-center'>
                <Image src="/logo.png" width='150' height='150' alt='LeetClone' />
            </Link>
        </div>
        {problemPage &&
            <div className='flex justify-center items-center gap-4'>
                <div onClick={() => handleSwitchProblem(false)} className='cursor-pointer p-2.5 rounded-md bg-dark-fill-3
                outline-none text-sm hover:bg-dark-fill-2 transition duration-300 ease-in-out'>
                    <FaChevronLeft />
                </div>
                <Link href='/' className='flex justify-center items-center gap-2 font-medium text-dark-gray-8 cursor-pointer'>
                    <BsList />
                    <p className='text-sm'>Problems List</p>
                </Link>
                <div onClick={() => handleSwitchProblem(true)} className='cursor-pointer p-2.5 rounded-md bg-dark-fill-3
                outline-none text-sm hover:bg-dark-fill-2 transition duration-300 ease-in-out'>
                    <FaChevronRight />
                </div>
            </div>
        }
        <div className={`flex justify-center items-center space-x-4 mr-4 ${problemPage ? 'md:mr-4' : 'md:mr-28'}`}>
            <div>
                <button className='p-2 rounded-md bg-dark-fill-3 text-brand-orange outline-none text-sm hover:bg-dark-fill-2 transition duration-300 ease-in-out'>Premium</button>
            </div>
            {problemPage && user && <Timer />}
            {!user ? 
            <Link href='/auth' onClick={() => setModalState(prev => ({...prev, isOpen: true, type: 'login'}))}>
                <button className='p-2 rounded-md bg-dark-fill-3 outline-none text-sm hover:bg-dark-fill-2 transition duration-300 ease-in-out'>Sign In</button>
            </Link> : 
            <div className='cursor-pointer group relative'>
                <Image src="/avatar.png" width='37' height='37' alt='Avatar' />
                <div className={`absolute bg-dark-layer-1 p-2 top-14 rounded-lg ${problemPage ? '-left-2' : 'left-2/4'} -translate-x-2/4 mx-auto shadow-lg z-40 group-hover:scale-100 scale-0 transition duration-300 ease-in-out`}>
                    <p className='text-brand-orange text-sm'>{user.email}</p>
                </div>
            </div>}
            {user && <Logout />}
        </div>
    </div>
}
export default Topbar;

function useGetProblems() {
    const [problems, setProblems] = useState<DBProblem[]>([]);

    useEffect(() => {

        const getProblems = async () => {
            const q = query(collection(firstore, "problems"), where('link', '==', ''), orderBy("order", "asc"));
            const querySnapshot = await getDocs(q);
            const temp: DBProblem[] = []
            querySnapshot.forEach((doc) => {
                temp.push({id: doc.id, ...doc.data()} as DBProblem)
            });
            setProblems(temp);
        }

        getProblems();
    }, [])

    return problems;
}