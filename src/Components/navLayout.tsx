import React, { useEffect, useState, useRef } from 'react';
import Kep from '/image4.png';
import { Link } from 'react-router-dom';
import { getMe } from '../api/getMe';

interface UserData {
    username: string;
    name: string;
    avatar: string;
}

const Navbar: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tokenfromStorage = localStorage.getItem('token');

        if (tokenfromStorage) {
            setToken(tokenfromStorage);
            getMe().then(data => {
                if (data) {
                    setUserData(data.data);
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        location.reload();
    };

    return (
        <nav className="bg-gradient-to-r backdrop-blur-md from-[#5A230C] to-[#755547] text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center">
                <a href="/">
                    <img src={Kep} alt="Logo" className="h-9" />
                </a>
            </div>
            {loading ? (
                <div className="flex items-center animate-pulse">
                    <img src="https://api.dachats.online/api/files?filename=default.jpg" alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                    <span className="font-medium">Felhasználó</span>
                </div>
            ) : token ? (
                userData ? (
                    <div className="relative flex items-center" ref={dropdownRef}>
                        <img
                            src={`https://api.dachats.online/api/files?filename=${userData?.avatar}`}
                            alt="Profile"
                            className="w-10 h-10 rounded-full mr-2 object-cover cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />
                        <span className="font-medium cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            {userData.username}
                        </span>
                        {dropdownOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg backdrop-blur-md bg-white bg-opacity-30 z-10">
                                <ul className="py-1">
                                    <li>
                                        <a
                                            href="/dashboard"
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        >
                                            Kezelőpanel
                                        </a>
                                    </li>
                                    <li>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                            onClick={handleLogout}
                                        >
                                            Kijelentkezés
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center">
                        <Link to="/login" className="bg-[#886759] hover:bg-[#755547] text-white font-bold py-2 px-4 rounded">
                            Bejelentkezés
                        </Link>
                    </div>
                )
            ) : (
                <div className="flex items-center">
                    <Link to="/login" className="bg-[#886759] hover:bg-[#755547] text-white font-bold py-2 px-4 rounded">
                        Bejelentkezés
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;