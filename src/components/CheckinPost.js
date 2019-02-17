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
  -checkinData : array

  -conversation :array

  - example of checkinData: 
    [
      {
        q: 'How are you feeling today?'
        type: 'range'
        answer: '5',
        comment: 'hi'
      },
      {
        q: 'Did you take your medication?'
        type: 'yes/no'
        answer: 'yes'
        comment: 'hi'
      },
      {
        q: 'u gey?'
        type: 'text'
        answer: 'dsadsdsaadadada'
      }
    ]
*/
class CheckinPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      conversationLength: 0,
      showComments: false
    }
  }
  componentDidMount() {

    this.props.firebase.posts().doc(this.props.postid).collection("conversation").onSnapshot((snapshot) => {

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

  loadedComments = () => {
    return this.state.conversation.length !== 0;
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
          console.log('id ' + dat.uid + '\n' + this.props.uid);
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

    let checkinData = this.props.checkinData;

    let editButton = null;
    if (this.props.posterUid == this.props.uid) {
      editButton = (
        <button className="user-edit">
          <span className="jam jam-pencil" style={{ color: '#EFF0DA' }}></span>
        </button>
      );
    }

    let checkins = [];

    for (var i = 0; i < checkinData.length; i++) {
      let checkin = checkinData[i];
      let el = null;

      if (checkin.type == 'range') {
        el = (
          <div>
            <div className="mood">
              <span>{checkin.q} </span>
              <div className="mood-icon">{checkin.answer}</div>
            </div>
            <div className="content">{checkin.comment}</div>
          </div>
        );
      }
      else if (checkin.type == 'yes/no') {
        el = (
          <div>
            <div className="mood">
              <span>{checkin.q}</span>
              {checkin.answer == 'yes' ?
                <div className="mood-icon">
                  <span className="jam jam-check" style={{ color: '#EFF0DA' }}>

                  </span>
                </div>
                :
                <div className="mood-icon">
                  <span className="jam jam-close" style={{ color: '#EFF0DA' }}>

                  </span>
                </div>
              }
            </div>
            <div className="content">{checkin.comment}</div>
          </div>
        );
      }
      else if (checkin.type == 'text') {
        el = (
          <div>
            <div className="mood">
              <span>{checkin.q} </span>
            </div>
            <div className="content">{checkin.answer}</div>
          </div>
        );
      }
      checkins.push(el);
    }

    return (
      <div className="checkin activity">
        <div className="header">
          <Avatar PpfURL={this.props.PpfURL} />
          <div className="name-date">
            <div><span className="name">{this.props.name}</span>
              <span className="sub">&nbsp;checked in</span></div>
            <div><span className="date">{this.props.timestamp}</span></div>
          </div>
          {editButton}
        </div>
        <div className="content">

          {checkins}

        </div>

    
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
          PpfURL={this.props.PpfURL}
          poster={this.props.name}
          firebase={this.props.firebase}
          postid={this.props.postid}
        />
      </div>
    );
  }
};

export default CheckinPost;
