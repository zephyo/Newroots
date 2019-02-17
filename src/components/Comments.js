import React, { Component } from 'react';
import Conversation from './Conversation';

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('hi ' +this.props.showComments);

    if (this.props.showComments == false) {
      return null;
    }

    let convo = [], conversation = this.props.conversation;
    for (let i = 0; i < conversation.length; i++) {
      let msg = conversation[i];
      console.log(msg.isMyPost);
      convo.push(
        <Conversation
          PpfURL={msg.PpfURL}
          isMyPost={msg.isMyPost}
          message={msg.message}
        />
      );
    }

    return (
      <div className="all-comments">
        {convo.length === 0 ? 
        <p>No comments.</p>
        : convo}
      </div>
    );
  }
};

export default Comments;
