import { FC, useState, useEffect, Key } from 'react';
import { useAppSelector } from '../../../store/store';
import { socket as createSocket } from '../../../api/Dashboard/socket';
import Arrow from '../../../../public/arrow-right-solid.svg';
import Gear from '../../../../public/gear-solid.svg';
import { removeFriend } from '../../../api/Dashboard/removeFriend';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

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
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; friendId: string } | null>(null);

    const handleContextMenu = (event: React.MouseEvent, friendId: string) => {
        event.preventDefault();
        setContextMenu({
            x: event.pageX,
            y: event.pageY,
            friendId,
        });
    };

    const handleCopyId = () => {
        if (contextMenu) {
            navigator.clipboard.writeText(contextMenu.friendId);
            setContextMenu(null);
        }
    };

    const handleRemoveFriend = () => {
        if (contextMenu) {
            removeFriend(contextMenu.friendId);
            setFriends(prevFriends => prevFriends.filter(friend => friend.members[0]?.id !== contextMenu.friendId));
            setContextMenu(null);
        }

        toast.success('Sikeresen törölve!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

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
        const setupSocket = async () => {
            const socketInstance = await createSocket();

            if (socketInstance) {
                socketInstance.on('status', (data: { id: string, status: string }) => {
                    setFriends(prevFriends =>
                        prevFriends.map(friend =>
                            friend.id === data.id
                                ? { ...friend, status: data.status }
                                : friend
                        )
                    );
                });

                return () => {
                    socketInstance.disconnect();
                };
            }
        };

        setupSocket();
    }, []);

    return (
        <div className={`w-1/4 bg-[#272727] flex flex-col min-h-full transition-all max-md:-translate-x-full max-md:fixed ease-in-out max-md:w-[300px] ${sidebarOpen ? 'max-md:translate-x-0 max-md:top-0 max-md:z-50' : ''}`}>
            <div className="flex flex-col justify-center items-center space-y-4 mt-4">
                {friends.map(friend => (
                    <Link to={`/dashboard/chat/${friend.chatId}`}>
                        <div
                            key={friend.chatId}
                            className="relative flex items-center space-x-4 bg-[#1C1C1C] w-11/12 max-w-sm p-4 rounded-lg shadow-lg hover:bg-[#333] transition-all"
                            onContextMenu={(event) => handleContextMenu(event, friend.members[0]?.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img className="w-12 h-12 rounded-full object-cover" src={`https://api.dachats.online/api/files?filename=${friend.members[0]?.avatar}`} alt="profile" />
                            <div className="flex-grow">
                                <h2 className="text-white">{friend.members[0]?.username}</h2>
                                <div className="flex items-center">
                                    <span className={`w-3 h-3 rounded-full ${getStatusColor(friend.members[0]?.status)} mr-2`}></span>
                                    <p className="text-white">{friend.members[0]?.status}</p>
                                </div>
                            </div>
                            <i className="flex-shrink-0">
                                <img src={Arrow} className="w-5 h-5 text-white" />
                            </i>
                        </div>
                    </Link>
                ))}
            </div>

            {contextMenu && (
                <div
                    className="absolute bg-[#1C1C1C] p-2 rounded shadow-lg z-50"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                    onMouseLeave={() => setContextMenu(null)}
                >
                    <button className="text-white block w-full text-left" onClick={handleCopyId}>Copy ID</button>
                    <button className="text-white block w-full text-left" onClick={handleRemoveFriend}>Remove Friend</button>
                </div>
            )}

            {user ? (
                <div className="flex items-center space-x-4 w-full p-4 bg-[#1C1C1C] mt-auto">
                    <img className="w-12 h-12 rounded-full object-cover" src={`https://api.dachats.online/api/files?filename=${user?.avatar}`} alt="profile" />
                    <span className="text-white">{user?.username}</span>
                    <a className="flex-shrink-0" href='/dashboard/profile'>
                        <img src={Gear} className="w-5 h-5 text-white" />
                    </a>
                </div>
            ) : null}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Bounce}
            />
        </div>
    );
};

export default Sidebar;