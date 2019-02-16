import React, { Component } from 'react';
import AddFriend from './AddFriend';
import { withFirebase } from './Firebase';
import { request } from 'http';
import Avatar from './Avatar';

const AddFriendFB = withFirebase(AddFriend);

class NetworkTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addFriend: false,
      networkUsers: null,
      loading: false,
      requests: this.props.requests,
    };
  }

  componentDidMount() {
    let networkRef = this.props.firebase.user(this.props.uid).ref('network');
    networkRef.on('value', (snapshot) => {
      this.setNetworkUsers(snapshot.val())
    });
  }

  setAddFriend = (bool) => {
    this.setState({
      addFriend: bool
    });
  }

  filterNetwork = (event) => {
    let word = event.target.value;
  }

  setRequests = (requests) => {
    this.setState({ requests: requests });
    this.props.setRequests(requests);
  }

  //expect: array of uids
  setNetworkUsers = (networkUsers) => {
    this.loadNetworkUsers();
    this.props.setNetwork(networkUsers);
  }

  loadNetworkUsers = () => {
    this.setState({ loading: true, networkUsers: null });

    this.props.firebase
      .user(ID).ref('network').once('value').then((snapshot) => {
        this.setState({ loading: false, networkUsers: snapshot.val() });
      });
  }

  render() {
    if (this.state.networkUsers == null) {
      if (this.state.loading == false) {
        this.loadNetworkUsers();
      }
      return;
    }

    let alert = null;
    if (this.state.requests.length > 0) {
      alert = (
        <span className="alert">{this.state.requests.length}</span>
      );
    }

    let network = [];
    for (var i = 0; i < this.state.networkUsers.length; i++) {
      let user = this.state.networkUsers[i];
      var addEl = (
        <div className="friend">
          <Avatar PpfURL={user.PpfURL} />
          <span>{user.name}</span>
          <button><span className="jam jam-heart" style={{ color: '#e38882' }}></span></button>
        </div>
      );
      network.push(addEl);
    }

    return (
      <section className="network">
        <h2>Your network</h2>
        <div className="header">
          <div className="search-bar">
            <input type="text" placeholder="search" onChange={this.filterNetwork} />
            <button id="search-friends"><span className="jam jam-search" style={{ color: '#9FC6C1' }}></span></button>
          </div>
          <button id="add-friends" onClick={() => this.setAddFriend(true)}>
            <span className="jam jam-user-plus" style={{ color: '#9FC6C1' }}></span>

            {alert}

          </button>
        </div>
        <div className="friends">
          {network}
        </div>
        {(this.state.addFriend ?
          <AddFriendFB
            setAddFriend={this.setAddFriend}
            uid={this.props.uid}
            requests={this.state.requests}
            setRequests={this.setRequests}
            networkUsers={this.state.network}
          /> : null)}
      </section>
    );
  }
};

export default NetworkTab;