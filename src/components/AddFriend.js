import React, { Component } from 'react';
import plant from '../graphics/icon.png';
import $ from 'jquery';
import Avatar from './Avatar';

class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: this.props.requests,
      requestUsers: null,
      loading: false,
      network: this.props.network,
      networkUsers: this.props.networkUsers,
      addedFriend: '',
      invitedFriend: '',
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

    let users = this.state.networkUsers;
    let email = $('#add-friend-email').val();

    for (var i = 0; i < users.length; i++) {
      if (users[i].email == email) {
        //are they your friend?
        let index = users.indexOf(users[i].uid);
        if (index > -1) {
          this.setAddedFriend("you're already friends!");
          break;
        }
        //send request
        this.sendRequest(users[i].uid);
        break;
      }
    }
    this.setAddedFriend("couldn't find " + email);
  };

  sendRequest = (uid) => {
    this.props.firebase.user(uid).once('value').then((snapshot) => {
      let req;
      if (snapshot.val() == null) {
        req = [];
      } else {
        req = snapshot.val().requests;
      }
      req.push(this.props.uid);
      var keyref = this.props.firebase.user(uid).push();
      keyref.update({
        requests: req
      });
    });
    this.setAddedFriend('sent request!');
  }

  inviteFriend = () => {
    this.setAddedFriend('invited!');
  };

  acceptRequest = (uid) => {
    //remove uid from your request
    this.removeRequest(uid);
    //insert uid to your network array and their network array
    //propogate backwards - update networktab's state and app's state
    let network = this.state.network;
    network.push(uid);

    this.state.setState({ network: network });

    this.props.firebase
      .user(this.props.uid)
      .update({
        network: network
      });

    this.props.firebase.user(uid).get().then((doc) => {
      let dat = doc.data();
      dat.push(this.props.uid);

      this.props.firebase
        .user(uid)
        .update({
          network: dat
        });

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }

  removeRequest = (uid) => {
    //remove uid from your requests
    let requestArr = this.state.requests;
    let index = requestArr.indexOf(uid);
    if (index > -1) {
      requestArr.splice(index, 1);
    }
    let usersArr = this.state.requestUsers;
    for (var i = 0; i < usersArr.length; i++) {
      if (usersArr[i].uid == uid) {
        usersArr.splice(i, 1);
      }
    }
    this.setState({ requests: requestArr, requestUsers: usersArr });
    this.props.firebase
      .user(this.props.uid)
      .update({
        requests: requestArr
      });
  }

  loadRequestUsers = () => {
    this.setState({ loading: true, requestUsers: null });
    let users = [];
    let counter = 0;
    for (var i = 0; i < this.state.requests.length; i++) {
      this.props.firebase
        .user(this.state.requests[i]).get().then((doc) => {
          users.push(doc.data());
          this.setState({ requestUsers: users });
          counter++;
          if (counter === this.state.requests.length) {
            this.setState({ loading: false });
          }
        });
    }
  }

  render() {
    if (this.state.requestUsers == null && this.state.requests.length > 0) {
      if (this.state.loading == false) {
        this.loadRequestUsers();
      }
    }

    let addedFriend = (
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
    for (var i = 0; i < this.state.requestUsers.length; i++) {
      let uid = this.state.requests[i];
      let user = this.state.requestUsers[i];
      var addEl = (
        <div className="preview">
          <Avatar PpfURL={user.PpfURL} />
          <p>{user.name}</p>
          <div className="yesno">
            <button className="yes" onClick={() => this.acceptRequest(uid)}>
              <span className="jam jam-check" style={{ color: 'white' }}></span>
            </button>
            <button className="no" onClick={() => this.removeRequest(uid)}>
              <span className="jam jam-close" style={{ color: '#8A8184' }}> </span>
            </button>
          </div>
        </div>
      );
      requests.push(addEl);
    }

    return (
      <div className="modal network">
        <button className="close" onClick={() => this.props.setAddFriend(false)}>

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