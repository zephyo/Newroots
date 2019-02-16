
import React, { Component } from 'react';

class UserTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }
  
  setEditMode = (bool) => {
    this.setState({
      editMode: true
    });

    //TODO: save changes
    if (bool === false){
      
    }
  };

  render (){ 
    let cornerButton;
    let pic;
    let name;

    if (this.state.editMode){
      cornerButton = (
        <button onClick={()=>this.setEditMode(false)}>Done</button>
      );
      pic = (
        <div className="pic"></div>
      );
      name = (
        <input type="text" className="profile-name">Gloria Wang</input>
      );
    }
    else{
      cornerButton = (
        <button onClick={()=>this.setEditMode(true)}><span className="jam jam-pencil" style={{color: '#9FC6C1'}}></span></button>
      );
      pic = (
        <div className="pic"></div>
      );
      name = (
        <div className="profile-name">Gloria Wang</div>
      );
    }

    return (
      <section className="user">
        {cornerButton}
        {pic}
        {name}
        <div className="check-in-edit">
          <h2>Your Daily Check-in</h2>
          <ul>
            <li>How are you feeling today?</li>
            <li>Did you take your medication?</li>
          </ul>
          <button>add more</button>
        </div>
        <button id="logout-but" onClick={()=>this.props.logout()}>logout</button>
      </section>
    );
  }
}

export default UserTab;