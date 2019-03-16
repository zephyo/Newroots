
import React from 'react';
import $ from 'jquery';
import moment from 'moment';

class ThoughtInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thought: null
    }
  }

  onThoughtChange = (event) => {
    this.setState({ thought: event.target.value })
  }

  onSubmit = () => {
    //save to feed of every person in the network
    let network = this.props.network;
    let thought = this.state.thought;
    let PpfURL = this.props.PpfURL === undefined ? null : this.props.PpfURL;
    const date = new Date().toString();
    let data = {
      PpfURL: PpfURL,
      name: this.props.name,
      uid: this.props.uid,
      timestamp: new Date().toString(),
      realtime: + new Date(),
      //realtime: moment(date).format('lll'),
      thought: thought
    };


    //save to your feed
    this.props.firebase.feed(this.props.uid).add(data).then((docRef) => {
      let id = docRef.id;
      for (let i = 0; i < network.length; i++) {
        this.props.firebase.feed(network[i]).doc(id).set(data);
      }

      //save to post
      this.props.firebase.posts().doc(id).set(data).then(() => {
        this.setState({
          thought: null
        });
        $('#thought-box').val('');
      });

    });


  }

  render() {

    return (
      <div className="create-thought">
        <textarea rows="2" id="thought-box" placeholder="Your thoughts" onChange={this.onThoughtChange}></textarea>
        <button
          id="update"
          onClick={this.onSubmit}
          disabled={this.state.thought == null}>Update</button>
      </div>
    );
  }
}


export default ThoughtInput;