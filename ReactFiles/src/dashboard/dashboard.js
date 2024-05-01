import React, { useState } from 'react';
import { DashboardFrame } from './dashboard_frame';
import { ClientManager } from './subApps/cm/cm.js';
import { DirectMessage } from './subApps/dm.js';
import { AppointmentManager } from './subApps/am.js';
import { GroupManager } from './subApps/gm.js';
import { SettingsForm } from '../setup/settings.js';

export function RenderDashboard(props) {
    const [currentPage, setPage] = useState(0);

    function handleNavButtonClick(i) {
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
