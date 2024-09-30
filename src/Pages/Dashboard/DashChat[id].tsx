import React, { useEffect, useState } from 'react';
import { getMe } from '../../api/getMe';
import Navbar from './Components/navLayout';
import '../../../public/css/dash.css';
import { socket as createSocket } from '../../api/Dashboard/socket'; // socket import
import Sidebar from './Components/Sidebar';
import { Chats } from '../../api/Dashboard/Chats/chats';
import { getChat } from '../../api/Dashboard/Chats/GetChat';

const ChatPage: React.FC = () => {
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
    const [setChat] = useState<any | null>(null);
    const [socketInstance, setSocketInstance] = useState<any>(null);

    useEffect(() => {
        const url = window.location.href;
        const chatId = url.split('/').pop();

        getChat(chatId || '', '').then(data => {
            if (data) {
                setChat(data);
            }
        });

        Chats().then(data => {
            if (data) {
                setFriends(prev => [...prev, ...data.data]);
            }
        });

        getMe().then(data => {
            if (data) {
                setUser(data.data);
            }
        });

        const setupSocket = async () => {
            const socket = await createSocket();
            setSocketInstance(socket);

            if (socket) {
                socket.emit('join', chatId);

                socket.on('status', (data: { id: string, status: string }) => {
                    setFriends(prevFriends =>
                        prevFriends.map(friend =>
                            friend.id === data.id
                                ? { ...friend, status: data.status }
                                : friend
                        )
                    );
                });

                socket.on('message', (message: any) => {
                    console.log('New message:', message);
                });
            }
        };

        setupSocket();

        setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        };
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
                            <button className="bg-gradient-to-r from-[#5A230C] to-[#755547] text-white p-2 rounded-lg ml-2">Küldés</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ChatPage;