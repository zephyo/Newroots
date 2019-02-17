import React, { Component } from 'react';
import $ from 'jquery';
import autosize from 'autosize';
import CheckinPost from './CheckinPost';
import ThoughtPost from './ThoughtPost';
import moment from 'moment';

let feedListen;

class FeedTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        thoughts:[],
        checkins:[]
    }
    //this.processTime = this.processTime.bind(this);
  }
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
              if(change.doc.data().checkin){
                  tempCheckins.push({
                      name:change.doc.data().author,
                      timestamp:moment().startOf('hour').fromNow(),
                      ismyPost:(element.props.uid == change.doc.data().author_uid),
                      checkinData:JSON.parse(change.doc.data().checkinData)
                  })
              }
          }

        });
        console.log(tempCheckins);
        element.setState({
          feed: tempFeed,
          checkins: tempCheckins
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
    const checkins = this.state.checkins;
    const listItems = this.state.checkins.map((checkin,index) =>
      <CheckinPost key={toString(index)} name={checkin.name} timestamp={checkin.timestamp} ismyPost={checkin.ismyPost} checkinData={checkin.checkinData}/>
    );
    return (
        
      <section className="feed">
        <div className="create-thought">
          <textarea rows="2" placeholder="Your thoughts"></textarea>
          <button id="update">update</button>
        </div>
        <h1 className="date-marker">February 15</h1>
        {listItems}

      </section>
    );
  }
}

export default FeedTab;
