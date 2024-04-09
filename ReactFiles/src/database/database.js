import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get, update } from 'firebase/database';
import '../firebase.js'; // Import your Firebase configuration

// Initialize Firebase Authentication and Database
const auth = getAuth();
const database = getDatabase();

// Function to create a user spot in the database
function createUserSpot(userData) {
    const userId = auth.currentUser.uid; // Get the current user's ID
    set(ref(database, 'users/' + userId), userData)
        .then(() => console.log("User data saved successfully."))
        .catch((error) => console.error("Error saving user data:", error));
}

// Function to get or create user data from the database
export function getUserData() {
    return new Promise((resolve, reject) => {
        const userId = auth.currentUser?.uid; // Safely get the current user's ID if logged in
        if (!userId) {
            console.error("No user is signed in.");
            reject("No user is signed in."); // Reject the promise if no user is signed in
            return;
        }

        const userRef = ref(database, 'users/' + userId);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log("Data retrieved");
                resolve(snapshot.val()); // Resolve the promise with the retrieved data
            } else {
                var startingUserData = { paid: "No", setup: "No" };
                createUserSpot(startingUserData);
                console.log("Data created");
                resolve(startingUserData); // Resolve the promise with the new data
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
            reject(error); // Reject the promise if there is an error fetching the data
        });
    });
}

// Function to set or update data for the current user
// Function to set or update data for the current user
export function setData(userData) {
    const userId = auth.currentUser?.uid; // Safely get the current user's ID if logged in
    if (!userId) {
        console.error("No user is signed in.");
        return Promise.reject(new Error("No user is signed in.")); // Return a rejected promise if no user is signed in
    }

    const userRef = ref(database, 'users/' + userId);
    // Return the promise so that it can be used with .then() and .catch() outside of this function
    return update(userRef, userData)
        .then(() => {
            console.log("User data updated successfully.");
            return userData; // Optionally return userData or some other result
        })
        .catch((error) => {
            console.error("Error updating user data:", error);
            throw error; // Re-throw the error to allow handling it with .catch() outside of this function
        });
}
