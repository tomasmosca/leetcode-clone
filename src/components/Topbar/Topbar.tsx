import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { auth } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

type TopbarProps = {
    
};

const Topbar:React.FC<TopbarProps> = () => {

    const [user] = useAuthState(auth);
    
    return <div className='bg-dark-layer-1 text-dark-gray-7 flex justify-between'>
        <div className='md:ml-28'>
            <Link href='/' className='flex items-center justify-center'>
                <Image src="/logo.png" width='150' height='150' alt='LeetClone' />
            </Link>
        </div>
        <div className='flex justify-center items-center space-x-4 mr-4 md:mr-28'>
            <div>
                <button className='p-2 rounded-md bg-dark-fill-3 text-brand-orange outline-none text-sm hover:bg-dark-fill-2 transition duration-300 ease-in-out'>Premium</button>
            </div>
            {!user ? 
            <Link href='/auth'>
                <button className='p-2 rounded-md bg-dark-fill-3 outline-none text-sm hover:bg-dark-fill-2 transition duration-300 ease-in-out'>Sign In</button>
            </Link> : 
            <div className='cursor-pointer group relative'>
                <Image src="/avatar.png" width='37' height='37' alt='Avatar' />
                <div className='absolute bg-dark-layer-1 p-2 top-14 rounded-lg left-2/4 -translate-x-2/4 mx-auto shadow-lg z-40 group-hover:scale-100 scale-0 transition duration-300 ease-in-out'>
                    <p className='text-brand-orange text-sm'>{user.email}</p>
                </div>
            </div>}
        </div>
    </div>
}
export default Topbar;