import React from 'react';
import AddFriend from './AddFriend';
import { withFirebase } from '../Firebase';
import Avatar from '../Misc/Avatar';
import UserPage from './UserPage';
import UserRow from './UserRow'

import graphics3 from '../../graphics/3.png';
import ErrorMsg from '../Misc/ErrorMsg';

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
      showUser: null
    };
  }

  componentDidMount() {
    let ref = this.props.firebase.user(this.props.uid);

    ref.onSnapshot((doc) => {
      let data = doc.data();
      this.setNetworkUsers(data.network);
      this.props.updateUserData('requests', data.requests);
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
    this.props.updateUserData('network', network);
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


  closeUserPage = () => {
    this.setState({ showUser: null })
  }

  setUser = (user) => {
    this.setState({ showUser: user })
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
        <UserRow
          onProfileClick={() => this.setUser(user)}
          PpfURL={user.PpfURL}
          name={user.name}
          rightElement={<button><span className="jam jam-heart" ></span></button>}
        />
      );
      network.push(addEl);
    }


    let userPage = null;

    if (this.state.showUser !== null) {
      let showUser = this.state.showUser;
      userPage =
        <UserPage
          closeUserPage={this.closeUserPage}
          PpfURL={showUser.PpfURL}
          name={showUser.name}
          bio={showUser.bio}
          location={showUser.location}
          pronouns={showUser.pronouns}
          checkins={showUser.checkinData}
          network={showUser.network}
          myUID={this.props.uid}
        ></UserPage>
    }


    return (
      <section className="network">
        <div className="network-header">
          <h2>Your support network</h2>
          <div className="header">
            <div className="search-bar">
              <input type="text" placeholder="Search" onChange={this.filterNetwork} />
              <button><span className="jam jam-search" style={{ color: '#9FC6C1' }}></span></button>
            </div>
            <button id="add-friends" onClick={() => this.setAddFriend(true)} >
              <span className="jam jam-user-plus">
                {alert}
              </span>
            </button>
          </div>
        </div>

        <div className="friends">
          {this.state.network.length == 0 ?
            <ErrorMsg
              src={graphics3}
              header="Your network hasn't been created yet."
              msg='Why not invite someone you trust?'
            />
            : network
          }
        </div>
        {(this.state.addFriend ?
          <AddFriendFB
            setUserPage={this.setUser}
            setAddFriend={this.setAddFriend}
            uid={this.props.uid}
            requests={this.state.requests}
            network={this.state.network}
          /> : null)}

        {userPage}

      </section>
    );
  }
};

export default NetworkTab;