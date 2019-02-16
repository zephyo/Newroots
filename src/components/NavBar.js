import React, { Component } from 'react';

const NavBar = props => {
  return (
    <nav className="main-nav">
      <div className="nav-content">
        <img className="logo-img" src={props.graphicsURL+"icon.png"}/>
        <span className="logo">my_friends
          <span className="sublogo">give and get support.</span>
        </span>
        <button id="feed-but" onClick={()=>props.setActiveTab(0)}><span className="jam jam-messages-alt" style={{color: '#9FC6C1'}}></span></button>
      <button id="network-but" onClick={()=>props.setActiveTab(1)}><span className="jam jam-users" style={{color: '#9FC6C1'}}></span></button>
      <button id="user-but" onClick={()=>props.setActiveTab(2)}><span className="jam jam-user" style={{color: '#9FC6C1'}}></span></button>
      </div>
    </nav>
  );
};

export default NavBar;