import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

type TopbarProps = {
    
};

const Topbar:React.FC<TopbarProps> = () => {
    
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
            <Link href='/auth'>
                <button className='p-2 rounded-md bg-dark-fill-3 outline-none text-sm hover:bg-dark-fill-2 transition duration-300 ease-in-out'>Sign In</button>
            </Link>
        </div>
    </div>
}
export default Topbar;