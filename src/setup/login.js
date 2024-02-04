// Import React and necessary Firebase functions
import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import googleSigninImage from '../images/google-signin-button.png'
import mainLogo from '../images/AthertonLogoblack-01.png'
import '../firebase.js';
import '../cssFiles/login.css'

// Component for Google login
export function GoogleLoginButton(){
  // Function to handle the login process
  const handleLogin = () => {
    // Initialize Firebase authentication and provider
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    // Sign in with a popup
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // You can store the user details in your app's state or perform other actions here
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // You can alert the user or log these errors as needed
        console.error("Error signing in with Google", errorCode, errorMessage);
      });
  };

  // Render a button that calls handleLogin when clicked
  return (
    <div id="mainDiv">

      <img src={mainLogo} id="mainLogo"/>
      <div id="loginDiv">
        <h1>Sign In</h1>
        <img src={googleSigninImage} onClick={handleLogin} id="googleLogin"/>
      </div>
      
    </div>
  )
  
  
};






export function LogInPage(){

}