import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navLayout';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ResetPass, ResetPasswordWithCode } from '../api/password';

interface Code {
    username: string;
    email: string;
    token: string;
}

const PassPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isResetting, setIsResetting] = useState(false);
    const [code, setCode] = useState<Code | null>(null);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.href = '/';
        }

        const queryCode = new URLSearchParams(window.location.search).get('code');
        if (queryCode) {
            const [username, email, token] = queryCode.split(',');
            setCode({ username, email, token });
            setIsResetting(true);
        }
    }, []);

    const handlePasswordReset = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('A két jelszó nem egyezik!', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
                transition: Bounce,
            });
            return;
        }

        try {
            await ResetPasswordWithCode(code!.email, code!.token, newPassword, code!.username);
            toast.success('Jelszó sikeresen megváltoztatva! Visszairányítás...', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
                transition: Bounce,
            });

            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            toast.error('Hiba történt a jelszóváltoztatás során!', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
                transition: Bounce,
            });
        }
    };

    const handleEmailReset = async () => {
        try {
            await ResetPass(email);
            toast.success('Sikeres jelszóváltoztatási kérés! Ellenőrizd az email fiókodat.', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
                transition: Bounce,
            });
        } catch (error) {
            toast.error('Hiba történt a jelszóváltoztatási kérelem során!', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
                transition: Bounce,
            });
        }
    };

    return (
        <div className="overflow-hidden">
            <Navbar />
            <main className="flex items-center justify-center min-h-screen">
                <div className="bg-[#303030] p-8 rounded-lg shadow-lg w-96">
                    <h1 className="text-3xl font-bold text-center text-[#755547] mb-6">
                        {isResetting ? 'Jelszó visszaállítása' : 'Jelszóváltoztatás'}
                    </h1>
                    <form onSubmit={e => e.preventDefault()}>
                        {isResetting ? (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="newPassword">
                                        Új jelszó:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="newPassword"
                                        type="password"
                                        placeholder="Új jelszó"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                        Jelszó megerősítése:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Jelszó megerősítése"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-[#886759] hover:bg-[#755547] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={handlePasswordReset}
                                    >
                                        Jelszó visszaállítása
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                                        Email cím:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email címed"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-[#886759] hover:bg-[#755547] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={handleEmailReset}
                                    >
                                        Küldés
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
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
};

export default PassPage;