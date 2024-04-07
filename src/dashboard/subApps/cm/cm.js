import React, { useState, useEffect } from 'react';
import "../../../cssFiles/cm.css";
import { UserBlock } from './userBlock/userBlock.js';
import { AddUser } from './addUser.js';
import { getUserData, setData } from '../../../database/database.js';

export function ClientManager(props) {
    const [userData, setUserData] = useState(props.userData);
    const [refreshKey, setRefreshKey] = useState(0); // State to trigger useEffect

    useEffect(() => {
        // Fetch the latest user data
        getUserData().then(fetchedData => {
            // Check if the fetched data is different from the current state
            if (JSON.stringify(fetchedData) !== JSON.stringify(userData)) {
                // Update state if the data is different
                setUserData(fetchedData);
            }
        });
    }, [refreshKey]); // Depend on refreshKey to re-fetch user data

    // Function to update user data and trigger refresh
    const updateUserData = (newUserData) => {
        setUserData(newUserData); // Update the state
        setData(newUserData); // Call setData to update the database
        setRefreshKey(prevKey => prevKey + 1); // Increment refreshKey to trigger useEffect
    };

    return (
        <>
            <AddUser userData={userData} updateUserData={updateUserData} />
            <UserBlock userData={userData} updateUserData={updateUserData} />
        </>
    );
}
