import React from 'react';
import ConvoBase from './ConvoBase';
import EditButton from './EditButton';
/*
props
 uid: this.props.uid,
      PpfURL: this.props.PpfURL,
      isMyPost: uid = this.uid
      poster: this.props.poster,
      timestamp: new Date().toString(),
      message: comment
*/
class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      isEditing: false
    }
  }

  setShowEdit = (bool) => {
    this.setState({ showEdit: bool })
  }

  setIsEditing = (bool) => {
    this.setState({ isEditing: bool })
  }

  deleteComment = () => {
    this.props.deleteComment(this.props.convoid);
  }

  editComment = () => {
    this.setIsEditing(true);
  }

  saveComment = (newMessage) => {
    this.props.editComment(this.props.convoid, newMessage)
    this.setIsEditing(false)
  }

  getEditOptions = () => {
    let options = [
      {
        text: 'Delete',
        onClick: this.deleteComment,
        class: 'red'
      },
      {
        text: 'Edit',
        onClick: this.editComment,
        class: 'green'
      }
    ];
    return options;
  }

  render() {
    if (this.state.isEditing) {
      return <ConversationEdit
        PpfURL={this.props.PpfURL}
        message={this.props.message}
        Save={this.saveComment}
        Cancel={() => this.setIsEditing(false)}
      />;
    }


    mouseEnter = null, mouseLeave = null;

    if (this.props.isMyPost) {
      mouseEnter = () => this.setShowEdit(true);
      mouseLeave = () => this.setShowEdit(false)
    }

    return (
      <ConvoBase
        isMyPost={this.props.isMyPost}
        PpfURL={this.props.PpfURL}
        message={this.props.message}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        optionalContent={this.state.showEdit == true ?
          <EditButton
            modalOptions={this.getEditOptions()}
          />
          : null} />);
  }
};

export default Conversation;
