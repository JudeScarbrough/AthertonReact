import React, { useState } from 'react';
import '../cssFiles/settings.css';
import { setData, getUserData } from '../database/database';

export function SettingsForm(props) {
  const [companyName, setCompanyName] = useState(
    props.userData && props.userData["settings"] && props.userData["settings"][0] ? props.userData["settings"][0] : ''
  );
  const [customerPhone, setCustomerPhone] = useState(
    props.userData && props.userData["settings"] && props.userData["settings"][1] ? props.userData["settings"][1] : ''
  );

  // State to control popup visibility
  const [showPopup, setShowPopup] = useState(false);

  const validateInputs = () => {
    const phoneRegex = /^[0-9]{10}$/;

    if (!companyName.trim()) alert("Company name is required.");
    else if (!phoneRegex.test(customerPhone)) alert("Please enter a valid phone number.");
    else return true;

    return false;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      submitData(companyName, customerPhone, props.changeUserDataState, setShowPopup, props.finishedInitSettings);
    }
  };

  function PopupMessage() {
    return (
      <div style={{
        position: 'absolute',
        top: '0px',
        left: '50%',
        transform: 'translateX(-50%) translateY(-100px)',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#dff0d8',
        color: '#3c763d',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #d6e9c6',
        zIndex: 2,
        marginBottom: '20px',
      }}>
        Settings Updated Successfully!
      </div>
    );
  }

  return (
    <div className="login-container" style={{ position: 'relative' }}>
      {showPopup && <PopupMessage />}

      <h2>Settings</h2>
      
      <label htmlFor="companyName">Company Name:</label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        placeholder="Company Name"
        required
        value={companyName}
        onChange={e => setCompanyName(e.target.value)}
      /><br /><br />

      <label htmlFor="customerPhone">Customer Contact Phone Number:</label>
      <input
        type="tel"
        id="customerPhone"
        name="customerPhone"
        placeholder="Customer Contact Phone Number"
        required
        value={customerPhone}
        onChange={e => setCustomerPhone(e.target.value)}
      /><br /><br />

      <button onClick={handleSubmit} type="submit" id="confirm">Confirm</button>
    </div>
  );
}

function submitData(companyName, customerPhone, changeUserDataState, setShowPopup, finishedInitSettings) {
  console.log('Submitting data:', { companyName, customerPhone });

  getUserData().then(data => {
    data["setup"] = "Yes";
    data["settings"] = [companyName, customerPhone];
    setData(data);
    finishedInitSettings()



    changeUserDataState(data);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  }).catch(error => {
    console.error("Failed to get user data:", error);
  });
}
