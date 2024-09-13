import React, { useState } from 'react';
import Navbar from '../Components/navLayout';
import { Verify } from '../api/verify';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyPage: React.FC = () => {
    const [code, setCode] = useState('');

    const handleVerify = async () => {
        if (!code) {
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
            const verifyResponse = await Verify(code);

            if (!verifyResponse) {
                toast.error('Hiba történt a hitelesítés során!', {
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

            if (verifyResponse) {
                window.location.href = '/';
            } else {
                toast.error('Hibás hitelesítő kód!', {
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
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-[#303030] p-8 rounded-lg shadow-lg w-96">
                    <h1 className="text-3xl font-bold text-center text-[#755547] mb-6">Hitelesítés</h1>
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="code">
                            Hitelesítő Kód:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="code"
                            type="text"
                            placeholder="Hitelesítő Kód"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <button
                            className="bg-[#886759] hover:bg-[#755547] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleVerify}
                        >
                            Hitelesítés
                        </button>
                    </div>
                    <p className="text-center text-gray-300 mt-4">
                        Ezt a kódot az emailben kaptad meg!
                    </p>
                </div>
            </div>
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
        </>
    );
};

export default VerifyPage;