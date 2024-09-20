import React from 'react';
import Kep from '/image4.png';
import { toggleSidebar } from '../store/slices/appSlice';
import { useDispatch } from 'react-redux';

const Navbar: React.FC = () => {
    const dispatch = useDispatch();

    const openSidebar = () => {
        dispatch(toggleSidebar());
    }

    return (
        <nav className="bg-gradient-to-r backdrop-blur-md from-[#5A230C] to-[#755547] text-white p-4 flex justify-between items-center fixed top-0 w-full">
            <div className="flex items-center justify-between w-full">
                <a href="/">
                    <img src={Kep} alt="Logo" className="h-9" />
                </a>

                <div className='hidden items-center gap-1 flex-col max-md:flex' onClick={() => openSidebar()}>
                    <div className="w-5 h-1 bg-black rounded-md"></div>
                    <div className="w-5 h-1 bg-black rounded-md"></div>
                    <div className="w-5 h-1 bg-black rounded-md"></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;