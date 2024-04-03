

export function ViewBlock({ user, userData }) {
    return (
        <div className="userblock">
            <h3 className="firstName">{user.firstName}</h3>
            <h3 className="lastName">{user.lastName}</h3>
            <h3 className="phoneNumber">{user.phoneNumber}</h3>
            <h3 className="date">{formatTimestamp(user.date)}</h3>
            <div className="groupcontainer">
                {user.groups && user.groups.map(groupIndex => (
                    <div className="groupblock" key={groupIndex}>
                        {userData.groupData[groupIndex] || `Invalid group ${groupIndex}`}
                    </div>
                ))}
            </div>
            <div className="editstack">
                <button className="edit">Edit</button>
                {/*<button className="delete">Delete</button>*/}
            </div>
        </div>
    );
}








function formatTimestamp(unixTimestamp) {
    // Convert the Unix timestamp from seconds to milliseconds
    const date = new Date(unixTimestamp * 1000);
    // Format the date as "Mar 22, 2024"
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    // Format the time as "1:07 PM"
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return `${formattedDate}\n${formattedTime}`;
}