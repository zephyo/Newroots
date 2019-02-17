import React, { Component } from 'react';
import Avatar from './Avatar';
import CommentBox from './CommentBox';
import CommentBut from './CommentBut';
import Comments from './Comments';
import Conversation from './Conversation';

/*

props:
 -PpfURL : string (optional)
  -name : string
  -isMyPost : bool
  -timestamp : string - e.g. a few seconds ago
  -thought
  -conversation : array

  - example of conversation: 
    [
      {
        uid: 'fdsadsadaad'
        PpfURL: '...'
        poster: true //is message from poster,
        timestamp: '..
        message: 'hi i love'
        
      },
     ...
    ]

*/
let convoListen;

class ThoughtPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      conversationLength: 0,
      showComments: false
    }
  }
  componentDidMount() {

    convoListen = this.props.firebase.posts().doc(this.props.postid).collection("conversation").onSnapshot((snapshot) => {

      let tempConvo = this.state.conversation;

      if (this.loadedComments()) {

        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let dat = change.doc.data();
            tempConvo.push({
              uid: dat.uid,
              isMyPost: dat.uid == this.props.uid,
              PpfURL: dat.PpfURL,
              poster: dat.poster,
              timestamp: dat.timestamp,
              message: dat.message
            })
          }

        });
      }
      console.log(tempConvo);
      this.setState({
        conversation: tempConvo,
        conversationLength: snapshot.size
      });

    });

  }
  componentWillUnmount() {
    //convoListen.detach();
  }

  loadedComments = () => {
    return this.state.conversation.length !== 0;
  }

  compare = (a, b) => {
    if (a.timestamp < b.timestamp)
      return -1;
    if (a.timestamp > b.timestamp)
      return 1;
    return 0;
  }

  loadComments = () => {

    if (!this.loadedComments()) {

      //load comments
      let tempConvo = [];

      //get once snapshot
      this.props.firebase.posts().doc(this.props.postid).collection("conversation").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let dat = doc.data();
          tempConvo.push({
            uid: dat.uid,
            isMyPost: dat.uid == this.props.uid,
            PpfURL: dat.PpfURL,
            poster: dat.poster,
            timestamp: dat.timestamp,
            message: dat.message
          })
        });

        //at end, set state of conversation and showconversation

        tempConvo.sort(this.compare);

        this.setState({
          conversation: tempConvo,
          conversationLength: tempConvo.length,
          showComments: !this.state.showComments
        });
      });


    } else {
      this.setState({ showComments: !this.state.showComments })
    }
  }


  render() {
    let editButton = null;
    if (this.props.posterUid == this.props.uid) {
      editButton = (
        <button className="user-edit">
          <span className="jam jam-pencil" style={{ color: '#8a8184' }}></span>
        </button>
      );
    }
    console.log('this.props.ismypost' + this.props.posterUid + " \n " + this.props.uid);
    let thought = (
      <Conversation
        isMyPost={this.props.posterUid == this.props.uid}
        PpfURL={this.props.PpfURL}
        message={this.props.thought}
      />
    );

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

        {thought}


        <CommentBut
          loadComments={this.loadComments}
          commentLength={this.state.conversationLength}
        />
        <Comments
          showComments={this.state.showComments}
          conversation={this.state.conversation}
        />
        <CommentBox
          uid={this.props.uid}
          PpfURL={this.props.yourPpfURL}
          poster={this.props.name}
          firebase={this.props.firebase}
          postid={this.props.postid}
        />
      </div>
    );
  }
}

export default ThoughtPost;
