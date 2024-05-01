import React, { useState } from 'react';
import '../cssFiles/settings.css';
import { setData, getUserData } from '../database/database';
import { getReturnUrl, getServerIp } from '../config';

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
        props.subUrl,
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

    {props.finishedInitSettings ? null : <Billing user={props.user} />}
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





function Billing(props) {
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleBillingPortal = async () => {
    setLoading(true);
    const timer = setInterval(() => {
      setLoadingProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
    }, 100);  // Adjust the interval and increment as needed for your use case

    try {
      const response = await fetch(getServerIp(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ call: "billing-session", user_id: props.user.uid, appUrl: getReturnUrl() })
      });
      const responseBody = await response.json();  // Get response as JSON
      console.log("Server response:", responseBody);  // Log the response body
      
      clearInterval(timer);
      if (response.ok) {
        window.location.href = responseBody.url; // Redirect to the billing portal URL
      } else {
        console.error('Failed to open billing portal:', responseBody.error);
        setLoading(false);
        setLoadingProgress(0);
      }
    } catch (error) {
      console.error('Error connecting to the server:', error);
      setLoading(false);
      setLoadingProgress(0);
      clearInterval(timer);
    }
  };

  const buttonStyle = {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    top: '25px',
    right: '30px',
    padding: '10px 20px',
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '17px',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '175px'

  };

  const loadingBarStyle = {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    top: '25px',
    right: '30px',
    padding: '10px 20px',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '17px',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '175px',
    backgroundColor: '#4275f5',  // Light blue color
    transitionDuration: '4s',
  };

  return (
    <button 
      onClick={!loading ? handleBillingPortal : null} 
      style={loading ? loadingBarStyle : buttonStyle} 
      id="billingButton"
    >
    Manage Billing
    </button>
  );
}

















function submitData(subUrl, companyName, customerPhone, changeUserDataState, setShowPopup, finishedInitSettings) {
  console.log('Submitting data:', { companyName, customerPhone });

  getUserData().then(data => {
    data["setup"] = "Yes";
    data["settings"] = [companyName, customerPhone];
    setData(data);

    // Call finishedInitSettings only if it is passed in
    if (finishedInitSettings) {
      window.location.href = subUrl
      finishedInitSettings();
    }

    changeUserDataState(data);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  }).catch(error => {
    console.error("Failed to get user data:", error);
  });
}
