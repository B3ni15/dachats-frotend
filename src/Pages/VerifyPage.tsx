import React, { useState } from 'react';
import Navbar from '../Components/navLayout';

const VerifyPage: React.FC = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleVerify = async () => {
        if (!code) {
            setError('Nem adtad meg a kódot!');
            return;
        }

        try {
            const verifyResponse = await fetch(`https://api.dachats.online/api/auth/verify?code=${code}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!verifyResponse.ok) {
                setError('Hiba történt a hitelesítés során! (Szerver nem nem elérhető!)');
                return;
            }

            const responseData = await verifyResponse.json();

            if (responseData.status === 200) {
                const token = responseData.data.token;
                const mainDate = new Date();
                mainDate.setDate(mainDate.getDate() + 14);
                document.cookie = `token=${token}; path=/; expires=${mainDate.toUTCString()};`;
                window.location.href = './index.html';
            } else {
                setError('Hiba történt a hitelesítés során! (Rossz kód!)');
            }
        } catch (error) {
            console.error('Hiba történt:', error);
            setError('Hiba történt a hitelesítés során!');
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
                    {error && <p className="text-center text-red-500 mt-4">{error}</p>}
                    <p className="text-center text-gray-300 mt-4">
                        Ezt a kódot az emailben kaptad meg!
                    </p>
                </div>
            </div>
        </>
    );
};

export default VerifyPage;