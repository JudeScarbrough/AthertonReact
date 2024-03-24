import React from 'react';
import { setData } from '../../../database/database';

export function UserBlock(props) {
    var userData = props.userData;

    // Ensure clientData and groupData are arrays to prevent errors
    if (!userData.clientData) {
        userData.clientData = [];
    }

    if (!userData.groupData) {
        userData.groupData = [];
    }

    return (
        <>
            {userData.clientData.map((user, index) => (
                <div className="userblock" key={index}>
                    <h3 className="firstName">{user.firstName}</h3>
                    <h3 className="lastName">{user.lastName}</h3>
                    <h3 className="phoneNumber">{user.phoneNumber}</h3>
                    <h3 className="date">{user.date}</h3>
                    <div className="groupcontainer">
                        <div className="addgroup">Add Group</div>
                        {user.groups && user.groups.map(groupIndex => (
                            <div className="bundleclose" key={groupIndex}>
                                <div className="groupblock">{userData.groupData[groupIndex]}</div>
                                <i className="fas fa-times close-icon"></i>
                            </div>
                        ))}
                    </div>
                    <div className="editstack">
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </div>
                </div>
            ))}
        </>
    );
}
