import React, { useState } from 'react';
import "../../../cssFiles/cm.css";
import searchIcon from '../../../images/search.png';
import { UserBlock } from './userBlock.js';
import { AddUser } from './addUser.js';


export function ClientManager(props) {

return <>



<AddUser userData={props.userData}></AddUser>
<UserBlock></UserBlock>



</>


  
}
