import React, { Component } from 'react';
import AddFriend from './AddFriend';

class NetworkTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addFriend: false
    };
  }

  setAddFriend = (bool) => {
    this.setState({
      addFriend: bool
    });
  }

  render()
  {
    return (
      <section className="network">
        <div className="header">
        <h2>Your network</h2>
          <div className="search-bar">
            <input type="text" placeholder="search"/>
            <button id="search-friends"><span className="jam jam-search" style={{color: '#9FC6C1'}}></span></button>
          </div>
          <button id="add-friends" onClick={()=>this.setAddFriend(true)}><span className="jam jam-user-plus" style={{color: '#9FC6C1'}}></span></button>
        </div>
        <div className="friends">
          <div className="friend">
            <div className="pic"></div><span>Felicia Wilson</span>
            <button><span className="jam jam-heart" style={{color: '#e38882'}}></span></button>
          </div>
        </div>
        {(this.state.addFriend ? <AddFriend
            setAddFriend = {this.setAddFriend}
        /> : null)}
      </section>
    );
  }
};

export default NetworkTab;