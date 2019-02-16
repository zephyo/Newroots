
import React, { Component } from 'react';

class UserTab extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render (){ 
    return (
      <section className="user">
        <button id="edit"><span className="jam jam-pencil" style={{color: '#9FC6C1'}}></span></button>
        <div className="pic"></div>
        <h1>Gloria Wang</h1>
        <div className="check-in-edit">
          <h2>Your Daily Check-in</h2>
          <ul>
            <li>How are you feeling today?</li>
            <li>Did you take your medication?</li>
          </ul>
          <button>add more </button>
        </div>
        <button id="logout-but" onClick={()=>this.props.logout()}>logout</button>
      </section>
    );
  }
}

export default UserTab;