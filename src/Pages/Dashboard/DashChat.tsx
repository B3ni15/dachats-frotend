import React, { useEffect, useState, useRef } from 'react';
import { getMe } from '../../api/getMe';
import Navbar from './Components/navLayout';
import '../../../public/css/dash.css';
import { socket as createSocket } from '../../api/Dashboard/socket';
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

    let isSending = false;

    addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !isSending) {
            isSending = true;
            handleSendMessage();
        }
    });

    addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            isSending = false;
        }
    });

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

    interface Message {
        from: string;
        message: string;
        time: string;
    }

    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState<FriendData[]>([]);
    const [chat, setChat] = useState<any | null>(null);
    const [socketInstance, setSocketInstance] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const chatIdRef = useRef<string | null>(null);

    useEffect(() => {
        const url = window.location.href;
        const chatId = url.split('/').pop();
        chatIdRef.current = chatId || null;

        getChat(chatId || '', '').then(data => {
            if (data) {
                setChat(data);
                setMessages(data.data.messages);
                console.log(chat);
            }
        });

        Chats().then(data => {
            if (data) {
                setFriends(prev => [...prev, ...data.data]);
                console.log(data.data);
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

                socket.on('message', (message: Message) => {
                    const userId = localStorage.getItem('userid');
                    if (!userId) return;

                    if (message.from === userId) return;
                    setMessages(prevMessages => [...prevMessages, message]);
                });

                socket.on('status', (data: { id: string, status: string }) => {
                    setFriends(prevFriends =>
                        prevFriends.map(friend =>
                            friend.id === data.id
                                ? { ...friend, status: data.status }
                                : friend
                        )
                    );
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

    const handleSendMessage = () => {
        if (messageInput.trim() === '' || !chatIdRef.current || !user) return;

        const newMessage = {
            from: user.id,
            message: messageInput,
            chatid: chatIdRef.current,
        };

        socketInstance.emit('message', newMessage);

        setMessages(prevMessages => [...prevMessages, { ...newMessage, time: new Date().toISOString() }]);

        setMessageInput('');
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-[#252525] text-white text-5xl">Betöltés...</div>;
    }

    return (
        <>
            <Navbar />
            <main>
                <div className="flex h-screen main-chat px-4">
                    <Sidebar friends={friends} user={user} />

                    <div className="flex items-center w-3/4 h-full min-h-full bg-[#252525] flex-col max-md:min-w-full">
                        <div className="w-full p-6 flex flex-col justify-between max-h-full min-h-[calc(100%-70px)]">
                            <div className="flex-1 space-y-4 overflow-y-auto">
                                {messages.map((msg, index) => {
                                    const senderFriend = friends.find(friend => friend.members[0].id === msg.from);
                                    const senderAvatar = senderFriend?.members[0]?.avatar;

                                    return (
                                        <div key={index} className={`flex ${msg.from === user?.id ? 'justify-end' : ''} space-x-4`}>
                                            {msg.from !== user?.id && (
                                                <img className="w-12 h-12 rounded-full object-cover" src={`https://api.dachats.online/api/files?filename=${senderAvatar}`} alt="user1" />
                                            )}
                                            <div className="bg-[#D9D9D9] text-black p-3 rounded-lg">
                                                {msg.message}
                                            </div>
                                            {msg.from === user?.id && (
                                                <img className="w-12 h-12 rounded-full object-cover" src={`https://api.dachats.online/api/files?filename=${user?.avatar}`} alt="user2" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex-1 flex items-center w-full p-4">
                            <input
                                className="w-full p-2 rounded-md bg-[#969696] text-white placeholder-[#FFFFFF] placeholder-opacity-50"
                                type="text"
                                placeholder="Írj egy üzenetet..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                            />
                            <button onClick={handleSendMessage} className="bg-gradient-to-r from-[#5A230C] to-[#755547] text-white p-2 rounded-lg ml-2">Küldés</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ChatPage;