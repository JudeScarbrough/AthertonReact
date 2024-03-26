// userBlockUtils.js
export const handleGroupChange = (index, selectedGroupIndexes, setSelectedGroupIndexes) => {
    setSelectedGroupIndexes(prevSelectedIndexes => {
        if (prevSelectedIndexes.includes(index)) {
            return prevSelectedIndexes.filter(i => i !== index);
        } else {
            return [...prevSelectedIndexes, index];
        }
    });
};

export const handleDoneClick = (activeUserIndex, selectedGroupIndexes, userData, setData, setShowGroupPopup) => {
    if (activeUserIndex !== null && activeUserIndex >= 0) {
        userData.clientData[activeUserIndex].groups = selectedGroupIndexes;
        setData(userData);
    }
    setShowGroupPopup(false);
};

export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) + ' ' + date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

export const renderGroupPopup = (userData, selectedGroupIndexes, handleGroupChange, handleDoneClick) => (
    <div className="group-popup" style={{ position: 'absolute', zIndex: 10, background: 'white', padding: '20px', border: '1px solid black' }}>
        {userData.groupData.length > 0 ? (
            userData.groupData.map((groupName, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`group-${index}`}
                        value={index}
                        checked={selectedGroupIndexes.includes(index)}
                        onChange={() => handleGroupChange(index)}
                        className='popupCheckbox'
                    />
                    <label className='checkboxLabel' htmlFor={`group-${index}`}>{groupName}</label>
                </div>
            ))
        ) : (
            <h3>No groups available</h3>
        )}
        <button onClick={handleDoneClick}>Done</button>
    </div>
);

export const showPopupForUser = (index, userData, setSelectedGroupIndexes, setActiveUserIndex, setShowGroupPopup) => {
    setActiveUserIndex(index);
    setSelectedGroupIndexes(userData.clientData[index].groups || []);
    setShowGroupPopup(true);
};
