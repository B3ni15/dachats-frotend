import axios from 'axios';

export const Login = async (Username: string, Password: string) => {
    try {
        const loginData = {
            Username: Username,
            Password: Password
        };

        const user = await axios.post('https://api.dachats.online/api/auth/login', loginData, {
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