import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';

import './App.css';
import NavBar from './components/NavBar.js';
import CheckinModal from './components/CheckinModal.js';
import FeedTab from './components/FeedTab.js';
import HomePage from './components/HomePage.js';
import NetworkTab from './components/NetworkTab.js';
import UserTab from './components/UserTab.js';


var data = {
  baseURL: '',
  activeTab: 0,
  userData: null,
  feed: [

  ],
},
userBase = 'users';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = data;
  }

  componentWillMount() {
  }

  setActiveTab = (index) => {
    this.setState({
      activeTab: index,
    });
  }

  SignUp = (authUser) => {
    this.setState({
      userData:
      {
        profileImage: '',
        name: 'Gloria Wang',
        email: authUser.email,
        lastCheckin: '02/14/2019',
        checkins: [
          {
            q: 'How are you feeling today?',
            type: 'range',
          },
          {
            q: 'Have you took your medication?',
            type: 'yesno'
          }
        ],
      },
    });
  }

  checkLogin = (userData) => {
    //check against database 
    //if (user)
    //if valid, set userData
    this.setState({
      userData:
      {
        profileImage: '',
        name: 'Gloria Wang',
        username: 'gloria',
        lastCheckin: '02/14/2019',
        checkins: [
          {
            q: 'How are you feeling today?',
            type: 'range',
          },
          {
            q: 'Have you took your medication?',
            type: 'yesno'
          }
        ],
      },
    });
  }

  // update this.state.lastCheckin as well as input checkin data to feed/database
  updateCheckin = () => {
    this.setState({
      userData: {
        ...this.state.userData,
        lastCheckin: moment().format('L')
      }
    });
  }

  //check this.state.lastCheckin and see whether user has checked in today
  needToCheckin = () => {
    if (this.state.userData.lastCheckin != moment().format('L')) {
      return true;
    }
    else {
      return false;
    }
  }

  //logout
  logout = () => {
    this.setState({
      userData: null
    });
  }

  render() {
    if (this.state.userData === null) {
      return (
        <HomePage
          checkLogin={this.checkLogin}
        />
      );
    }
    var activeTab;
    //active tab is feed
    if (this.state.activeTab == 0) {
      activeTab = (
        <FeedTab />
      );
    }
    //active tab is network
    else if (this.state.activeTab == 1) {
      activeTab = (
        <NetworkTab />
      );
    }
    //active tab is profile
    else {
      activeTab = (
        <UserTab
          logout={this.logout}
          checkIns={this.state.userData.checkins}
          name={this.state.userData.name}
        />
      );
    }

    return (
      <div className="container">
        <div className="bg"></div>
        <div className="main-bg-texture"></div>
        <NavBar
          setActiveTab={this.setActiveTab}
        />
        {activeTab}
        {this.needToCheckin() ?
          <CheckinModal
            updateCheckin={this.updateCheckin}
          />
          : null}
      </div>
    );
  }
}

export default App;
