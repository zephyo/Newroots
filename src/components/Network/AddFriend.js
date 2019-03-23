import React from 'react';
import plant from '../../graphics/icon.png';
import $ from 'jquery';
import Avatar from '../Misc/Avatar';
import UserRow from './UserRow'
import ListOfUsers from './ListOfUsers'
import StaticUtil from '../../data/StaticUtil'

class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: this.props.requests,
      network: this.props.network,
      addedFriend: '',
      invitedFriend: '',
      suggestions: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requests !== this.state.requests) {
      this.setState({ requests: nextProps.requests });
    }
    if (nextProps.network !== this.state.network) {
      this.setState({ network: nextProps.network });
    }
  }

  setFindFriend = (mssg) => this.setState({ addedFriend: mssg });

  setInvitedFriend = (mssg) => this.setState({ invitedFriend: mssg });

  inviteFriend = () => this.setInvitedFriend('invited!');

  genList = (ref, search_val) => {
    let tempSug = [];
    ref.get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          tempSug.push({
            uid: doc.id,
            name: doc.data().name,
            url: doc.data().PpfURL
          })
        });
        this.setState({
          suggestions: tempSug
        })
      })
      .catch(err => {
        this.setFindFriend("couldn't find " + search_val);
      });
  }

  sendRequest = (uid) => {
    this.props.firebase.requests(uid)
      .doc(this.props.uid)
      .set({ exists: true })
      .then(() => {
        this.setFindFriend('sent request!');
      });
  }

  findFriend = () => {
    let ref = "";
    let search_val = $('#add-friend-email').val();
    if (StaticUtil.isValidEmail(search_val)) {
      ref = this.props.firebase.users().where("email", "==", search_val);
    }
    else {
      search_val = search_val.toLowerCase();
      ref = this.props.firebase.users().where("easy_name", "==", search_val);
    }

    this.genList(ref, search_val);
  };

  acceptRequest = (uid) => {
    //remove uid from your request
    this.removeRequest(uid);

    this.props.firebase.addToNetwork(this.props.uid, uid);

    this.props.firebase.addToFeed(this.props.uid, uid);
  }

  removeRequest = (uid) => {
    this.props.firebase.requests(this.props.uid).doc(uid).delete();
  }

  renderUser = (user, key) =>
    <div className="preview" key={key}>
      <Avatar PpfURL={user.PpfURL} />
      <p>{user.name}</p>
      <div className="yesno">
        <button className="yes" onClick={() => this.acceptRequest(user.uid)}>
          <span className="jam jam-check"></span>
        </button>
        <button className="no" onClick={() => this.removeRequest(user.uid)}>
          <span className="jam jam-close"> </span>
        </button>
      </div>
    </div>

  render() {
    let length = this.state.suggestions.length;

    const suggestions = this.state.suggestions.map((sug, index) =>
      <UserRow
        onProfileClick={() => this.props.setUserPage(sug)}
        PpfURL={sug.url}
        name={sug.name}
        rightElement={
          <button onClick={() => this.sendRequest(sug.uid)}>
            <span className="jam jam-user-plus" ></span>
          </button>
        }
      />
    );

    return (
      <div className="modal network">
        <button className="close" onClick={() => this.props.setAddFriend(false)}>
          <span className="jam jam-close"></span>
        </button>
        <img className="plant" src={plant}></img>

        <ListOfUsers
          containerClass='scrolling-row'
          firebase={this.props.firebase}
          uid={this.props.uid}
          listName='requests'
          renderFunc={this.renderUser}
        />

        <div className="add-friend">
          <h2>Find friends</h2>
          <p> {this.state.addedFriend} </p>
          <div className="network-input">
            <input id="add-friend-email" type="email"
              placeholder="Search by name or email.."></input>
            <button onClick={this.findFriend}>
              <span className="jam jam-search" ></span>
            </button>
          </div>
        </div>

        <div className="invite-friend">
          <h2>Invite friends to Newroots</h2>
          <p>Ask your close ones who're missing to join you.</p>
          <p>{this.state.invitedFriend}</p>
          <div className="network-input">
            <input type="email" placeholder="Enter their email.."></input>
            <button onClick={this.inviteFriend}>invite</button>
          </div>
        </div>

        {length !== 0 ?
          <h2 className="friend-result-heading">{'Found ' + length + ' people on Newroots'}</h2> :
          <h2 className="friend-result-heading">Couldn't find anyone.</h2>}

        <div className="friend-results">
          {suggestions}
        </div>

      </div>
    );
  }
};

export default AddFriend;