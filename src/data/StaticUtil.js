
import React from 'react';
import UserPage from '../components/Network/UserPage'

class StaticUtil extends React.Component {
  constructor() { }

  static compareTimestamps = (a, b) => {
    if (a.timestamp < b.timestamp)
      return -1;
    if (a.timestamp > b.timestamp)
      return 1;
    return 0;
  }

  static getUserPage = (firebase, myUid, showUser, closeCallback) =>
    <UserPage
      closeUserPage={closeCallback}
      PpfURL={showUser.PpfURL}
      name={showUser.name}
      bio={showUser.bio}
      location={showUser.location}
      pronouns={showUser.pronouns}
      checkins={showUser.checkinData}
      network={showUser.network}
      theirUID={showUser.uid}
      myUID={myUid}
      firebase={firebase}
    ></UserPage>

  static isValidEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }
}

export default StaticUtil;