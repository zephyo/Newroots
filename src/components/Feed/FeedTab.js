import React from 'react';
import CheckinPost from './CheckinPost';
import ThoughtPost from './ThoughtPost';
import moment from 'moment';
import ThoughtInput from './ThoughtInput';
import ThoughtProvoker from './ThoughtProvoker';

import graphics1 from '../../graphics/1.png';
import ErrorMsg from '../Misc/ErrorMsg';
import Loading from '../Misc/Loading';

import StaticUtil from '../../data/StaticUtil'
import StaticDataModel from '../../data/StaticDataModel'

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
    }
  }

  getTime = (time) => moment(time).format('lll')

  setLastSeen = (lastSeen) => this.setState(lastSeen)

  getDataObj = (docid, data) => {
    if (data.checkin) {
      return StaticDataModel.getCheckinObject(docid, data, this.getTime(data.timestamp))
    }
    return StaticDataModel.getThoughtObject(docid, data, this.getTime(data.timestamp))
  }

  loadMore = () => {
    this.setState({ loading: true });

    let first = this.props.firebase.feed(this.props.uid)
      .orderBy("realtime", "desc")
      .limit(20);

    if (!initial) {
      first = first.startAfter(this.state.lastSeen);
    }

    let tempFeed = [];
    first.get().then((documentSnapshots) => {
      if (documentSnapshots.docs[documentSnapshots.docs.length - 1]) {
        this.setLastSeen(documentSnapshots.docs[documentSnapshots.docs.length - 1])
      }
      documentSnapshots.forEach((doc) => {
        tempFeed.push(this.getDataObj(doc.id, doc.data()))
      });

      this.setState({
        feed: this.state.feed.concat(tempFeed),
        loading: false
      })

      initial = false;
    })
  }

  componentDidMount = () => {
    initial = true;
    currFeed = this.state.feed;

    feedListen = this.props.firebase.feed(this.props.uid)
      .onSnapshot((snapshot) => {
        if (initial) return;

        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            tempFeed.push(this.getDataObj(change.doc.id, change.doc.data()))
          }
          else if (change.type === "modified") {
            let index = currFeed.map(function (e) { return e.postid; }).indexOf(change.doc.id);
            currFeed[index] = this.getDataObj(change.doc.id, change.doc.data())
          }
          else if (change.type === "removed") {
            let index = currFeed.map(function (e) { return e.postid; }).indexOf(change.doc.id);
            currFeed.splice(index, 1);
          }
        });

        tempFeed.sort(StaticUtil.compareTimestamps);
        tempFeed.reverse();
        this.setState({
          feed: currFeed,
          newItems: tempFeed
        })
      });

    if (initial) {
      this.loadMore();
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.loadMore === true) {
      this.loadMore(false);
    }
  }

  componentWillUnmount() {
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
            yourNetwork={this.props.network}
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