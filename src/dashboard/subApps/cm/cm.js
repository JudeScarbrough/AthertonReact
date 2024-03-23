import React, { useState, useEffect } from 'react';
import "../../../cssFiles/cm.css";
import { UserBlock } from './userBlock.js';
import { AddUser } from './addUser.js';
import { getUserData } from '../../../database/database.js';

export function ClientManager(props) {
    // Initialize state with props.userData
    const [userData, setUserData] = useState(props.userData);

    useEffect(() => {
        // Fetch the latest user data
        getUserData().then(fetchedData => {
            // Check if the fetched data is different from the current state
            if (JSON.stringify(fetchedData) !== JSON.stringify(props.userData)) {
                // Update state if the data is different
                setUserData(fetchedData);
            }
        });
    }, [props.userData]); // Dependency array ensures this effect runs only when props.userData changes

    return (
        <>
            <AddUser userData={userData} />
            <UserBlock userData={userData} />
        </>
    );
}
