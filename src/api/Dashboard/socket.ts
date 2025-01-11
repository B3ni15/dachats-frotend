import { io } from 'socket.io-client';

export const socket = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return null;
    }

    try {
        const socketInstance = io(`https://api.dachats.online`, {
            transports: ['websocket'],
            query: { token },
        });

        return socketInstance;
    } catch (error) {
        console.error('Socket connection failed:', error);

        localStorage.removeItem('token');
        window.location.href = '/login';
        return null;
    }
};