import React from 'react';
import $ from 'jquery';
import moment from 'moment';

import './App.css';
import NavBar from './components/NavBar.js';
import CheckinModal from './components/CheckinModal.js';
import FeedTab from './components/Feed/FeedTab.js';
import HomePage from './components/HomePage.js';
import NetworkTab from './components/Network/NetworkTab.js';
import UserTab from './components/User/UserTab.js';
import Onboarding from './components/Onboarding.js';
import { withFirebase } from './components/Firebase';

const UserTabFB = withFirebase(UserTab);

const NetworkTabFB = withFirebase(NetworkTab);

const NavBarFB = withFirebase(NavBar);

const FeedTabFB = withFirebase(FeedTab);

const CheckinModalFB = withFirebase(CheckinModal);

const HomePageFB = withFirebase(HomePage);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseURL: '',
      activeTab: 0,
      userData: null,
      userNetwork: {},
      userRequests: {},
      onboarding: false,
      feed: [],
      loadMore: false
    };
  }

  listenForUserData = (uid) => {
    let ref = this.props.firebase.user(uid);

    ref.onSnapshot((doc) => {
      this.setState({ userData: doc.data() })
    })

    this.props.firebase.network(uid).onSnapshot((snapshot) => {
      let newNetwork = this.state.userNetwork;
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          newNetwork[change.doc.id] = true;
        }
        if (change.type === "modified") {
        }
        if (change.type === "removed") {
          delete newNetwork[change.doc.id]
        }
      });
      this.setState({ userNetwork: newNetwork })
    });

    this.props.firebase.requests(uid).onSnapshot((snapshot) => {
      let newRequests = this.state.userRequests;
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          newRequests[change.doc.id] = true;
        }
        if (change.type === "modified") {
        }
        if (change.type === "removed") {
          delete newRequests[change.doc.id]
        }
      });
      this.setState({ userRequests: newRequests })
    });
  }

  SignUp = (uid) => {
    this.setState({
      onboarding: true
    });
    this.listenForUserData(uid)
  }

  checkLogin = (uid) => {
    this.listenForUserData(uid)
  }

  needToCheckin = () => {
    if (this.state.userData.checkinFreq &&
      this.state.userData.checkinFreq[new Date().getDay()] == true &&
      this.state.userData.lastCheckin != moment().format('L')) {
      return true;
    }
    else {
      return false;
    }
  }

  setActiveTab = (index) => {
    this.setState({
      activeTab: index,
    });
  }

  setUserInfo = (name, bio, location, pronouns) => {
    this.setState({
      userData:
      {
        name: name,
        bio: bio,
        location: location,
        pronouns: pronouns,
        ...this.state.userData,
      }
    })
  }

  updateUserData = (key, val) => {
    this.setState({
      userData: {
        ...this.state.userData,
        [key]: val
      }
    })
  }

  setOnboarding = (bool) => {
    this.setState({ onboarding: bool })
  }

  removeUser = () => {
    this.setState({
      userData: null
    });
  }

  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) {
      this.setState({
        loadMore: true
      })
      console.log("bees")
    }
    else {
      if (this.state.loadMore) {
        this.setState({
          loadMore: false
        })
      }
    }
  }

  render() {
    if (this.state.userData === null) {
      return (
        <HomePageFB
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
          uid={this.state.userData.uid}
        />
      );
    }

    var activeTab;
    //active tab is feed
    if (this.state.activeTab == 0) {
      activeTab = (
        <FeedTabFB
          loadMore={this.state.loadMore}
          PpfURL={this.state.userData.PpfURL}
          name={this.state.userData.name}
          uid={this.state.userData.uid}
          network={this.state.userNetwork}
          feed={this.state.feed}
        />
      );
    }
    //active tab is network
    else if (this.state.activeTab == 1) {
      activeTab = (
        <NetworkTabFB
          uid={this.state.userData.uid}
          requests={this.state.userRequests}
          network={this.state.userNetwork}
        />
      );
    }
    else {
      activeTab = (
        <UserTabFB
          removeUser={this.removeUser}
          checkins={this.state.userData.checkins}
          name={this.state.userData.name}
          bio={this.state.userData.bio}
          location={this.state.userData.location}
          pronouns={this.state.userData.pronouns}
          checkinFreq={this.state.userData.checkinFreq}
          checkinCategories={this.state.userData.checkinCategories}
          uid={this.state.userData.uid}
          PpfURL={this.state.userData.PpfURL}
          setUserInfo={this.setUserInfo}
        />
      );
    }

    return (
      <div className="container" onScroll={(e) => { this.handleScroll(e) }}>
        <NavBarFB
          setActiveTab={this.setActiveTab}
          activeTab={this.state.activeTab}
          requestsLength={Object.keys(this.state.userRequests).length}
          uid={this.state.userData.uid}
        />

        {activeTab}

        <div className="bg"></div>
        <div className="main-bg-texture"></div>

        {this.needToCheckin() ?
          <CheckinModalFB
            PpfURL={this.state.userData.PpfURL}
            network={this.state.userNetwork}
            name={this.state.userData.name}
            uid={this.state.userData.uid}
            updateUserData={this.updateUserData}
            checkins={this.state.userData.checkins ? this.state.userData.checkins : []}
          />
          : null}
      </div>
    );
  }
}

export default withFirebase(App);
