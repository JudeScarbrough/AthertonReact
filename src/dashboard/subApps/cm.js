import React, { useState } from 'react';
import "../../cssFiles/cm.css";
import searchIcon from '../../images/search.png';

export function ClientManager(props) {
  const clientData = JSON.parse(props.userData.clientData);
  const groupData = props.userData.groupData;

  const [showAddClientForm, setShowAddClientForm] = useState(false);

  // Get current date and time for initializing form fields
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // JavaScript months are 0-indexed
  const [day, setDay] = useState(now.getDate());
  const [hour, setHour] = useState(now.getHours() % 12 || 12); // Adjust for 12-hour format
  const [minute, setMinute] = useState(now.getMinutes());
  const [amPm, setAmPm] = useState(now.getHours() >= 12 ? 'PM' : 'AM');

  const toggleAddClientForm = () => setShowAddClientForm(!showAddClientForm);

  // Generate options for select dropdowns
  const generateOptions = (start, end) => {
    let options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  // Function to convert Unix timestamp to "1 Jan 2024 3:00 pm" format
  const formatDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const day = date.getDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');
    const amPm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12; // Convert hour '0' to '12'

    return `${day} ${month} ${year} ${hour}:${minute} ${amPm}`;
  };

  return (
    <>
      <div className="cm-top-headers">
        <div id="cm-toggle-add-client" onClick={toggleAddClientForm}>Add Client</div>
        <div id="cm-search"><h1>Search</h1><img id='cm-search-icon' src={searchIcon} /></div>
      </div>

      {showAddClientForm && (
        <div className="userblock" id="addClientBlock">
          <input type="text" className="firstName" placeholder="First Name"/>
          <input type="text" className="lastName" placeholder="Last Name"/>
          <input type="text" className="phoneNumber" placeholder="Phone Number"/>

          <div className="date-time-selectors">
            {/* Date and Time Dropdowns */}
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              {generateOptions(1, 12)}
            </select>
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              {generateOptions(1, 31)}
            </select>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {generateOptions(now.getFullYear() - 5, now.getFullYear() + 5)}
            </select>
            <select value={hour} onChange={(e) => setHour(e.target.value)}>
              {generateOptions(1, 12)}
            </select>
            <select value={minute} onChange={(e) => setMinute(e.target.value)}>
              {generateOptions(0, 59)}
            </select>
            <select value={amPm} onChange={(e) => setAmPm(e.target.value)}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <div className="groupcontainer">
            <div className="addgroup">Add Group</div>
          </div>
          <div className="editstack">
            <button className="addClient">Confirm Client</button>
          </div>
        </div>
      )}

      {clientData.map((client, index) => (
        <div className="userblock" key={index}>
          <h3 className="firstName">{client.firstName}</h3>
          <h3 className="lastName">{client.lastName}</h3>
          <h3 className="phoneNumber">{client.phoneNumber}</h3>
          <h3 className="date">{formatDate(client.date)}</h3>

          <div className="groupcontainer">
            {client.groups.map(groupIndex => (
              <div className="bundleclose" key={groupIndex}>
                <div className="groupblock">{groupData[groupIndex]}</div>
                <i className="fas fa-times close-icon"></i>
              </div>
            ))}
          </div>
          <div className="editstack">
            <button className="edit">Edit</button>
            <button className="delete">Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}
