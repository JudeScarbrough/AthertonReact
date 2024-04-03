import React, { useState } from 'react';

export function EditBlock({ user, userData, flipEditState }) {
    // Initialize selectedGroupIndexes with user.groups
    const [selectedGroupIndexes, setSelectedGroupIndexes] = useState(user.groups || []);
    const [showGroupPopup, setShowGroupPopup] = useState(false);

    const handleGroupChange = (index) => {
        setSelectedGroupIndexes(prevSelectedIndexes => {
            if (prevSelectedIndexes.includes(index)) {
                return prevSelectedIndexes.filter(i => i !== index);
            } else {
                return [...prevSelectedIndexes, index];
            }
        });
    };

    const confirmEdits = () => {
        // Apply changes to the user's groups
        const updatedUser = { ...user, groups: selectedGroupIndexes };
        flipEditState(updatedUser);
    };

    return (
        <div className="userblock">
            <input type="text" defaultValue={user.firstName} />
            <input type="text" defaultValue={user.lastName} />
            <input type="text" defaultValue={user.phoneNumber} />
            <h3 className="date">Date</h3>

            <GroupSection
                userData={userData}
                selectedGroupIndexes={selectedGroupIndexes}
                setShowGroupPopup={setShowGroupPopup}
                handleGroupChange={handleGroupChange}
            />

            <div className="editstack">
                <button className="edit" onClick={confirmEdits}>Confirm</button>
                <button className="delete">Delete</button>
            </div>

            {showGroupPopup && (
                <div className="group-popup">
                    {userData.groupData.map((groupName, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={`group-${index}`}
                                checked={selectedGroupIndexes.includes(index)}
                                onChange={() => handleGroupChange(index)}
                            />
                            <label htmlFor={`group-${index}`}>{groupName}</label>
                        </div>
                    ))}
                    <button onClick={() => setShowGroupPopup(false)}>Done</button>
                </div>
            )}
        </div>
    );
}

function GroupSection({ userData, selectedGroupIndexes, setShowGroupPopup, handleGroupChange }) {
    return (
        <div className="groupcontainer">
            <div className="addgroup" onClick={() => setShowGroupPopup(true)}>
                {selectedGroupIndexes.length > 0 ? 'Edit Groups' : 'Add Group'}
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


