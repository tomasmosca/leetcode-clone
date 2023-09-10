import { authModalState } from '@/atoms/authModalAtom';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase'
import { useState } from 'react';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Spinner from '../Animations/Spinner';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const setModalState = useSetRecoilState(authModalState);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const [inputs, setInputs] = useState({email: '', password: ''});
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { setInputs(prev => ({...prev, [e.target.name]: e.target.value})) };
    function handleSwitchModal(type: 'login' | 'register' | 'forgotPassword') {
        setModalState(prev => ({...prev, type}));
    }

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            setTimeout(function() {
                toast.success("Logged in successfully!", { position: "top-right", autoClose: 5000, theme: "dark", });
            }, 2300);
            router.push('/');
        } catch(error: any) {
            toast.error("Error " + error.message, { position: "top-right", autoClose: 5000, theme: "dark", });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(error) toast.error("Error " + error.message, { position: "top-right", autoClose: 5000, theme: "dark", });
    }, [error])

    return <form className='mt-3 px-8 pb-4' onSubmit={handleLogin}>
        <h3 className='text-2xl text-white font-medium'>Sign in to <span className='text-zinc-800 font-bold'>LeetClone</span></h3>
        <div>
            <div className='mt-4'>
                <label htmlFor='email' className='text-zinc-800 font-light text-sm block'>Your email</label>
                <input className='rounded-md w-full h-9 mt-1 p-2.5 text-sm outline-none bg-zinc-700 text-white placeholder-zinc-400' onChange={handleInputChange} type='email' name='email' id='email' placeholder='name@company.com' autoComplete='off' required/>
            </div>
            <div className='mt-4'>
                <label htmlFor='password' className='text-zinc-800 font-light text-sm block'>Your password</label>
                <input className='rounded-md w-full h-9 mt-1 p-2.5 text-sm outline-none bg-zinc-700 text-white placeholder-zinc-400' onChange={handleInputChange} type='password' name='password' id='password' placeholder='password' autoComplete='off' required/>
            </div>
            <button type='submit' className='w-full bg-zinc-800 text-white text-sm rounded-md h-9 mt-4 block hover:bg-zinc-900 transition duration-300 ease-in-out'>{isLoading ? <Spinner/> : "Login"}</button>
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