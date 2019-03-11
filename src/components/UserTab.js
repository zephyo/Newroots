
import React, { Component } from 'react';
import AddCheckin from './Network/AddCheckin';
import $ from 'jquery';
import { withFirebase } from './Firebase';
import Avatar from './Misc/Avatar';
import CheckInRow from './Network/CheckinRow';
import Dropdown from './Misc/Dropdown';
import autosize from 'autosize';


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

let NULL_PRONOUN = 'Select..',
  FEMALE_PRONOUN = 'She / her',
  MALE_PRONOUN = 'He / him',
  NON_PRONOUN = 'They / them';

let allPronouns = {};

allPronouns[NULL_PRONOUN] =
  {
    text: NULL_PRONOUN,
    icon: 'help',
    index: 0
  };

allPronouns[FEMALE_PRONOUN] =
  {
    text: FEMALE_PRONOUN,
    icon: 'female',
    index: 1
  };

allPronouns[MALE_PRONOUN] =
  {
    text: MALE_PRONOUN,
    icon: 'male',
    index: 2
  };

allPronouns[NON_PRONOUN] =
  {
    text: NON_PRONOUN,
    icon: 'triangle',
    index: 3
  };


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
      addMode: false,
      PpfURL: this.props.PpfURL,
      madeChanges: false
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
      if (this.state.madeChanges) {

        this.props.setUserInfo(this.state.name, this.state.bio, this.state.location, this.state.pronouns);

        this.props.firebase
          .user(this.props.uid)
          .update({
            name: this.state.name,
            bio: this.state.bio,
            location: this.state.location,
            pronouns: this.state.pronouns
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
    if (pronoun == NULL_PRONOUN) {
      this.setState({ pronouns: null })
      return;
    }

    this.setState({ pronouns: pronoun })
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
      addQ;


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
        <input
          name="name"
          type="text"
          className="profile-name"
          onChange={this.onChangeUserInfo}
          value={this.state.name}></input>
      );

      bioEl = (
        <textarea
          name="bio"
          rows="2"
          className="profile-bio"
          placeholder="Bio"
          value={this.state.bio}
          onChange={this.onChangeUserInfo}>
        </textarea>
      );

      locationEl = (
        <input
          name="location"
          type="text"
          className="profile-location"
          onChange={this.onChangeUserInfo}
          value={this.state.location}></input>
      );

      pronounsEl = (
        <Dropdown
          options={[
            allPronouns[NULL_PRONOUN],
            allPronouns[FEMALE_PRONOUN],
            allPronouns[MALE_PRONOUN],
            allPronouns[NON_PRONOUN]
          ]}
          onChange={this.setPronouns}
          selected={allPronouns[pronouns != null ? pronouns : NULL_PRONOUN].index}
        ></Dropdown>
      );

      checkins = (
        <ul className="your-checkins">
          {this.state.checkins.map((checkin, index) => {
            return <CheckInRow
              key={'key' + index}
              q={checkin.q}
              removeCheckinAt={this.removeCheckinAt}
              index={index}
              trash={true}
              type={checkin.type}
            />;
          })}
        </ul>
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
          <span className={"jam checkicon jam-" + allPronouns[pronouns].icon}></span>
          {' ' + pronouns}
        </div>;
      }
      else {
        pronounsEl = null;
      }


      checkins = (
        <ul className="your-checkins">
          {this.state.checkins.map(function (checkin, index) {
            return <CheckInRow
              key={'key' + index}
              q={checkin.q}
              trash={false}
              type={checkin.type}
            />;
          })}
        </ul>
      );
    }

    if (this.state.addMode) {
      addQ = (
        <AddCheckin
          setAddMode={this.setAddMode}
          uid={this.props.uid}
          addCheckin={this.addCheckin}
        />
      );
    } else {
      addQ = (
        <button className="add-checkin" onClick={() => { this.setAddMode(true) }}>Add check-in
        </button>
      );
    }

    let freq;
    freq = (
      <button onClick={() => {

      }} className="freq dropdown">
        Every day
        <span className="jam jam-chevron-down"></span>
      </button>
    );


    return (
      <section className="user">
        {cornerButton}
        {pic}
        {name}
        {bioEl}
        {locationEl}
        {pronounsEl}




        <div className="check-in-edit">
          <h2>Your check-in</h2>


          <h3>Check-in frequency</h3>
          {freq}

          <h3>Check-in questions</h3>
          {checkins}
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