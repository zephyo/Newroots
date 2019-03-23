import React, { Component } from 'react';
import $ from 'jquery';
import plants from './../graphics/plants.png';
import hero from './../graphics/hero.gif';
import { withFirebase } from './Firebase';

import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const SignUpFormFB = withFirebase(SignupForm);
const LoginFormFB = withFirebase(LoginForm);

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signingUp: false,
      loggingIn: false,
      show: false
    };
  }
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user == null) {
        this.setState({
          show: true
        })
      } else {
        this.props.checkLogin(user.uid);
      }
    });
  }
  setSignUp = (bool) => {
    this.setState({
      signingUp: bool
    });
  }

  setLogin = (bool) => {
    this.setState({
      loggingIn: bool
    });
  }

  render() {
    let content, plantsEl = null;
    if (this.state.loggingIn) {
      content = (
        <LoginFormFB
          checkLogin={this.props.checkLogin}
          goBack={() => this.setLogin(false)} />
      );
    } else if (this.state.signingUp) {
      content = (
        <SignUpFormFB
          SignUp={this.props.SignUp}
          goBack={() => this.setSignUp(false)} />
      );
    } else {
      content = (
        <div className="home-content">
          <h2>Newroots</h2>
          <p>Give and get support from your support network. Feel safe with those you trust.</p>
          <div className="buts">
            <button className="signup-but" onClick={() => this.setSignUp(true)} >Sign up</button>
            <button className="login-but" onClick={() => this.setLogin(true)}>Login</button>
          </div>
        </div>
      );
      plantsEl = <img className="plants" src={plants} />;
    }

    return (
      <div>
        {this.state.show &&
          <div className="home-page">


            <img className="bg-texture" src={hero} />
            {plantsEl}
            {content}


          </div>
        }
      </div>
    );
  }
}

export default HomePage;
