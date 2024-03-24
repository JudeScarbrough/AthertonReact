import React, { useState } from 'react';
import { setData } from '../../../database/database';

export function UserBlock({ userData }) {
    if (!userData.clientData) {
        userData.clientData = [];
    }

    if (!userData.groupData) {
        userData.groupData = [];
    }

    const [showGroupPopup, setShowGroupPopup] = useState(false);
    const [selectedGroupIndexes, setSelectedGroupIndexes] = useState([]);
    const [activeUserIndex, setActiveUserIndex] = useState(null);

    const handleGroupChange = (index) => {
        setSelectedGroupIndexes(prevSelectedIndexes => {
            if (prevSelectedIndexes.includes(index)) {
                return prevSelectedIndexes.filter(i => i !== index);
            } else {
                return [...prevSelectedIndexes, index];
            }
        });
    };

    const handleDoneClick = () => {
        if (activeUserIndex !== null && activeUserIndex >= 0) {
            userData.clientData[activeUserIndex].groups = selectedGroupIndexes;
            setData(userData);
        }
        setShowGroupPopup(false);
    };

    const renderGroupPopup = () => (
        <div className="group-popup" style={{ position: 'absolute', zIndex: 10, background: 'white', padding: '20px', border: '1px solid black' }}>
            {userData.groupData.length > 0 ? (
                userData.groupData.map((groupName, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`group-${index}`}
                            value={index}
                            checked={selectedGroupIndexes.includes(index)}
                            onChange={() => handleGroupChange(index)}
                            className='popupCheckbox'
                        />
                        <label className='checkboxLabel' htmlFor={`group-${index}`}>{groupName}</label>
                    </div>
                ))
            ) : (
                <h3>No groups available</h3>
            )}
            <button onClick={handleDoneClick}>Done</button>
        </div>
    );

    const showPopupForUser = (index) => {
        setActiveUserIndex(index);
        setSelectedGroupIndexes(userData.clientData[index].groups || []);
        setShowGroupPopup(true);
    };

    return (
        <>
            {userData.clientData.map((user, index) => (
                <div className="userblock" key={index}>
                    <h3 className="firstName">{user.firstName}</h3>
                    <h3 className="lastName">{user.lastName}</h3>
                    <h3 className="phoneNumber">{user.phoneNumber}</h3>
                    <h3 className="date">{user.date}</h3>
                    <div className="groupcontainer">
                        <div className="addgroup" onClick={() => showPopupForUser(index)}>Edit Groups</div>
                        {user.groups && user.groups.map(groupIndex => (
                            <div className="groupblock" key={groupIndex}>
                                {userData.groupData[groupIndex] || `Invalid group ${groupIndex}`}
                            </div>
                        ))}
                    </div>
                    <div className="editstack">
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </div>
                </div>
            ))}

            {showGroupPopup && renderGroupPopup()}
            {showGroupPopup && <div className="dim-background" onClick={() => setShowGroupPopup(false)}></div>}
        </>
    );
}