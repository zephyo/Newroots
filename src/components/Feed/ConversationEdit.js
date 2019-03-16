import React from 'react';
import StaticUserData from '../../data/StaticUserData';
import Avatar from '../Misc/Avatar';
import MediaQuery from 'react-responsive';
import SaveCancelHeader from '../Misc/SaveCancelHeader';
/*
props
 uid: this.props.uid,
      PpfURL: this.props.PpfURL,
      isMyPost: uid = this.uid
      poster: this.props.poster,
      timestamp: new Date().toString(),
      message: comment
*/
class Conversation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: props.message
    }
  }

  onChange = (e) => {
    this.setState({
      message: e.target.value
    })
  }

  checkForSubmit = (e) => {
    if (e.key === 'Enter') {
      this.props.Save(this.state.message);
    }
    else if (e.key === 'Escape') {
      this.props.Cancel();
    }
  }

  render() {
    return (
      <div>

        <MediaQuery maxDeviceWidth={1224}>
          <SaveCancelHeader
            Cancel={this.props.Cancel}
            Save={() => this.props.Save(this.state.message)}
          />
        </MediaQuery>

        <div className='comment editing'>
          <Avatar PpfURL={this.props.PpfURL} />
          <div className="bubble">
            <textarea rows="1"
              value={this.state.message}
              placeholder={StaticUserData.commentPlaceholder()}
              onChange={this.onChange}
              onKeyUp={this.checkForSubmit}
            ></textarea>
          </div>
        </div>

        <MediaQuery minDeviceWidth={1224}>
          <small>
            Press esc to <a href="#" onClick={this.props.Cancel}>cancel.</a>
          </small>
        </MediaQuery>

      </div>
    );
  }
}

export default Conversation;
