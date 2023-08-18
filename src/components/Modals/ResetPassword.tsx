import React, { useEffect, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Animations/Spinner';

type ResetPasswordProps = {
    
};

const ResetPassword:React.FC<ResetPasswordProps> = () => {

    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
      );

    const [email, setEmail] = useState('');
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const resetEmail = await sendPasswordResetEmail(email);
            if (resetEmail) {
                toast.success("Reset password email sent successfully!", { position: "top-right", autoClose: 5000, theme: "dark", });
            }
        } catch(error: any) {
            toast.error("Error " + error.message, { position: "top-right", autoClose: 5000, theme: "dark", });
        }
    }

    useEffect(() => {
        if(error) toast.error("Error " + error.message, { position: "top-right", autoClose: 5000, theme: "dark", });
    }, [error])
    
    return <form className='mt-3 px-8 pb-6' onSubmit={handleResetPassword}>
        <h3 className='text-2xl text-zinc-800 font-medium'>Reset Password</h3>
        <p className='text-sm text-zinc-800 mt-5'>Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
				to reset it.</p>
        <div>
            <div className='mt-4'>
                <label htmlFor='email' className='text-zinc-800 font-light text-sm block'>Your email</label>
                <input onChange={handleEmailChange} className='rounded-md w-full h-9 mt-1 p-2.5 text-sm outline-none bg-zinc-700 text-white placeholder-zinc-400' type='email' name='email' id='email' placeholder='name@company.com' autoComplete='off' required/>
            </div>
            <button type='submit' className='w-full bg-zinc-800 text-white text-sm rounded-md h-9 mt-4 block hover:bg-zinc-900 transition duration-300 ease-in-out'>{sending ? <Spinner/> : "Reset Password"}</button>
        </div>
    </form>
}
export default ResetPassword;