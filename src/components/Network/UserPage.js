import React from 'react';
import Avatar from '../Misc/Avatar';
import CheckInRow from './CheckinRow';
import MoreButton from '../Feed/MoreButton'

import StaticUserData from '../../data/StaticUserData'

let muteListener = null;

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState: false,
      muted: false
    }
  }

  componentDidMount() {
    this.props.firebase.checkIfMuted(this.props.myUID, this.props.theirUID,
      () => {
        this.setState({ initialState: true });
        this.setMuted(true);
      })
  }

  setMuted = (state) => this.setState({ muted: state });

  getMoreOptions = () => {
    let options = [
      {
        text: 'Report ' + this.props.name,
        onClick: () => this.props.firebase.reportPoster(this.props.myUID,
          this.props.theirUID),
        class: 'grey'
      }
    ];
    if (this.state.muted == true) {
      options.push(
        {
          text: 'Unmute ' + this.props.name,
          onClick: () => this.setMuted(false),
          class: 'grey'
        });
    } else {
      options.push(
        {
          text: 'Mute ' + this.props.name,
          onClick: () => this.setMuted(true),
          class: 'grey'
        });
    }
    return options;
  }


  inNetwork = (myUID, theirNetwork) => {
    return theirNetwork.indexOf(myUID) > -1;
  }

  Close = () => {
    if (this.state.initialState != this.state.muted) {
      if (this.state.muted) {
        this.props.firebase.mutePoster(this.props.myUID,
          this.props.theirUID,
          this.props.closeUserPage)
      } else {
        this.props.firebase.unmutePoster(this.props.myUID,
          this.props.theirUID,
          this.props.closeUserPage)
      }
    } else {
      this.props.closeUserPage();
    }
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
          <span className={"jam checkicon jam-" + StaticUserData.allPronouns[pronouns].icon}></span>
          {pronouns}
        </p>
    }


    return (
      <div className="modal user-page">
        <button className="close" onClick={this.Close}>
          <span className="jam jam-close"></span>
        </button>

        <Avatar PpfURL={PpfURL}
          content={null}
        />

        <div className="profile-name">
          <span>{name}</span>
          <MoreButton
            modalOptions={this.getMoreOptions()}
          />
        </div>
        <div className="flex-row">
          {locationEl}
          {pronounEl}
        </div>

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

      </div>
    );
  }
}

export default UserPage;