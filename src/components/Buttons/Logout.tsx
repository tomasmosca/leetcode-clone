import React from 'react';
import { FiLogOut } from 'react-icons/fi'
import { auth } from '@/firebase/firebase';
import { useSignOut } from 'react-firebase-hooks/auth';
import { Tooltip } from 'react-tooltip';

type LogoutProps = {};

const Logout:React.FC<LogoutProps> = () => {

    const [signOut, loading, error] = useSignOut(auth);
    
    const handleLogout = () => {
        signOut();
    }
    
    return <div data-tooltip-id="my-tooltip" data-tooltip-content="Log out" data-tooltip-place="bottom" className='cursor-pointer p-2.5 rounded-md bg-dark-fill-3 text-brand-orange 
    outline-none text-sm hover:bg-dark-fill-2 transition duration-300 ease-in-out' onClick={handleLogout}>
        <FiLogOut />
        <Tooltip id="my-tooltip" className='tooltip-styling' arrowColor="transparent" offset={8}/>
    </div>
}
export default Logout;