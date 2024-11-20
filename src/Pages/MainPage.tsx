import React from 'react';
import Navbar from '../Components/navLayout';

const MainPage: React.FC = () => {
    return (
        <>
            <div>
                <Navbar />

                <div className="container">
                    <h1>This project is no longer maintained</h1>
                    <p>
                        This project is no longer maintained. The code is available for reference, but there will be no further updates.
                        <a href="https://github.com/B3ni15/dachats-frotend">Project On Github</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default MainPage;