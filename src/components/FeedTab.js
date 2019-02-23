import React, { Component } from 'react';
import $ from 'jquery';
import autosize from 'autosize';
import CheckinPost from './CheckinPost';
import ThoughtPost from './ThoughtPost';
import moment from 'moment';
import ThoughtInput from './ThoughtInput';

import graphics1 from '../graphics/1.png';
import ErrorMsg from './ErrorMsg';

let feedListen;

class FeedTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: [],
      checkins: [],
      feed: []
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
    //let tempCheckins = this.state.checkins;
    //let tempThoughts = this.state.thoughts;
    feedListen = this.props.firebase.user(this.props.uid).collection("feed")
      .onSnapshot((snapshot) => {
        //let tempFeed = [];
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            //console.log("New city: ", change.doc.data());
            //tempFeed.push(change.doc.id);
            let data = change.doc.data();
            let struct;
            if (change.doc.data().checkin) {
              struct = ({
                uid: data.uid,
                name: data.name,
                PpfURL: data.PpfURL,
                timestamp: moment(data.timestamp).format('lll'),
                postid: change.doc.id,
                checkinData: data.checkinData
              })
            }
            else {
              struct = ({
                uid: data.uid,
                name: data.name,
                PpfURL: data.PpfURL,
                thought: data.thought,
                message: data.message,
                comments: data.comm_cont,
                conversation: [],
                postid: change.doc.id,
                timestamp: moment(data.timestamp).format('lll'),
              })
            }
            tempFeed.push(struct);
            console.log(struct.timestamp);
          }

        });
        /*console.log(JSON.stringify(tempCheckins));
        console.log(JSON.stringify(tempThoughts));*/


        
        element.setState({
          /*checkins: tempCheckins,
          thoughts: tempThoughts*/
            feed:tempFeed
        })
        /*element.setState({
          checkins: tempCheckins,
          thoughts: tempThoughts
        })*/
      });
  }
  componentWillUnmount() {
    feedListen();
  }

  compare = (a, b) => {
    if (a.timestamp < b.timestamp)
      return 1;
    if (a.timestamp > b.timestamp)
      return -1;
    return 0;
  }


  render() {


    //let feed = this.state.checkins.concat(this.state.thoughts);
    let local_feed = this.state.feed;
    local_feed.sort(this.compare);
    //console.log("local_feed " + local_feed[0].timestamp);
    let last_date = "";
    let header = <h1 className="date-marker">February 17</h1>;
    let feedItems = local_feed.map((f, index) => {
        if(f.timestamp.split(",")[0] !== last_date){
            last_date = f.timestamp.split(",")[0];
            console.log("last date " + last_date);
             header = <h1 className="date-marker">{last_date}</h1>;
        }
        else{
             header = "";
        }
        if (f.checkinData) {
            return <div>{header} <CheckinPost
            uid={this.props.uid}
            posterUid={f.uid}
            
            PpfURL={f.PpfURL}
            yourPpfURL={this.props.PpfURL}
            key={index.toString()+"_checkin"}
            name={f.name}
            timestamp={f.timestamp}

            postid={f.postid}
            checkinData={f.checkinData}
            firebase={this.props.firebase}
            /></div>;
        } else {
            return <div>{header} <ThoughtPost
            uid={this.props.uid}
            posterUid={f.uid}
            
            PpfURL={f.PpfURL}
            yourPpfURL={this.props.PpfURL}

            key={index.toString()+"_thought"}
            name={f.name}
            thought={f.thought}
            timestamp={f.timestamp}

            message={f.message}
            postid={f.postid}
            firebase={this.props.firebase
            } /></div>;
        }
    }
    );

    // let feedItems = this.state.checkins.map((checkin, index) =>
    //   <CheckinPost
    //     uid={this.props.uid}
    //     posterUid={checkin.uid}

    //     PpfURL={checkin.PpfURL}
    //     yourPpfURL={this.props.PpfURL}
    //     key={toString(index)}
    //     name={checkin.name}
    //     timestamp={checkin.timestamp}

    //     postid={checkin.postid}
    //     checkinData={checkin.checkinData}
    //     firebase={this.props.firebase}
    //   />
    // );

    // let thoughtItems = this.state.thoughts.map((thought, index) =>
    //   <ThoughtPost
    //     uid={this.props.uid}
    //     posterUid={thought.uid}

    //     PpfURL={thought.PpfURL}
    //     yourPpfURL={this.props.PpfURL}

    //     key={toString(index)}
    //     name={thought.name}
    //     thought={thought.thought}
    //     timestamp={thought.timestamp}

    //     message={thought.message}
    //     postid={thought.postid}
    //     firebase={this.props.firebase
    //     } />
    // );
    // console.log(checkinItems);
    //combine checkinItems and thoughtItems then sort then render
    //        <h1 className="date-marker">February 17</h1>
    return (

      <section className="feed">
        <ThoughtInput
          PpfURL={this.props.PpfURL}
          name={this.props.name}
          uid={this.props.uid}
          network={this.props.network}
          firebase={this.props.firebase}
        />

        {feedItems}


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
