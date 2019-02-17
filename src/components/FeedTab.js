import React, { Component } from 'react';
import $ from 'jquery';
import autosize from 'autosize';
import CheckinPost from './CheckinPost';
import ThoughtPost from './ThoughtPost';
import moment from 'moment';

import graphics1 from '../graphics/1.png';
import ErrorMsg from './ErrorMsg';

let feedListen;

class FeedTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: [],
      checkins: []
    }
    //this.processTime = this.processTime.bind(this);
  }
  /*
    -PpfURL : string (optional)
    -name : string
    -isMyPost : bool
    -timestamp : string - e.g. a few seconds ago
    -conversation : array

  - example of conversation: 
  [
    {
      uid: 'fdsadsadaad'
      PpfURL: '...'
      poster: true //is message from poster
      message: 'hi i love'
      
    },
   ...
  ]
  */
  componentDidMount() {
    autosize($('textarea'));
    let element = this;
    let tempFeed = [];
    let tempCheckins = [];
    let tempThoughts = [];
    feedListen = this.props.firebase.user(this.props.uid).collection("feed")
      .onSnapshot(function (snapshot) {
        //let tempFeed = [];
        snapshot.docChanges().forEach(function (change) {

          if (change.type === "added") {
            //console.log("New city: ", change.doc.data());
            tempFeed.push(change.doc.id);
            if (change.doc.data().checkin) {
              tempCheckins.push({
                uid: element.props.uid,
                name: change.doc.data().author,
                timestamp: moment().startOf('hour').fromNow(),
                ismyPost: (element.props.uid == change.doc.data().author_uid),
                checkinData: JSON.parse(change.doc.data().checkinData)
              })
            }
            else {
              tempThoughts.push({
                uid: element.props.uid,
                name: change.doc.data().author,
                isMyPost: (element.props.uid == change.doc.data().author_uid),
                message: change.doc.data().message,
                comments: change.doc.data().comm_cont,
                conversation: []
              })
            }
          }

        });
        // console.log(tempCheckins);
        element.setState({
          feed: tempFeed,
          checkins: tempCheckins,
          thoughts: tempThoughts
        })
      });
  }
  componentWillUnmount() {
    feedListen();
  }

  render() {

    /*feed = this.props.feed;

    for (var i = 0; i< feed.length; i++){
      
    }*/
    /*<ThoughtPost /> 
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );
    */
    //const checkins = this.state.checkins;
    const checkinItems = this.state.checkins.map((checkin, index) =>
      <CheckinPost key={toString(index)} name={checkin.name} timestamp={checkin.timestamp} ismyPost={checkin.ismyPost} checkinData={checkin.checkinData} />
    );
    const thoughtItems = this.state.thoughts.map((thought, index) =>
      <ThoughtPost key={toString(index)} name={thought.name} timestamp={thought.timestamp} ismyPost={thought.ismyPost} checkinData={thought.checkinData} />
    );


    return (

      <section className="feed">
        <div className="create-thought">
          <textarea rows="2" placeholder="Your thoughts"></textarea>
          <button id="update">update</button>
        </div>
        <h1 className="date-marker">February 15</h1>
        {checkinItems}
        {thoughtItems}


        <ErrorMsg
          src={graphics1}
          header='Nothing more.'
          msg='Why not post a thought?'
        />

      </section>
    );
  }
}

export default FeedTab;
