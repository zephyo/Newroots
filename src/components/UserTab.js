
import React, { Component } from 'react';
import $ from 'jquery';


class UserTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      checkIns: this.props.checkIns,
      name: this.props.name,
      addMode: false,
    };
  }
  
  setEditMode = (bool) => {
    this.setState({
      editMode: bool
    });

    //TODO: save changes
    if (bool === false){
      
    }
  };

  setAddMode = (bool, checkin) => {
    this.setState({
      addMode: bool
    });

    //TODO: save changes
    if (bool === false && checkin !== null){
      
    }
  };

  render (){ 
    let cornerButton;
    let pic;
    let name;
    let checkIns;
    let addQ;

    if (this.state.editMode){
      cornerButton = (
        <button className="edit done" onClick={()=>this.setEditMode(false)}>Done</button>
      );
      pic = (
        <button className="edit-pic">
          <div className="pic"></div>
          <div className="edit-pic-but">
            <span className="jam jam-pencil"></span>
          </div>
        </button>
      );
      name = (
        <input type="text" className="profile-name" placeholder={this.state.name}></input>
      );
      checkIns = (
        <ul>
          {this.state.checkIns.map(function(checkIn, index){
            return <li>
              {checkIn.q}
              <button className="delete">
                <span className="jam jam-trash"></span>
              </button>
            </li>;
          })}
        </ul>
      );
    }
    else{
      cornerButton = (
        <button className="edit" onClick={()=>this.setEditMode(true)}><span className="jam jam-pencil" style={{color: '#9FC6C1'}}></span></button>
      );
      pic = (
        <div className="pic"></div>
      );
      name = (
        <div className="profile-name">{this.state.name}</div>
      );
      checkIns = (
        <ul>
          {this.state.checkIns.map(function(checkIn, index){
            return <li>{checkIn.q}</li>;
          })}
        </ul>
      );
    }

    if (this.state.addMode){
      addQ = (
        <div className="add-panel">
          <h1>Add Check-in</h1>
          <textarea id="check-in" placeholder="What's your check-in?"></textarea>
          <h3>Check-in type</h3>
          <ul>
            <li><span className="jam jam-align-justify"></span> Text</li>
            <li><span className="jam jam-brightness"></span> Yes/No</li>
            <li><span className="jam jam-star"></span> Scale</li>
          </ul>
          <div className="yesno">
            <button className="yes" onClick = {()=>this.setAddMode(false, {
              q: $('check-in').val(),
              type: ''
            })}>
              <span className="jam jam-check"   style={{color: 'white'} }></span></button>
            <button className="no" onClick = {()=>this.setAddMode(false)}>
              <span className="jam jam-close"   style={{color: '#8A8184'}}> </span></button>
          </div>
        </div>
      );
    }else { 
      addQ = (
        <button onClick = {()=>{this.setAddMode(true, null)}}>add more
        </button>
        );
    }

    return (
      <section className="user">
        {cornerButton}
        {pic}
        {name}
        <div className="check-in-edit">
          <h2>Your Daily Check-in</h2>
          {checkIns}
          {addQ}
        </div>
        <button id="logout-but" onClick={()=>this.props.logout()}>logout</button>
      </section>
    );
  }
}

export default UserTab;