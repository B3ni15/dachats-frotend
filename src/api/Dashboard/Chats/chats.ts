import axios from 'axios';

export const Chats = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const user = await axios.get('https://api.dachats.online/api/chats', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
        });
        const UserData = await user.data;
        
        return UserData;
    } catch (error) {
        return false;
    }
};