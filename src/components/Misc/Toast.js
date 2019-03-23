
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
   setTimeout(() => {
      this.setState({ visible: false });
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