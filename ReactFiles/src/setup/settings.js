import React, { useState } from 'react';
import '../cssFiles/settings.css';
import { setData, getUserData } from '../database/database';

export function SettingsForm(props) {
  const [companyName, setCompanyName] = useState(
    props.userData && props.userData["settings"] && props.userData["settings"][0] ? props.userData["settings"][0] : ''
  );
  const [customerEmail, setCustomerEmail] = useState(
    props.userData && props.userData["settings"] && props.userData["settings"][1] ? props.userData["settings"][1] : ''
  );
  const [customerPhone, setCustomerPhone] = useState(
    props.userData && props.userData["settings"] && props.userData["settings"][2] ? props.userData["settings"][2] : ''
  );

  // State to control popup visibility
  const [showPopup, setShowPopup] = useState(false);

  const validateInputs = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!companyName.trim()) alert("Company name is required.");
    else if (!emailRegex.test(customerEmail)) alert("Please enter a valid email address.");
    else if (!phoneRegex.test(customerPhone)) alert("Please enter a valid phone number.");
    else return true;

    return false;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      submitData(companyName, customerEmail, customerPhone, props.changeUserDataState, setShowPopup);
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

      <label htmlFor="customerEmail">Customer Contact Email:</label>
      <input
        type="email"
        id="customerEmail"
        name="customerEmail"
        placeholder="Customer Contact Email"
        required
        value={customerEmail}
        onChange={e => setCustomerEmail(e.target.value)}
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

function submitData(companyName, customerEmail, customerPhone, changeUserDataState, setShowPopup) {
  console.log('Submitting data:', { companyName, customerEmail, customerPhone });

  getUserData().then(data => {
    data["setup"] = "Yes";
    data["settings"] = [companyName, customerEmail, customerPhone];
    setData(data);
    changeUserDataState(data);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  }).catch(error => {
    console.error("Failed to get user data:", error);
  });
}
