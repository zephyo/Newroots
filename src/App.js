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


import { withFirebase } from './components/Firebase';


const UserTabFB = withFirebase(UserTab);

const NetworkTabFB = withFirebase(NetworkTab);

const NavBarFB = withFirebase(NavBar);

const FeedTabFB = withFirebase(FeedTab);
//let feedListen;

var data = {
  baseURL: '',
  activeTab: 0,
  userData: null,
  feed: []
},
  userBase = 'users';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = data;
  }

  componentDidMount() {
    //listen for network requests
    //fix - firebase doesnt exist in this xontentxt - maybe just have this code on compoenents that need it

    /*feedListen = firebase.firestore().collection("users").doc(this.state.userData.uid).collection("feed")
      .onSnapshot(function(snapshot) {
          let tempFeed = [];
          snapshot.docChanges().forEach(function(change) {
              
              if (change.type === "added") {
                  //console.log("New city: ", change.doc.data());
                  tempFeed.push(change.doc.id);
              }
              
          });
          this.setState({
              feed:tempFeed
          })
      });*/
  }
  componentWillUnmount() {
    //feedListen();
  }

  fillFeed = () => {

  }

  SignUp = (userData) => {
    this.setState({
      userData: userData,
    });
  }

  checkLogin = (userData) => {
    this.setState({
      userData: userData,
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

  setPpfURL = (downloadURL) => {
    this.setState({
      userData: {
        ...this.state.userData,
        PpfURL: downloadURL
      }
    })
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
    var activeTab;
    //active tab is feed
    if (this.state.activeTab == 0) {
      activeTab = (
        <FeedTabFB
          uid={this.state.userData.uid}
          feed={this.state.feed}
        />
      );
    }
    //active tab is network
    else if (this.state.activeTab == 1) {
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
        <div className="bg"></div>
        <div className="main-bg-texture"></div>
        <NavBarFB
          setActiveTab={this.setActiveTab}
          requestsLength={this.state.userData.requests ? this.state.userData.requests.length : 0}
          uid={this.state.userData.uid}
        />
        {activeTab}
        {this.needToCheckin() ?
          <CheckinModal
            updateCheckin={this.updateCheckin}
            checkins={this.state.userData.checkins ? this.state.userData.checkins : []}
          />
          : null}
      </div>
    );
  }
}

export default App;
