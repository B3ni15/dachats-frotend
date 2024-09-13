import axios from 'axios';

export const Verify = async (code: string) => {
    try {
        const user = await axios.get(`https://api.dachats.online/api/auth/verify?code=${code}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const UserData = await user.data;

        return UserData;
    } catch (error) {
        return false;
    }
};