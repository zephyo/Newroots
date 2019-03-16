import React from 'react';
import Post from './Post';
import StaticUserData from '../../data/StaticUserData';

/*
  props:
  -PpfURL : string (optional)
  -name : string
  -isMyPost : bool
  -timestamp : string - e.g. a few seconds ago
  -checkinData : array
  -conversation :array
*/

class CheckinPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  Save = () => {

  }

  setEdit = (bool) => {
    this.setState({ isEditing: bool })
  }

  getContent = () => {
    if (this.state.isEditing == true) {
      // return;
    }


    let checkinData = this.props.checkinData;

    let checkins = [];

    for (var i = 0; i < checkinData.length; i++) {
      let checkin = checkinData[i];

      if (this.isCheckinVisible(checkin)) {
        continue;
      }

      let el, moodContent = null, commentContent = checkin.comment;

      switch (checkin.type) {
        case StaticUserData.QTYPE_SCALE:
          moodContent = checkin.answer;
          break;

        case StaticUserData.QTYPE_YESNO:
          moodContent =
            checkin.answer == 'yes' ?
              <div className="mood-icon">
                <span className="jam jam-check" ></span>
              </div>
              :
              <div className="mood-icon no">
                <span className="jam jam-close" ></span>
              </div>;
          break;

        case StaticUserData.QTYPE_TEXT:
          commentContent = checkin.answer;
          break;
      }

      el = (
        <div
          key={'key' + i}
          className="check-in-q">
          <div className="mood">
            <span>{checkin.q}</span>
            {moodContent}
          </div>
          <div className="content comment">{commentContent}</div>
        </div>
      );

      checkins.push(el);
    }
    return checkins;
  }

  isCheckinVisible = (checkin) => {
    return this.props.posterUid != this.props.uid &&
      (checkin.visibility == StaticUserData.VIS_PRIVATE ||
        (checkin.visibility == StaticUserData.VIS_NETWORK && this.props.yourNetwork.indexOf(this.props.posterUid) < 0));
  }

  render() {
    return <Post
      postid={this.props.postid}
      posterUid={this.props.posterUid}
      uid={this.props.uid}
      yourNetwork={this.props.yourNetwork}

      PpfURL={this.props.PpfURL}
      yourPpfURL={this.props.yourPpfURL}

      firebase={this.props.firebase}

      name={this.props.name}
      timestamp={this.props.timestamp}

      postClass='checkin'
      actionStr='checked in'
      content={this.getContent()}
      setEdit={this.setEdit}
      Save={this.Save}
    />
  }
};

export default CheckinPost;
