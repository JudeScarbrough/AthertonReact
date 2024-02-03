

import "./cssFiles/dashboard_frame.css"


export function DashboardFrame(props){
    return (
        <>
            <link rel="stylesheet" type="text/css" href="style.css" />
            <div id="navbar">
                <img
                id="logoimg"
                src="../AthertonLogoblack-01.png"
                style={{ display: "none" }}
                />
                <div id="line" />
                <div className="nav-item" onClick={() => props.navButtonClicked(1)}>
                Client Manager
                </div>
                <div className="nav-item" onClick={() => props.navButtonClicked(2)}>
                Direct Message
                </div>
                <div className="nav-item" onClick={() => props.navButtonClicked(3)}>
                Appointment Manager
                </div>
                <div className="nav-item" onClick={() => props.navButtonClicked(4)}>
                Group Manager
                </div>
            </div>
            <div id="content">{props.children}</div>
        </>
    )
    
}