import React from 'react';


class SaveCancelHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <button onClick={this.props.Cancel}>Cancel</button>
        <button onClick={this.props.Save} disabled={this.props.disabled}>Save</button>
      </div>
    );
  }
}


export default SaveCancelHeader;