import React, { Component } from 'react';
import plant from '../graphics/icon.png';

class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addedFriend: false,
      invitedFriend: false,
    };
  }

  setAddedFriend = (bool) => {
    this.setState({
      addedFriend: bool
    });
  }

  setInvitedFriend = (bool) => {
    this.setState({
      invitedFriend: bool
    });
  }

  render()
  {
    let addedFriend = null,
    invitedFriend = null;

    if (this.state.addedFriend) {
      addedFriend = (
        <p>
          request sent!
        </p>
      );
    }
    if (this.state.invitedFriend) {
      invitedFriend = (
        <p>
        invitation sent!
      </p>
      );
    }

    return (
      <div className="modal network">
          <button className="close" onClick = {()=>this.props.setAddFriend(false)}>
            <span className="jam jam-close"></span>
          </button>
          <img src={plant}></img>
          <div className="add-friend">
            <h2>add friend</h2>
            {addedFriend}
            <div className="network-input">
              <input type="email" placeholder="what's their email?"></input>
              <button>send request</button>
            </div>
          </div>
          <div className="invite-friend">
            <h2>invite friend</h2>
            {invitedFriend}
            <div className="network-input">
              <input type="email" placeholder="what's their email?"></input>
              <button>send invite</button>
            </div>
          </div>
        </div>
    );
  }
};

export default AddFriend;