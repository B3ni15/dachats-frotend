import React, { useEffect, useState } from 'react';
import { Friends } from '../../api/Dashboard/friends';
import { getMe } from '../../api/getMe';
import Navbar from '../../Components/dashNavLayout';
import '../../../public/css/dash.css';

const MainPage: React.FC = () => {
    interface UserData {
        username: string;
        name: string;
        avatar: string;
        id: string;
    }

    interface FriendData {
        username: string;
        name: string;
        avatar: string;
        id: string;
        status: string;
    }

    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState<FriendData[]>([]);

    useEffect(() => {
        Friends().then(data => {
            if (data) {
                setFriends(data.data);
            }
        });
        getMe().then(data => {
            if (data) {
                setUser(data.data);
            }
        });
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-[#252525] text-white text-5xl">Betöltés...</div>;
    }

    return (
        <>
            <Navbar />
            <main>
                <div className="flex h-screen main-chat">
                    <div className="w-1/4 bg-[#272727] p-4">
                        <div className="space-y-4">
                            {friends.map(friend => (
                                <div className="flex items-center space-x-4" id={friend?.id}>
                                    <img className="w-12 h-12 rounded-full" src={`https://api.dachats.online/api/files?filename=${friend?.avatar}`} alt="profile" />
                                    <div>
                                        <h2 className="text-white">{friend?.username}</h2>
                                        <p className="text-gray-400">{friend?.status}</p>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                        {user ? (
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-[#1C1C1C] flex items-center">
                                <div className="flex items-center space-x-4 w-1/4">
                                    <img className="w-12 h-12 rounded-full object-cover" src={`https://api.dachats.online/api/files?filename=${user?.avatar}`} alt="profile" />
                                    <span className="text-white">{user?.username}</span>
                                </div>
                                <div className="flex-1 flex items-center ml-4">
                                    <input
                                        className="w-full p-2 rounded-md bg-[#969696] text-white placeholder-[#FFFFFF] placeholder-opacity-50"
                                        type="text"
                                        placeholder="Írj egy üzenetet..."
                                    />
                                    <button className="bg-gray-700 text-white p-2 rounded-md ml-2">Küldés</button>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="w-3/4 bg-[#252525] p-6 flex flex-col justify-between">
                        <div className="flex-1 space-y-4 overflow-y-auto">
                            <div className="flex space-x-4">
                                <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="user1" />
                                <div className="bg-[#D9D9D9] text-black p-3 rounded-lg">
                                    Szia, mi a helyzet?
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <div className="bg-[#D9D9D9] text-black p-3 rounded-lg">
                                    Semmi
                                </div>
                                <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="user2" />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <div className="bg-[#D9D9D9] text-black p-3 rounded-lg">
                                    Veled mizus?
                                </div>
                                <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="user2" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default MainPage;