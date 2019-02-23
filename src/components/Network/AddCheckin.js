
import React, { Component } from 'react';

const INITIAL_STATE = {
  q: '',
  type: 'text',
  dropdown: false
};

class AddCheckin extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setType = (type) => {
    this.setState({ type: type });
  }

  onSubmit = () => {
    this.props.setAddMode(false);
    this.props.addCheckin({
      q: this.state.q,
      type: this.state.type
    });
  }

  setDropdown = (bool) => {
    this.setState({ dropdown: bool });
  }

  onCancel = () => {
    this.props.setAddMode(false);
  }

  render() {
    const { q, dropdown, type } = this.state;

    let dropdownEl;

    const isInvalid = q === '';

    if (dropdown) {
      dropdownEl = (

        <ul>
          <li>
            <button className="dropdown" onClick={() => {
              this.setType('text');
              this.setDropdown(false);
            }}>
              <span className="jam checkicon jam-write"></span> Text
            <span className="jam checkicon jam-chevron-down"></span>
            </button>
          </li>
          <li>
            <button className="dropdown" onClick={() => {
              this.setType('yes/no');
              this.setDropdown(false)
            }}>
              <span className="jam checkicon jam-brightness"></span> Yes/No
          </button>
          </li>
          <li>
            <button className="dropdown" onClick={() => {
              this.setType('scale');
              this.setDropdown(false)
            }}>
              <span className="jam checkicon jam-ruler"></span> Scale</button>
          </li>

        </ul>
      );
    } else {
      if (type == 'text') {
        dropdownEl = (
          <ul>
            <li>
              <button className="dropdown" onClick={() => this.setDropdown(true)}>
                <span className="jam checkicon jam-write"></span> Text
              <span className="jam checkicon jam-chevron-down"></span>
              </button>
            </li>
          </ul>
        );
      }
      else if (type == 'yes/no') {
        dropdownEl = (
          <ul>
            <li>
              <button className="dropdown" onClick={() => this.setDropdown(true)}>
                <span className="jam checkicon jam-brightness"></span> Yes/No
              <span className="jam checkicon jam-chevron-down"></span>
              </button>
            </li>
          </ul>
        );
      } else {
        dropdownEl = (
          <ul>
            <li>
              <button className="dropdown" onClick={() => this.setDropdown(true)}>
                <span className="jam checkicon jam-ruler"></span> Scale
              <span className="jam checkicon jam-chevron-down"></span>
              </button>
            </li>
          </ul>
        );
      }
    }

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
        {dropdownEl}
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