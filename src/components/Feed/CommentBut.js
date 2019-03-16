import React from 'react';


/*
loadComments
commentLength
*/

class CommentBut extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let style;
    let commentSubstr = " comments";
    let disabled = this.props.commentLength === 0;
    if (disabled) {
      style = {
        opacity: '0.6',
        filter: 'saturation(0%)'
      };
    }
    if (this.props.commentLength === 1) {
      commentSubstr = " comment";
    }

    return (
      <button
        onClick={this.props.loadComments}
        style={style}
        className="comment-but"
        >
        <span className="jam jam-message-alt" ></span>
        <span>{this.props.commentLength + commentSubstr}</span>
        <span className="jam checkicon jam-chevron-down"></span>
      </button>
    );
  }
};

export default CommentBut;
