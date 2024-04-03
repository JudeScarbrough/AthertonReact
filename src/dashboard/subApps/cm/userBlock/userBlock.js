import React, { useState } from 'react';
import { setData } from '../../../../database/database';

import { MainBlock } from './mainBlock';


export function UserBlock({ userData }) {
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
                <MainBlock user={user} userData={userData} key={index}></MainBlock>
            ))}

            
        </>
    );
}
