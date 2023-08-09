import React from 'react';
import { IoClose } from 'react-icons/io5';
import Login from '@/components/Modals/Login';
import Signup from '@/components/Modals/Signup';
import ResetPassword from './ResetPassword';

type AuthModalProps = {
    
};

const AuthModal:React.FC<AuthModalProps> = () => {
    
    return <>
        <div className='absolute h-full w-full top-0 left-0 flex justify-center items-center bg-black opacity-60'></div>
        <div className='absolute flex h-full w-full top-0 left-0 justify-center items-center'>
            <div className='flex flex-col w-96 bg-brand-orange rounded-lg outline-none mx-5'>
                <div className='flex w-full justify-end'>
                    <button className='flex justify-center items-center rounded-full h-6 w-6 hover:bg-zinc-800
                     text-white mx-1 my-1 transition duration-300 ease-in-out'>
                        <IoClose />
                    </button>
                </div>
                <ResetPassword />
            </div>
        </div>
    </>
}
export default AuthModal;