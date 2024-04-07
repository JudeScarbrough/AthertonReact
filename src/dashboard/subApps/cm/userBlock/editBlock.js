import React, { useState } from 'react';

export function EditBlock({ user, userData, confirmUser, deleteUser }) {
    const [selectedGroupIndexes, setSelectedGroupIndexes] = useState(user.groups || []);
    const initialDate = user.date ? new Date(user.date * 1000) : new Date();
    const [date, setDate] = useState({
        day: initialDate.getDate(),
        month: initialDate.getMonth() + 1,
        year: initialDate.getFullYear(),
        hour: initialDate.getHours() % 12 || 12,
        minute: initialDate.getMinutes(),
        ampm: initialDate.getHours() >= 12 ? 'PM' : 'AM'
    });
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
    const [showGroupPopup, setShowGroupPopup] = useState(false);

    const handleGroupChange = (index) => {
        setSelectedGroupIndexes(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    };

    const confirmEdits = () => {
        const year = parseInt(date.year, 10);
        const month = parseInt(date.month, 10) - 1;
        const day = parseInt(date.day, 10);
        const hour = date.ampm === 'PM' ? parseInt(date.hour, 10) % 12 + 12 : parseInt(date.hour, 10);
        const minute = parseInt(date.minute, 10);

        const updatedDate = new Date(year, month, day, hour, minute);
        if (isNaN(updatedDate.getTime())) {
            console.error('Invalid date constructed', updatedDate);
            return;
        }

        const updatedUser = {
            ...user,
            firstName,
            lastName,
            phoneNumber,
            groups: selectedGroupIndexes,
            date: Math.floor(updatedDate.getTime() / 1000)
        };

        confirmUser(updatedUser);
    };

    return (
        <div className="userblock">
            {renderUserInputs({ firstName, lastName, phoneNumber, setFirstName, setLastName, setPhoneNumber })}
            <DateFunc date={date} updateDate={setDate} />
            <GroupSection
                userData={userData}
                selectedGroupIndexes={selectedGroupIndexes}
                setShowGroupPopup={setShowGroupPopup}
                handleGroupChange={handleGroupChange}
            />
            {renderActionButtons(confirmEdits, deleteUser)}
            {showGroupPopup && (
                <>
                    <div className="modal-overlay"></div>
                    {renderGroupPopup(userData, selectedGroupIndexes, setShowGroupPopup, handleGroupChange)}
                </>
            )}
        </div>
    );
}

function renderUserInputs({ firstName, lastName, phoneNumber, setFirstName, setLastName, setPhoneNumber }) {
    return (
        <>
            <input
                type="text"
                className='editInputs'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
            <input
                type="text"
                className='editInputs'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
            />
            <input
                type="text"
                className='editInputs'
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
            />
        </>
    );
}


function renderActionButtons(confirmEdits, deleteUser) {
    return (
        <div className="editstack">
            <button className="edit" onClick={confirmEdits}>Confirm</button>
            <button className="delete" onClick={deleteUser}>Delete</button>
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

function DateFunc({ date, updateDate }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateDate(prevDate => ({ ...prevDate, [name]: value }));
    };

    return (
        <div className="appointment-date-container">
            <div className="appointment-date-label">Appointment Date</div>
            <div className="date-selectors">
                <select name="day" value={date.day.toString()} onChange={handleChange}>
                    {[...Array(31).keys()].map(day => (
                        <option key={day} value={day + 1}>{day + 1}</option>
                    ))}
                </select>
                <div className="date-separator">/</div>
                <select name="month" value={date.month.toString()} onChange={handleChange}>
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                        <option key={index} value={index + 1}>{month}</option>
                    ))}
                </select>
                <div className="date-separator">/</div>
                <input name="year" type="text" className="yearSelector" value={date.year.toString()} onChange={handleChange} />
            </div>
            <div className="time-selectors">
                <select name="hour" value={date.hour.toString()} onChange={handleChange}>
                    {[...Array(12).keys()].map(hour => (
                        <option key={hour} value={hour + 1}>{hour + 1}</option>
                    ))}
                </select>
                <div className="time-separator">:</div>
                <select name="minute" value={date.minute.toString()} onChange={handleChange}>
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
    );
}

