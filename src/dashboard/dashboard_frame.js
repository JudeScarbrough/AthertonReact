

import "../cssFiles/dashboard_frame.css"
import mainLogo from '../images/AthertonLogoblack-01.png'

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
            <div id="content"><DisplayPage displayNum={props.displayNum}/></div>
        </>
    )
    
}

function DisplayPage(props){
    return (

        <>
            <h1>{props.displayNum}</h1>
        </>
    )
}