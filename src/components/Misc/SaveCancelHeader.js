import React from 'react';


class SaveCancelHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header flex-row">
        <button onClick={this.props.Cancel}>Cancel</button>
        <button 
        className="flex-child-left"
        onClick={this.props.Save} disabled={this.props.disabled}>Save</button>
      </div>
    );
  }
}


export default SaveCancelHeader;