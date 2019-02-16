import React, { Component } from 'react';
import Avatar from './Avatar';



/*
  props:
  -PpfURL : string (optional)
  -name : string
  -isMyPost : bool
  -timestamp : string - e.g. a few seconds ago
  -checkinData : array

  - example of checkinData: 
    [
      {
        q: 'How are you feeling today?'
        type: 'range'
        answer: '5',
        comment: 'hi'
      },
      {
        q: 'Did you take your medication?'
        type: 'yes/no'
        answer: 'yes'
        comment: 'hi'
      },
      {
        q: 'u gey?'
        type: 'text'
        answer: 'dsadsdsaadadada'
      }
    ]
*/
class CheckinPost extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let editButton = null;
    if (this.props.isMyPost) {
      editButton = (
        <button className="user-edit">
          <span className="jam jam-pencil" style={{ color: '#EFF0DA' }}></span>
        </button>
      );
    }

    let checkins = [];

    for (var i = 0; i < checkinData.length; i++) {
      let checkin = checkinData[i];
      let el = null;

      if (checkin.type == 'range') {
        el = (
          <div>
            <div className="mood">
              <span>{checkin.q} </span>
              <div className="mood-icon">{checkin.answer}</div>
            </div>
            <div className="content">{checkin.comment}</div>
          </div>
        );
      }
      else if (checkin.type == 'yes/no') {
        el = (
          <div>
            <div className="mood">
              <span>{checkin.q}</span>
              {checkin.answer == 'yes' ?
                <div className="mood-icon">
                  <span className="jam jam-check" style={{ color: '#EFF0DA' }}>

                  </span>
                </div>
                :
                <div className="mood-icon">
                  <span className="jam jam-close" style={{ color: '#EFF0DA' }}>

                  </span>
                </div>
              }
            </div>
            <div className="content">{checkin.comment}</div>
          </div>
        );
      }
      else if (checkin.type == 'text') {
        el = (
          <div>
            <div className="mood">
              <span>{checkin.q} </span>
            </div>
            <div className="content">{checkin.comment}</div>
          </div>
        );
      }
      checkins.push(el);
    }

    return (
      <div className="checkin activity">
        <div className="header">
          <Avatar PpfURL={this.props.PpfURL} />
          <div className="name-date">
            <div><span className="name">{this.props.name}</span>
              <span className="sub">&nbsp;checked in</span></div>
            <div><span className="date">{this.props.timestamp}</span></div>
          </div>
          {editButton}
        </div>
        <div className="content">

          {checkins}

        </div>
        <div className="leave-comment">
          <input type="text" placeholder="comment.." />
          <button><span className="jam jam-paper-plane" style={{ color: '#9FC6C1' }}></span></button>
        </div>
      </div>
    );
  }
};

export default CheckinPost;
