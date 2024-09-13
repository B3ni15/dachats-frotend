import axios from 'axios';

export const getMe = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const user = await axios.get('https://api.dachats.online/api/user/@me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
        });
        const UserData = await user.data;

        return UserData;
    } catch (error) {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        return false;
    }
};