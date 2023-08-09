import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    function handleOpenModal() {
        setAuthModalState(prev => ({...prev, isOpen: true}));
    }
    return <div className='flex items-center justify-between h-20 sm:px-12 px-4 md:px-24'>
        <Link href='/' className='flex items-center justify-center'>
            <Image src="/logo.png" width='180' height='180' alt='LeetClone' />
        </Link>
        <div className='flex items-center'>
            <button onClick={handleOpenModal} className='bg-brand-orange text-white rounded-3xl h-9 px-6 text-sm outline-none
            hover:bg-brand-orange-s transition duration-300 ease-in-out'>Log In</button>
        </div>
    </div>
}
export default Navbar;