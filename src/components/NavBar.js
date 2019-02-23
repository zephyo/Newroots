import React, { Component } from 'react';
import icon from './../graphics/icon.png';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestsLength: props.requestsLength,
      activeTab: props.activeTab
    };
  }

  componentDidMount() {
    //let element = this;
    var requestsRef = this.props.firebase.user(this.props.uid);

    requestsRef.onSnapshot((doc) => {
      this.setState({ requestsLength: doc.data().requests.length })
    })
  }

  setAddFriend = (bool) => {
    this.setState({
      addFriend: bool
    });
  }

  setActiveTab = (index) => {
    this.props.setActiveTab(index);
    this.setState({ activeTab: index })
  }

  render() {
    let networkNotif = null;
    let activeTab = this.state.activeTab;

    if (this.state.requestsLength > 0) {
      networkNotif = (
        <span className="alert">{this.state.requestsLength}</span>
      );
    }

    let indcStyle;

    if (activeTab === 0) {
      indcStyle = {
        background: '#e38882',
        left: '0%'
      };
    }
    else if (activeTab === 1) {
      indcStyle = {
        background: '#84b3a0',
        left: '33%'
      };
    }
    else if (activeTab === 2) {
      indcStyle = {
        background: '#97c2d4',
        left: '67%'
      };
    }

    let feed, network, user;

    if (activeTab === 0) {
      feed = (
        <button className="feed-but activate"
          onClick={() => this.setActiveTab(0)}>
          <span className="jam jam-messages" ></span>
          Feed
        </button>
      );
    } else {
      feed = (
        <button className="feed-but" 
          onClick={() => this.setActiveTab(0)}>
          <span className="jam jam-messages" ></span>

        </button>
      );
    }

    if (activeTab === 1) {
      network = (
        <button className="network-but activate"
          onClick={() => this.setActiveTab(1)}>
          <span className="jam jam-users" >
            {networkNotif}
          </span>
          Support
        </button>
      );
    } else {
      network = (
        <button className="network-but"
          onClick={() => this.setActiveTab(1)}>
          <span className="jam jam-users" >
            {networkNotif}
          </span>
        </button>
      );
    }

    if (activeTab === 2) {
      user = (
        <button className="user-but activate"
          onClick={() => this.setActiveTab(2)}>
          <span className="jam jam-user" ></span>
          Profile
        </button>
      );
    } else {
      user = (
        <button className="user-but"
          onClick={() => this.setActiveTab(2)}>
          <span className="jam jam-user" ></span>
        </button>
      );
    }

    return (
      <nav className="main-nav">
        <div className="nav-content">
          <img className="logo-img" src={icon} />
          <span className="logo">Newroots
          <span className="sublogo">Give and get support.</span>
          </span>
          <div className="nav-but-container">

            {feed}
            {network}
            {user}

            <div className="indicator" style={indcStyle}></div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;