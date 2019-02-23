import React, { Component } from 'react';

import Avatar from '../Misc/Avatar';

/*
props
 uid: this.props.uid,
      PpfURL: this.props.PpfURL,
      isMyPost: uid = this.uid
      poster: this.props.poster,
      timestamp: new Date().toString(),
      message: comment
*/
const Conversation = (props) => {
  let classN;
  if (!props.isMyPost) {
    classN = 'reply';
  } else {
    classN = 'comment';
  }

  return (
    <div className={classN}>
      <Avatar PpfURL={props.PpfURL} />
      <div className="bubble">
        <span>{props.message}</span>
      </div>
    </div>
  );
};

export default Conversation;
