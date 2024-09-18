import React from 'react';
import Kep from '/image4.png';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gradient-to-r backdrop-blur-md from-[#5A230C] to-[#755547] text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <a href="/">
                    <img src={Kep} alt="Logo" className="h-9" />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;