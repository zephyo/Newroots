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
let convoListen;

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
    this.state = {
        conversation:[]
    }
  }
  componentDidMount() {
      var tempConvo = [];
      const element = this;
      console.log(this.props.postid);
      //convoListen = this.props.firebase.posts().onSnapshot(function (snapshot) {
    convoListen = this.props.firebase.posts().doc("fPvjGYDN7KtooEEP9gFH").collection("conversation").onSnapshot(function (snapshot) {
        //var cities = [];
        snapshot.forEach(function(doc) {
            console.log(doc.id);
            tempConvo.push({
                    uid: doc.data().uid,
                    PpfURL: '...',
                    poster: doc.data().poster,
                    message: doc.data().message,
                })
            });
            console.log(tempConvo);
            element.setState(prevState => ({
                //conversation: element.state.conversation.concat(tempConvo)
                conversation:tempConvo
            }))
      
      });
        /*this.props.firebase.post(this.props.postid).collection("conversation")
            .onSnapshot(function(snapshot) {
            
            //snapshot.docChanges().forEach(function(change) {
            console.log("snapshot " + snapshot.size);
            snapshot.forEach(function(doc) {
                //cities.push(doc.data().name);
                console.log("id " + doc.id);
                tempConvo.push({
                    uid: doc.data().uid,
                    PpfURL: '...',
                    poster: doc.data().poster,
                    message: doc.data().message,
                })
            });
            console.log(tempConvo);
            element.setState(prevState => ({
                //conversation: element.state.conversation.concat(tempConvo)
                conversation:tempConvo
            }))
      });*/

  }
componentWillUnmount(){
    //convoListen.detach();
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
    for (var i = 0; i< this.state.conversation; i++){
      let msg = this.state.conversation[i];
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
