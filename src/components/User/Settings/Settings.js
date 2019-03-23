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
  goBack
*/

class Settings extends React.Component {
  constructor(props) {
    super(props);
    const SETTING_STATES = {
      Home: {},
      Email: {
        element: <EditSecurity
          goBack={this.returnHome}
          changing='email'
          inputType='email'
          verifyInput={this.verifyEmail}
          successCallback={this.updateEmail}
          firebase={this.props.firebase}
        />
      },
      Password: {
        element: <EditSecurity
          goBack={this.returnHome}
          changing='password'
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
        goBack={this.returnHome}
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
    this.state = {
      SETTING_STATES: SETTING_STATES,
      settingState: SETTING_STATES.Home,
      showToast: null
    };
  }

  setSettingState = (state) => { this.setState({ settingState: state }) };

  setToast = (state) => { this.setState({ showToast: state }) };

  verifyEmail = (email) => {
    if (!StaticUtil.isValidEmail(email))
      return 'Invalid email.'
    return ''
  }

  updateEmail = (email) => {
    this.props.firebase.doEmailUpdate(email, this.updateSucceeded, this.updateFailed);
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

  returnHome = () => this.setSettingState(this.state.SETTING_STATES.Home);

  render() {
    const { SETTING_STATES, settingState } = this.state;

    if (settingState == SETTING_STATES.Home) {
      return (
        <section className="user settings">
          <Header
            goBack={this.props.goBack}
            title='Settings'
          />
          <h3>Security</h3>
          <button onClick={() => { this.setSettingState(SETTING_STATES.Email) }}>
            Email
            </button>
          <button onClick={() => { this.setSettingState(SETTING_STATES.Password) }}>
            Password
            </button>

          <h3>Permissions</h3>
          <button onClick={() => { this.setSettingState(SETTING_STATES.Notifications) }}>
            Notifications
            </button>

          <h3>Safety</h3>
          <button onClick={() => { this.setSettingState(SETTING_STATES.Filtering) }}>
            Filtering
            </button>
          <button onClick={() => { this.setSettingState(SETTING_STATES.Muted) }}>
            Muted accounts
            </button>

          <h3>Account</h3>
          <button onClick={() => { this.setSettingState(SETTING_STATES.Help) }}>
            Help
            </button>
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

    return settingState.element;
  }
}


export default Settings;