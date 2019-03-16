import React from 'react';

class Loading extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loader">
        <div className="loader__figure"></div>
      </div>
    );
  }
}

export default Loading;