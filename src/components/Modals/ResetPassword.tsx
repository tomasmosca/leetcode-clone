import React from 'react';

type ResetPasswordProps = {
    
};

const ResetPassword:React.FC<ResetPasswordProps> = () => {
    
    return <form className='mt-3 px-8 pb-6'>
        <h3 className='text-2xl text-zinc-800 font-medium'>Reset Password</h3>
        <p className='text-sm text-zinc-800 mt-5'>Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
				to reset it.</p>
        <div>
            <div className='mt-4'>
                <label htmlFor='email' className='text-zinc-800 font-light text-sm block'>Your email</label>
                <input className='rounded-md w-full h-9 mt-1 p-2.5 text-sm outline-none bg-zinc-700 text-white placeholder-zinc-400' type='email' name='email' id='email' placeholder='name@company.com' autoComplete='off'/>
            </div>
            <button type='submit' className='w-full bg-zinc-800 text-white text-sm rounded-md h-9 mt-4 block hover:bg-zinc-900 transition duration-300 ease-in-out'>Reset Password</button>
        </div>
    </form>
}
export default ResetPassword;