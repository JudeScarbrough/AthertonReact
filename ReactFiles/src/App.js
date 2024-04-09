import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './firebase.js';
import { RenderDashboard } from './dashboard/dashboard.js';
import { getUserData } from './database/database.js';
import { GoogleLoginButton } from './setup/login.js';
import { SettingsForm } from './setup/settings.js';

const auth = getAuth();
export default function App() {
  const [isSignedIn, setSignIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDataFetched, setUserDataFetched] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        if (!isSignedIn) { 
          setSignIn(true);
        }
      } else {
        setSignIn(false);
      }
      setLoading(false); // Set loading to false once we have a response
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [isSignedIn]);

  const changeUserDataState = (newState) => {
    setUserData(newState);
  };

  if (loading) {
    return <div></div>; // Or any other loading indicator
  }

  if (isSignedIn) {
    if (userDataFetched === false) {
      getUserData().then(data => {
        if (!(JSON.stringify(userData) === JSON.stringify(data))) {
          setUserData(data);
        }
        setUserDataFetched(true);
      }).catch(error => {console.error("Failed to get user data:", error)});
    }

    if (userData && userData["setup"] === "No" && userDataFetched) {
      return <SettingsForm changeUserDataState={changeUserDataState} userData={userData}></SettingsForm>;
    } else if (userData && userData["setup"] === "Yes") {
      return <RenderDashboard userData={userData} changeUserDataState={changeUserDataState}></RenderDashboard>;
    }
  } else {
    return <GoogleLoginButton></GoogleLoginButton>;
  }
}





