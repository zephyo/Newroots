
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
          <li><button onClick={() => {
            this.setType('text');
            this.setDropdown(false);
            }}>
            <span className="jam checkicon jam-write"></span> Text
            <span className="jam checkicon jam-chevron-down"></span> 
        </button>
          </li>
          <li><button onClick={() => {
            this.setType('yes/no');
            this.setDropdown(false)
            }}>
            <span className="jam checkicon jam-brightness"></span> Yes/No
          </button>
          </li>
          <li><button onClick={() => { 
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
            <li><button onClick={() => this.setDropdown(true)}>
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
            <li><button onClick={() => this.setDropdown(true)}>
              <span className="jam checkicon jam-brightness"></span> Yes/No
              <span className="jam checkicon jam-chevron-down"></span> 
          </button>
            </li>
          </ul>
        );
      } else {
        dropdownEl = (
          <ul>
            <li><button onClick={() => this.setDropdown(true)}>
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
        <h1>Add Check-in</h1>
        <textarea
          id="check-in"
          name="q"
          placeholder="What's your check-in?"
          value={q}
          onChange={this.onChange}>
        </textarea>
        <h3>Check-in type</h3>
        {dropdownEl}
        <div className="yesno">
          <button className="yes" onClick={this.onSubmit} disabled = {isInvalid}>
            <span className="jam jam-check" style={{ color: 'white' }}></span></button>
          <button className="no" onClick={this.onCancel}>
            <span className="jam jam-close" style={{ color: '#8A8184' }}> </span></button>
        </div>
      </div>
    );
  }
}


export default AddCheckin;