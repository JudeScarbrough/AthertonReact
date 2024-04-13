import React, { useState, useEffect } from 'react';
import { getUserData, setData } from "../../database/database";
import "../../cssFiles/am.css";

export function AppointmentManager(props) {
    const [userData, setUserData] = useState(props.userData);
    const [topText, setTopText] = useState('');
    const [includeFirstName, setIncludeFirstName] = useState(false);
    const [includeLastName, setIncludeLastName] = useState(false);
    const [mainText, setMainText] = useState('');
    const [minutesDelay, setMinutesDelay] = useState(60);
    const [refreshKey, setRefreshKey] = useState(0);
    const [showOverlay, setShowOverlay] = useState(false);  // State for the overlay

    useEffect(() => {
        getUserData().then(fetchedData => {
            if (JSON.stringify(fetchedData) !== JSON.stringify(userData)) {
                setUserData(fetchedData);
            }
        });
    }, [refreshKey]);

    useEffect(() => {
        if (userData.appointmentData) {
            const { firstText, firstName, lastName, secondText, minutesDelay } = userData.appointmentData;
            setTopText(firstText);
            setIncludeFirstName(firstName);
            setIncludeLastName(lastName);
            setMainText(secondText);
            setMinutesDelay(minutesDelay);
        } else {
            let companyName = userData.settings[0];
            setTopText("Hello ");
            setIncludeFirstName(true);
            setMainText(`, thank you for visiting ${companyName}. We hope to see you again soon! If you had a great time, please consider leaving us a Google review. LinkToYourGoogleReviewPage.com`);
            setMinutesDelay(60);
        }
    }, [userData]);

    const handleConfirm = () => {
        const updatedUserData = {
            ...userData,
            appointmentData: {
                firstText: topText,
                firstName: includeFirstName,
                lastName: includeLastName,
                secondText: mainText,
                minutesDelay: minutesDelay
            }
        };
        setUserData(updatedUserData);
        setData(updatedUserData);

        setShowOverlay(true);  // Show the overlay
        setTimeout(() => setShowOverlay(false), 5000);  // Hide the overlay after 5 seconds
    };

    return (
        <>
            <div id="amAll">
                <h1 id="amTitle">Post-Appointment Message</h1>
                <div id="AMmessageBlock">
                    <h3>Text Message</h3>
                    <div id="templateSelect">
                        <h3>Include: </h3>
                        <div 
                            className={`templateOpt ${includeFirstName ? 'templateOptSelected' : ''}`} 
                            onClick={() => setIncludeFirstName(!includeFirstName)}
                        >
                            Customer's First Name
                        </div>
                        <div 
                            className={`templateOpt ${includeLastName ? 'templateOptSelected' : ''}`} 
                            onClick={() => setIncludeLastName(!includeLastName)}
                        >
                            Customer's Last Name
                        </div>
                    </div>

                    {includeFirstName || includeLastName ? (
                        <textarea
                            id="amSmallText"
                            value={topText}
                            onChange={e => setTopText(e.target.value)}
                        ></textarea>
                    ) : null}

                    <div id="templateSelect">
                    {includeFirstName && <div className="selectedOpt">First Name</div>}
                    {includeLastName && <div className="selectedOpt">Last Name</div>}
                    </div>

                    <textarea
                        id="amMainText"
                        value={mainText}
                        onChange={e => setMainText(e.target.value)}
                    ></textarea>

                    <h2 id="amPreviewTitle">Preview Text:</h2>
                    <h2 id="amPreview">
                        <span>{topText}</span>
                        {includeFirstName && <span className="previewName1">First Name</span>}
                        {includeLastName && <span className="previewName2">Last Name</span>}
                        <span>{mainText}</span>
                    </h2>

                    <h1 id="bottomText">
                        Schedule text message to be sent 
                        <input 
                            id="bottomInput" 
                            type="number" 
                            min="0" 
                            value={minutesDelay} 
                            onChange={e => setMinutesDelay(parseInt(e.target.value))}
                        /> 
                        minutes after the appointment begins for all customers.
                    </h1>

                    <div id="AMConfirmButton" onClick={handleConfirm}>Confirm</div>
                </div>
            </div>
            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-content">Settings Saved Successfully</div>
                </div>
            )}
        </>
    );
}
