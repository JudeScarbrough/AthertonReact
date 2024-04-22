import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DashboardFrame } from './dashboard_frame';
import { ClientManager } from './subApps/cm/cm.js';
import { DirectMessage } from './subApps/dm.js';
import { AppointmentManager } from './subApps/am.js';
import { GroupManager } from './subApps/gm.js';
import { SettingsForm } from '../setup/settings.js';

export function RenderDashboard(props) {
    const [currentPage, setPage] = useState(0);
    const navigate = useNavigate();
    const { route } = useParams();  // Destructure route from useParams

    const routeToPage = {
        'clientmanager': 1,
        'groupmessage': 2,
        'appointmentmanager': 3,
        'clientgroups': 4,
        'settings': 5
    };

    useEffect(() => {
        // Update the page state based on the URL route
        const page = route ? routeToPage[route] : 0;
        setPage(page);
    }, [route]); // React to changes in the route parameter

    function handleNavButtonClick(i) {
        const routeName = Object.keys(routeToPage).find(key => routeToPage[key] === i);
        navigate(`/${routeName || ''}`, { replace: true });
        setPage(i);
    }

    return (
        <DashboardFrame userData={props.userData} displayNum={currentPage} navButtonClicked={(i) => handleNavButtonClick(i)}>
            <DirectContent user={props.user} userData={props.userData} currentPage={currentPage} changeUserDataState={props.changeUserDataState}/>
        </DashboardFrame>
    );
}

function DirectContent(props) {
    switch (props.currentPage) {
        case 1:
            return <ClientManager userData={props.userData} />;
        case 2:
            return <DirectMessage userData={props.userData} />;
        case 3:
            return <AppointmentManager userData={props.userData} />;
        case 4:
            return <GroupManager userData={props.userData} />;
        case 5:
            return <SettingsForm userData={props.userData} changeUserDataState={props.changeUserDataState} user={props.user} />;
        default:
            return null;  // Render nothing if no valid page is selected
    }
}
