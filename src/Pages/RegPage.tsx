import React, { useState } from 'react';
import Navbar from '../Components/navLayout';

const RegPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!username || !password || !email || !confirmPassword) {
            alert('Nem adtál meg minden adatot!');
            return;
        }

        if (password !== confirmPassword) {
            alert('A két jelszó nem egyezik!');
            return;
        }

        const registerData = {
            Username: username,
            Password: password,
            Email: email
        };

        try {
            const registerResponse = await fetch('https://api.dachats.online/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            });

            const responseData = await registerResponse.json();

            if (!registerResponse.ok) {
                alert(responseData.message);
                return;
            }

            if (responseData.status === 200) {
                window.location.href = '/verify';
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
                    <h1 className="text-3xl font-bold text-center text-[#755547] mb-6">Regisztráció</h1>
                    <form onSubmit={handleSubmit}>
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
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                                Email:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                                Jelszó:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                Jelszó újra:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="confirmPassword"
                                type="password"
                                placeholder="********"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-[#886759] hover:bg-[#755547] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Regisztráció
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-300 mt-4">
                        Már van Fiókod?{' '}
                        <a href="/login" className="text-blue-500 hover:text-blue-700">
                            Jelentkezz
                        </a>{' '}
                        be!
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegPage;