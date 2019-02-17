import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';
import texture1 from './../graphics/flower.png';
import texture2 from './../graphics/thing.png';


const TextQ = (props) => {
  return (
    <div className="ci-question">
      <h2>{props.q}</h2>
      <textarea className="feelings" rows="3" placeholder="Hmm"
        onChange={(event) => props.setAnswer(event.target.value, props.index)}>
        ></textarea>
    </div>
  );
};

const YesNoQ = (props) => {
  return (
    <div className="ci-question">
      <h2>{props.q}</h2>
      <div className="yesno">
        <button className="yes"
          onClick={() => props.setAnswer('yes', props.index)}>
          <span className="jam jam-check" style={{ color: 'white' }}></span>
        </button>
        <button className="no"
          onClick={() => props.setAnswer('no', props.index)}>
          <span className="jam jam-close" style={{ color: '#8A8184' }}> </span>
        </button>
      </div>
      <textarea
        className="feelings"
        rows="1"
        placeholder="Other comments"
        onChange={(event) => props.setComment(event, props.index)}></textarea>
    </div>
  );
};

const RangeQ = (props) => {
  return (
    <div className="ci-question">
      <h2>{props.q}</h2>
      <div className="mood-measurer">
        <input type="range"
          min="1"
          max="7"
          value={props.val}
          onChange={(event) => props.setAnswer(event.target.value, props.index)} />
        <div className="indicator">
          <p>4</p>
        </div>
        <div className="num"><small>1</small><small>7</small></div>
      </div>
      <textarea
        className="feelings"
        rows="1"
        placeholder="Other comments"
        onChange={(event) => props.setComment(event, props.index)}></textarea>
    </div>
  );
};

class CheckinModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkins: props.checkins,
      currIndex: 0
    };
  }

  componentDidMount() {
    $('input[type="range"]').each(function (index) {
      let range = $(this).parent().find('.indicator');
      let p = $(range).find('p');
      $(range).hide();

      $(this).focusin(function () {
        $(range).css('left', ('calc(' + $(this).val() * (1 / 7) * 100) + '% - 60px)');
        $(range).show();
      });

      $(this).focusout(function () {
        $(range).hide();
      });

      $(this).on('input', function () {
        $(range).css('left', ('calc(' + $(this).val() * (1 / 7) * 100) + '% - 60px)');
        $(p).text($(this).val());
      });
    });
  }

  incrementCurrIndex = () => {
    let i = this.state.currIndex;
    this.setState({ currIndex: i + 1 });
  }

  setAnswer = (answer, checkinIndex) => {
    let checkins = this.state.checkins;
    checkins[checkinIndex].answer = answer;

    this.setState({ checkins: checkins });
  }

  setComment = (event, checkinIndex) => {
    let checkins = this.state.checkins;
    checkins[checkinIndex].comment = event.target.value;

    this.setState({ checkins: checkins });
  }


  //TOOD - SAVE CHECKIN DATA
  saveCheckinData = () => {
    let time = moment().format('L');

    this.props.firebase.user(this.props.uid).update({
      // requests: firebase.firestore.FieldValue.arrayRemove(uid),
      lastCheckin: time
    }).then(() => {
      this.props.updateCheckin(time);
    });


  }

  render() {
    let checkinQs = [], checkins = this.state.checkins, currIndex = this.state.currIndex;
    for (var i = currIndex; i < checkins.length && i < currIndex + 1; i++) {
      let addEl;
      if (checkins[i].type == 'text') {
        addEl = (
          <TextQ
            q={checkins[i].q}
            index={i}
            setAnswer={this.setAnswer}
          />
        );
      }
      else if (checkins[i].type == 'yes/no') {
        addEl = (
          <YesNoQ
            q={checkins[i].q}
            index={i}
            setAnswer={this.setAnswer}
            setComment={this.setComment}
          />
        );
      }
      else {
        addEl = (
          <RangeQ
            q={checkins[i].q}
            index={i}
            val={checkins[i].answer ? checkins[i].answer : 4}
            setAnswer={this.setAnswer}
            setComment={this.setComment}
          />
        );
      }
      checkinQs.push(addEl);
    }


    let submitButton = null;
    if (currIndex + 1 >= checkins.length) {
      submitButton = (
        <button id="submit" onClick={this.saveCheckinData}>
          <span className="jam jam-check" style={{ color: '#9FC6C1' }}></span>
        </button>
      );
    } else {
      submitButton = (
        <button id="submit" onClick={this.incrementCurrIndex}>
          <span className="jam jam-arrow-right" style={{ color: '#9FC6C1' }}></span>
        </button>
      );
    }

    return (
      <div className="modal-bg">
        <div className="checkin modal">
        <img className="bg-texture first" src={texture1} />
        <img className="bg-texture second" src={texture2} />
          <div className="bg"></div>
          <h1>{moment().format('MMMM D')}</h1>
          <h1 className="title">
            <div className="highlight"></div><span>check-in</span>
          </h1>
          <div className="checkin-content">
            {checkinQs}

            {submitButton}
          </div>
        </div>
      </div>
    );
  }
}

export default CheckinModal;