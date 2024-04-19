import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './firebase.js';
import { RenderDashboard } from './dashboard/dashboard.js';
import { getUserData } from './database/database.js';
import { GoogleLoginButton } from './setup/login.js';
import { SettingsForm } from './setup/settings.js';
import 'normalize.css';

const auth = getAuth();
export default function App() {
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
      const response = await fetch('http://127.0.0.1:4242/create-checkout-session', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email, user_id: user.uid })
      });
      const session = await response.json();
      if (response.ok) {
          window.location.href = session.url;
      } else {
          console.error('Failed to create checkout session:', session);
      }
  };
  
  
  const checkPayerByEmail = async () => {
  
    let email = user.email
    let userId = user.uid
  
    if (!email || !userId) {
      console.log('Email and User ID are required');
      return; 
    }
  
    try {

      const url = `http://localhost:4242/check-payer-by-email?email=${encodeURIComponent(email)}&user_id=${userId}`;
      const response = await fetch(url);
      const data = await response.json();
  
      
      if (response.ok) {
        if (data.is_paying) {
          console.log('Paid user');
          userData.paid = "Yes"
        } else {
          handleSubscription()
          setSettingsDone(false)
        }
      } else {
        console.error(data.error || 'Error occurred while checking payer status');
      }
    } catch (error) {
      console.error('Failed to fetch payer status:', error);
    }
  };

 
  

  
  const handleUserPaymentStatus = async () => {
    if (!userData) {
      console.log('User data is not available yet.');
      return;
    }
  
    const lastCheckedTime = localStorage.getItem('lastPaymentCheckTime');
    const currentTime = new Date().getTime();
  
    // Check if it has been less than an hour since the last check
    if (lastCheckedTime && (currentTime - lastCheckedTime < 1)) {  // Fixed time comparison
      console.log('Checked less than an hour ago.');
      return;
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
      // bypass
    } else if (userData.setup == "Yes" && userData.paid == "No") {
      handleUserPaymentStatus();
    }
  } else {
    // Handle the case where userData is null
    console.log('userData is null');
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
      return <RenderDashboard userData={userData} changeUserDataState={setUserData} user={user} />;
    }
  } else {
    return <GoogleLoginButton />;
  }
}