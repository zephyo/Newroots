import React, { Component } from 'react';


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

    return (
      <div className="leave-comment">
        <input type="text" placeholder="comment.." ref={el => this.comment = el}  onChange={this.onChange} />

        <button onClick={this.submitComment} disabled={this.state.commentBox == null}>
          <span className="jam jam-paper-plane" style={{ color: '#9FC6C1' }} ></span>
        </button>
      </div>
    );
  }
};

export default CommentBox;
