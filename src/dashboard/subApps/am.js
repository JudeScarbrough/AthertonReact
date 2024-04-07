import "../../cssFiles/am.css"
import React, { useState, useEffect } from 'react';
import { getUserData } from "../../database/database";


export function AppointmentManager(props){

    const [userData, setUserData] = useState(props.userData);
    const [refreshKey, setRefreshKey] = useState(0); // State to trigger useEffect

    useEffect(() => {
        // Fetch the latest user data
        getUserData().then(fetchedData => {
            // Check if the fetched data is different from the current state
            if (JSON.stringify(fetchedData) !== JSON.stringify(userData)) {
                // Update state if the data is different
                setUserData(fetchedData);
            }
        });
    }, [refreshKey]); // Depend on refreshKey to re-fetch user data








    return (<>
    <div id="amAll">

        <h1 id="amTitle">Post-Appointment Message</h1>
        
        <div id="AMmessageBlock">
            <h3>Text Message</h3>
            <div id="templateSelect">
                <h3>Include: </h3>
                <div className="templateOpt">Customer's First Name</div>
                <div className="templateOpt">Customer's Last Name</div>
            </div>

            <textarea id="amSmallText"></textarea>
            <div id="templateSelect">
                <div className="selectedOpt">First Name</div>
                <div className="selectedOpt">Last Name</div>
            </div>

            <textarea id="amMainText"></textarea>


            <h2 id="amPreviewTitle">Preview Text:</h2>
            <h2 id="amPreview">
                <span>Hello all,
                I hope you are doing well. JK fuck useEffect


                LOLS

                fuck off
                sincerely,
                </span>

                <span className="previewName">First Name</span>
                <span className="previewName">Last Name</span>

                <span>
                LOLS

                fuck off
                sincerely,
                Juee
                </span>
            </h2>

            
            

            <div id="AMConfirmButton">Confirm</div>



        </div>


    </div>
    </>)
}