
import React, { Component } from 'react';
import AddCheckin from './Network/AddCheckin';
import $ from 'jquery';
import { withFirebase } from './Firebase';
import Avatar from './Misc/Avatar';
import CheckInRow from './Network/CheckinRow';
import Dropdown from './Misc/Dropdown';
import autosize from 'autosize';
import StaticUserData from '../data/StaticUserData'

const LogoutButton = (props) => {
  return (
    <button id="logout-but"
      onClick={() => {
        props.logout();
        props.firebase.doSignOut();
      }}>Logout</button>
  )
};

const LogoutButtonFB = withFirebase(LogoutButton);


class UserTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      checkins: this.props.checkins,
      name: this.props.name,
      bio: this.props.bio,
      location: this.props.location,
      pronouns: this.props.pronouns,
      checkinFreq: this.props.checkinFreq,
      addMode: false,
      PpfURL: this.props.PpfURL,
      madeChanges: false,

    };
  }

  componentDidMount() {
    autosize($('textarea'));
  }


  setEditMode = (bool) => {
    this.setState({
      editMode: bool
    });


    //TODO: save changes
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

  setMadeChanges = (bool) => {
    this.setState({
      madeChanges: bool
    });
  };


  setAddMode = (bool) => {
    this.setState({
      addMode: bool
    });
  };

  addCheckin = (obj) => {
    let arr = this.state.checkins;
    arr.push(obj);
    this.setState({ checkins: arr });
    this.props.setCheckins(arr);

    this.props.firebase
      .user(this.props.uid)
      .update({
        checkins: arr
      });
  }

  removeCheckinAt = (index) => {
    let arr = this.state.checkins;
    arr.splice(index, 1);
    this.setState({ checkins: arr });
    this.props.setCheckins(arr);

    this.props.firebase
      .user(this.props.uid)
      .update({
        checkins: arr
      });
  }

  uploadPpf = (event) => {
    let firstFile = event.target.files[0] // upload the first file only
    let task = this.props.firebase.photos(this.props.uid).put(firstFile);

    task.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    }, (error) => {
      // Handle unsuccessful uploads
    }, () => {
      // Handle successful uploads on complete
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {

        this.props.firebase
          .user(this.props.uid)
          .update({
            PpfURL: downloadURL
          });

        this.setState({ PpfURL: downloadURL });
        this.props.setPpfURL(downloadURL);
      });
    });
  }

  onChangeUserInfo = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setMadeChanges(true)
  };

  setPronouns = (pronoun) => {
    if (pronoun == StaticUserData.NULL_PRONOUN) {
      this.setState({ pronouns: null })
      return;
    }

    this.setState({ pronouns: pronoun })
    this.setMadeChanges(true)
  }

  setCheckinFreq = (triggeredIndex) => {
    let tempFreq = this.state.checkinFreq;

    tempFreq[triggeredIndex] = !tempFreq[triggeredIndex];

    this.setState({ checkinFreq: tempFreq })
    this.setMadeChanges(true)
  }

  render() {
    const { pronouns } = this.state;


    let cornerButton,
      pic,
      name,
      bioEl,
      locationEl,
      pronounsEl,
      checkins,
      addQ,
      freq;


    if (this.state.editMode) {
      cornerButton = (
        <button className="edit done" onClick={() => this.setEditMode(false)}>Done</button>
      );
      pic = (
        <div>
          <input type="file" accept="image/*" id="ppf-upload" onChange={this.uploadPpf} />
          <label className="edit-pic" htmlFor="ppf-upload">
            <Avatar PpfURL={this.state.PpfURL}
              content={
                <div className="edit-pic-but">
                  <span className="jam jam-pencil"></span>
                </div>
              }
            />
          </label>
        </div>
      );
      name = (
        <div className="input-container">
          <span className="input-label">
            Full name
        </span>
          <input
            name="name"
            type="text"
            className="profile-name"
            placeholder="Full name"
            onChange={this.onChangeUserInfo}
            value={this.state.name}></input>
        </div>

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
            value={this.state.bio}
            onChange={this.onChangeUserInfo}>
          </textarea>
        </div>

      );

      locationEl = (
        <div className="input-container">
          <span className="input-label">
            Location
        </span>
          <input
            name="location"
            type="text"
            className="profile-location"
            placeholder="Where are you?"
            onChange={this.onChangeUserInfo}
            value={this.state.location}></input>

        </div>

      );

      pronounsEl = (
        <div className="input-container">
          <span className="input-label">
            Pronouns
          </span>
          <Dropdown
            options={[
              StaticUserData.allPronouns[StaticUserData.NULL_PRONOUN],
              StaticUserData.allPronouns[StaticUserData.FEMALE_PRONOUN],
              StaticUserData.allPronouns[StaticUserData.MALE_PRONOUN],
              StaticUserData.allPronouns[StaticUserData.NON_PRONOUN]
            ]}
            onChange={this.setPronouns}
            selected={StaticUserData.allPronouns[pronouns != null ? pronouns : StaticUserData.NULL_PRONOUN].index}
          ></Dropdown>
        </div>
      );

      let freqButtons = StaticUserData.getDaysOfWeek().map((item, index) => {
        let className = "";
        if (this.state.checkinFreq[index] == false) {
          className = "disable";
        }
        return <button
          key={'freq_' + index}
          className={className}
          onClick={() => this.setCheckinFreq(index)}>
          {item}
        </button>;
      }
      );
      freq = (
        <div className="freq-days">
          {freqButtons}
        </div>
      );

    }
    else {
      cornerButton = (
        <button className="edit" onClick={() => this.setEditMode(true)}><span className="jam jam-pencil" style={{ color: '#9FC6C1' }}></span></button>
      );
      pic = (
        <Avatar PpfURL={this.state.PpfURL} />
      );
      name = (
        <div className="profile-name">{this.state.name}</div>
      );

      if (this.state.bio != null) {
        bioEl = <p className="profile-bio">
          {this.state.bio ? this.state.bio : null}
        </p>
      } else {
        bioEl = null;
      }

      if (this.state.location != null) {
        locationEl = <div className="profile-location">
          <span className="jam checkicon jam-map-marker"></span>
          {this.state.location}
        </div>;
      } else {
        locationEl = null;
      }


      if (pronouns != null) {

        pronounsEl = <div className="profile-pronouns">
          <span className={"jam checkicon jam-" + StaticUserData.allPronouns[pronouns].icon}></span>
          {' ' + pronouns}
        </div>;
      }
      else {
        pronounsEl = null;
      }


      let freqButtons = StaticUserData.getDaysOfWeek().map((item, index) => {
        let className = "";
        if (this.state.checkinFreq != null && this.state.checkinFreq[index] == false) {
          className = "disable";
        }
        return <div
          key={'freq_' + index}
          className={className}>
          {item}
        </div>;
      }
      );
      freq = (
        <div className="freq-days">
          {freqButtons}
        </div>
      );
    }

    if (this.state.addMode) {
      addQ = (
        <AddCheckin
          setAddMode={this.setAddMode}
          uid={this.props.uid}
          addCheckin={this.addCheckin}
          categories={this.props.checkinCategories}
        />
      );
    } else {
      addQ = (
        <button className="add-checkin" onClick={() => { this.setAddMode(true) }}>Add check-in
        </button>
      );
    }

    checkins = {};
    for (let i = 0; i < this.state.checkins.length; i++) {
      let checkin = this.state.checkins[i];

      if (checkin.category == null || checkin.category == '') {
        checkin.category = 'misc';
      }

      if (!(checkin.category in checkins)) {
        checkins[checkin.category] = [];
      }

      checkins[checkin.category].push(
        <CheckInRow
          checkin={checkin}
          removeCheckinAt={this.removeCheckinAt}
          index={i}
          trash={this.state.editMode}
        />
      );
    }

    let checkinsEl = [];
    for (let category in checkins) {
      checkinsEl.push(
        <div className={"qcat " + category}>
          <h2>{category}</h2>
          <ul className="your-checkins">
            {checkins[category]}
          </ul>
        </div>
      );
    }

    // console.log(JSON.stringify(checkinsEl));

    let style = {};
    if (this.state.editMode) {
      style = {
        display: 'contents'
      }
    }

    return (
      <section className="user">
        {cornerButton}
        {pic}
        {name}
        {bioEl}
        <div className="profile-footer" style={style}>
          {locationEl}
          {pronounsEl}
        </div>




        <div className="check-in-edit">
          <h2>Your check-in</h2>


          <h3>Check-in frequency</h3>
          {freq}

          <h3>Check-in questions</h3>
          <div className="checkinQs">
            {checkinsEl}
          </div>
          {addQ}
        </div>
        <LogoutButtonFB
          logout={this.props.logout}
        />

      </section>
    );
  }
}


export default UserTab;