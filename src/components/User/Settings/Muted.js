
import React from 'react';
import UserRow from '../../Network/UserRow'
import ListOfUsers from './../../Network/ListOfUsers';
/*
firebase
uid
*/

class Muted extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showUser: null,
      unmutedUsers: {}
    }
  }

  closeUserPage = () => this.setState({ showUser: null })

  setUser = (user) => this.setState({ showUser: user })

  setUnmuteUser = (uid) => {
    let newUnmuted = this.state.unmutedUsers;

    if (uid in newUnmuted) {
      delete newUnmuted[uid];
    } else {
      newUnmuted[uid] = true;
    }

    this.setState({ unmutedUsers: newUnmuted })
  }

  goBack = () => {
    for (let key in this.state.unmutedUsers) {
      this.props.firebase.user(this.props.uid).update({
        "muteList": this.props.firebase.arrayRemove(key)
      }).then(() => {
      });
    }
    this.props.returnHome();
  }

  renderUser = (user) => {
    <UserRow
      onProfileClick={() => this.setUser(user)}
      PpfURL={user.PpfURL}
      name={user.name}
      rightElement={
        <button
          className={(user.uid in this.state.unmutedUsers) ? 'unmute' : ''}
          onClick={() => this.setUnmuteUser(user.uid)}>
          <span className="jam jam-volume-mute" ></span>
        </button>}
    />
  }

  render() {
    let userPage = null;

    if (this.state.showUser != null) {
      const showUser = this.state.showUser;
      userPage = <UserPage
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
      <section className="user">
        <Header
          goBack={this.goBack}
          title='Muted accounts'
        />
        <div className="content">
          <ListOfUsers
            containerClass='friends'
            firebase={this.props.firebase}
            uid={this.props.uid}
            key='muteList'
            renderFunc={this.renderUser}
          />
          {userPage}
        </div>
      </section>

    );
  }
}


export default Muted;