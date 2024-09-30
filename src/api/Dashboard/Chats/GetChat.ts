import axios from 'axios';

export const getChat = async (chatid: string, beforeId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        let data = {}

        if (beforeId) {
            data = {
                chatid: chatid,
                beforeId: beforeId
            };
        } else {
            data = {
                chatid: chatid
            };
        }

        const user = await axios.put('https://api.dachats.online/api/chat', data, {
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