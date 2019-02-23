
import React, { Component } from 'react';
import AddCheckin from './AddCheckin';
import $ from 'jquery';
import { withFirebase } from './Firebase';
import Avatar from './Avatar';

const LogoutButton = (props) => {
  return (
    <button id="logout-but"
      onClick={() => {
        props.logout();
        props.firebase.doSignOut();
      }}>logout</button>
  )
};

const LogoutButtonFB = withFirebase(LogoutButton);


const CheckInRow = (props) => {

  let el = null;
  if (props.type == 'text') {
    el = (
      <span className="jam checkicon jam-write"></span>
    );
  }
  else if (props.type == 'yes/no') {
    el = (
      <span className="jam checkicon jam-brightness"></span>
    );
  } else {
    el = (
      <span className="jam checkicon jam-ruler"></span>
    );
  }

  return <li>
    {el}
    {props.q}
    {
      props.trash ?
        <button className="delete" onClick={() => props.removeCheckinAt(props.index)}>
          <span className="jam jam-trash"></span>
        </button>
        : null
    }
  </li>;
};

class UserTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      checkins: this.props.checkins,
      name: this.props.name,
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
        this.setState({
          name: NameVal
        });
        this.props.setName(NameVal);
        this.props.firebase
          .user(this.props.uid)
          .update({
            name: NameVal
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

  render() {
    let cornerButton;
    let pic;
    let name;
    let checkins;
    let addQ;


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
        <button onClick={() => { this.setAddMode(true) }}>add more
        </button>
      );
    }

    return (
      <section className="user">
        {cornerButton}
        {pic}
        {name}
        <div className="check-in-edit">
          <h2>Your Daily Check-in</h2>
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