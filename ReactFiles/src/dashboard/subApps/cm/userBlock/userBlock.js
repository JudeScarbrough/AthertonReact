import React, { useState } from 'react';
import { setData } from '../../../../database/database';

import { MainBlock } from './mainBlock';


export function UserBlock({ userData, updateUserData, forceClose, forceCloseEdit }) {
    if (!userData.clientData) {
        userData.clientData = [];
    }

    if (!userData.groupData) {
        userData.groupData = [];
    }

    const [showGroupPopup, setShowGroupPopup] = useState(false);
    const [selectedGroupIndexes, setSelectedGroupIndexes] = useState([]);
    const [activeUserIndex, setActiveUserIndex] = useState(null);

    return (
        <>
        
            {userData.clientData.map((user, index) => (
                <MainBlock user={user} userData={userData} key={index} index={index} updateUserData={updateUserData} forceClose={forceClose} forceCloseEdit={forceCloseEdit}></MainBlock>
            ))}

            
        </>
    );
}
