

import "../cssFiles/dashboard_frame.css"
import mainLogo from '../images/AthertonLogoblack-01.png'
import settingsIcon from '../images/settings.jpg'

export function DashboardFrame(props){

    return (
        <>
            <link rel="stylesheet" type="text/css" href="style.css" />
            <div id="navbar">
                <img
                id="logoimg"
                src={mainLogo}
                />
                <div id="line" />
                <div className="nav-item no-select" onClick={() => props.navButtonClicked(1)}>
                Client Manager
                </div>
                <div className="nav-item no-select" onClick={() => props.navButtonClicked(2)}>
                Direct Message
                </div>
                <div className="nav-item no-select" onClick={() => props.navButtonClicked(3)}>
                Appointment Manager
                </div>
                <div className="nav-item no-select" onClick={() => props.navButtonClicked(4)}>
                Group Manager
                </div>

                <div id="navBottom" onClick={() => props.navButtonClicked(5)}>
                    <h3 id="companyNameSettings" class="no-select">{props.userData["settings"][0]}</h3>

                    <img src={settingsIcon} id="settingsButton" />
                </div>

            </div>
            <div id="content">{props.children}</div>
        </>
    )
    
}

