import React, { Component } from 'react';
import Avatar from '../Misc/Avatar';
import CheckInRow from './CheckinRow';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let checkinData = [
      {
        q: 'hi there this a q',
        type: 'text'
      }
    ];
    let checkins = (
      <ul className="your-checkins">
        {checkinData.map(function (checkin, index) {
          return <CheckInRow
            q={checkin.q}
            trash={false}
            type={checkin.type}
          />;
        })}
      </ul>
    );


    return (
      <div className="modal user-page">
        <button className="close" onClick={() => this.props.closeUserPage()}>
          <span className="jam jam-close"></span>
        </button>

        <Avatar PpfURL={this.props.PpfURL}
          content={null
          }
        />

        <div className="profile-name">{this.props.name}</div>


        <div className="profile-location">
          <span className="jam checkicon jam-map-marker"></span>
          {this.props.location}
        </div>

        <p className="profile-bio"> {this.props.bio}</p>

        <div className="action-buts">
          <button
            onClick={() => {
            }}>
            <span className="jam checkicon jam-message"></span>
            Add friend
          </button>

          <button
            onClick={() => {
            }}>
            <span className="jam checkicon jam-map-marker"></span>
            Message
          </button>

        </div>


        <div className="check-in-edit">
          <h2>Their check-in</h2>

          <h3>Check-in questions</h3>
          {checkins}
        </div>



        <button
          onClick={() => {
          }}>
          Report abuse
          </button>

      </div>
    );
  }
}

export default UserPage;