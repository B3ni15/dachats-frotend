import { FC, useState, useEffect, Key } from 'react';
import { useAppSelector } from '../../../store/store';
import { socket as createSocket } from '../../../api/Dashboard/socket';
import 'react-toastify/dist/ReactToastify.css';
import { FaGear } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";

interface Friend {
    members: any;
    chatId: Key | null | undefined;
    id: string;
    username: string;
    avatar: string;
    status: string;
}

interface SidebarProps {
    friends: Friend[];
    user: any;
}

const Sidebar: FC<SidebarProps> = ({
    friends: initialFriends,
    user
}) => {
    const { sidebarOpen } = useAppSelector(state => state.app);
    const [friends, setFriends] = useState<Friend[]>(initialFriends);

    const getStatusColor = (status: string | undefined) => {
        if (status?.toLowerCase() === 'online') {
            return 'bg-green-500';
        } else if (status?.toLowerCase() === 'offline') {
            return 'bg-red-500';
        } else {
            return 'bg-gray-500';
        }
    };

    useEffect(() => {
        let socketInstance: any;

        const setupSocket = async () => {
            socketInstance = await createSocket();

            if (socketInstance) {
                socketInstance.on('status', (data: { id: string, status: string }) => {
                    setFriends(prevFriends =>
                        prevFriends.map(friend =>
                            friend.members[0]?.id === data.id
                                ? { ...friend, members: [{ ...friend.members[0], status: data.status }] }
                                : friend
                        )
                    );
                });
            }
        };

        setupSocket();

        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        };
    }, []);

    return (
        <div className={`w-1/4 bg-[#272727] flex flex-col min-h-full transition-all max-md:-translate-x-full max-md:fixed ease-in-out max-md:w-[300px] ${sidebarOpen ? 'max-md:translate-x-0 max-md:top-0 max-md:z-50' : ''}`}>
            <div className="flex flex-col justify-center items-center space-y-4 mt-4">
                {friends.map(friend => (
                    <div
                        key={friend.chatId}
                        className="relative flex items-center space-x-4 bg-[#1C1C1C] w-11/12 max-w-sm p-4 rounded-lg shadow-lg hover:bg-[#333] transition-all"
                        style={{ cursor: 'pointer' }}
                    >
                        <a href={`/dashboard/chat/${friend.chatId}`} className="absolute inset-0"></a>
                        <img className="w-12 h-12 rounded-full object-cover" src={`https://api.dachats.online/api/files?filename=${friend.members[0]?.avatar}`} alt="profile" />
                        <div className="flex-grow">
                            <h2 className="text-white">{friend.members[0]?.username}</h2>
                            <div className="flex items-center">
                                <span className={`w-3 h-3 rounded-full ${getStatusColor(friend.members[0]?.status)} mr-2`}></span>
                                <p className="text-white">{friend.members[0]?.status}</p>
                            </div>
                        </div>
                        <i className="flex-shrink-0">
                            <FaArrowRight className='w-5 h-5 text-white' />
                        </i>
                    </div>
                ))}
            </div>

            {user ? (
                <div className="flex items-center space-x-4 w-full p-4 bg-[#1C1C1C] mt-auto">
                    <img className="w-12 h-12 rounded-full object-cover" src={`https://api.dachats.online/api/files?filename=${user?.avatar}`} alt="profile" />
                    <span className="text-white">{user?.username}</span>
                    <div className='flex items-center space-x-4'>
                        <a className="flex-shrink-0" href='/dashboard/profile'>
                            <FaGear className='w-5 h-5 text-white' />
                        </a>
                        <a className="flex-shrink-0 cursor-pointer" onClick={() => { localStorage.removeItem('token'); window.location.href = '/login' }}>
                            <IoLogOut className='w-6 h-6 text-white' />
                        </a>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Sidebar;