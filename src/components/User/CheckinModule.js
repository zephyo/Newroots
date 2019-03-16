
import React from 'react';
import AddCheckin from '../Network/AddCheckin';
import $ from 'jquery';
import CheckInRow from '../Network/CheckinRow';
import autosize from 'autosize';
import StaticUserData from '../../data/StaticUserData'

class CheckinModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkins: this.props.checkins,
      checkinFreq: this.props.checkinFreq,
      addMode: false,
    };
  }

  componentDidMount() {
    autosize($('textarea'));
  }

  setAddMode = (bool) => this.setState({ addMode: bool });

  addCheckin = (obj) => {
    this.props.firebase
      .user(this.props.uid)
      .update({
        checkins: this.props.firebase.arrayUnion(obj)
      });
  }

  removeCheckin = (obj) => {
    this.props.firebase
      .user(this.props.uid)
      .update({
        checkins: this.props.firebase.arrayRemove(obj)
      });
  }

  setCheckinFreq = (triggeredIndex) => {
    let tempFreq = this.state.checkinFreq;
    tempFreq[triggeredIndex] = !tempFreq[triggeredIndex];
    this.props.setCheckinFreq(tempFreq);
  }

  render() {
    let checkins,
      addQ,
      freq;

    let freqButtons = StaticUserData.getDaysOfWeek().map((item, index) => {
      let className = "";
      if (this.state.checkinFreq[index] == false) {
        className = "disable";
      }
      if (this.props.editMode) {
        return <button
          key={'freq_' + index}
          className={className}
          onClick={() => this.setCheckinFreq(index)}>
          {item}
        </button>;
      }
      else {
        return <div
          key={'freq_' + index}
          className={className}>
          {item}
        </div>;
      }
    });
    freq = (
      <div className="freq-days">
        {freqButtons}
      </div>
    );

    if (this.state.addMode) {
      addQ = (
        <AddCheckin
          setAddMode={this.setAddMode}
          uid={this.props.uid}
          addCheckin={this.addCheckin}
          categories={this.props.checkinCategories}
        />
      );
    } else {
      addQ = (
        <button className="add-checkin" onClick={() => { this.setAddMode(true) }}>Add check-in
        </button>
      );
    }

    checkins = {};
    for (let i = 0; i < this.state.checkins.length; i++) {
      let checkin = this.state.checkins[i];
      if (checkin.category == null || checkin.category == '') {
        checkin.category = StaticUserData.getMiscCategory();
      }

      if (!(checkin.category in checkins)) {
        checkins[checkin.category] = [];
      }

      checkins[checkin.category].push(
        <CheckInRow
          checkin={checkin}
          removeCheckin={this.removeCheckin}
          trash={this.state.editMode}
        />
      );
    }

    let checkinsEl = [];
    for (let category in checkins) {
      let el = <div className={"qcat " + category}>
        <h2>{category}</h2>
        <ul className="your-checkins">
          {checkins[category]}
        </ul>
      </div>;

      if (category == StaticUserData.getMiscCategory()) {
        console.log(category + ' is misc ');
        checkinsEl.push(el);
      } else {
        checkinsEl.unshift(el);
      }
    }

    return (
      <div className="check-in-edit">
        <h2>Your check-in</h2>

        <h3>Check-in frequency</h3>
        {freq}

        <h3>Check-in questions</h3>
        <div className="checkinQs">
          {checkinsEl}
        </div>
        {addQ}
      </div>
    );
  }
}


export default CheckinModule;