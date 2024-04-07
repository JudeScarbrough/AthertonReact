import React, { useState, useEffect } from 'react';
import "../../cssFiles/cm.css";
import "../../cssFiles/gm.css";
import { setData, getUserData } from "../../database/database";

export function GroupManager(props) {
    const [showAddGroup, setShowAddGroup] = useState(false);
    const [userData, setUserData] = useState({ ...props.userData, groupData: props.userData.groupData || [] });
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        getUserData().then(data => setUserData(data));
    }, []);

    const handleConfirm = () => {
        if (editIndex != null) {
            const updatedGroups = [...userData.groupData];
            updatedGroups[updatedGroups.length - 1 - editIndex] = editValue;
            const updatedUserData = { ...userData, groupData: updatedGroups };
            setData(updatedUserData).then(() => {
                getUserData().then(data => {
                    setUserData(data);
                    setEditIndex(null);
                    setEditValue('');
                });
            });
        }
    };

    const toggleAddGroup = () => {
        if (editIndex != null) {
            handleConfirm();
        }
        setShowAddGroup(!showAddGroup);
    };

    const addGroupToUserData = (groupName) => {
        const updatedGroupData = [...(userData.groupData || []), groupName];
        const updatedUserData = { ...userData, groupData: updatedGroupData };
        setData(updatedUserData).then(() => {
            getUserData().then(data => setUserData(data));
        });
    };
    

    return (
        <>
            <GMHeader toggleAddGroup={toggleAddGroup} />
            {showAddGroup && <GMAddGroup toggleAddGroup={toggleAddGroup} addGroupToUserData={addGroupToUserData} />}
            <GroupsList
                userData={userData}
                setUserData={setUserData}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
                editValue={editValue}
                setEditValue={setEditValue}
                handleConfirm={handleConfirm}
            />
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

function GroupsList({ userData, setUserData, editIndex, setEditIndex, editValue, setEditValue, handleConfirm }) {
    const groupData = userData.groupData || [];

    const handleEdit = (index, groupName) => {
        setEditIndex(groupData.length - 1 - index);
        setEditValue(groupName);
    };

    const handleDelete = (index) => {

           // Assuming userData is already defined and accessible
        if (Array.isArray(userData.clientData)) {
            for (let i = 0; i < userData.clientData.length; i++) {
                const client = userData.clientData[i];
                if (Array.isArray(client.groups)) {
                    const updatedGroups = [];

                    for (let j = 0; j < client.groups.length; j++) {
                        const groupIndex = client.groups[j];
                        if (groupIndex !== index) {
                            updatedGroups.push(groupIndex > index ? groupIndex - 1 : groupIndex);
                        }
                    }

                    userData.clientData[i].groups = updatedGroups;
                }
            }
        }


        const actualIndex = groupData.length - 1 - index;
        const updatedGroupData = groupData.filter((_, i) => i !== actualIndex);

        const updatedUserData = { ...userData, groupData: updatedGroupData };
        setData(updatedUserData).then(() => {
            setUserData(updatedUserData);
            setEditIndex(null);
            setEditValue('');
        });
    };

    return (
        <>
            {[...groupData].reverse().map((group, index) => (
                <div key={index} className="groupItem">
                    {editIndex === groupData.length - 1 - index ? (
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
