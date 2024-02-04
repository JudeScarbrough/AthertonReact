import React, { useState } from 'react';
import '../cssFiles/settings.css'
import { setData, getUserData } from '../database/database';


export function SettingsForm(props) {
  const [companyName, setCompanyName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const validateInputs = () => {
    // Basic validation criteria
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/; // Simplistic validation for a 10-digit phone number

    if (!companyName.trim()) alert("Company name is required.");
    else if (!emailRegex.test(customerEmail)) alert("Please enter a valid email address.");
    else if (!phoneRegex.test(customerPhone)) alert("Please enter a valid phone number.");
    else return true; // All validations passed

    return false; // If any validation fails
  };

  const handleSubmit = (setUserDataState) => {


    if (validateInputs()) {
      // If validation passes, call submitData
      submitData(companyName, customerEmail, customerPhone, setUserDataState);
    }
  };

  return (
    <div className="login-container">
      <h2>Settings</h2>
      <form onSubmit={() => handleSubmit(props.setUserDataState)}>
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

        <button type="submit" id="confirm">Confirm</button>
      </form>
    </div>
  );
}

// Example submitData function
function submitData(companyName, customerEmail, customerPhone, setUserDataState) {
  console.log('Submitting data:', { companyName, customerEmail, customerPhone });
  // Implementation for data submission here
    
  getUserData().then(data => {
    data["setup"] = "Yes"
    data["settings"] = [companyName, customerEmail, customerPhone]
    setData(data)
    setUserDataState(data)

  }).catch(error => {console.error("Failed to get user data:", error)})


}


