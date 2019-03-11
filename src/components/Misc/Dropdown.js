
import React, { Component } from 'react';


/*

* List of options
    option: {
      icon:
      text:
    }

* onChange function
*/

const INITIAL_STATE = {
  dropdown: false,
  selected: 0
};


class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  setDropdown = (bool) => {
    this.setState({ dropdown: bool });
  }

  setSelected = (index) => {
    this.setState({ selected: index });
  }

  render() {
    const { dropdown, selected } = this.state;

    let dropdownEl;

    if (dropdown) {
      let options = this.props.options.map((item, i) =>
        <li>
          <button className="dropdown" onClick={() => {
            this.onChange(item.text);
            this.setSelected(i)
            this.setDropdown(false);
          }}>
            <span className={"jam checkicon jam-" + item.icon}></span>{' ' + item.text}
            <span className="jam checkicon jam-chevron-down"></span>
          </button>
        </li>);

      dropdownEl = (
        <ul>
          {options}
        </ul>
      );
      
    } else {

      dropdownEl = (
        <ul>
          <li>
            <button className="dropdown" onClick={() => this.setDropdown(true)}>
              <span className={"jam checkicon jam-" + this.props.options[selected].icon}></span>{' ' + this.props.options[selected].text}
              <span className="jam checkicon jam-chevron-down"></span>
            </button>
          </li>
        </ul>
      );

    }



    return (
      { dropdownEl }
    );
  }
}


export default Dropdown;