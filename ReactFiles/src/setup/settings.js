import React, { useState } from 'react';
import '../cssFiles/settings.css';
import { setData, getUserData } from '../database/database';
import { getServerIp } from '../config';

export function SettingsForm(props) {


  let user = props.user

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
      submitData(
        companyName,
        customerPhone,
        props.changeUserDataState,
        setShowPopup,
        props.finishedInitSettings && props.finishedInitSettings
      );
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







  return (<>

    <Billing finishedInitSettings={props.finishedInitSettings} user={props.user}></Billing>
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


    </>
  );
}



function Billing(props){

  let user = props.user
  const handleBillingPortal = async () => {
    try {
        const response = await fetch('https://' + getServerIp() + '/create-customer-portal-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: user.uid })
        });
        const responseBody = await response.text();  // Get response as text
        console.log("Server response:", responseBody);  // Log the response body

        const portalSession = JSON.parse(responseBody);  // Parse JSON only after logging
        if (response.ok) {
            window.location.href = portalSession.url;
        } else {
            console.error('Failed to open billing portal:', portalSession);
        }
    } catch (error) {
        console.error('Error connecting to the server:', error);
    }
};


if (props.finishedInitSettings){
  console.log("agh fuck")
  return <></>
} else {
  return <button onClick={handleBillingPortal} id="billingButton">Manage Billing</button>
}

 


}













function submitData(companyName, customerPhone, changeUserDataState, setShowPopup, finishedInitSettings) {
  console.log('Submitting data:', { companyName, customerPhone });

  getUserData().then(data => {
    data["setup"] = "Yes";
    data["settings"] = [companyName, customerPhone];
    setData(data);

    // Call finishedInitSettings only if it is passed in
    if (finishedInitSettings) {
      finishedInitSettings();
    }

    changeUserDataState(data);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  }).catch(error => {
    console.error("Failed to get user data:", error);
  });
}
