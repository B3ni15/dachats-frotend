import axios from 'axios';

export const Register = async (Username: string, Password: string, Email: string) => {
    try {
        const loginData = {
            Username: Username,
            Password: Password,
            Email: Email
        };

        const user = await axios.post('https://api.dachats.online/api/auth/register', loginData, {
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