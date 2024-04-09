// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLLRq_DcZby-dicvuCU--i-VbuRj8doMA",
  authDomain: "atherton-marketing.firebaseapp.com",
  databaseURL: "https://atherton-marketing-default-rtdb.firebaseio.com",
  projectId: "atherton-marketing",
  storageBucket: "atherton-marketing.appspot.com",
  messagingSenderId: "970293448624",
  appId: "1:970293448624:web:144b26f413978d1b85d075",
  measurementId: "G-2CH4Y19RRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);