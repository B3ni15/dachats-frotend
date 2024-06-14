import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navLayout';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const cookie = document.cookie;
        const tokenFromCookie = cookie ? (cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] as string) : null;

        if (tokenFromCookie) {
            window.location.href = '/'
        }
    }, []);

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Nem adtál meg minden adatot!');
            return;
        }

        const loginData = {
            Username: username,
            Password: password
        };

        try {
            const loginResponse = await fetch('https://api.dachats.online/api/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });

            const responseData = await loginResponse.json();
            const token = responseData.token;

            if (!loginResponse.ok) {
                alert(responseData.message);
                return;
            }

            const loggingResponse = await fetch(`https://api.dachats.online/api/auth/login?token=${token}`);

            if (!loggingResponse.ok) {
                alert('Hiba történt a bejelentkezés során! (Szerver nem elérhető!)');
                return;
            } else if (responseData.message === "User is not verified") {
                alert('Kérlek hitelesítsd az email címed! (Ellenőrizd a spam mappádat is!)');
                window.location.href = '/verify';
                return;
            }

            const userData = await loggingResponse.json();

            if (userData.status === 200) {
                if (userData.data.twofa) {
                    localStorage.setItem('token', token);
                    window.location.href = '2fa';
                } else {
                    const Mainap = new Date();
                    Mainap.setDate(Mainap.getDate() + 14);
                    document.cookie = `token=${token}; path=/; expires=${Mainap.toUTCString()};`;
                    window.location.href = '/dashboard/';
                }
            } else {
                alert(responseData.message);
                return;
            }
        } catch (error) {
            console.error('Hiba történt:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-[#303030] p-8 rounded-lg shadow-lg w-96">
                    <h1 className="text-3xl font-bold text-center text-[#755547] mb-6">Bejelentkezés</h1>
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                                Felhasználónév:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Felhasználónév"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                                Jelszó:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-[#886759] hover:bg-[#755547] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleLogin}
                            >
                                Bejelentkezés
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-300 mt-4">
                        Nincs Fiókod?{' '}
                        <a href="/register" className="text-blue-500 hover:text-blue-700">
                            Csinálj
                        </a>{' '}
                        egyet!
                    </p>
                </div>
            </div>
        </>
    );
}

export default LoginPage;