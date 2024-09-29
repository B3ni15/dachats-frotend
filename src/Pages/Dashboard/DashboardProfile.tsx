import React, { useEffect, useState } from 'react';
import { getMe } from '../../api/getMe';
import Navbar from './Components/Profile/navLayout';
import '../../../public/css/dash.css';
import { socket } from '../../api/Dashboard/socket';
import { addFriend } from '../../api/Dashboard/addFriend';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile: React.FC = () => {
    interface UserData {
        username: string;
        avatar: string;
        id: string;
        status: string;
        createdAt: string;
    }

    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        socket();

        setTimeout(() => {
            getMe().then(data => {
                if (data) {
                    setUser(data.data);
                }
            });
        }, 1000);

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-[#252525] text-white text-5xl">Betöltés...</div>;
    }

    const getStatusColor = (status: string | undefined) => {
        if (status?.toLowerCase() === 'online') {
            return 'bg-green-500';
        } else if (status?.toLowerCase() === 'offline') {
            return 'bg-red-500';
        } else {
            return 'bg-gray-500';
        }
    };

    const formatDate = (date: string) => {
        const [year, month, day] = date.split('T')[0].split('-');
        return `${year}.${month}.${day}`;
    };

    const handleAddFriend = async () => {
        const id = (document.getElementById('FriendID') as HTMLInputElement).value;
        const response = await addFriend(id);

        const message = response.message;
        setShowModal(false);

        if (message) {
            toast.success(message, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } else {
            toast.error('Hibás ID!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

    };

    return (
        <>
            <Navbar />
            <main>
                <div className="flex h-screen main-chat">
                    <div className="flex items-center w-full h-full justify-center bg-[#252525]">
                        <div className="flex flex-col items-center justify-center bg-[#2f2f2f] rounded-lg p-8 shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
                            <h1 className="text-white text-2xl font-bold text-center">{user?.username} Profilja</h1>
                            <br />
                            <img src={`https://api.dachats.online/api/files?filename=${user?.avatar}`} alt="avatar" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mb-4" />
                            <div className="flex items-center mb-4">
                                <span className={`w-3 h-3 rounded-full ${getStatusColor(user?.status)} mr-2`}></span>
                                <p className="text-white">{user?.status}</p>
                            </div>

                            <table className="w-full table-auto">
                                <tbody>
                                    <tr className="border-b border-gray-600">
                                        <td className="text-white p-2 text-left font-bold">Felhasználónév:</td>
                                        <td className="text-white p-2 text-right">{user?.username}</td>
                                    </tr>
                                    <tr className="border-b border-gray-600">
                                        <td className="text-white p-2 text-left font-bold">ID:</td>
                                        <td className="text-white p-2 text-right">{user?.id}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-white p-2 text-left font-bold">Létrehozva:</td>
                                        <td className="text-white p-2 text-right">{formatDate(user?.createdAt ?? '')}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <button
                                onClick={() => setShowModal(true)}
                                className="mt-4 bg-gradient-to-r from-[#5A230C] to-[#755547] text-white p-2 rounded-lg w-full"
                            >
                                Barát Hozzáadása
                            </button>
                            <button
                                onClick={() => window.location.href = '/dashboard'}
                                className="mt-4 bg-red-500 text-white p-2 rounded-lg"
                            >
                                Vissza
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {showModal ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-[#2f2f2f] p-8 rounded-lg shadow-lg transform transition-all duration-300 ease-out scale-100">
                        <h2 className="text-white text-xl font-bold mb-4">Barát hozzáadása</h2>
                        <input
                            type="text"
                            placeholder="Felhasználó ID"
                            className="p-2 w-full bg-[#252525] text-white rounded mb-4"
                            id='FriendID'
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-red-500 text-white p-2 rounded-lg mr-2"
                            >
                                Mégse
                            </button>
                            <button className="bg-green-500 text-white p-2 rounded-lg" onClick={handleAddFriend}>
                                Hozzáadás
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </>
    );
}

export default Profile;