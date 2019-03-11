
import React, { Component } from 'react';
import Dropdown from '../Misc/Dropdown';

const INITIAL_STATE = {
  q: '',
  type: 'text',
};

const options = [
  {
    icon: 'write',
    text: 'Text'
  },
  {
    icon: 'brightness',
    text: 'Yes/No'
  },
  {
    icon: 'ruler',
    text: 'Scale'
  },

];

class AddCheckin extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setType = (type) => {
    this.setState({ type: type.toLowerCase() });
  }

  onSubmit = () => {
    this.props.setAddMode(false);
    this.props.addCheckin({
      q: this.state.q,
      type: this.state.type
    });
  }

  onCancel = () => {
    this.props.setAddMode(false);
  }

  render() {
    const { q } = this.state;


    const isInvalid = q === '';


    return (
      <div className="add-panel">
        <h2>Add check-in</h2>
        <h3>Question</h3>
        <textarea
          id="check-in"
          name="q"
          placeholder="What'd you like to check in about?"
          value={q}
          onChange={this.onChange}>
        </textarea>
        <h3>Question type</h3>


        <Dropdown
          options = {options}
          onChange= {this.setType}
          ></Dropdown>


        <div className="yesno">
          <button className="yes" onClick={this.onSubmit} disabled={isInvalid}>
            Submit</button>
          <button className="no" onClick={this.onCancel}>
           Cancel</button>
        </div>
      </div>
    );
  }
}


export default AddCheckin;