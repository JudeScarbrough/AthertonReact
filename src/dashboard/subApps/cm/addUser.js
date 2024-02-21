import searchIcon from '../../../images/search.png'
import React, { useState, useEffect } from 'react';
import { setData } from '../../../database/database';

export function AddUser(props) {
    const [showAddClient, setShowAddClient] = useState(false);

 

    var groupNames = props.userData.groupData
    var userData = props.userData

    console.log(userData)

    const toggleAddClient = () => {
        setShowAddClient(!showAddClient);
    };

    return (
        <>
            <CMHeader toggleAddClient={toggleAddClient} />
            {showAddClient && <CMAddClient groupNames={groupNames} userData={userData} toggleAddClient={toggleAddClient}/>}
        </>
    );
}








function CMAddClient({ groupNames, userData, toggleAddClient }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showGroupPopup, setShowGroupPopup] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState([]);

    // Initialize state with current date and time
    const now = new Date();
    let initialHour = now.getHours();
    const initialMinute = now.getMinutes();
    const initialAmpm = initialHour >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    initialHour = initialHour % 12 || 12; // the hour '0' should be '12'

    const [date, setDate] = useState({
        day: now.getDate(),
        month: now.getMonth() + 1, // JavaScript months are 0-based
        year: now.getFullYear(),
        hour: initialHour,
        minute: initialMinute < 10 ? `0${initialMinute}` : initialMinute,
        ampm: initialAmpm,
    });

    const isValidPhoneNumber = (phone) => /^[0-9]{10}$/.test(phone);

    const handleGroupChange = (groupName) => {
        setSelectedGroups(prevSelectedGroups => {
            if (prevSelectedGroups.includes(groupName)) {
                return prevSelectedGroups.filter(group => group !== groupName);
            } else {
                return [...prevSelectedGroups, groupName];
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDate(prevDate => ({ ...prevDate, [name]: value }));
    };

    const validateAndAddClient = () => {
        if (!firstName || !lastName || !isValidPhoneNumber(phoneNumber)) {
            alert("Please fill all the fields correctly.");
            return;
        }
    
        let adjustedHour = date.hour;
        if (date.ampm === 'PM' && date.hour !== 12) {
            adjustedHour = parseInt(date.hour) + 12;
        } else if (date.ampm === 'AM' && date.hour === 12) {
            adjustedHour = 0;
        }

        const appointmentDate = new Date(date.year, date.month - 1, date.day, adjustedHour, date.minute);
        const unixTimestamp = Math.floor(appointmentDate.getTime() / 1000);
    
        const groupIndexes = selectedGroups.map(groupName => groupNames.indexOf(groupName));
    
        const newClient = {
            firstName,
            lastName,
            phoneNumber,
            date: unixTimestamp,
            groups: groupIndexes,
            isEditing: false,
        };
    
        // Assuming userData.clientData exists and is an array
        
        const updatedClientData = [newClient, ...userData.clientData];
        userData.clientData = updatedClientData
    
        // Call setData with the updated user data
        setData(userData);
    
        
        toggleAddClient()
    };
    
    

    const renderGroupPopup = (groupNames1 = []) => (
        <div className="group-popup" style={{ position: 'absolute', zIndex: 10, background: 'white', padding: '20px', border: '1px solid black' }}>
            {groupNames1.map((groupName, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`group-${index}`}
                        name={groupName}
                        value={groupName}
                        checked={selectedGroups.includes(groupName)}
                        onChange={() => handleGroupChange(groupName)}
                    />
                    <label htmlFor={`group-${index}`}>{groupName}</label>
                </div>
            ))}
            <button onClick={() => setShowGroupPopup(false)}>Done</button>
        </div>
    );

    return (
        <>
            <div className="userblock" id="addClientBlock">
                <input type="text" className="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" className="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="text" className="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

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
                        <input name="year" type="text" className="yearSelector" placeholder="Year" value={date.year} onChange={handleChange} />
                    </div>
                    <div className="time-selectors">
                        <select name="hour" value={date.hour} onChange={handleChange}>
                            {[...Array(12).keys()].map(hour => (
                                <option key={hour + 1} value={hour + 1}>{hour + 1}</option>
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

                <div className="groupcontainer">
                    <div className="addgroup" onClick={() => setShowGroupPopup(true)}>Add Group</div>
                    {selectedGroups.map((groupName, index) => (
                        <div key={index} className="groupblock">{groupName}</div>
                    ))}
                </div>

                <button className="addClient" onClick={validateAndAddClient}>Add</button>
            </div>

            {showGroupPopup && renderGroupPopup(groupNames)}
            {showGroupPopup && <div className="dim-background" onClick={() => setShowGroupPopup(false)}></div>}
        </>
    );
}











function CMHeader(props) {

    return (
        <>
            <div className="cm-top-headers">
                <div id="cm-toggle-add-client" onClick={props.toggleAddClient}>Add Client</div>
                <div id="cm-search">
                    <input placeholder='      Search' />
                    <img id='cm-search-icon' src={searchIcon} alt="Search Icon" />
                </div>
            </div>
        </>
    );
}