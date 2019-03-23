import React from 'react';


class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header-component">
        {this.props.goBack == null ? null :
          <button className="back" onClick={this.props.goBack}>
            <span className="jam jam-chevron-left"></span>
          </button>}
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}


export default Header;