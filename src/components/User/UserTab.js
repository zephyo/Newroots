
import React from 'react';
import $ from 'jquery';
import Avatar from '../Misc/Avatar';
import UploadProfilePicture from '../Misc/UploadProfilePicture';
import Dropdown from '../Misc/Dropdown';
import autosize from 'autosize';
import StaticUserData from '../../data/StaticUserData'
import Settings from './Settings/Settings'
import CheckinModule from './CheckinModule'


const EditInput = (props) => {
  return <div className="input-container">
    <span className="input-label">
      {props.title}
    </span>
    <input
      name={props.name}
      type="text"
      className={"profile-" + props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={this.onChangeUserInfo}>
    </input>
  </div>
}

class UserTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      name: this.props.name,
      bio: this.props.bio,
      location: this.props.location,
      pronouns: this.props.pronouns,
      checkinFreq: this.props.checkinFreq,
      PpfURL: this.props.PpfURL,
      madeChanges: false,
      showSettings: false
    };
  }

  componentDidMount() {
    autosize($('textarea'));
  }

  setEditMode = (bool) => {
    this.setState({ editMode: bool });

    if (bool === false) {
      if (this.state.madeChanges == true) {

        let { name, bio, location, pronouns } = this.state;

        this.props.setUserInfo(name, bio, location, pronouns);

        this.props.firebase
          .user(this.props.uid)
          .update({
            name: name,
            bio: bio == null ? null : bio,
            location: location == null ? null : location,
            pronouns: pronouns == null ? null : pronouns,
            checkinFreq: this.state.checkinFreq
          });

        this.setMadeChanges(false)
      }
    }
  };

  setMadeChanges = (bool) => this.setState({ madeChanges: bool });

  setShowSettings = (bool) => this.setState({ showSettings: bool });

  setCheckinFreq = (newFreq) => {
    this.setState({ checkinFreq: newFreq })
    this.setMadeChanges(true)
  }

  uploadPpf = (downloadURL) => {
    this.setState({ PpfURL: downloadURL });
    this.props.updateUserData('PpfURL', downloadURL);
  }

  onChangeUserInfo = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setMadeChanges(true)
  };

  setPronouns = (pronoun) => {
    if (pronoun == StaticUserData.NULL_KEY) {
      this.setState({ pronouns: null })
      return;
    }

    this.setState({ pronouns: pronoun })
    this.setMadeChanges(true)
  }

  render() {
    if (this.state.showSettings == true) {
      return <Settings
        firebase={this.props.firebase}
        uid={this.props.uid}
        removeUser={this.props.removeUser}
        updateUserData={this.props.updateUserData}
        goBack={() => this.setShowSettings(false)}
      />
    }

    const { pronouns, editMode, name, bio, location } = this.state;

    let cornerButtons,
      pic,
      name,
      bioEl,
      locationEl,
      pronounsEl,
      style = {};

    if (editMode) {
      style = {
        display: 'contents'
      }

      cornerButtons = (
        <div className="header">
          <button className="edit done" onClick={() => this.setEditMode(false)}>Save</button>
        </div>
      );
      pic = <UploadProfilePicture
        firebase={this.props.firebase}
        uid={this.props.uid}
        uploadPpf={this.uploadPpf}
        PpfURL={this.state.PpfURL} />;

      name = (
        <EditInput
          title='Full name'
          name='name'
          placeholder='Full name'
          value={name}
        />
      );

      bioEl = (
        <div className="input-container">
          <span className="input-label">
            About me
        </span>
          <textarea
            name="bio"
            rows="2"
            className="profile-bio"
            placeholder="Write about yourself."
            value={bio}
            onChange={this.onChangeUserInfo}>
          </textarea>
        </div>

      );

      locationEl = (
        <EditInput
          title='Location'
          name='location'
          placeholder='Where are you?'
          value={location}
        />
      );

      pronounsEl = (
        <div className="input-container">
          <span className="input-label">
            Pronouns
          </span>
          <Dropdown
            options={[
              StaticUserData.allPronouns[StaticUserData.NULL_KEY],
              StaticUserData.allPronouns[StaticUserData.FEMALE_PRONOUN],
              StaticUserData.allPronouns[StaticUserData.MALE_PRONOUN],
              StaticUserData.allPronouns[StaticUserData.NON_PRONOUN]
            ]}
            onChange={this.setPronouns}
            selected={StaticUserData.allPronouns[pronouns != null ? pronouns : StaticUserData.NULL_KEY].index}
          ></Dropdown>
        </div>
      );

    }
    else {
      cornerButtons = (
        <div className="header">
          <button className="settings" onClick={() => this.setShowSettings(true)}>
            <span className="jam jam-cog"></span>
          </button>
          <button className="edit" onClick={() => this.setEditMode(true)}>
            <span className="jam jam-pencil"></span>
          </button>
        </div>
      );

      pic = (
        <Avatar PpfURL={this.state.PpfURL} />
      );

      name = (
        <div className="profile-name">{name}</div>
      );

      if (bio != null) {
        bioEl = <p className="profile-bio">
          {bio ? bio : null}
        </p>
      }

      if (location != null) {
        locationEl = <div className="profile-location">
          <span className="jam checkicon jam-map-marker"></span>
          {location}
        </div>;
      }

      if (pronouns != null) {
        pronounsEl = <div className="profile-pronouns">
          <span className={"jam checkicon jam-" + StaticUserData.allPronouns[pronouns].icon}></span>
          {' ' + pronouns}
        </div>;
      }
    }

    return (
      <section className="user">
        {cornerButtons}
        {pic}
        {name}
        {bioEl}
        <div className="profile-footer" style={style}>
          {locationEl}
          {pronounsEl}
        </div>

        <CheckinModule
          checkins={this.props.checkins}
          checkinFreq={this.state.checkinFreq}
          firebase={this.props.firebase}
          uid={this.props.uid}
          setCheckinFreq={this.setCheckinFreq}
          editMode={this.state.editMode}
          checkinCategories={this.props.checkinCategories}
        />

      </section>
    );
  }
}


export default UserTab;