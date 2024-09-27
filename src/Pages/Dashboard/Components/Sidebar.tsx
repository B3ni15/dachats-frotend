import { FC, useState, useEffect } from 'react';
import { useAppSelector } from '../../../store/store';
import { socket as createSocket } from '../../../api/Dashboard/socket';

interface Friend {
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

    const [friends, setFriends] = useState<Friend[]>(
        initialFriends.map(friend => ({
            ...friend,
            status: friend.status || 'offline',
        }))
    );

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

    const getStatusColor = (status: string) => {
        if (status.toLowerCase() === 'online') {
            return 'text-green-500';
        } else if (status.toLowerCase() === 'offline') {
            return 'text-red-500';
        } else {
            return 'text-gray-500';
        }
    };

    return (
        <div className={`w-1/4 bg-[#272727] flex flex-col min-h-full transition-all max-md:-translate-x-full max-md:fixed ease-in-out max-md:w-[300px] ${sidebarOpen ? 'max-md:translate-x-0 max-md:top-0 max-md:z-50' : ''}`}>
            <div className="flex flex-col justify-center items-center space-y-4 mt-4">
                {friends.map(friend => (
                    <div className="flex items-center space-x-4 bg-[#1C1C1C] w-11/12 max-w-sm p-4 rounded-lg shadow-lg" key={friend?.id}>
                        <img className="w-12 h-12 rounded-full object-cover" src={`https://api.dachats.online/api/files?filename=${friend?.avatar}`} alt="profile" />
                        <div>
                            <h2 className="text-white">{friend?.username}</h2>
                            <p className={getStatusColor(friend?.status)}>
                                {friend?.status}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {user ? (
                <div className="flex items-center space-x-4 w-full p-4 bg-[#1C1C1C] mt-auto">
                    <img className="w-12 h-12 rounded-full object-cover" src={`https://api.dachats.online/api/files?filename=${user?.avatar}`} alt="profile" />
                    <span className="text-white">{user?.username}</span>
                </div>
            ) : null}
        </div>
    );
};

export default Sidebar;