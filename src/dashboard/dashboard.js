import { useState } from 'react';
import { DashboardFrame } from './dashboard_frame';





export function RenderDashboard(){
    const [currentPage, setPage] = useState(0)
    function handleNavButtonClick(i){
      setPage(i)
    }
  
  
    return (
  
      <>
      
        <DashboardFrame displayNum={currentPage} navButtonClicked={(i) => handleNavButtonClick(i)}>
        </DashboardFrame>
  
      </>
    );
  }