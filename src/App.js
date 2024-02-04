import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './firebase.js'; 
import { RenderDashboard } from './dashboard/dashboard.js'
import { getUserData } from './database/database.js'
import { GoogleLoginButton } from './setup/login.js'
import { SettingsForm } from './setup/settings.js';

const auth = getAuth();
export default function App() {
  
  

  const [isSignedIn, setSignIn] = useState(null)
  const [userData, setUserData] = useState(null)

/* set sign in state based on if user is logged in or not */
  onAuthStateChanged(auth, user => {
    if (user) {
      if(!isSignedIn){setSignIn(true)}
      } else {setSignIn(false)}
  });



  const changeUserDataState = (newState) => {
    setUserData(newState)
  }



  





  if (isSignedIn){


/* data happened to change then update on re render */
    getUserData().then(data => {
      console.log(JSON.stringify(data))
      if (!(JSON.stringify(userData) == JSON.stringify(data))){setUserData(data)}
    }).catch(error => {console.error("Failed to get user data:", error)})


    if (userData && userData["setup"] == "No"){
      return <SettingsForm setUserDataState={changeUserDataState}></SettingsForm>
    }

    return <RenderDashboard></RenderDashboard>
  } else {
    return <GoogleLoginButton></GoogleLoginButton>
  }

  
}







