import React, { Component } from 'react';
import $ from 'jquery';
import plants from './../graphics/plants.png';
import hero from './../graphics/hero.gif';

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
        <div className="login-page">
           <h2>my_friends
            <button className="back-but" onClick={()=>this.setLogin(false) }>
              <span className="jam jam-arrow-left" style={{color: '#635358'}}></span>
            </button>
          </h2>
          <input id="login-email" type="email" placeholder="email"></input>
          <input id="login-pass" type="password" placeholder="password"></input>
          <button className="login-but" onClick={()=>this.props.checkLogin($('#login-email').val(),$('#login-pass').val()) }>login</button>
        </div>
      );
    }else if (this.state.signingUp){
      content = (
        <div>
          
        </div>
      );
    }else{
      content = (
        <div>
          <h2>my_friends</h2>
          <p>give and get support from your support network. feel safe with the ones you trust.</p>
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