
import React from 'react';


class Avatar extends React.Component {
  constructor(props) {
    super(props);
   
  }

  render() {
    let picStyle = this.props.PpfURL ? {
      backgroundImage: 'url(' + this.props.PpfURL + ')',
    } : null;

    return (
      <div className="pic" style={picStyle}>
        {this.props.content}
      </div>
    );
  }
}


export default Avatar;