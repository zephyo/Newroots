
import React from 'react';
import Loading from '../../Misc/Loading'
import SimpleModal from '../../Misc/SimpleModal';
/*
firebase
this uid
removeUser
*/
const deleteStates = {
  NONE: {},
  POPUP: {
    title: 'Are you sure?',
    p: 'If you delete your account, all your user data will be permanently deleted.'
  },
  REAUTH: {
    title: 'Re-enter your password.',
    p: 'We need to verify you\'re the owner of this account.'
    //input password
  },
  DELETING: {
    //loading icon
  },
  DELETED: {
    title: 'Your account is deleted.',
    p: 'Have a great rest of your day.'
    //ok
  },
  FAILED: {
    title: 'Your account could not be deleted.',
    p: 'Check your connection and try again.'
  }
};


class DeleteAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteState: deleteStates.NONE,
      password: ''
    };
  }

  setDeleteState = (dState) => {
    this.setState({ deleteState: dState })
  }

  setPassword = (e) => {
    this.setState({ password: e.target.value })
  }

  verifyAndDelete = () => {
    this.setDeleteState(deleteStates.DELETING)

    this.props.firebase.reAuth(this.state.password, () => {

      /*
        if couldn't delete user, show failed. 
        if deleted user but couldn't delete data, show success.
        if deleted everything, show success.
      */
      //delete user
      user.delete().then(() => {

        //delete user data
        this.props.firebase.user(this.props.uid).delete().then(() => {
          this.finishAndSignOut();
        }).catch((error) => {
          this.finishAndSignOut();
        });

      }).catch((error) => {
        this.setDeleteState(deleteStates.FAILED)
      });

    },
      (error) => {
        this.setDeleteState(deleteStates.FAILED)
      });
  }

  finishAndSignOut = () => {
    this.setDeleteState(deleteStates.DELETED)
  }

  render() {
    let dButton = (
      <button className="delete-but"
        onClick={() => this.setDeleteState(deleteStates.POPUP)}>Delete account</button>
    );
    let footer = null;

    switch (this.state.deleteState) {
      case deleteStates.NONE:
        return <div>
          {dButton}
        </div>;
      case deleteStates.POPUP:
        footer =
          <footer>
            <button onClick={() => this.setDeleteState(deleteStates.REAUTH)}>Yes</button>
            <button onClick={() => this.setDeleteState(deleteStates.NONE)}>No</button>
          </footer>;
        return;
      case deleteStates.REAUTH:
        footer =
          <footer>
            <input type="password" placeholder="Password" onChange={this.setPassword} />
            <button onClick={this.verifyAndDelete}>Delete</button>
          </footer>
        return;
      case deleteStates.DELETING:
        footer =
          <Loading />
          ;
        return;
      case deleteStates.DELETED:
        footer =
          <footer>
            <button onClick={this.props.removeUser}>Ok</button>
          </footer>
          ;
        return;
      case deleteStates.FAILED:
        footer =
          <footer>
            <button onClick={() => this.setDeleteState(deleteStates.NONE)}>Ok</button>
          </footer>
          ;
        return;
    }
    return <div>
      {dButton}
      <SimpleModal
        title={this.state.deleteState.title}
        p={this.state.deleteState.p}
        footer={footer}
      />
    </div>;
  }
}


export default DeleteAccount;