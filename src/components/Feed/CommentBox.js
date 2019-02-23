import React, { Component } from 'react';
import $ from 'jquery';
import autosize from 'autosize';

/*
  {
        uid: 'fdsadsadaad'
        PpfURL: '...'
        poster: true //is message from poster,
        timestamp: '..
        message: 'hi i love'
        
      },
*/

/*
props:
      uid,
      PpfURL,
      poster,
      message,
      firebase,
      postid
*/
class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBox: null
    }
  }

  componentDidMount() {
    autosize($('textarea'));
  }

  onChange = event => {
    this.setState({ commentBox: event.target.value });
  };

  submitComment = () => {
    let comment = this.state.commentBox;

    let data = {
      uid: this.props.uid,
      PpfURL: this.props.PpfURL,
      poster: this.props.poster,
      timestamp: new Date().toString(),
      message: comment
    };

    this.props.firebase.post(this.props.postid).collection('conversation').add(data);

    this.setState({ commentBox: null });
    this.comment.value = "";
  }


  render() {
    if (this.props.showComments == false) {
      return null;
    }

    return (
      <div className="leave-comment">
        <textarea rows="1"
          placeholder="Comment.."
          ref={el => this.comment = el}
          onChange={this.onChange}></textarea>

        <button onClick={this.submitComment} disabled={this.state.commentBox == null}>
          <span className="jam jam-paper-plane" style={{ color: '#9FC6C1' }} ></span>
        </button>
      </div>
    );
  }
};

export default CommentBox;
