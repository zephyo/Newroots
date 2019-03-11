
import React, { Component } from 'react';


/*

* List of options
    option: {
      icon:
      text:
    }

* onChange function
*/

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      dropdown: false,
      selected: this.props.selected ? this.props.selected : 0
    };
  }

  setDropdown = (bool) => {
    this.setState({ dropdown: bool });
  }

  setSelected = (index) => {
    this.setState({ selected: index });
  }

  render() {
    const { dropdown, selected } = this.state;


    if (dropdown) {
      let options = this.props.options.map((item, i) =>
        <li>
          <button className="dropdown" onClick={() => {
            this.props.onChange(item.text);
            this.setSelected(i)
            this.setDropdown(false);
          }}>
            <span className={"jam checkicon jam-" + item.icon}></span>{' ' + item.text}
            <span className="jam checkicon jam-chevron-down"></span>
          </button>
        </li>);

      return (
        <ul>
          {options}
        </ul>
      );

    } else {

      return (
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



  }
}


export default Dropdown;