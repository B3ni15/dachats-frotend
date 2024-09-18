import { io } from 'socket.io-client';

export const socket = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const socket = io(`https://api.dachats.online?token=${token}`, {
            transports: ['websocket'],
        });

        return socket;
    } catch (error) {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }

        window.location.href = '/login';
        return false;
    }
};