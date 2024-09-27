import { io } from 'socket.io-client';

export const socket = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const socketInstance = io(`https://api.dachats.online`, {
            transports: ['websocket'],
            query: { token },
        });

        return socketInstance;
    } catch (error) {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }

        window.location.href = '/login';
        return false;
    }
};