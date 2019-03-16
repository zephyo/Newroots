import React from 'react';
import Avatar from '../Misc/Avatar';
import CheckInRow from './CheckinRow';

import StaticUserData from '../../data/StaticUserData'

class UserPage extends React.Component {
  constructor(props) {
    super(props);
  }

  inNetwork = (myUID, theirNetwork) => {
    return theirNetwork.indexOf(myUID) > -1;
  }

  render() {
    const {
      name,
      checkins,
      network,
      location,
      myUID,
      bio,
      pronouns,
      PpfURL,
    } = this.props;

    let checkinsEl = [];
    if (checkins != null) {
      for (let i = 0; i < checkins.length; i++) {
        const checkin = checkins[i];

        if (checkin.visibility == StaticUserData.VIS_PUBLIC ||
          (checkin.visibility == StaticUserData.VIS_NETWORK && this.inNetwork(myUID, network))) {
          checkinsEl.push(
            <CheckInRow
              checkin={checkin}
              trash={false}
            />
          );
        }
      }
    }

    let locationEl = null,
      bioEl = null,
      pronounEl = null;

    if (location != null) {
      locationEl =
        <div className="profile-location">
          <span className="jam checkicon jam-map-marker"></span>
          {location}
        </div>;
    }

    if (bio != null) {
      bioEl = <p className="profile-bio"> {bio}</p>
    }

    if (pronouns != null) {
      pronounEl =
        <p className="profile-pronoun">
          <span className={"jam checkicon jam-" + StaticUserData.allPronouns[pronouns]}></span>
          {pronouns}
        </p>
    }


    return (
      <div className="modal user-page">
        <button className="close" onClick={() => this.props.closeUserPage()}>
          <span className="jam jam-close"></span>
        </button>

        <Avatar PpfURL={PpfURL}
          content={null}
        />

        <div className="profile-name">{name}</div>

        {locationEl}
        {pronounEl}
        {bioEl}

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
          <ul className="your-checkins">
            {checkinsEl}
          </ul>
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