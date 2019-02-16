import React, { Component } from 'react';
import plant from '../graphics/icon.png';
import $ from 'jquery';

class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: this.props.requests,
      addedFriend: '',
      invitedFriend: '',
      users: null,
      loading: false
    };
  }

  setAddedFriend = (mssg) => {
    this.setState({
      addedFriend: mssg
    });
  }

  setInvitedFriend = (mssg) => {
    this.setState({
      invitedFriend: mssg
    });
  }

  addFriend = () => {
    if (this.state.loading === true) return;

    let users = this.state.users;
    let email = $('#add-friend-email').val();

    if (users === null) {
      this.setState({ loading: true });
      this.props.firebase.users().once('value').then((snapshot) => {
        const usersObject = snapshot.val();
  
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));
  
        this.setState({
          users: usersList,
          loading: false,
        });
        for (var i=0; i<usersList.length; i++){
          if (usersList[i].email == email){
            //send request
            this.props.firebase.user(usersList[i].uid).once('value').then((snapshot) => {
              let req;
              if (snapshot.val() == null){
                req = [];
              }else{
                req= snapshot.val().requests;
              }
              req.push(this.props.uid);
              var keyref = this.props.firebase.user(usersList[i].uid).push();
              keyref.update({
                requests: req
              });
            });
            break;
          }
        }
      });
    }
    else {
      for (var i=0; i<users.length; i++){
        if (users[i].email == email){
          //send request
          this.props.firebase.user(users[i].uid).once('value').then((snapshot) => {
            let req;
            if (snapshot.val() == null){
              req = [];
            }else{
              req= snapshot.val().requests;
            }
            req.push(this.props.uid);
            var keyref = this.props.firebase.user(users[i].uid).push();
            keyref.update({
              requests: req
            });
          });
          break;
        }
      }
    }
    this.setAddedFriend('sent request!');
  };

  inviteFriend = () => {
    
    this.setAddedFriend('invited!');
  };

  acceptRequest = (uid) => {
    //remove uid from your request
    // propgate to networktab and app
    setRequests();
    //insert uid to your network array and their network array
    //propogate backwards - update networktab's state and app's state
    setNetwork();
  } 

  removeRequest =  (uid) => {
    //remove uid from your requests
    // update networktab's - update networktab's state and app's state
    setRequests();
  }

  render()
  {
    let  addedFriend = (
      <p>
        {this.state.addedFriend}
      </p>
    );

    let invitedFriend = (
      <p>
      {this.state.invitedFriend}
    </p>
    );

    let requests = [];
    for (var i=0; i<this.state.requests.length; i++){
      let uid = this.state.requests[i];
      var addEl = (
        <div className="preview">
          <div className="pic" style={requests ppf}></div>
          <p>{requests name}</p>
          <div className="yesno">
            <button className="yes" onClick = {()=>this.acceptRequest(uid)}>
              <span className="jam jam-check"   style={{color: 'white'}}></span>
            </button>
            <button className="no" onClick = {()=>this.removeRequest(uid)}>
              <span className="jam jam-close"   style={{color: '#8A8184'}}> </span>
            </button>
          </div>
        </div>
      );
      requests.push(addEl);
    }

    return (
      <div className="modal network">
          <button className="close" onClick = {()=>this.props.setAddFriend(false)}>

          {requests ? <div className="scrolling-row">{requests}</div> : null}

            <span className="jam jam-close"></span>
          </button>
          <img src={plant}></img>
          <div className="add-friend">
            <h2>add friend</h2>
            {addedFriend}
            <div className="network-input">
              <input id="add-friend-email" type="email" placeholder="what's their email?"></input>
              <button onClick={this.addFriend}>send request</button>
            </div>
          </div>
          <div className="invite-friend">
            <h2>invite friend</h2>
            {invitedFriend}
            <div className="network-input">
              <input type="email" placeholder="what's their email?"></input>
              <button onClick={this.inviteFriend}>send invite</button>
            </div>
          </div>
        </div>
    );
  }
};

export default AddFriend;