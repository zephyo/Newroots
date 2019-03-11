
import React, { Component } from 'react';
import AddCheckin from './Network/AddCheckin';
import $ from 'jquery';
import { withFirebase } from './Firebase';
import Avatar from './Misc/Avatar';
import CheckInRow from './Network/CheckinRow';
import Dropdown from './Misc/Dropdown';


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
      addMode: false,
      PpfURL: this.props.PpfURL,
    };
  }

  setEditMode = (bool) => {
    this.setState({
      editMode: bool
    });

    //TODO: save changes
    if (bool === false) {
      if ($('.profile-name').val() != this.state.name) {
        let NameVal = $('.profile-name').val();
        let BioVal = $('.profile-bio').val();
        this.setState({
          name: NameVal,
          bio: BioVal
        });
        this.props.setName(NameVal);
        this.props.setBio(BioVal);

        this.props.firebase
          .user(this.props.uid)
          .update({
            name: NameVal,
            bio: BioVal
          });
      }
    }
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

  setName = (event) => {
    this.setState({ name: event.target.value })
  }

  setBio = (event) => {
    this.setState({ bio: event.target.value })
  }

  render() {
    let cornerButton,
      pic,
      name,
      bio,
      location,
      pronouns,
      checkins,
      addQ;


    if (this.state.editMode) {
      cornerButton = (
        <button className="edit done" onClick={() => this.setEditMode(false)}>Done</button>
      );
      pic = (
        <div>
          <input type="file" accept="image/*" id="ppf-upload" onChange={this.uploadPpf} />
          <label className="edit-pic" for="ppf-upload">
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
        <input type="text" className="profile-name" onChange={this.setName} value={this.state.name}></input>
      );

      bio = (
        <input type="text" className="profile-bio" onChange={this.setBio} value={this.state.bio}></input>
      );

      location = (
        <input type="text" className="profile-bio" onChange={this.setBio} value={this.state.bio}></input>
      );

      pronouns = (
        null
      );

      checkins = (
        <ul className="your-checkins">
          {this.state.checkins.map((checkin, index) => {
            return <CheckInRow
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

      if (this.state.bio) {
        bio = <p className="profile-bio">
          {this.state.bio ? this.state.bio : null}
        </p>
      } else {
        bio = null;
      }

      if (this.state.location) {
        location = <div className="profile-location">
          <span className="jam checkicon jam-map-marker"></span>
          {this.state.location}
        </div>;
      } else {
        location = null;
      }

      if (this.state.pronouns) {
        pronouns = <div className="profile-pronouns">
          <span className="jam checkicon jam-help"></span>
          {this.state.pronouns}
        </div>;
      }
      else {
        pronouns = null;
      }


      checkins = (
        <ul className="your-checkins">
          {this.state.checkins.map(function (checkin, index) {
            return <CheckInRow
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
        {bio}
        {location}
        {pronouns}




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