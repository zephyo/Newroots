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
      loggingIn: false
    };
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

  render (){
    var content;
    if (this.state.loggingIn){
      content = (
        <LoginFormFB 
          checkLogin = {this.props.checkLogin}
          setLogin = {this.setLogin} />
      );
    }else if (this.state.signingUp){
      content = (
        <SignUpFormFB 
          SignUp = {this.props.SignUp}
          setSignUp = {this.setSignUp}/>
      );
    }else{
      content = (
        <div>
          <h2>Newroots</h2>
          <p>Give and get support from your support network. Feel safe with those you trust.</p>
          <div className="buts">
            <button className="signup-but" onClick={()=>this.setSignUp(true)} >sign up</button>
            <button className="login-but" onClick={()=>this.setLogin(true) }>login</button>
          </div>
        </div>
      );
    }

    return (
      <div className="home-page">
        <img className="bg-texture" src={hero}/>
        <img src={plants}/>
      {content}
    </div>
    );
  }
}

export default HomePage;
