
import React, { Component } from 'react';

const NetworkTab = props => {
  return (
    <section className="network">
      <div className="header">
        <div className="search-bar">
          <input type="text" placeholder="search"/>
          <button id="search-friends"><span className="jam jam-user-search" style={{color: '#9FC6C1'}}></span></button>
        </div>
        <button id="add-friends"><span className="jam jam-user-plus" style={{color: '#9FC6C1'}}></span></button>
      </div>
      <div className="friends">
        <div className="friend">
          <div className="pic"></div><span>Felicia Wilson</span>
          <button><span className="jam jam-heart" style={{color: '#e38882'}}></span></button>
        </div>
      </div>
    </section>
  );
};

export default NetworkTab;