import React, { Component } from 'react';




const CheckInRow = (props) => {

  let el = null;
  if (props.type == 'text') {
    el = (
      <span className="jam checkicon jam-write"></span>
    );
  }
  else if (props.type == 'yes/no') {
    el = (
      <span className="jam checkicon jam-brightness"></span>
    );
  } else {
    el = (
      <span className="jam checkicon jam-ruler"></span>
    );
  }

  return <li>
    {el}
    {props.q}
    {
      props.trash ?
        <button className="delete" onClick={() => props.removeCheckinAt(props.index)}>
          <span className="jam jam-trash"></span>
        </button>
        : null
    }
  </li>;
};

export default CheckInRow;
