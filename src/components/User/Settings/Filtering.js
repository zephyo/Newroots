
import React from 'react';


class Filtering extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <div className="header">
          <span>Filtered words</span>
          <button>
            <span className="jam jam-pencil"></span>
          </button>
        </div>
        <button>
         Add
        </button>
      </div>
    );
  }
}


export default Filtering;