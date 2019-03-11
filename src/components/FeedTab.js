import React, { Component } from 'react';
import $ from 'jquery';
import autosize from 'autosize';
import CheckinPost from './Feed/CheckinPost';
import ThoughtPost from './Feed/ThoughtPost';
import moment from 'moment';
import ThoughtInput from './Feed/ThoughtInput';
import ThoughtProvoker from './Feed/ThoughtProvoker';

import graphics1 from '../graphics/1.png';
import ErrorMsg from './Misc/ErrorMsg';

let feedListen;
let initial = true;

class FeedTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: [],
      checkins: [],
      feed: [],
      newItems: [],
      lastSeen: ''
      //initial: true
    }
    //this.processTime = this.processTime.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      console.log("bootm ");
      this.setState({
        message: 'bottom reached'
      });
    } else {
      console.log("noot bootm ");
      this.setState({
        message: 'not at bottom'
      });
    }
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
  compare = (a, b) => {
    if (a.timestamp < b.timestamp)
      return 1;
    if (a.timestamp > b.timestamp)
      return -1;
    return 0;
  }

  loadMore = () => {
    console.log("LOAD MORE");
    const element = this;
    var first = this.props.firebase.user(this.props.uid).collection("feed")
      .orderBy("realtime", "desc")
      .limit(20)
      .startAfter(this.state.lastSeen);

    let tempFeed = [];
    first.get().then(function (documentSnapshots) {
      if (documentSnapshots.docs[documentSnapshots.docs.length - 1]) {
        element.setState({
          lastSeen: documentSnapshots.docs[documentSnapshots.docs.length - 1]
        })
      }
      documentSnapshots.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        //
        let data = doc.data();
        let struct;
        if (doc.data().checkin) {
          struct = ({
            uid: data.uid,
            name: data.name,
            PpfURL: data.PpfURL,
            timestamp: moment(data.timestamp).format('lll'),
            postid: doc.id,
            checkinData: data.checkinData
          })
        }
        else {
          console.log("new thought");
          struct = ({
            uid: data.uid,
            name: data.name,
            PpfURL: data.PpfURL,
            thought: data.thought,
            message: data.message,
            comments: data.comm_cont,
            conversation: [],
            postid: doc.id,
            timestamp: moment(data.timestamp).format('lll'),
          })
        }
        tempFeed.push(struct);
      });
      //tempFeed.reverse();
      element.setState({
        //feed:tempFeed
        feed: element.state.feed.concat(tempFeed)
      })
      tempFeed = [];
      initial = false;
    })

  }

  componentDidMount() {
    //this.state.initial = true;
    document.addEventListener("scroll", this.handleScroll);
    initial = true;
    autosize($('textarea'));
    let element = this;
    let tempFeed = [];
    //let tempFeed = this.state.feed;
    //let tempCheckins = this.state.checkins;
    //let tempThoughts = this.state.thoughts;
    feedListen = this.props.firebase.user(this.props.uid).collection("feed")
      .onSnapshot((snapshot) => {
        //let tempFeed = [];
        //console.log("brad " + this.state.initial);
        //element = this;
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
              console.log("new thought");
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
            if (!initial) {
              tempFeed.push(struct);
            }
            // console.log(struct.timestamp);
          }

        });
        /*console.log(JSON.stringify(tempCheckins));
        console.log(JSON.stringify(tempThoughts));*/

        /*console.log("NOthing but  " + initial);
        if(initial === true){
            console.log("SORT");
            tempFeed.sort(this.compare)
        }
        initial = false;
        //console.log(tempfeed);
        element.setState({
            
          feed: tempFeed
            
        })*/

        //
        if (!initial) {
          tempFeed.sort(element.compare);
          tempFeed.reverse();
          console.log("bee bones");
          element.setState({
            //newItems: element.state.newItems.concat(tempFeed)
            newItems: tempFeed
          })
        }
        /*element.setState({
          checkins: tempCheckins,
          thoughts: tempThoughts
        })*/
      });


    //var first = db.collection("cities")
    if (initial) {
      var first = this.props.firebase.user(this.props.uid).collection("feed")
        .orderBy("realtime", "desc")
        .limit(20);

      first.get().then((documentSnapshots) => {
        if (documentSnapshots.docs[documentSnapshots.docs.length - 1]) {
          this.setState({
            lastSeen: documentSnapshots.docs[documentSnapshots.docs.length - 1]
          }, () => {
            console.log("last seen " + this.state.lastSeen.id);
          })
        }
        documentSnapshots.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          //
          let data = doc.data();
          let struct;
          if (doc.data().checkin) {
            struct = ({
              uid: data.uid,
              name: data.name,
              PpfURL: data.PpfURL,
              timestamp: moment(data.timestamp).format('lll'),
              postid: doc.id,
              checkinData: data.checkinData
            })
          }
          else {
            console.log("new thought");
            struct = ({
              uid: data.uid,
              name: data.name,
              PpfURL: data.PpfURL,
              thought: data.thought,
              message: data.message,
              comments: data.comm_cont,
              conversation: [],
              postid: doc.id,
              timestamp: moment(data.timestamp).format('lll'),
            })
          }
          tempFeed.push(struct);
        });
        //tempFeed.reverse();
        element.setState({
          feed: tempFeed
        })
        tempFeed = [];
        initial = false;
      })
      /*this.props.firebase.user(this.props.uid).collection("feed").orderBy("realtime").get().then((documentSnapshots) => {
          let ids = {}
          let counter = 0;
          documentSnapshots.docs.forEach((doc, index) => {
              //function(doc) {
              //ids.push(doc.id);
              console.log("index " + index);
              ids[doc.id] = doc.data().timestamp;
              //counter++;
          })
          Object.keys(ids).forEach((doc) => {
              //console.log(doc, dictionary[key]);
              this.props.firebase.user(this.props.uid).collection("feed").doc(doc).update({
                  realtime: moment(ids[doc]).format('lll')
              })
          });

      })*/
    }
    /*return first.get().then(function (documentSnapshots) {
      // Get the last visible document
      var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
      console.log("last", lastVisible);

      // Construct a new query starting at this document,
      // get the next 25 cities.
      var next = db.collection("cities")
              .orderBy("population")
              .startAfter(lastVisible)
              .limit(10);
    });*/

  }


  componentWillReceiveProps(nextProps) {
    console.log(this.props.loadMore);
    console.log(nextProps.loadMore);
    if (nextProps.loadMore === true) {
      this.loadMore();
    }
    /*if (props.params.id !== nextProps.params.id) {
      doSomething(nextProps.params.id);
    }*/
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
    feedListen();
  }




  render() {

    /*let local_feed = [];
      console.log("this.state " + this.state.initial);
    if(this.state.initial){
        console.log("SORT");
        this.setState({
            feed:this.state.feed.sort(this.compare),
            initial:false
        },()=>{
            local_feed = this.state.feed;
        })
        //local_feed.sort(this.compare);
    }*/
    let local_feed = (this.state.newItems.concat(this.state.feed));
    //let local_feed = this.state.feed;

    //local_feed.sort(this.compare);
    let last_date = "";
    let header = <h1 className="date-marker">February 17</h1>;
    let feedItems = local_feed.map((f, index) => {
      //f = local_feed[local_feed.length - 1 - index];
      if (f.timestamp.split(",")[0] !== last_date) {
        last_date = f.timestamp.split(",")[0];
        // console.log("last date " + last_date);
        header = <h1 className="date-marker">{last_date}</h1>;
      }
      else {
        header = "";
      }
      if (f.checkinData) {
        return <div key={'key' + index}>
          {header}
          <CheckinPost
            uid={this.props.uid}
            posterUid={f.uid}

            PpfURL={f.PpfURL}
            yourPpfURL={this.props.PpfURL}
            key={index.toString() + "_checkin"}
            name={f.name}
            timestamp={f.timestamp}

            postid={f.postid}
            checkinData={f.checkinData}
            firebase={this.props.firebase}
          /></div>;
      } else {
        return <div key={'key' + index}>
          {header}
          <ThoughtPost
            uid={this.props.uid}
            posterUid={f.uid}

            PpfURL={f.PpfURL}
            yourPpfURL={this.props.PpfURL}

            key={index.toString() + "_thought"}
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

        <ThoughtProvoker
          name={this.props.name}
        />

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