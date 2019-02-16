import React, { Component } from 'react';
import $ from 'jquery';
import autosize from 'autosize';
import CheckinPost from './CheckinPost';
import ThoughtPost from './ThoughtPost';

let feedListen;

class FeedTab extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    autosize($('textarea'));
    let element = this;
    let tempFeed = [];
    feedListen = this.props.firebase.user(this.props.uid).collection("feed")
      .onSnapshot(function (snapshot) {
        //let tempFeed = [];
        snapshot.docChanges().forEach(function (change) {

          if (change.type === "added") {
            //console.log("New city: ", change.doc.data());
            tempFeed.push(change.doc.id);
          }

        });
        element.setState({
          feed: tempFeed
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

    return (
      <section className="feed">
        <div className="create-thought">
          <textarea rows="2" placeholder="Your thoughts"></textarea>
          <button id="update">update</button>
        </div>
        <h1 className="date-marker">February 15</h1>

       {/* <CheckinPost />
       <ThoughtPost /> */}
      </section>
    );
  }
}

export default FeedTab;
