import React, { useState } from 'react'; // Import useState hook
import "../cssFiles/dashboard_frame.css";
import mainLogo from '../images/AthertonLogoblack-01.png';
import settingsIcon from '../images/settings.jpg';

export function DashboardFrame(props){

    const [activeNav, setActiveNav] = useState(null); // State to track active navigation item

    const handleNavClick = (index) => {
        setActiveNav(index); // Set the active navigation item
        props.navButtonClicked(index); // Call the parent's navButtonClicked function
    };

    return (
        <>
            <link rel="stylesheet" type="text/css" href="style.css" />
            <div id="navbar">
                <img
                id="logoimg"
                src={mainLogo}
                />
                <div id="line" />
                <div 
                    className={`nav-item no-select ${activeNav === 1 ? 'active' : ''}`}
                    onClick={() => handleNavClick(1)}
                >
                    Client Manager
                </div>
                <div 
                    className={`nav-item no-select ${activeNav === 2 ? 'active' : ''}`}
                    onClick={() => handleNavClick(2)}
                >
                    Group Message
                </div>
                <div 
                    className={`nav-item no-select ${activeNav === 3 ? 'active' : ''}`}
                    onClick={() => handleNavClick(3)}
                >
                    Appointment Manager
                </div>
                <div 
                    className={`nav-item no-select ${activeNav === 4 ? 'active' : ''}`}
                    onClick={() => handleNavClick(4)}
                >
                    Client Groups
                </div>

                <div id="navBottom" onClick={() => handleNavClick(5)}>
                    <h3 id="companyNameSettings" className="no-select">{props.userData["settings"][0]}</h3>
                    <img src={settingsIcon} id="settingsButton" />
                </div>

            </div>
            <div id="content">{props.children}</div>
        </>
    );
}
