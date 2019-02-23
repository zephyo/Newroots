import React, { Component } from 'react';
import plant from '../graphics/icon.png';
import $ from 'jquery';
import Avatar from './Avatar';
import * as firebase from 'firebase';

class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: this.props.requests,
      requestUsers: [],
      loading: false,
      network: this.props.network,
      allUsers: [],
      addedFriend: '',
      invitedFriend: '',
      loading: false,
      suggestions: []
    };
  }


  componentDidMount() {
    let ref = this.props.firebase.user(this.props.uid);
    ref.onSnapshot((doc) => {
      let data = doc.data();
      this.setState({
        requests: data.requests,
      })
    })
  }

  setAddedFriend = (mssg) => {
    this.setState({
      addedFriend: mssg
    });
  }

  setInvitedFriend = (mssg) => {
    this.setState({
      invitedFriend: mssg
    });
  }
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  genList = (ref, search_val) => {
      let tempSug = [];
      ref.get()
      .then(querySnapshot => {
        // console.log(this.props.uid)
        /*this.props.firebase.users().doc(querySnapshot.docs[0].id)
          .update({
            "requests": firebase.firestore.FieldValue.arrayUnion(this.props.uid)
          });
        this.setAddedFriend('sent request!');*/
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            tempSug.push({
                uid:doc.id,
                name:doc.data().name,
                url:doc.data().PpfURL
            })
        });
        this.setState({
            suggestions:tempSug
        })
      })
      .catch(err => {
        this.setAddedFriend("couldn't find " + search_val);
      });
  }
  confirmAdd = (uid) => {
      console.log("adding " + uid);
      this.props.firebase.user(uid).update({
            "requests": firebase.firestore.FieldValue.arrayUnion(this.props.uid)
          });
        this.setAddedFriend('sent request!');
  }
  addFriend = () => {
    // if (this.state.loading === true) return;

    /*let email = "";
    let name = "";*/
    let ref = "";
    let search_val  = $('#add-friend-email').val();
    if(this.validateEmail(search_val)){
        //email = $('#add-friend-email').val();
        ref = this.props.firebase.users().where("email", "==", search_val);
    }
    else{
        //name = $('#add-friend-email').val();
        search_val = search_val.toLowerCase();
        ref = this.props.firebase.users().where("easy_name", "==", search_val);
    }

    
    this.genList(ref, search_val);
    /*ref.get()
      .then(querySnapshot => {
        // console.log(this.props.uid)
        this.props.firebase.users().doc(querySnapshot.docs[0].id)
          .update({
            "requests": firebase.firestore.FieldValue.arrayUnion(this.props.uid)
          });
        this.setAddedFriend('sent request!');
        
      })
      .catch(err => {
        this.setAddedFriend("couldn't find " + search_val);
      });*/



    // if (this.state.allUsers.length == 0){

    // }else{
    //   this.sendRequest(users[i].uid);
    // }

    // let users = this.state.users;

    // for (var i = 0; i < users.length; i++) {
    //   console.log(JSON.stringify(users[i]));
    //   if (users[i].email == email) {
    //     //are they your friend?
    //     let index = users.indexOf(users[i].uid);
    //     if (index > -1) {
    //       this.setAddedFriend("you're already friends!");
    //       return;
    //     }
    //     //send request

    //     return;
    //   }
    // }
  };

  inviteFriend = () => {
    this.setAddedFriend('invited!');
  };

  acceptRequest = (uid) => {
    //remove uid from your request
    this.removeRequest(uid);
    //insert uid to your network array and their network array
    //propogate backwards - update networktab's state and app's state
    let network = this.state.network;
    network.push(uid);

    this.setState({ network: network });


    this.props.firebase
      .user(this.props.uid)
      .update({
        network: network
      });

    this.props.firebase.user(uid)
      .update({
        network: firebase.firestore.FieldValue.arrayUnion(this.props.uid)
      });


    //update their feed with your posts; update your feed with their posts
    this.props.firebase
      .feed(uid).where('uid', '==', uid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          this.props.firebase
            .feed(this.props.uid).doc(doc.id).set(doc.data());

        });
      });


    this.props.firebase
      .feed(this.props.uid).where('uid', '==', this.props.uid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          this.props.firebase
            .feed(uid).doc(doc.id).set(doc.data());

        });
      });
  }

  removeRequest = (uid) => {
    //remove uid from your requests

    // let requestArr = this.state.requests;
    // let index = requestArr.indexOf(uid);
    // if (index > -1) {
    //   requestArr.splice(index, 1);
    // }
    // let usersArr = this.state.requestUsers;
    // for (var i = 0; i < usersArr.length; i++) {
    //   if (usersArr[i].uid == uid) {
    //     usersArr.splice(i, 1);
    //   }
    // }
    // this.setState({ requests: requestArr, requestUsers: usersArr });
    // this.props.firebase
    //   .user(this.props.uid)
    //   .update({
    //     requests: requestArr
    //   });
    this.props.firebase.user(this.props.uid).update({
      "requests": firebase.firestore.FieldValue.arrayRemove(uid)
    }).then(() => {
      let users = this.state.requestUsers;
      for (var i = 0; i < users.length; i++) {
        if (users[i].uid == uid) {
          users.splice(i, 1);
          this.setState({ requestUsers: users });
        }
      }
    });


  }

  loadRequestUsers = () => {
    this.setState({ loading: true, requestUsers: [] });
    let users = [];
    let counter = 0;
    for (var i = 0; i < this.state.requests.length; i++) {
      let req = this.state.requests[i];
      // console.log(req)
      this.props.firebase
        .user(req).get().then((doc) => {
          users.push(doc.data());
          // console.log(JSON.stringify(doc.data()));
          this.setState({ requestUsers: users });
          counter++;
          if (counter === this.state.requests.length) {
            // console.log("done loading");
            this.setState({ loading: false });
          }
        });
    }
  }

  render() {
    let { requestUsers, requests } = this.state;



    if (requestUsers.length == 0 && requests.length > 0) {
      if (this.state.loading == false) {
        this.loadRequestUsers();
      }
    }

    let addedFriend = (
      <p>
        {this.state.addedFriend}
      </p>
    );

    let invitedFriend = (
      <p>
        {this.state.invitedFriend}
      </p>
    );

    let req = [];
    for (var i = 0; i < requestUsers.length; i++) {

      let uid = requests[i];
      // console.log('changing request users in addfriends'  + uid);

      let user = requestUsers[i];
      var addEl = (
        <div className="preview">
          <Avatar PpfURL={user.PpfURL} />
          <p>{user.name}</p>
          <div className="yesno">
            <button className="yes" onClick={() => this.acceptRequest(uid)}>
              <span className="jam jam-check" style={{ color: 'white' }}></span>
            </button>
            <button className="no" onClick={() => this.removeRequest(uid)}>
              <span className="jam jam-close" style={{ color: '#8A8184' }}> </span>
            </button>
          </div>
        </div>
      );
      req.push(addEl);
    }
    const suggestions = this.state.suggestions.map((sug, index) =>
        <div><Avatar PpfURL={sug.url} /><h1>{sug.name}</h1><button onClick={() => this.confirmAdd(sug.uid)} className="yes"><span className="jam jam-close" style={{ color: '#8A8184' }}></span></button></div>
    );
    return (
      <div className="modal network">
        <button className="close" onClick={() => this.props.setAddFriend(false)}>


          <span className="jam jam-close"></span>
        </button>
        <img src={plant}></img>

        {req ? <div className="scrolling-row">{req}</div> : null}

        <div className="add-friend">
          <h2>add friend</h2>
          {addedFriend}
          <div className="network-input">
            <input id="add-friend-email" type="email" placeholder="what's their email?"></input>
            <button onClick={this.addFriend}>request</button>
          </div>
          <div>
            {suggestions}
          </div>
        </div>
        <div className="invite-friend">
          <h2>invite friend</h2>
          {invitedFriend}
          <div className="network-input">
            <input type="email" placeholder="what's their email?"></input>
            <button onClick={this.inviteFriend}>invite</button>
          </div>
        </div>
      </div>
    );
  }
};

export default AddFriend;