import React, { useState } from 'react';
import "../../cssFiles/cm.css";
import { setData } from '../../database/database';
import searchIcon from '../../images/search.png'
export function ClientManager(props) {



  return(<>

    <div class="cm-top-headers">
      <div id="cm-toggle-add-client">Add Client</div>
      <div id="cm-search"><h1>Search</h1><img id='cm-search-icon' src={searchIcon} /></div>
    </div>

    <div className="userblock" id="addClientBlock">
      <input type="text" className="firstName" placeholder="First Name"/>
      <input type="text" className="lastName" placeholder="Last Name"/>
      <input type="text" className="phoneNumber" placeholder="Phone Number"/>
      <input type="text" className="date" placeholder="Date"/>
      
      <div className="groupcontainer">
        <div className="addgroup">Add Group</div>
      </div>
      <div className="editstack">
        <button className="addClient">Add Client</button>
      </div>
    </div>



    <div className="userblock">
      <h3 className="firstName">Jude</h3>
      <h3 className="lastName">Scarbrough</h3>
      <h3 className="phoneNumber">5126623667</h3>
      <h3 className="date">16 Jan 2024<br/>4:00 PM</h3>
      
      <div className="groupcontainer">
        <div className="addgroup">Add Group</div>
        <div className="bundleclose">
          <div className="groupblock">Group1</div>
          <i className="fas fa-times close-icon"></i>
        </div>
        <div className="bundleclose">
          <div className="groupblock">Group1asfasfdasdfasfdasdfasfd</div>
          <i className="fas fa-times close-icon"></i>
        </div>
        <div className="bundleclose">
          <div className="groupblock">Group1 asdfasfdasf</div>
          <i className="fas fa-times close-icon"></i>
        </div>
      </div>
      <div className="editstack">
        <button className="edit">Edit</button>
        <button className="delete">Delete</button>
      </div>
    </div>


    </>)

}