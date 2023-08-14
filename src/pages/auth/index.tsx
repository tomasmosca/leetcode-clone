import Navbar from '@/components/Navbar/Navbar';
import AuthModal from '@/components/Modals/AuthModal';
import React, { useEffect, useState } from 'react';
import { authModalState } from '@/atoms/authModalAtom';
import { useRecoilValue } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';

type AuthPageProps = {
    
};

const AuthPage:React.FC<AuthPageProps> = () => {
    const authModal = useRecoilValue(authModalState);
    const [user, loading, error] = useAuthState(auth);
    const [pageLoading, setPageLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (user) router.push('/')
        if (!loading && !user) setPageLoading(false);
    }, [user, router, loading])

    if (pageLoading) return null;

    return <div className='bg-zinc-800 h-screen relative'>
        <div className='max-w-7x1 mx-auto'>
            <Navbar />
            <div className='flex flex-col justify-center items-center h-[calc(100vh-5rem)]'>
                <h1 className='mb-4 px-5 text-3xl font-semibold text-center leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white'>A New Way to Learn</h1>
                <p className='px-16 text-md font-normal text-center text-gray-500 lg:text-lg dark:text-gray-400'>LeetCode is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.</p>
            </div>
            {authModal.isOpen && <AuthModal />}
        </div>
    </div>
}
export default AuthPage;