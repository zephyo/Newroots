import React, { Component } from 'react';
import Conversation from './Conversation';

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }
  compare = (a, b) => {
    if (a.last_nom < b.last_nom)
      return -1;
    if (a.last_nom > b.last_nom)
      return 1;
    return 0;
  }


  render() {

    if (this.props.showComments == false) {
      return null;
    }

    let convo = [], conversation = this.props.conversation;

    for (let i = 0; i < conversation.length; i++) {
      let msg = conversation[i];
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
          null
          : convo}
      </div>
    );
  }
};

export default Comments;
