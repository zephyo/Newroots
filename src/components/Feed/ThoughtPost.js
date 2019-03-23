import React from 'react';
import ConvoBase from './ConvoBase';
import ConversationEdit from './ConversationEdit';
import Post from './Post';
/*

props:
  -PpfURL : string (optional)
  -name : string
  -isMyPost : bool
  -timestamp : string - e.g. a few seconds ago
  -thought
  -conversation : array
*/

class ThoughtPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  Save = (message) => {
    this.props.firebase
      .post(this.props.postid)
      .update({
        thought: message
      });
    this.setEdit(false);
  }

  setEdit = (bool) => {
    this.setState({ isEditing: bool })
  }

  getContent = () => {
    if (this.state.isEditing == true) {
      return <ConversationEdit
        PpfURL={this.props.PpfURL}
        message={this.props.thought}
        Save={this.Save}
        Cancel={() => this.setEdit(false)}
      />;
    }

    return <ConvoBase
      isMyPost={this.props.posterUid == this.props.uid}
      PpfURL={this.props.PpfURL}
      message={this.props.thought}
    />;

  }

  render() {
    return <Post
      postid={this.props.postid}
      posterUid={this.props.posterUid}
      uid={this.props.uid}
      yourNetwork={this.props.yourNetwork}

      PpfURL={this.props.PpfURL}
      yourPpfURL={this.props.yourPpfURL}

      firebase={this.props.firebase}

      name={this.props.name}
      timestamp={this.props.timestamp}

      postClass='thought'
      actionStr='updated'

      content={this.getContent()}
      setEdit={this.setEdit}
      Save={this.Save}
    />
  }
}

export default ThoughtPost;
