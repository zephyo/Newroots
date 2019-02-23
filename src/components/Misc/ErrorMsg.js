
import React, { Component } from 'react';


class ErrorMsg extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="error-msg">
        <img src={this.props.src}></img>
        <h2>{this.props.header}</h2>
        <p>{this.props.msg}</p>
      </div>
    );
  }
}


export default ErrorMsg;