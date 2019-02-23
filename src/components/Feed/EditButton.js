import React, { Component } from 'react';




const EditButton = (props) => {
  if (props.isOwnPost) {
    return (
      <button className="user-edit">
        <span className="jam jam-pencil" ></span>
      </button>
    );
  } else {
    return (
      <button className="user-filter">
        <span className="jam jam-more-vertical-f" ></span>
      </button>
    );
  }
};

export default EditButton;
