import React from 'react';


class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        {this.props.goBack == null ? null :
          <button onClick={this.props.goBack}>
            <span className="jam checkicon jam-chevron-left"></span>
          </button>}
        <span>{this.props.title}</span>
      </div>
    );
  }
}


export default Header;