
import './App.css';

import { DashboardFrame } from './dashboard_frame';

export default function App() {
  function handleNavButtonClick(i){
    alert(("button "+ i +" clicked"))
  }





  return (

    <>
    
      <DashboardFrame navButtonClicked={(i) => handleNavButtonClick(i)}>
        <h1>agh</h1>
      </DashboardFrame>

    </>
  );
}


function ButtonEle(props){
  return (
    <button onClick={props.onButtonClick}>{props.buttonIndex}</button>
  )
}

