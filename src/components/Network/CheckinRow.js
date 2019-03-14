import React, { Component } from 'react';
import StaticUserData from '../../data/StaticUserData'



const CheckInRow = (props) => {

  let el = null,
    visEl = null;
  switch (props.checkin.type) {
    case StaticUserData.QTYPE_TEXT:
      el = (
        <span className="jam checkicon jam-write"></span>
      );
      break;
    case StaticUserData.QTYPE_YESNO:
      el = (
        <span className="jam checkicon jam-brightness"></span>
      );
      break;
    default:
      el = (
        <span className="jam checkicon jam-ruler"></span>
      );
      break;
  }

  switch (props.checkin.visibility) {
    case StaticUserData.VIS_PUBLIC:
    visEl = (
        <span className="jam privacy checkicon jam-world"></span>
      );
      break;
    case StaticUserData.VIS_NETWORK:
    visEl = (
        <span className="jam privacy checkicon jam-users"></span>
      );
      break;
    default:
    visEl = (
        <span className="jam privacy checkicon jam-padlock"></span>
      );
      break;
  }

  return <li>
    {el}
    {props.checkin.q}
    {visEl}
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
