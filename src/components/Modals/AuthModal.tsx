import React from 'react';
import { IoClose } from 'react-icons/io5';
import Login from '@/components/Modals/Login';
import Signup from '@/components/Modals/Signup';
import ResetPassword from './ResetPassword';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

type AuthModalProps = {
    
};

const AuthModal:React.FC<AuthModalProps> = () => {
    const authModal = useRecoilValue(authModalState);
    const setModalState = useSetRecoilState(authModalState);
    function handleCloseModal() {
        setModalState(({type: 'login', isOpen: false}));
    }
    return <>
        <div className='absolute h-full w-full top-0 left-0 flex justify-center items-center bg-black opacity-60' onClick={handleCloseModal}></div>
        <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col w-96 bg-brand-orange rounded-lg outline-none mx-5'>
            <div className='flex w-full justify-end'>
                <button onClick={handleCloseModal} className='flex justify-center items-center rounded-full h-6 w-6 hover:bg-zinc-800
                    text-white mx-1 my-1 transition duration-300 ease-in-out'>
                    <IoClose />
                </button>
            </div>
            {authModal.type === 'login' ? <Login/> : authModal.type === 'register' ? <Signup/> : <ResetPassword/>}
        </div>
    </>
}
export default AuthModal;