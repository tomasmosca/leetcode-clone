import { authModalState } from '@/atoms/authModalAtom';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type SignupProps = {
    
};

const Signup:React.FC<SignupProps> = () => {
    const setLoginModalState = useSetRecoilState(authModalState);
    function handleLoginModal() {
        setLoginModalState(prev => ({...prev, type: 'login'}))
    }
    return <form className='mt-3 px-8 pb-4'>
        <h3 className='text-2xl text-white font-medium'>Register to <span className='text-zinc-800 font-bold'>LeetClone</span></h3>
        <div>
            <div className='mt-4'>
                <label htmlFor='email' className='text-zinc-800 font-light text-sm block'>Email</label>
                <input className='rounded-md w-full h-9 mt-1 p-2.5 text-sm outline-none bg-zinc-700 text-white placeholder-zinc-400' type='email' name='email' id='email' placeholder='johndoe@gmail.com' autoComplete='off'/>
            </div>
            <div className='mt-4'>
                <label htmlFor='displayName' className='text-zinc-800 font-light text-sm block'>Display Name</label>
                <input className='rounded-md w-full h-9 mt-1 p-2.5 text-sm outline-none bg-zinc-700 text-white placeholder-zinc-400' type='displayName' name='displayName' id='displayName' placeholder='John Doe' autoComplete='off'/>
            </div>
            <div className='mt-4'>
                <label htmlFor='password' className='text-zinc-800 font-light text-sm block'>Password</label>
                <input className='rounded-md w-full h-9 mt-1 p-2.5 text-sm outline-none bg-zinc-700 text-white placeholder-zinc-400' type='password' name='password' id='password' placeholder='password' autoComplete='off'/>
            </div>
            <button type='submit' className='w-full bg-zinc-800 text-white text-sm rounded-md h-9 mt-4 block hover:bg-zinc-900 transition duration-300 ease-in-out'>Register</button>
            <div className='mt-3'>
                <label className='text-sm'>Already have an account?<a href='#' onClick={handleLoginModal} className='text-blue-700 ml-1 hover:underline'>Log In</a></label>
            </div>
        </div>
    </form>
}
export default Signup;