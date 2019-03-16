import React from 'react';
import LogoutAccount from './LogoutAccount';
import DeleteAccount from './DeleteAccount';
import Header from '../../Misc/Header';
import EditSecurity from './EditSecurity';
import Notifications from './Notifications';
import Filtering from './Filtering';
import Muted from './Muted';
import Help from './Help';
import StaticUtil from '../../../data/StaticUtil'
import Toast from '../../Misc/Toast'

/*
props:
  firebase
  uid
  removeUser
  updateUserData
  goBack
*/

const SETTING_STATES = {
  Home: {},
  Email: {
    element: <EditSecurity
      goBack={this.returnHome}
      key='email'
      inputType='email'
      verifyInput={this.verifyEmail}
      successCallback={this.updateEmail}
      firebase={this.props.firebase}
    />
  },
  Password: {
    element: <EditSecurity
      goBack={this.returnHome}
      key='password'
      inputType='password'
      verifyInput={this.verifyPassword}
      successCallback={this.updatePassword}
      firebase={this.props.firebase}
    />
  },
  Notifications: {
    element: (
      <section className="user">
        <Header
          goBack={this.returnHome}
          title='Notifications'
        />
        <Notifications />
      </section>)
  },
  Filtering: {
    element: (
      <section className="user">
        <Header
          goBack={this.returnHome}
          title='Filtering'
        />
        <Filtering />
      </section>)
  },
  Muted: {
    element: <Muted
      firebase={this.props.firebase}
      uid={this.props.uid}
    />
  },
  Help: {
    element: (
      <section className="user">
        <Header
          goBack={this.returnHome}
          title='Help Center'
        />
        <Help />
      </section>)
  },
}

const INITIAL_STATE = {
  settingState: SETTING_STATES.Home,
  showToast: null
}

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  setSettingState = (state) => this.setState({ settingState: state })

  setToast = (el) = this.setState({ showToast: el })

  verifyEmail = (email) => {
    if (!StaticUtil.isValidEmail(email))
      return 'Invalid email.'
    return ''
  }

  updateEmail = (email) => {
    this.props.firebase.doEmailUpdate(email, this.updateSucceeded, this.updateFailed);
    this.props.firebase.user(this.props.uid).update({
      email: email
    });
    this.props.updateUserData('email', email);
  }

  verifyPassword = (pword) => {
    if (pword.length < 6)
      return 'Password must be 6 characters or more.'
    return ''
  }

  updatePassword = (password) => {
    this.props.firebase.doPasswordUpdate(password, this.updateSucceeded, this.updateFailed);
  }

  updateSucceeded = () => {
    this.returnHome();
    this.setToast(<Toast
      message={'Awesome! Updated.'}
    />);
  }

  updateFailed = (error) => {
    this.returnHome();
    this.setToast(<Toast
      message={'Sorry, couldn\'t update - ' + error.message}
    />);
  }

  returnHome = () => this.setSettingState(SETTING_STATES.Home);

  render() {
    if (this.state.settingState == SETTING_STATES.Home) {
      return (
        <section className="user">
          <Header
            goBack={this.props.goBack}
            title='Settings'
          />
          <h3>Security</h3>
          <button>Email</button>
          <button>Password</button>

          <h3>Permissions</h3>
          <button>Notifications</button>

          <h3>Safety</h3>
          <button>Filtering</button>
          <button>Muted accounts</button>

          <h3>Account</h3>
          <button>Help</button>
          <LogoutAccount
            firebase={this.props.firebase}
            removeUser={this.props.removeUser}
          />
          <DeleteAccount
            firebase={this.props.firebase}
            uid={this.props.uid}
            removeUser={this.props.removeUser}
          />
          {this.state.showToast}
        </section>
      );
    }

    return this.state.settingState.element;
  }
}


export default Settings;