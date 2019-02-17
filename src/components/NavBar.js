import React, { Component } from 'react';
import icon from './../graphics/icon.png';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestsLength: props.requestsLength
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

  render() {
    let networkNotif = null;
    if (this.state.requestsLength > 0) {
      networkNotif = (
        <span className="alert">{this.state.requestsLength}</span>
      );
    }
    return (
      <nav className="main-nav">
        <div className="nav-content">
          <img className="logo-img" src={icon} />
          <span className="logo">Newroots
          <span className="sublogo">give and get support.</span>
          </span>
          <button id="feed-but" onClick={() => this.props.setActiveTab(0)}>
            <span className="jam jam-messages-alt" style={{ color: '#e38882' }}></span></button>
          <button id="network-but" onClick={() => this.props.setActiveTab(1)}>
            <span className="jam jam-users" style={{ color: '#85d0c6' }}>
              {networkNotif}
            </span>

          </button>
          <button id="user-but" onClick={() => this.props.setActiveTab(2)}>
          <span className="jam jam-user" style={{ color: '#94cdea' }}></span></button>
        </div>
      </nav>
    );
  }
}

export default NavBar;