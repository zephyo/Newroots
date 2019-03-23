
import React from 'react';


const LogoutAccount = (props) => {
  return (
    <button className="logout-but long"
      onClick={() => {
        props.removeUser();
        props.firebase.doSignOut();
      }}>Logout</button>
  )
};


export default LogoutAccount;