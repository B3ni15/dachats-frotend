import React from 'react';
import Navbar from '../Components/navLayout';

const MainPage: React.FC = () => {
    return (
        <>
            <div>
                <Navbar />

                <main className="flex items-center justify-center min-h-screen">
                    <div className="bg-[#303030] p-8 rounded-lg shadow-lg w-96">
                        <div className="text-white text-center">
                            <h1 className="text-red-500 text-3xl font-bold mb-4">
                                This project is no longer maintained
                            </h1>
                            <p className="text-base mb-4">
                                This project is no longer maintained. The code is available for reference, but there will be no further updates.
                                <a className="text-blue-500 underline" href="https://github.com/B3ni15/dachats-frotend"> Project On Github</a>
                            </p>
                            <h2 className="text-xl font-semibold mb-2">What is DaChats?</h2>
                            <p className="text-sm">
                                DaChats is a chat application that allows users to create chat rooms and communicate with others. Users can create an account, join chat rooms, and send messages to other users in the chat room.
                            </p>
                        </div>
                    </div>
                </main>

            </div>
        </>
    );
}

export default MainPage;