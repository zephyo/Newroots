import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import graphics1 from '../graphics/1.png';
import graphics2 from '../graphics/2.png';
import graphics3 from '../graphics/3.png';
import texture1 from './../graphics/flower.png';
import texture2 from './../graphics/thing.png';


/*
props:

setOnboarding(true)

*/
const Button = (props) => {
  return (
    <button className="cont-onboarding" onClick={props.Listener}>
      <span className={props.Classes}></span>
    </button>
  );
}

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }
  }

  incrementPage = () => {
    this.setState({ page: this.state.page + 1 })
  }

  enableNotif = () => {
    this.incrementPage();
  }

  render() {

    let button;

    let page;
    switch (this.state.page) {
      case 0:
        {
          button = (
            <Button
              Listener={this.incrementPage}
              Classes="jam jam-arrow-right"
            />
          );

          page = (
            <div className="page one">
              <h1>{"Hi " + this.props.name + ","}</h1>
              <p>welcome to my_friends. We're going to take you through steps to best support you.</p><img src={graphics3} />
              {button}
            </div>
          );
          break;
        }
      case 1:
        {
          button = (
            <Button
              Listener={this.incrementPage}
              Classes="jam jam-arrow-right"
            />
          );

          page = (
            <div className="page two">
              <img className="bg-texture first" src={texture1} />
              <h2>Let's create a check-in!</h2>
              <p>A check-in means checking in every day about what matters to you - like sleep, feelings, and more.</p>
              {button}
            </div>
          );
          break;
        }
      case 2:
        {
          button = (
            <Button
              Listener={this.incrementPage}
              Classes="jam jam-check"
            />
          );

          page = (
            <div className="page three">
              <h2>What would you like to check in about?</h2>
              <div className="categories">
                <button className="mindful">mindfuless</button>
                <button className="sleep">sleep</button>
                <button className="food">food</button>
                <button className="fitness">fitness</button>
                <button className="med">medication</button>
              </div>

              {button}
            </div>
          );
          break;
        }
      case 3:
        {
          button = (
            <Button
              Listener={this.incrementPage}
              Classes="jam jam-arrow-right"
            />
          );

          page = (
            <div className="page four">
              <img className="bg-texture second" src={texture2} />
              <h2>Great! Who'll support you through this?</h2>
              <label htmlFor="tag-typer">
                <div id="tags">
                  <input id="tag-typer" type="text" placeholder="Add email" />
                </div>
              </label>
              <p>Don't worry if you can't think of anyone - you can always add them later.    </p>
              {button}
            </div>
          );
          break;
        }
      case 4:
        {
          button = (
            <div className="notif-buts">
              <button className="enable" onClick={this.enableNotif}>
                ENABLE
            </button>
              <button className="no" onClick={this.incrementPage}>
                NOT NOW
            </button>
            </div>
          );

          page = (
            <div className="page five">
              <h2>Turn on notifications to get reminders</h2>
              <img src={graphics2} />
              {button}
            </div>
          );
          break;
        }
      case 5:
        {
          button = (
            <button className="start" onClick={() => this.props.setOnboarding(false)}>
              I'M READY
            </button>
          );

          page = (
            <div className="page six">
              <h2>This is your space. Ready to explore it?</h2><img src={graphics1} />
              {button}
            </div>
          );
          break;
        }
    }


    return (
      <div className="onboarding">
        {page}
      </div>

    );
  }
};

export default Onboarding;