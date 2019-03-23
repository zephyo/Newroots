import React from 'react';

/*
props:
  containerClass
  firebase
  uid
  key (e.g. muteList, network)
  renderFunc : function that takes in user object and outputs component
  errorEl
*/
class ListOfUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedUsers: {},
    };
  }

  componentDidMount() {
    let ref = this.props.firebase.user(this.props.uid).collection(this.props.listName);

    ref.onSnapshot((querySnapshot) => {
      let users = {};
      querySnapshot.docChanges().forEach((change) => {
        let doc = change.doc;
        if (change.type === "added" || change.type === "modified") {
          this.props.firebase.user(doc.id)
            .get()
            .then((doc) => {
              users[doc.id] = doc.data();
              this.setState({ loadedUsers: users });
            })
        }
        if (change.type === "removed") {
          delete users[doc.id]
        }
      });
    });
  }

  render() {
    const { loadedUsers } = this.state;

    let renderUsers = [];
    for (let key in loadedUsers) {
      renderUsers.push(this.props.renderFunc(loadedUsers[key], key));
    }

    return <div className={this.props.containerClass}>
      {renderUsers.length > 0 ? renderUsers : this.props.errorEl}
    </div>;
  }

};

export default ListOfUsers;