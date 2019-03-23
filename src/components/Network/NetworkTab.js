import React from 'react';
import AddFriend from './AddFriend';
import { withFirebase } from '../Firebase';
import UserPage from './UserPage';
import UserRow from './UserRow'
import ListOfUsers from './ListOfUsers'
import graphics3 from '../../graphics/3.png';
import ErrorMsg from '../Misc/ErrorMsg';
import StaticUtil from '../../data/StaticUtil';

const AddFriendFB = withFirebase(AddFriend);

class NetworkTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: this.props.requests,
      network: this.props.network,
      addFriend: false,
      showUser: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requests !== this.state.requests) {
      this.setState({ requests: nextProps.requests });
    }
    if (nextProps.network !== this.state.network) {
      this.setState({ network: nextProps.network });
    }
  }

  setAddFriend = (bool) => {
    this.setState({
      addFriend: bool
    });
  }

  closeUserPage = () => {
    this.setState({ showUser: null })
  }

  setUser = (user) => {
    this.setState({ showUser: user })
  }

  renderUser = (user, key) =>
    <UserRow
      key={key}
      onProfileClick={() => this.setUser(user)}
      PpfURL={user.PpfURL}
      name={user.name}
      rightElement={<button><span className="jam jam-heart" ></span></button>}
    />

  render() {
    let alert = null;
    if (this.state.requests.length > 0) {
      alert = (
        <span className="alert">{this.state.requests.length}</span>
      );
    }

    let userPage = null;
    if (this.state.showUser !== null) {
      let showUser = this.state.showUser;
      userPage = StaticUtil.getUserPage(this.props.firebase,
        this.props.uid,
        showUser,
        this.closeUserPage)
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

          <ListOfUsers
            containerClass='friends'
            firebase={this.props.firebase}
            uid={this.props.uid}
            listName='network'
            renderFunc={this.renderUser}
            errorEl={
              <ErrorMsg
                src={graphics3}
                header="Your network hasn't been created yet."
                msg='Why not invite someone you trust?'
              />
            }
          />

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