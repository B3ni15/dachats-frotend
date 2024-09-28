import React, { useEffect, useState } from 'react';
import { getMe } from '../../api/getMe';
import Navbar from './Components/navLayout';
import '../../../public/css/dash.css';
import { socket } from '../../api/Dashboard/socket';
import Sidebar from './Components/Sidebar';
import { Chats } from '../../api/Dashboard/chats';

const Profile: React.FC = () => {
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
                        {/* Majd a balázs megmondja mi legyen gec... */}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Profile;