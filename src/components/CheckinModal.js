import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';
import texture1 from './../graphics/flower.png';
import texture2 from './../graphics/thing.png';


class TextQ extends React.Component {

  constructor(props) {
    super(props);
  }

  clearInput = () => {
    this.refs.comments.value = ""
  }

  render() {
    return (
      <div className="ci-question">
        <h2>{this.props.q}</h2>
        <textarea
          className="feelings"
          rows="3"
          placeholder="I think.."
          ref="comments"
          onChange={(event) => this.props.setAnswer(event.target.value, this.props.index)}></textarea>
      </div>
    );
  }

};

class YesNoQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: this.props.answer,
    };
  }

  clearInput = () => {
    this.setState({ answer: null })
    this.refs.comments.value = ""
  }

  render() {
    let yesClass = 'yes', noClass = 'no', answer = this.state.answer;
    if (answer == 'yes') {
      yesClass += ' selected';
    } else if (answer == 'no') {
      noClass += ' selected';
    }
    return (
      <div className="ci-question">
        <h2>{this.props.q}</h2>
        <div className="yesno">
          <button className={yesClass}
            onClick={() => {
              this.setState({ answer: 'yes' })
              this.props.setAnswer('yes', this.props.index)
            }}>
            <span className="jam jam-check" ></span>
          </button>
          <button className={noClass}
            onClick={() => {
              this.setState({ answer: 'no' })
              this.props.setAnswer('no', this.props.index)
            }}>
            <span className="jam jam-close"> </span>
          </button>
        </div>
        <textarea
          className="feelings"
          rows="1"
          placeholder="Other comments"
          ref="comments"
          onChange={(event) => this.props.setComment(event, this.props.index)}></textarea>
      </div>
    );
  }

}

class RangeQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: props.val
    }
  }
  clearInput = () => {
    this.setState({ range: 5 })
    this.refs.comments.value = ""
  }



  componentDidMount() {
    $('input[type="range"]').each(function (index) {
      let range = $(this).parent().find('.indicator');
      let p = $(range).find('p');
      $(range).hide();

      $(this).focusin(function () {
        $(range).css('left', ('calc(' + $(this).val() * (1 / 10) * 100) + '% - 60px)');
        $(range).show();
      });

      $(this).focusout(function () {
        $(range).hide();
      });

      $(this).on('input', function () {
        $(range).css('left', ('calc(' + $(this).val() * (1 / 10) * 100) + '% - 60px)');
        $(p).text($(this).val());
      });
    });
  }

  onChangeRange = (event) => {
    this.props.setAnswer(event.target.value, this.props.index);
    this.setState({ range: event.target.value });
  }

  render() {
    return (
      <div className="ci-question">
        <h2>{this.props.q}</h2>
        <div className="mood-measurer">
          <input type="range"
            min={this.props.min}
            max={this.props.max}
            value={this.state.range}
            onChange={this.onChangeRange} />
          <div className="indicator">
            <p>4</p>
          </div>
          <div className="num">
            <small>{this.props.min}</small>
            <small>{this.state.range}</small>
            <small>{this.props.max}</small>
          </div>
        </div>
        <textarea
          className="feelings"
          rows="1"
          placeholder="Other comments"
          ref="comments"
          onChange={(event) => this.props.setComment(event, this.props.index)}></textarea>
      </div>
    );
  }
};

class CheckinModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkins: props.checkins,
      currIndex: 0
    };
    this.childQ = React.createRef();
  }



  incrementCurrIndex = () => {
    let i = this.state.currIndex;
    this.setState({ currIndex: i + 1 });
    this.childQ.current.clearInput();
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

    if (this.state.checkins.length !== 0) {
      //save to feed of every person in the network
      let network = this.props.network;
      let PpfURL = this.props.PpfURL === undefined ? null : this.props.PpfURL;
      let data = {
        PpfURL: PpfURL,
        name: this.props.name,
        uid: this.props.uid,
        checkin: true,
        checkinData: this.state.checkins,
        timestamp: new Date().toString()
      };

      //save to your feed
      this.props.firebase.feed(this.props.uid).add(data).then((docRef) => {
        let id = docRef.id;
        for (let i = 0; i < network.length; i++) {
          this.props.firebase.feed(network[i]).doc(id).set(data);
        }

        //save to post
        this.props.firebase.posts().doc(id).set(data);
      });
    }


    this.props.firebase.user(this.props.uid).update({
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
            ref={this.childQ}
            q={checkins[i].q}
            index={i}
            setAnswer={this.setAnswer}
          />
        );
      }
      else if (checkins[i].type == 'yes/no') {
        addEl = (
          <YesNoQ
            ref={this.childQ}
            q={checkins[i].q}
            index={i}
            setAnswer={this.setAnswer}
            setComment={this.setComment}
            answer={checkins[i].answer}
          />
        );
      }
      else {
        addEl = (
          <RangeQ
            ref={this.childQ}
            q={checkins[i].q}
            index={i}
            val={checkins[i].answer ? checkins[i].answer : 5}
            setAnswer={this.setAnswer}
            setComment={this.setComment}
            min={1}
            max={10}
          />
        );
      }
      checkinQs.push(addEl);
    }

    if (checkins.length === 0) {
      checkinQs.push(
        <div className="ci-question">
          <h2>{'Good day, ' + this.props.name + '.'}</h2>
          <p>
            You've got nothing to check-in - have a great rest of the day.
          </p>
        </div>
      );
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
          <h1>{moment().format('MMMM D') + ":\nDAILY"}</h1>
          <h1 className="title">
            <div className="highlight"></div><span>check-in</span>
          </h1>
          <div className="checkin-content">
            <div className="progress-bar">
              <div className="progress" style={{
                width: (currIndex + 1) / (checkins.length) * 100 + '%'
              }}></div>
            </div>
            {checkinQs}

            {submitButton}
          </div>
        </div>
      </div>
    );
  }
}

export default CheckinModal;