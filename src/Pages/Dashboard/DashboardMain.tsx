import React, { useEffect, useState } from 'react';
import { getMe } from '../../api/getMe';
import Navbar from './Components/navLayout';
import '../../../public/css/dash.css';
import { socket } from '../../api/Dashboard/socket';
import Sidebar from './Components/Sidebar';
import { Chats } from '../../api/Dashboard/chats';

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
        members: {
            id: string;
            username: string;
            avatar: string;
            status: string;
        }[];
        chatId: string;
    }

    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState<FriendData[]>([]);

    useEffect(() => {
        Chats().then(data => {
            if (data) {
                for (let i = 0; i < data.data.length; i++) {
                    setFriends(prev => [...prev, data.data[i]]);
                }
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

        socket();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-[#252525] text-white text-5xl">Betöltés...</div>;
    }

    return (
        <>
            <Navbar />
            <main>
                <div className="flex h-screen main-chat">
                    <Sidebar friends={friends} user={user} />

                    <div className="flex items-center w-3/4 h-full min-h-full bg-[#252525] flex-col max-md:min-w-full">
                        <div className="w-full p-6 flex flex-col justify-between max-h-full min-h-[calc(100%-70px)]">
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

                        <div className="flex-1 flex items-center w-full p-4">
                            <input
                                className="w-full p-2 rounded-md bg-[#969696] text-white placeholder-[#FFFFFF] placeholder-opacity-50"
                                type="text"
                                placeholder="Írj egy üzenetet..."
                            />
                            {/* mt-4 bg-gradient-to-r from-[#5A230C] to-[#755547] text-white p-2 rounded-lg w-full */}
                            <button className="bg-gradient-to-r from-[#5A230C] to-[#755547] text-white p-2 rounded-lg ml-2">Küldés</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default MainPage;