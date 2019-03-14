
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
    this.state = {
      dropdown: false,
      selected: this.props.selected ? this.props.selected : 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.state.selected) {
      this.setState({ selected: nextProps.selected });
    }
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
      let options = this.props.options.map((item, i) => {
        let icon;
        if (item.icon != null) {
          icon = <span className={"jam checkicon jam-" + item.icon}></span>
        }

        let chevron = null;
        if (i === 0) {
          chevron =
            <span className="jam checkicon jam-chevron-up"></span>;
        }

        return (<li>
          <button className="dropdown" onClick={() => {
            this.props.onChange(item.text);
            this.setSelected(i)
            this.setDropdown(false);
          }}>
            {icon}
            {' ' + item.text}
            {chevron}
          </button>
        </li>)
      });

      return (
        <ul className="dropdown-container">
          {options}
        </ul>
      );

    } else {
      let icon;
      if (this.props.options[selected].icon != null) {
        icon = <span className={"jam checkicon jam-" + this.props.options[selected].icon}></span>
      }
      return (
        <ul className="dropdown-container">
          <li>
            <button className="dropdown" onClick={() => this.setDropdown(true)}>
              {icon}
              {' ' + this.props.options[selected].text}
              <span className="jam checkicon jam-chevron-down"></span>
            </button>
          </li>
        </ul>
      );

    }



  }
}


export default Dropdown;