import React from 'react';

/*
props:
  containerClass
  firebase
  uid
  key (e.g. muteList, network)
  renderFunc : function that takes in user object and outputs component

*/
class ListOfUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedUsers: {},
    };
  }

  componentDidMount() {
    let ref = this.props.firebase.user(this.props.uid);

    ref.onSnapshot((doc) => {
      let data = doc.data();
      this.setNetworkUsers(data[this.props.key]);
    })
  }

  updateLoadedUsers = (newUids) => {
    if (newUids == null || newUids.length == 0) return;

    let users = this.state.loadedUsers;

    if (users == null || Object.keys(users).length == 0) {
      this.loadUsers(newUids);
    }
    else {
      for (let uid of newUids) {
        if (uid in users) continue;

        this.props.firebase.user(uid)
          .get()
          .then((doc) => {
            users[uid] = doc.data();
            this.setState({ loadedUsers: users });
          })
      }
    }
  }

  loadUsers = (uids) => {
    let users = {};

    for (let uid of uids) {
      this.props.firebase.user(uid)
        .get()
        .then((doc) => {
          users[uid] = doc.data();
          this.setState({ loadedUsers: users });
        });
    }
  }

  render() {
    const { loadedUsers } = this.state;

    let renderUsers = [];
    for (let key in loadedUsers) {
      renderUsers.push(this.props.renderFunc(loadedUsers[key]));
    }

    return <div className={this.props.containerClass}>
      {renderUsers}
    </div>;
  }

};

export default ListOfUsers;