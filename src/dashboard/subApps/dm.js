import "../../cssFiles/dm.css"
import React, { useState, useEffect } from 'react';
import { getUserData } from "../../database/database";


export function DirectMessage(props){

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



    const [showGroupPopup, setShowGroupPopup] = useState(false);
    const [selectedGroupIndexes, setSelectedGroupIndexes] = useState([]);
    const handleGroupChange = (index) => {
        setSelectedGroupIndexes(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    };


    return (<>
    <div id="dmAll">

        <h1 id="dmTitle">Instant Message</h1>
        
        <div id="messageBlock">
            <h3>Text Message</h3>

            <textarea></textarea>


            <GroupSection
                userData={userData}
                selectedGroupIndexes={selectedGroupIndexes}
                setShowGroupPopup={setShowGroupPopup}
                handleGroupChange={handleGroupChange}
            />
            {showGroupPopup && (
                <>
                    <div className="modal-overlay"></div>
                    {renderGroupPopup(userData, selectedGroupIndexes, setShowGroupPopup, handleGroupChange)}
                </>
            )}

            <div id="groupSection">
                <div id="sendButton">Send Text To Slected Groups</div>


            </div>


        </div>


    </div>
    </>)
}





function renderGroupPopup(userData, selectedGroupIndexes, setShowGroupPopup, handleGroupChange) {
    return (
        <div className="group-popup">
            {userData.groupData.map((groupName, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`group-${index}`}
                        checked={selectedGroupIndexes.includes(index)}
                        onChange={() => handleGroupChange(index)}
                        className='popupCheckbox'
                    />
                    <label htmlFor={`group-${index}`} className='checkboxLabel'>{groupName}</label>
                </div>
            ))}
            <button onClick={() => setShowGroupPopup(false)}>Done</button>
        </div>
    );
}

function GroupSection({ userData, selectedGroupIndexes, setShowGroupPopup, handleGroupChange }) {
    return (
        <div id="groupSection">
            <div className="groupSelector" onClick={() => setShowGroupPopup(true)}>
                {selectedGroupIndexes.length > 0 ? 'Edit Groups' : 'Select Groups'}
            </div>
            {selectedGroupIndexes.map(groupIndex => (
                <div className="groupblock" key={groupIndex}>
                    {userData.groupData && userData.groupData[groupIndex]
                        ? userData.groupData[groupIndex]
                        : `Invalid group ${groupIndex}`}
                </div>
            ))}
        </div>
    );
}