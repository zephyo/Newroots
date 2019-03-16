import React from 'react';
import Avatar from '../Misc/Avatar';
import CommentBox from './CommentBox';
import CommentBut from './CommentBut';
import Comments from './Comments';
import EditButton from './EditButton';
import StaticUtil from '../../data/StaticUtil';
import StaticDataModel from '../../data/StaticDataModel';

/*
  props:
-PpfURL
-yourPpfURL
-firebase
-postid
-uid
-postClass
-actionStr
-name
-timestamp
-content
-setEdit
*/

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = StaticDataModel.getPostObject([], 0, false);
  }

  componentDidMount() {
    this.props.firebase.postConversation(this.props.postid).onSnapshot((snapshot) => {

      let tempConvo = this.state.conversation;

      if (this.loadedComments()) {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            tempConvo.push(StaticDataModel.getConvoObject(doc.id, change.doc.data(), this.props.uid))
          }
          if (change.type === "modified") {
            let index = tempConvo.map(function (e) { return e.convoid; }).indexOf(doc.id);
            tempConvo[index] = StaticDataModel.getConvoObject(doc.id, change.doc.data(), this.props.uid)
          }
          if (change.type === "removed") {
            let index = tempConvo.map(function (e) { return e.convoid; }).indexOf(doc.id);
            tempConvo.splice(index, 1);
          }
        });
      }
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
      this.props.firebase.postConversation(this.props.postid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tempConvo.push(StaticDataModel.getConvoObject(doc.id, doc.data(), this.props.uid))
        });

        //at end, set state of conversation and showconversation
        tempConvo.sort(StaticUtil.compareTimestamps);

        this.setState(StaticDataModel.getPostObject(
          tempConvo,
          tempConvo.length,
          !this.state.showComments));
      });

    } else {
      this.setState({ showComments: !this.state.showComments })
    }
  }

  editPost = () => {
    this.props.setEdit();
  }

  deletePost = () => {

    //delete post thread in posts
    this.props.firebase.post(this.props.postid).delete()
      .then(() => { })
      .catch((error) => { });

    //go to everyone in props.yourNetwork and delete the post
    const network = this.props.yourNetwork;
    for (let i = 0; i < network.length; i++) {
      this.props.firebase.feed(network[i]).doc(this.props.postid).delete();
    }
  }

  mutePoster = () => {
    //add poster's uid to your blocked list
    this.props.firebase.muteList(this.props.uid)
      .doc(this.props.posterUid).set({
        exists: true
      })
      .then(() => { });
  }

  reportPost = () => {
    /* 
      send the contents and postid of the post to our customer service email
    */
  }

  getEditOptions = () => {
    //is own post
    if (this.props.posterUid == this.props.uid) {
      let options = [
        {
          text: 'Delete',
          onClick: this.deletePost,
          class: 'red'
        }
      ];
      if (this.props.setEdit != null) {
        options.push({
          text: 'Edit',
          onClick: this.editPost,
          class: 'green'
        });
      }
      return options;
    }
    //not own post
    else {
      return [
        {
          text: 'Mute',
          onClick: this.mutePoster,
          class: 'grey'
        },
        {
          text: 'Report',
          onClick: this.reportPost,
          class: 'grey'
        }
      ];
    }
  }

  editComment = (convoid, newMessage) => {
    this.props.firebase.postConversation(this.props.postid)
      .doc(convoid)
      .update({
        message: newMessage
      });
  }

  deleteComment = (convoid) => {
    this.props.firebase.postConversation(this.props.postid).doc(convoid).delete()
      .then(() => { })
      .catch((error) => { });
  }

  render() {
    return (
      <div className={this.props.postClass + " activity"}>

        <div className="header">
          <Avatar PpfURL={this.props.PpfURL} />
          <div className="name-date">
            <div><span className="name">{this.props.name}</span>
              <span className="sub">{' ' + this.props.actionStr}</span></div>
            <div><span className="date">{this.props.timestamp}</span></div>
          </div>
          <EditButton
            modalOptions={this.getEditOptions()}
          />
        </div>

        {this.props.content}

        <CommentBut
          loadComments={this.loadComments}
          commentLength={this.state.conversationLength}
        />
        <Comments
          showComments={this.state.showComments}
          conversation={this.state.conversation}
          deleteComment={this.deleteComment}
          editComment={this.editComment}
        />
        <CommentBox
          showComments={this.state.showComments}
          uid={this.props.uid}
          PpfURL={this.props.yourPpfURL}
          poster={this.props.name}
          firebase={this.props.firebase}
          postid={this.props.postid}
        />
      </div>
    );
  }
};

export default Post;
