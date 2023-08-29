import { authModalState } from '@/atoms/authModalAtom';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Animations/Spinner';
import { firstore } from '@/firebase/firebase'
import { setDoc, doc } from 'firebase/firestore';

type SignupProps = {
    
};

const Signup:React.FC<SignupProps> = () => {
    const setLoginModalState = useSetRecoilState(authModalState);
    function handleLoginModal() {
        setLoginModalState(prev => ({...prev, type: 'login'}))
    }
    const [inputs, setInputs] = useState({email: '', displayName: '', password: ''});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;

            const userData = {
                uid: newUser.user.uid,
                email: newUser.user.email,
                displayName: inputs.displayName,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems: [],
                dislikedProblems: [],
                solvedProblems: [],
                starredProblems: []
            }
            await setDoc(doc(firstore, "users", newUser.user.uid), userData);
            router.push('/');
            toast.success("Registered successfully!", { position: "top-right", autoClose: 5000, theme: "dark", });
        } catch(error: any) {
            toast.error("Error " + error.message, { position: "top-right", autoClose: 5000, theme: "dark", });
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        if(error) toast.error("Error " + error.message, { position: "top-right", autoClose: 5000, theme: "dark", });
    }, [error])

    return <form className='mt-3 px-8 pb-4' onSubmit={handleRegister}>
        <h3 className='text-2xl text-white font-medium'>Register to <span className='text-zinc-800 font-bold'>LeetClone</span></h3>
        <div>
            <div className='mt-4'>
                <label htmlFor='email' className='text-zinc-800 font-light text-sm block'>Email</label>
                <input onChange={handleInputChange} className='rounded-md w-full h-9 mt-1 p-2.5 text-sm outline-none bg-zinc-700 text-white placeholder-zinc-400' type='email' name='email' id='email' placeholder='johndoe@gmail.com' autoComplete='off' required/>
            </div>
            <div className='mt-4'>
                <label htmlFor='displayName' className='text-zinc-800 font-light text-sm block'>Display Name</label>
                <input onChange={handleInputChange} className='rounded-md w-full h-9 mt-1 p-2.5 text-sm outline-none bg-zinc-700 text-white placeholder-zinc-400' type='displayName' name='displayName' id='displayName' placeholder='John Doe' autoComplete='off' required/>
            </div>
            <div className='mt-4'>
                <label htmlFor='password' className='text-zinc-800 font-light text-sm block'>Password</label>
                <input onChange={handleInputChange} className='rounded-md w-full h-9 mt-1 p-2.5 text-sm outline-none bg-zinc-700 text-white placeholder-zinc-400' type='password' name='password' id='password' placeholder='password' autoComplete='off' required/>
            </div>
            <button type='submit' className={`w-full text-white text-sm rounded-md h-9 mt-4 block transition duration-300 ease-in-out 
              ${isLoading ? 'bg-zinc-800 cursor-not-allowed' : 'bg-zinc-800 hover:bg-zinc-900'}`} disabled={isLoading}>{isLoading ? <Spinner/> : "Register"}</button>
            <div className='mt-3'>
                <label className='text-sm'>Already have an account?<a href='#' onClick={handleLoginModal} className='text-blue-700 ml-1 hover:underline'>Log In</a></label>
            </div>
        </div>
    </form>
}
export default Signup;