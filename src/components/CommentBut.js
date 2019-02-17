import React, { Component } from 'react';


/*
loadComments
commentLength
*/

class CommentBut extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <button
        onClick = {this.props.loadComments}
        className="comment-but">
        <span className="jam jam-message-alt" ></span>
        <span>{this.props.commentLength + ' comments'}</span>
      </button>
    );
  }
};

export default CommentBut;
