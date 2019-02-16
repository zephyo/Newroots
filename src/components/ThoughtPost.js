import React, { Component } from 'react';
import Avatar from './Avatar';

/*

props:
 -PpfURL : string (optional)
  -name : string
  -isMyPost : bool
  -timestamp : string - e.g. a few seconds ago
  -conversation : array

  - example of conversation: 
    [
      {
        uid: 'fdsadsadaad'
        PpfURL: '...'
        poster: true //is message from poster
        message: 'hi i love'
        
      },
     ...
    ]

*/

const Conversation = (props) => {
  let classN;
  if (props.poster){
    classN = 'reply';
  }else{
    classN = 'comment';
  }

  return (
    <div className={classN}>
      <Avatar PpfURL={props.PpfURL} />
      <span>{props.message}</span>
    </div>
  );
};

class ThoughtPost extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let editButton = null;
    if (this.props.isMyPost) {
      editButton = (
        <button className="user-edit">
          <span className="jam jam-pencil" style={{ color: '#EFF0DA' }}></span>
        </button>
      );
    }

    let convo = [];
    for (var i = 0; i< this.props.conversation; i++){
      let msg = this.props.conversation[i];
      convo.push (
        <Conversation
          PpfURL =  {msg.PpfURL}
          poster = {msg.poster}
          message = {msg.message}
         />
      );
    }

    return (
      <div className="thought activity">
        <div className="header">
          <Avatar PpfURL={this.props.PpfURL} />
          <div className="name-date">
            <div><span className="name">{this.props.name}</span><span className="sub">&nbsp;updated</span></div>
            <div><span className="date">{this.props.timestamp}</span></div>
          </div>

          {editButton}

        </div>
            {convo}
            
        <div className="leave-comment">
          <input type="text" placeholder="comment.." />
          <button><span className="jam jam-paper-plane" style={{ color: '#9FC6C1' }}></span></button>
        </div>
      </div>
    );
  }
}

export default ThoughtPost;
