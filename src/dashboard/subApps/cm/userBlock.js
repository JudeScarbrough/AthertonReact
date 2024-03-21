import React from 'react';

export function UserBlock(props) {
    return (
        <>
            {props.userData.clientData.map((user, index) => (
                <div className="userblock" key={index}>
                    <h3 className="firstName">{user.firstName}</h3>
                    <h3 className="lastName">{user.lastName}</h3>
                    <h3 className="phoneNumber">{user.phoneNumber}</h3>
                    <h3 className="date">{user.date}</h3>
                    <div className="groupcontainer">
                        <div className="addgroup">Add Group</div>
                        <div className="bundleclose">
                            <div className="groupblock">Group1</div>
                            <i className="fas fa-times close-icon"></i>
                        </div>
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
