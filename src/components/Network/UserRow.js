import React from 'react';

/*
props:
  onProfileClick
  PpfURL
  name
  rightElement
*/
class UserRow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="friend">
        <a href="#" onClick={this.props.onProfileClick}>
          <Avatar PpfURL={this.props.PpfURL} />
          <span>{this.props.name}</span>
        </a>
       {this.props.rightElement}
      </div>
    );
  }
}

export default UserRow;