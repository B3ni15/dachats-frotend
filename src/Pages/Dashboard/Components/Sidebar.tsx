import { FC, useState } from 'react'
import { useAppSelector } from '../../../store/store'

interface SidebarProps {
    friends: any[]
    user: any
}

const Sidebar: FC<SidebarProps> = ({
    friends,
    user
}) => {
    const { sidebarOpen } = useAppSelector(state => state.app)

    return (
        <div className={`w-1/4 bg-[#272727] flex flex-col min-h-full transition-all max-md:-translate-x-full max-md:fixed ease-in-out max-md:w-[300px] ${sidebarOpen ? 'max-md:translate-x-0 max-md:top-0 max-md:z-50' : ''}`}>
            <div className="space-y-4">
                {friends.map(friend => (
                    <div className="flex items-center space-x-4" id={friend?.id}>
                        <img className="w-12 h-12 rounded-full object-cover" src={`https://api.dachats.online/api/files?filename=${friend?.avatar}`} alt="profile" />
                        <div>
                            <h2 className="text-white">{friend?.username}</h2>
                            <p className="text-gray-400">{friend?.status}</p>
                        </div>
                    </div>
                ))
                }
            </div>

            {user ? (
                <div className="flex items-center space-x-4 w-full p-4 bg-[#1C1C1C] mt-auto">
                    <img className="w-12 h-12 rounded-full object-cover" src={`https://api.dachats.online/api/files?filename=${user?.avatar}`} alt="profile" />
                    <span className="text-white">{user?.username}</span>
                </div>
            ) : null}
        </div>
    )
}

export default Sidebar