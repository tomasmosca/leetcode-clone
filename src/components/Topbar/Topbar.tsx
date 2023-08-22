import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { auth } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logout from '../Buttons/Logout';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import Timer from '../Timer/Timer';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsList } from 'react-icons/bs';

type TopbarProps = {
    problemPage?: boolean
};

const Topbar:React.FC<TopbarProps> = ({problemPage}) => {

    const [user] = useAuthState(auth);
    const setModalState = useSetRecoilState(authModalState);
    
    return <div className='bg-dark-layer-1 text-dark-gray-7 flex justify-between'>
        <div className={`${problemPage ? 'md:ml-0' : 'md:ml-28'}`}>
            <Link href='/' className='flex items-center justify-center'>
                <Image src="/logo.png" width='150' height='150' alt='LeetClone' />
            </Link>
        </div>
        {problemPage &&
            <div className='flex justify-center items-center gap-4'>
                <div className='cursor-pointer p-2.5 rounded-md bg-dark-fill-3
                outline-none text-sm hover:bg-dark-fill-2 transition duration-300 ease-in-out'>
                    <FaChevronLeft />
                </div>
                <Link href='/' className='flex justify-center items-center gap-2 font-medium text-dark-gray-8 cursor-pointer'>
                    <BsList />
                    <p className='text-sm'>Problems List</p>
                </Link>
                <div className='cursor-pointer p-2.5 rounded-md bg-dark-fill-3
                outline-none text-sm hover:bg-dark-fill-2 transition duration-300 ease-in-out'>
                    <FaChevronRight />
                </div>
            </div>
        }
        <div className={`flex justify-center items-center space-x-4 mr-4 ${problemPage ? 'md:mr-4' : 'md:mr-28'}`}>
            <div>
                <button className='p-2 rounded-md bg-dark-fill-3 text-brand-orange outline-none text-sm hover:bg-dark-fill-2 transition duration-300 ease-in-out'>Premium</button>
            </div>
            {problemPage && <Timer />}
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