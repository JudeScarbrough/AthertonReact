import { useState } from 'react';
import { DashboardFrame } from './dashboard_frame';
import { ClientManager } from './subApps/cm/cm.js'
import { DirectMessage } from './subApps/dm.js'
import { AppointmentManager } from './subApps/am.js'
import { GroupManager } from './subApps/gm.js'
import { SettingsForm } from '../setup/settings.js';
import { getUserData } from '../database/database.js';



/* KEY: 1 = Cleint Manager, 2 = Direct Message, 3 = Appointment Manager, 4 = Group Manager */

export function RenderDashboard(props){
    const [currentPage, setPage] = useState(0)
    function handleNavButtonClick(i){
      setPage(i)
    }


    return (
  
      <>
      
        <DashboardFrame userData={props.userData} displayNum={currentPage} navButtonClicked={(i) => handleNavButtonClick(i)}>
          <DirectContent user={props.user} userData={props.userData} currentPage={currentPage} changeUserDataState={props.changeUserDataState}/>
        </DashboardFrame>
  
      </>
    );
}







function DirectContent(props){





  if (props.currentPage == 1){
    return <ClientManager userData={props.userData}></ClientManager>
  } else if (props.currentPage == 2){
    return <DirectMessage userData={props.userData}></DirectMessage>
  } else if (props.currentPage == 3){
    return <AppointmentManager userData={props.userData}></AppointmentManager>
  } else if (props.currentPage == 4){
    return <GroupManager userData={props.userData}></GroupManager>
  } else if (props.currentPage == 5){
    return <SettingsForm userData={props.userData} changeUserDataState={props.changeUserDataState} user={props.user}></SettingsForm>
  } else {
    return <>
  
  
  </>
  }

}