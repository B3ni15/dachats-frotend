import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navLayout';
import { Login } from '../api/Login';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const tokenfromStorage = localStorage.getItem('token');

        if (tokenfromStorage) {
            window.location.href = '/';
        }
    }, []);

    let isSending = false;

    addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !isSending) {
            isSending = true;
            handleLogin();

            setTimeout(() => {
                isSending = false;
            }, 300);
        }
    });

    const handleLogin = async () => {
        if (!username || !password) {
            toast.error('Kérlek töltsd ki a mezőket!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            return;
        }

        try {
            const loginResponse = await Login(username, password);
            const token = loginResponse.token;

            if (token) {
                toast.success('Sikeres bejelentkezés! Visszairányítás...', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                localStorage.setItem('token', token);
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                toast.error('Hibás felhasználónév vagy jelszó!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error('Hiba történt:', error);
            toast.error('Valami hiba történt...', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    return (
        <div className="overflow-hidden">
            <Navbar />
            <main className="flex items-center justify-center min-h-screen">
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
                        Elfelejtetted a jelszavad?{' '}
                        <a href="/password" className="text-blue-500 hover:text-blue-700">
                            Generáld
                        </a>{' '}
                        újra!
                    </p>
                    <p className="text-center text-gray-300 mt-4 text-xs">
                        Nincs Fiókod?{' '}
                        <a href="/register" className="text-blue-500 hover:text-blue-700">
                            Csinálj
                        </a>{' '}
                        egyet!
                    </p>
                </div>
            </main>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
    );
}

export default LoginPage;