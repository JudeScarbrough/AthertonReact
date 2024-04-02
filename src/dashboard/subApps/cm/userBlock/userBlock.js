import React, { useState } from 'react';
import { setData } from '../../../../database/database';
import { handleGroupChange, handleDoneClick, formatTimestamp, renderGroupPopup, showPopupForUser } from './userBlockUtils';

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

    return (
        <>
            {userData.clientData.map((user, index) => (
                <div className="userblock" key={index}>
                    <h3 className="firstName">{user.firstName}</h3>
                    <h3 className="lastName">{user.lastName}</h3>
                    <h3 className="phoneNumber">{user.phoneNumber}</h3>
                    <h3 className="date">{formatTimestamp(user.date)}</h3>
                    <div className="groupcontainer">
                        <div className="addgroup" onClick={() => showPopupForUser(index, userData, setSelectedGroupIndexes, setActiveUserIndex, setShowGroupPopup)}>Edit Groups</div>
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

            {showGroupPopup && renderGroupPopup(userData, selectedGroupIndexes, (index) => handleGroupChange(index, selectedGroupIndexes, setSelectedGroupIndexes), () => handleDoneClick(activeUserIndex, selectedGroupIndexes, userData, setData, setShowGroupPopup))}
            {showGroupPopup && <div className="dim-background" onClick={() => setShowGroupPopup(false)}></div>}
        </>
    );
}
