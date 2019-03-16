
import React from 'react';


class SimpleModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let t = this.props.title == null ? null : <h1>{this.props.title}</h1>;
    let p = this.props.p == null ? null : <span>{this.props.p}</span>;

    return <div className="modal-bg">
      <div className="modal">
        {t}
        {p}
        {this.props.footer}
      </div>
    </div>
  }
}


export default SimpleModal;