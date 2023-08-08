import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    
    return <div className='flex items-center justify-between h-20 sm:px-12 px-4 md:px-24'>
        <Link href='/' className='flex items-center justify-center'>
            <Image src="/logo-full.png" width='120' height='120' alt='LeetClone' />
        </Link>
        <div className='flex items-center'>
            <button className='bg-brand-orange text-white rounded-3xl h-9 px-6 text-sm outline-none
            hover:bg-brand-orange-s transition duration-300 ease-in-out'>Log In</button>
        </div>
    </div>
}
export default Navbar;