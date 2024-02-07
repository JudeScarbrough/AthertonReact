import React, { useState } from 'react';
import "../../cssFiles/cm.css";
import { setData } from '../../database/database';

export function ClientManager(props) {
  const initialClientData = JSON.parse(props.userData["clientData"]);
  const [clientData, setClientData] = useState(initialClientData);

  const handleEdit = (index) => {
    const newClientData = clientData.map((client, idx) => {
      if (idx === index) {
        return { ...client, isEditing: !client.isEditing };
      }
      return client;
    });
    setClientData(newClientData);
  };

  const handleChange = (event, index, field) => {
    const newClientData = [...clientData];
    newClientData[index][field] = event.target.value;
    setClientData(newClientData);
  };

  const handleConfirm = (index) => {
    handleEdit(index); // Toggle off edit mode
    // Here, implement your logic to update the userData with the new clientData
    const updatedUserData = { ...props.userData, clientData: JSON.stringify(clientData) };
    setData(updatedUserData); // Assuming setData takes the whole userData object
  };

  return (
    <div>
      {clientData.map((client, index) => (
        <div key={index} className="userblock">
          {client.isEditing ? (
            <>
              <input className="firstName" value={client.firstName} onChange={(e) => handleChange(e, index, 'firstName')} />
              <input className="lastName" value={client.lastName} onChange={(e) => handleChange(e, index, 'lastName')} />
              <input className="phoneNumber" value={client.phoneNumber} onChange={(e) => handleChange(e, index, 'phoneNumber')} />
              <input className="date" value={client.date} onChange={(e) => handleChange(e, index, 'date')} />
            </>
          ) : (
            <>
              <h3 className="firstName">{client.firstName}</h3>
              <h3 className="lastName">{client.lastName}</h3>
              <h3 className="phoneNumber">{client.phoneNumber}</h3>
              <h3 className="date">{client.date}</h3>
            </>
          )}
          <div className="groupcontainer">
            {/* Group editing not handled in this snippet, add similar logic if needed */}
            {client.groups.map((group, groupIndex) => (
              <div key={groupIndex} className="bundleclose">
                <div className="groupblock">{group}</div>
                <i className="fas fa-times close-icon"></i>
              </div>
            ))}
            <div className="addgroup">Add Group</div>
          </div>
          <div className="editstack">
            {client.isEditing ? (
              <button className="confirm" onClick={() => handleConfirm(index)}>Confirm</button>
            ) : (
              <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
            )}
            <button className="delete">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
