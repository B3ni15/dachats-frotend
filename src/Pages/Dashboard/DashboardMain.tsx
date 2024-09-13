import React, { useEffect } from 'react';
import Navbar from '../../Components/navLayout';
import { Friends } from '../../api/Dashboard/friends';

const MainPage: React.FC = () => {
    useEffect(() => {
        Friends();
    }, []);

    return (
        <>
            <main>
                <Navbar />

                <div className="flex h-screen">
                    <div className="w-1/4 bg-gray-800 p-4">
                        <div className="mb-4">
                            <input
                                className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                                type="text"
                                placeholder="Keresés..."
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="user1" />
                                <span className="text-white">user1</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="baluka0013" />
                                <span className="text-white">baluka0013</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="user2" />
                                <span className="text-white">user2</span>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-900 flex items-center space-x-4">
                            <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="profile" />
                            <span className="text-white">devbeni</span>
                        </div>
                    </div>

                    <div className="w-3/4 bg-gray-900 p-6 flex flex-col justify-between">
                        <div className="flex-1 space-y-4 overflow-y-auto">
                            <div className="flex space-x-4">
                                <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="user1" />
                                <div className="bg-gray-700 text-white p-3 rounded-lg">
                                    Szia, mi a helyzet?
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <div className="bg-gray-700 text-white p-3 rounded-lg">
                                    Semmi
                                </div>
                                <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="user2" />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <div className="bg-gray-700 text-white p-3 rounded-lg">
                                    Veled mizus?
                                </div>
                                <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="user2" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center space-x-4">
                            <input
                                className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400"
                                type="text"
                                placeholder="írj valamit..."
                            />
                            <button className="px-4 py-2 bg-gray-800 text-white rounded-md">Küldés</button>
                        </div>
                    </div>
                </div>


            </main>
        </>
    );
}

export default MainPage;