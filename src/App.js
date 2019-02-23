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
import Onboarding from './components/Onboarding.js';


import { withFirebase } from './components/Firebase';


const UserTabFB = withFirebase(UserTab);

const NetworkTabFB = withFirebase(NetworkTab);

const NavBarFB = withFirebase(NavBar);

const FeedTabFB = withFirebase(FeedTab);

const CheckinModalFB = withFirebase(CheckinModal);
//let feedListen;

var data = {
  baseURL: '',
  activeTab: 0,
  userData: null,
  onboarding: false,
  feed: []
},
  userBase = 'users';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = data;
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    //feedListen();
  }

  fillFeed = () => {

  }

  SignUp = (userData) => {
    this.setState({
      onboarding: true,
      userData: userData,
    });
  }

  checkLogin = (userData) => {
    this.setState({
      userData: userData,
    });
  }

  // update this.state.lastCheckin as well as input checkin data to feed/database
  updateCheckin = (lastCheckin) => {
    this.setState({
      userData: {
        ...this.state.userData,
        lastCheckin: lastCheckin
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

  setPpfURL = (downloadURL) => {
    this.setState({
      userData: {
        ...this.state.userData,
        PpfURL: downloadURL
      }
    });

  }

  setActiveTab = (index) => {
    this.setState({
      activeTab: index,
    });
  }

  setName = (name) => {
    this.setState({
      userData:
      {
        ...this.state.userData,
        name: name
      }
    })
  }

  setCheckins = (checkins) => {
    this.setState({
      userData:
      {
        ...this.state.userData,
        checkins: checkins
      }
    })
  }

  setNetwork = (network) => {
    this.setState({
      userData:
      {
        ...this.state.userData,
        network: network
      }
    })
  }

  setRequests = (requests) => {
    this.setState({
      userData:
      {
        ...this.state.userData,
        requests: requests
      }
    })
  }

  setOnboarding = (bool) => {
    this.setState({ onboarding: bool })
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
          SignUp={this.SignUp}
        />
      );
    }
    else if (this.state.onboarding) {
      return (
        <Onboarding
          setOnboarding={this.setOnboarding}
          name={this.state.userData.name}
          setCheckins={this.setCheckins}
          uid={this.state.userData.uid}
        />
      );
    }


    var activeTab;
    //active tab is feed
    if (this.state.activeTab == 0) {
      activeTab = (
        <FeedTabFB
          PpfURL={this.state.userData.PpfURL}
          name={this.state.userData.name}
          uid={this.state.userData.uid}
          network={this.state.userData.network}
          feed={this.state.feed}
        />
      );
    }
    //active tab is network
    else if (this.state.activeTab == 1) {
      // console.log('app.js req-'+JSON.stringify(this.state.userData.requests));
      activeTab = (
        <NetworkTabFB
          uid={this.state.userData.uid}
          requests={this.state.userData.requests}
          network={this.state.userData.network}
          setRequests={this.setRequests}
          setNetwork={this.setNetwork}
        />
      );
    }
    //active tab is profile
    else {
      activeTab = (
        <UserTabFB
          logout={this.logout}
          checkins={this.state.userData.checkins}
          name={this.state.userData.name}
          uid={this.state.userData.uid}
          PpfURL={this.state.userData.PpfURL}
          setPpfURL={this.setPpfURL}
          setName={this.setName}
          setCheckins={this.setCheckins}
        />
      );
    }

    return (
      <div className="container">
        <NavBarFB
          setActiveTab={this.setActiveTab}
          activeTab={this.state.activeTab}
          requestsLength={this.state.userData.requests ? this.state.userData.requests.length : 0}
          uid={this.state.userData.uid}
        />
        {activeTab}

        <div className="bg"></div>
        <div className="main-bg-texture"></div>

        {this.needToCheckin() ?
          <CheckinModalFB
            PpfURL={this.state.userData.PpfURL}
            network={this.state.userData.network}
            name={this.state.userData.name}
            uid={this.state.userData.uid}
            updateCheckin={this.updateCheckin}
            checkins={this.state.userData.checkins ? this.state.userData.checkins : []}
          />
          : null}
      </div>
    );
  }
}

export default App;
