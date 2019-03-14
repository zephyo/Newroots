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
import Loading from './Misc/Loading';

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
      lastSeen: '',
      loading: false,
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
        message: 'bottom reached',
      });
    } else {
      console.log("noot bootm ");
      this.setState({
        message: 'not at bottom'
      });
    }
  }
  compare = (a, b) => {
    if (a.timestamp < b.timestamp)
      return 1;
    if (a.timestamp > b.timestamp)
      return -1;
    return 0;
  }

  loadMore = () => {
    console.log("LOAD MORE");

    this.setState({loading:true});

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
        feed: element.state.feed.concat(tempFeed),
        loading: false
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
        if (!initial) {
          tempFeed.sort(element.compare);
          tempFeed.reverse();
          console.log("bee bones");
          element.setState({
            //newItems: element.state.newItems.concat(tempFeed)
            newItems: tempFeed
          })
        }
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
    }

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

    let local_feed = (this.state.newItems.concat(this.state.feed));

    let last_date = null;
    let feedItems = [];

    for (let index = 0; index < local_feed.length; index++) {
      let post = local_feed[index];

      if (post.timestamp.split(",")[0] !== last_date) {
        last_date = post.timestamp.split(",")[0];
        // console.log("last date " + last_date);
        feedItems.push(<h1 className="date-marker">{last_date}</h1>);
      }

      if (post.checkinData) {
        feedItems.push(
          <CheckinPost
            uid={this.props.uid}
            yourNetwork={this.props.network}
            posterUid={post.uid}

            PpfURL={post.PpfURL}
            yourPpfURL={this.props.PpfURL}
            key={index.toString() + "_checkin"}
            name={post.name}
            timestamp={post.timestamp}

            postid={post.postid}
            checkinData={post.checkinData}
            firebase={this.props.firebase}
          />);
      } else {
        feedItems.push(
          <ThoughtPost
            uid={this.props.uid}
            posterUid={post.uid}

            PpfURL={post.PpfURL}
            yourPpfURL={this.props.PpfURL}

            key={index.toString() + "_thought"}
            name={post.name}
            thought={post.thought}
            timestamp={post.timestamp}

            message={post.message}
            postid={post.postid}
            firebase={this.props.firebase
            } />);
      }
    }


    let loadingEl = null;
    if (this.state.loading) {
      loadingEl = <Loading />;
    } else {
      loadingEl = <ErrorMsg
        src={graphics1}
        header='Nothing more.'
        msg='Why not post a thought?'
      />;
    }

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

        {loadingEl}


      </section>
    );
  }
}

export default FeedTab;