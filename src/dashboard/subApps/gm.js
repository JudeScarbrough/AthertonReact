import React, { useState, useEffect } from 'react';
import "../../cssFiles/cm.css";
import "../../cssFiles/gm.css";
import { setData, getUserData } from "../../database/database";

export function GroupManager(props) {
    const [userData, setUserData] = useState({
        ...props.userData,
        groupData: props.userData.groupData || []
    });
    const [showAddGroup, setShowAddGroup] = useState(false);

    useEffect(() => {
        getUserData().then(data => setUserData(data));
    }, []);

    const toggleAddGroup = () => {
        setShowAddGroup(!showAddGroup);
    };

    const addGroupToUserData = (groupName) => {
        // Ensure groupData is an array before attempting to add to it
        const currentGroupData = Array.isArray(userData.groupData) ? userData.groupData : [];
        const updatedGroupData = [groupName, ...currentGroupData];
        const updatedUserData = { ...userData, groupData: updatedGroupData };
        setData(updatedUserData).then(() => {
            getUserData().then(data => setUserData(data));
        });
    };
    

    return (
        <>
            <GMHeader toggleAddGroup={toggleAddGroup} />
            {showAddGroup && <GMAddGroup toggleAddGroup={toggleAddGroup} addGroupToUserData={addGroupToUserData} />}
            <GroupsList userData={userData} setUserData={setUserData} />
        </>
    );
}

function GMAddGroup({ toggleAddGroup, addGroupToUserData }) {
    const [groupName, setGroupName] = useState('');

    const handleConfirm = () => {
        console.log('Group Name:', groupName);
        addGroupToUserData(groupName);
        toggleAddGroup();
    };

    return (
        <div className="addGroupBlock">
            <input
    type="text"
    className="groupName"
    placeholder="Group Name"
    value={groupName}
    onChange={(e) => setGroupName(e.target.value)}
    onKeyPress={(e) => e.key === 'Enter' && handleConfirm()}
    id="addGroupInput"
    autoFocus
/>

            <button onClick={handleConfirm} id="addGroupConfirm">Confirm</button>
        </div>
    );
}

function GMHeader({ toggleAddGroup }) {
    return (
        <div className="cm-top-headers">
            <div id="cm-toggle-add-client" className='no-select' onClick={toggleAddGroup}>Add Group</div>
        </div>
    );
}

function GroupsList({ userData, setUserData }) {
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');

    // Ensure groupData exists and is an array
    const groupData = userData.groupData || [];

    const handleEdit = (index, groupName) => {
        setEditIndex(index);
        setEditValue(groupName);
    };

    const handleConfirm = () => {
        const updatedGroups = [...groupData];
        updatedGroups[editIndex] = editValue;
        const updatedUserData = { ...userData, groupData: updatedGroups };
        setData(updatedUserData).then(() => {
            getUserData().then(data => {
                setUserData(data);
                setEditIndex(null);
            });
        });
    };

    const handleDelete = index => {
        const updatedGroups = groupData.filter((_, i) => i !== index);
        const updatedUserData = { ...userData, groupData: updatedGroups };
        setData(updatedUserData).then(() => {
            getUserData().then(data => {
                setUserData(data);
                setEditIndex(null);
            });
        });
    };

    return (
        <>
            {groupData.map((group, index) => (
                <div key={index} className="groupItem">
                    {editIndex === index ? (
                        <>
                            <input
    id={`groupEditInput-${index}`}
    className="groupEditInput"
    style={{ display: 'block' }}
    value={editValue}
    onChange={(e) => setEditValue(e.target.value)}
    onKeyPress={(e) => e.key === 'Enter' && handleConfirm()}
    autoFocus
/>

                            <button style={{ display: 'block' }} onClick={handleConfirm} className="groupEdit">Confirm</button>
                            <button style={{ display: 'block' }} onClick={() => handleDelete(index)} className="groupDelete">Delete</button>
                        </>
                    ) : (
                        <>
                            <h1>{group}</h1>
                            <button className="groupEdit" onClick={() => handleEdit(index, group)}>Edit</button>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}