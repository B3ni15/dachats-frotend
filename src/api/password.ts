import axios from 'axios';

export const ResetPass = async (Email: string) => {
    try {
        const loginData = {
            email: Email
        };

        const user = await axios.post('https://api.dachats.online/api/auth/password', loginData, {
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

export const ResetPasswordWithCode = async (Email: string, token: string, newPassword: string, Username: string) => {
    const data = {
        username: Username,
        email: Email,
        token,
        newPassword: newPassword
    };

    try {
        const response = await fetch('https://api.dachats.online/api/auth/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log(responseData);

        return true;
    } catch (e) {
        return false;
    }
}