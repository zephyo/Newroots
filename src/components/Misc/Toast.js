
import React from 'react';


class Toast extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }

  getDefaultProps() {
    return { delay: 5000 };
  }

  componentDidMount() {
    this.setTimer();
  }

  setTimer() {
    // clear any existing timer
    this._timer != null ? clearTimeout(this._timer) : null;

    // hide after `delay` milliseconds
    this._timer = setTimeout(() => {
      this.setState({ visible: false });
      this._timer = null;
    }, this.props.delay);
  }

  render() {
    return (
      this.state.visible == true ? <div className="toast-alert">
        <p>{this.props.message}</p>
      </div>
        : null
    );
  }
}


export default Toast;