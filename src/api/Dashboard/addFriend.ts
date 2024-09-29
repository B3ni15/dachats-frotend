import axios from 'axios';

export const addFriend = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const data = {
            id: id,
        };

        const user = await axios.post('https://api.dachats.online/api/user/addfriend', data, {
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