import { authModalState } from '@/atoms/authModalAtom';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const setModalState = useSetRecoilState(authModalState);
    function handleSwitchModal(type: 'login' | 'register' | 'forgotPassword') {
        setModalState(prev => ({...prev, type}));
    }
    return <form className='mt-3 px-8 pb-4'>
        <h3 className='text-2xl text-white font-medium'>Sign in to <span className='text-zinc-800 font-bold'>LeetClone</span></h3>
        <div>
            <div className='mt-4'>
                <label htmlFor='email' className='text-zinc-800 font-light text-sm block'>Your email</label>
                <input className='rounded-md w-full h-9 mt-1 p-2.5 text-sm outline-none bg-zinc-700 text-white placeholder-zinc-400' type='email' name='email' id='email' placeholder='name@company.com' autoComplete='off' required/>
            </div>
            <div className='mt-4'>
                <label htmlFor='password' className='text-zinc-800 font-light text-sm block'>Your password</label>
                <input className='rounded-md w-full h-9 mt-1 p-2.5 text-sm outline-none bg-zinc-700 text-white placeholder-zinc-400' type='password' name='password' id='password' placeholder='password' autoComplete='off' required/>
            </div>
            <button type='submit' className='w-full bg-zinc-800 text-white text-sm rounded-md h-9 mt-4 block hover:bg-zinc-900 transition duration-300 ease-in-out'>Login</button>
            <div className='flex w-full justify-end mt-4'>
                <a href='#' className='text-zinc-800 text-sm font-normal hover:underline' onClick={() => handleSwitchModal('forgotPassword')}>Forgot Password?</a>
            </div>
            <div className='mt-3'>
                <label onClick={() => handleSwitchModal('register')} className='text-sm'>Not registered?<a href='#' className='text-blue-700 ml-1 hover:underline'>Create account</a></label>
            </div>
        </div>
    </form>
}
export default Login;