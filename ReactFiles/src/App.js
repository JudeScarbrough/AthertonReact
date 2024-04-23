import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './firebase.js';
import { RenderDashboard } from './dashboard/dashboard.js';
import { getUserData } from './database/database.js';
import { GoogleLoginButton } from './setup/login.js';
import { SettingsForm } from './setup/settings.js';
import 'normalize.css';
import { getServerIp, getReturnUrl } from './config.js';
import { get } from 'firebase/database';

const auth = getAuth();
export default function App(props) {
  const [isSignedIn, setSignIn] = useState(null);
  const [user, setUser] = useState(null); 
  const [userData, setUserData] = useState(null);
  const [userDataFetched, setUserDataFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settingsDone, setSettingsDone] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user); 
        if (!isSignedIn) { 
          setSignIn(true);
        }
      } else {
        setSignIn(false);
      }
      setLoading(false); 
    });

    return () => unsubscribe(); 
  }, [isSignedIn]);

  useEffect(() => {
    if (isSignedIn && !userDataFetched) {
      fetchUserData();
    }
  }, [isSignedIn, userDataFetched]);

  const fetchUserData = () => {
    getUserData().then(data => {
      if (!(JSON.stringify(userData) === JSON.stringify(data))) {
        setUserData(data);
      }
      setUserDataFetched(true);
    }).catch(error => {
      console.error("Failed to get user data:", error);
    });
  };
















  const handleSubscription = async () => {
    // Construct the URL securely
    const url = getServerIp();
    let email = user.email
    let userId = user.uid
    const data = {
      call: "create-checkout-session",
      appUrl: getReturnUrl(),
      email: email,
      user_id: userId,
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const session = await response.json()
  
      if (response.ok) {
        window.location.href = session.url;
      } else {
        console.error("error in creating checkout session")
      }
  
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
};


  
  
  const checkPayerByEmail = async () => {


    // Construct the URL securely
    const url = getServerIp();
    let email = user.email
    let userId = user.uid
    const data = {
      call: "check-payer-by-email",
      email: email,
      user_id: userId,

    };
  
    try {
      const response = await fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();

      if (result.is_paying == true){
        userData.paid = "Yes"
        console.log("customer is paying")
      } else {
        console.log("customer not paying")
        handleSubscription()
      }
    } catch (error) {
      console.error('Error Check Payer', error);
    }









    /*
  
    let email = user.email
    let userId = user.uid
  
    if (!email || !userId) {
      console.log('Email and User ID are required');
      return; 
    }
  
    try {
      console.log("trying")

      const url = `https://${getServerIp()}/check-payer-by-email?email=${encodeURIComponent(email)}&user_id=${userId}`;
      const response = await fetch(url);
      const data = await response.json();
  
      
      if (response.ok) {
        if (data.is_paying) {
          // user is paid
          userData.paid = "Yes"
          console.log("paying user")
        } else {
          console.log("user not paying")
          handleSubscription()
          setSettingsDone(false)
        }
      } else {
        console.error(data.error || 'Error occurred while checking payer status');
      }
    } catch (error) {
      console.error('Failed to fetch payer status:', error);
    }*/
  };

 
  

  
  const handleUserPaymentStatus = async () => {
    console.log("handle payment status")
    if (!userData) {
      console.log('User data is not available yet.');
      return;
    }
  
    const lastCheckedTime = localStorage.getItem('lastPaymentCheckTime');
    const currentTime = new Date().getTime();
  
    // Check if it has been less than an hour since the last check
    if ('paid' in userData) {
      if (userData.setup == "Yes" && userData.paid == "Yes") {
        if (lastCheckedTime && (currentTime - lastCheckedTime < 1)) {  // Fixed time comparison
          console.log('Checked less than an hour ago.');
          return;
        }


      
    }
  }
    
  
    // Update the last checked time
    localStorage.setItem('lastPaymentCheckTime', currentTime);
  
    await checkPayerByEmail();  // Always check payer status
    await fetchUserData();  // Always refresh user data
  
    // Check updated payment status and take action
    if (userData.paid === "No") {
      checkPayerByEmail();
    }
  };
  
  // Add this effect to check payment status whenever user data is fetched or updated
  useEffect(() => {
    if (isSignedIn && userDataFetched && userData) {
      if (!userData.setup){
        // bypass
      } else if (userData.setup == "Yes" && userData.paid == "Yes"){
        handleUserPaymentStatus();
      }
    
    }
  }, [userData]);  // React on userData updates
  

  if (userData) {
      if ('paid' in userData) {
        if (userData.setup == "Yes" && userData.paid == "No") {
        console.log("handle payment status")
        handleUserPaymentStatus();


        return <></>
      }
    }
  }




const finishedInitSettings = () => {
  handleSubscription()
  setSettingsDone(true)
}


if (settingsDone){
  return;
}










  if (loading) {
    return <div>Loading...</div>;
  }





  if (isSignedIn) {
    if (userData && userData["setup"] === "No" && userDataFetched) {
      return <SettingsForm changeUserDataState={setUserData} userData={userData} finishedInitSettings={finishedInitSettings}/>;
    } else if (userData && userData["setup"] === "Yes" && userDataFetched) {
      return <RenderDashboard userData={userData} changeUserDataState={setUserData} user={user} route={props.route}/>;
    }
  } else {
    return <GoogleLoginButton />;
  }
}