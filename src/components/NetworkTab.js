import React, { Component } from 'react';
import AddFriend from './AddFriend';
import { withFirebase } from './Firebase';
import { request } from 'http';
import Avatar from './Avatar';

import graphics3 from '../graphics/3.png';
import ErrorMsg from './ErrorMsg';

const AddFriendFB = withFirebase(AddFriend);

class NetworkTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addFriend: false,
      network: this.props.network,
      networkUsers: [],
      loading: false,
      requests: this.props.requests,
    };
  }

  componentDidMount() {
    let ref = this.props.firebase.user(this.props.uid);

    // console.log(JSON.stringify(this.state.requests));

    ref.onSnapshot((doc) => {
      let data = doc.data();
      this.setNetworkUsers(data.network);
      this.setRequests(data.requests);
      // console.log(JSON.stringify(this.state.requests));
    })
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
  setNetworkUsers = (network) => {
    let users = this.state.networkUsers;
    if (users == null || users.length == 0) {
      this.setState({ network: network });
      this.loadNetworkUsers();
    }
    else {
      //dfind difference  btw n prev state and this state, add to networkUsers
      let prev = this.state.network;

      let difference = network.filter(function (i) { return prev.indexOf(i) < 0 });

      difference.forEach((val) => {
        this.props.firebase
          .user(val)
          .get().then((doc) => {
            users.push(doc.data());
            this.setState({ networkUsers: users });
          });
      });

      this.setState({ network: network });
    }
    this.props.setNetwork(network);
  }

  loadNetworkUsers = () => {
    this.setState({ loading: true, networkUsers: [] });
    let users = [];
    let counter = 0;

    for (let i = 0; i < this.state.network.length; i++) {

      this.props.firebase
        .user(this.state.network[i])
        .get().then((doc) => {
          users.push(doc.data());
          this.setState({ networkUsers: users });
          counter++;
          if (counter === this.state.network.length) {
            this.setState({ loading: false });
          }
        });
    }
  }

  render() {
    if ((!this.state.networkUsers || this.state.networkUsers.length === 0) &&
      this.state.network.length > 0) {
      if (this.state.loading == false) {
        this.loadNetworkUsers();
      }
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
      if (user == undefined) continue;
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
          <button id="add-friends" onClick={() => this.setAddFriend(true)} >
            <span className="jam jam-user-plus" style={{ color: '#9FC6C1' }}>
              {alert}
            </span>



          </button>
        </div>
        <div className="friends">
          {network.length == 0 ?
            <ErrorMsg
              src={graphics3}
              header='No support yet.'
              msg='Why not invite someone you trust?'
            />
            : network
          }
        </div>
        {(this.state.addFriend ?
          <AddFriendFB
            setAddFriend={this.setAddFriend}
            uid={this.props.uid}
            requests={this.state.requests}
            network={this.state.network}
          /> : null)}
      </section>
    );
  }
};

export default NetworkTab;