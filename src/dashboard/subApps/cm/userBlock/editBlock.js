import React, { useState, useEffect } from 'react';

export function EditBlock({ user, userData, flipEditState }) {
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
        const updatedUser = { ...user, groups: selectedGroupIndexes };
        flipEditState(updatedUser);
    };

    return (
        <div className="userblock">
            {renderUserInputs(user)}
            <DateFunc user={user}></DateFunc>
            <GroupSection
                userData={userData}
                selectedGroupIndexes={selectedGroupIndexes}
                setShowGroupPopup={setShowGroupPopup}
                handleGroupChange={handleGroupChange}
            />
            {renderActionButtons(confirmEdits)}
            {showGroupPopup && renderGroupPopup(userData, selectedGroupIndexes, setShowGroupPopup, handleGroupChange)}
        </div>
    );
}

function renderUserInputs(user) {
    return (
        <>
            <input type="text" defaultValue={user.firstName} />
            <input type="text" defaultValue={user.lastName} />
            <input type="text" defaultValue={user.phoneNumber} />
        </>
    );
}

function renderActionButtons(confirmEdits) {
    return (
        <div className="editstack">
            <button className="edit" onClick={confirmEdits}>Confirm</button>
            <button className="delete">Delete</button>
        </div>
    );
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
                    />
                    <label htmlFor={`group-${index}`}>{groupName}</label>
                </div>
            ))}
            <button onClick={() => setShowGroupPopup(false)}>Done</button>
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




function DateFunc({ user }) {
    // Convert Unix timestamp to a Date object
    const initialDate = user.date ? new Date(user.date * 1000) : new Date();

    const [date, setDate] = useState({
        day: initialDate.getDate(),
        month: initialDate.getMonth() + 1,
        year: initialDate.getFullYear(),
        hour: initialDate.getHours() % 12 || 12,
        minute: initialDate.getMinutes(),
        ampm: initialDate.getHours() >= 12 ? 'PM' : 'AM',
    });
    
    useEffect(() => {
        if (user.date) {
            const updatedDate = new Date(user.date * 1000);
            setDate({
                day: updatedDate.getDate(),
                month: updatedDate.getMonth() + 1,
                year: updatedDate.getFullYear(),
                hour: updatedDate.getHours() % 12 || 12,
                minute: updatedDate.getMinutes(),
                ampm: updatedDate.getHours() >= 12 ? 'PM' : 'AM',
            });
        }
    }, [user.date]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDate(prevDate => ({ ...prevDate, [name]: value }));
    };

    return (
        <>
            <div className="appointment-date-container">
                <div className="appointment-date-label">Appointment Date</div>
                <div className="date-selectors">
                    <select name="day" value={date.day} onChange={handleChange}>
                        {[...Array(31).keys()].map(day => (
                            <option key={day} value={day + 1}>{day + 1}</option>
                        ))}
                    </select>
                    <div className="date-separator">/</div>
                    <select name="month" value={date.month} onChange={handleChange}>
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                            <option key={index} value={index + 1}>{month}</option>
                        ))}
                    </select>
                    <div className="date-separator">/</div>
                    <input name="year" type="text" className="yearSelector" value={date.year} onChange={handleChange} />
                </div>
                <div className="time-selectors">
                    <select name="hour" value={date.hour} onChange={handleChange}>
                        {[...Array(12).keys()].map(hour => (
                            <option key={hour} value={hour + 1}>{hour + 1}</option>
                        ))}
                    </select>
                    <div className="time-separator">:</div>
                    <select name="minute" value={date.minute} onChange={handleChange}>
                        {[...Array(60).keys()].map(minute => (
                            <option key={minute} value={minute < 10 ? `0${minute}` : minute}>
                                {minute < 10 ? `0${minute}` : minute}
                            </option>
                        ))}
                    </select>
                    <select name="ampm" value={date.ampm} onChange={handleChange}>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            </div>
        </>
    );
}


