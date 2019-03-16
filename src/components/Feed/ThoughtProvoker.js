
import React from 'react';
import $ from 'jquery';


class ThoughtInput extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let name = this.props.name;
    return (
      <div className="thought-provoker">
      <h1>{"Hey "+name.substr(0,name.indexOf(' '))+"! 🌱"}</h1>
      <p>
      <span className="bold">Today's question: </span>
      <span>What have you been worried about?</span>
      </p>
      </div>
    );
  }
}


export default ThoughtInput;