import React, { useState } from 'react';
import "../../cssFiles/cm.css";
import "../../cssFiles/gm.css";
import { setData } from "../../database/database";

export function GroupManager(props) {
    const initialUserData = {
        ...props.userData,
        groupData: props.userData.groupData || []
    };
    const [userData, setUserData] = useState(initialUserData);
    const [showAddGroup, setShowAddGroup] = useState(false);

    const toggleAddGroup = () => {
        setShowAddGroup(!showAddGroup);
    };

    const addGroupToUserData = (groupName) => {
        const updatedGroupData = [groupName, ...userData.groupData];
        const updatedUserData = { ...userData, groupData: updatedGroupData };
        setUserData(updatedUserData);
        setData(updatedUserData);
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
                id="addGroupInput"
                autoFocus  // Automatically focus this input when the component renders
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

    const handleEdit = (index, groupName) => {
        setEditIndex(index);
        setEditValue(groupName);
    };

    const handleConfirm = () => {
        const updatedGroups = [...userData.groupData];
        updatedGroups[editIndex] = editValue;
        const updatedUserData = { ...userData, groupData: updatedGroups };
        setUserData(updatedUserData);
        setData(updatedUserData);
        setEditIndex(null);
    };

    const handleDelete = index => {
        const updatedGroups = userData.groupData.filter((_, i) => i !== index);
        const updatedUserData = { ...userData, groupData: updatedGroups };
        setUserData(updatedUserData);
        setData(updatedUserData);
        setEditIndex(null);
    };

    return (
        <>
            {userData.groupData.map((group, index) => (
                <div key={index} className="groupItem">
                    {editIndex === index ? (
                        <>
                            <input
                                id={`groupEditInput-${index}`}
                                className="groupEditInput"
                                style={{ display: 'block' }}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
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
