
import React from 'react';


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
    if (bool == false) {
      document.removeEventListener('mousedown', this.handleClickOutside, false);
    } else {
      document.addEventListener('mousedown', this.handleClickOutside, false);
    }
  }

  handleClickOutside = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }

    this.setDropdown(false);
  }

  setSelected = (index) => {
    this.setState({ selected: index });
  }

  render() {
    const { dropdown, selected } = this.state;

    let content;

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

        return (<li key={'dropdown_' + i}>
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
      content = options;

    }
    else {
      let icon;
      if (this.props.options[selected].icon != null) {
        icon = <span className={"jam checkicon jam-" + this.props.options[selected].icon}></span>
      }
      content =
        <li>
          <button className="dropdown" onClick={() => this.setDropdown(true)}>
            {icon}
            {' ' + this.props.options[selected].text}
            <span className="jam checkicon jam-chevron-down"></span>
          </button>
        </li>;
    }


    return (
      <ul
        ref={node => this.node = node}
        className="dropdown-container">
        {content}
      </ul>
    );

  }
}


export default Dropdown;