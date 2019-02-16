import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';
import texture1 from './../graphics/flower.png';
import texture2 from './../graphics/thing.png';


const TextQ = (props) => {
  return (
    <div>
    <h2>{props.q}</h2>
    <textarea className="feelings" rows="3" placeholder="Hmm"></textarea>
  </div>
  );
};

const YesNoQ = (props) => {
  return (
    <div>
    <h2>{props.q}</h2>
    <div className="yesno">
      <button className="yes"><span className="jam jam-check"   style={{color: 'white'}}></span></button>
      <button className="no"><span className="jam jam-close"   style={{color: '#8A8184'}}> </span></button>
    </div>
    <textarea className="feelings" rows="1" placeholder="Other comments"></textarea>
  </div>
  );
};

const RangeQ = (props) => {
  return (
    <div>
    <h2>{props.q}</h2>
    <div className="mood-measurer">
      <input type="range" min="1" max="7" value={props.mood} onChange={(e) => props.setMood(e)}/>
      <div className="indicator">
        <p>4</p>
      </div>
      <div className="num"><small>1</small><small>7</small></div>
    </div>
    <textarea className="feelings" rows="1" placeholder="Other comments"></textarea>
  </div>
  );
};

class CheckinModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 4
    };
  }
  
  componentDidMount() {
    $( 'input[type="range"]' ).each(function( index ) {
      let range =  $(this).parent().find('.indicator');
      let p = $(range).find('p');
      $(range).hide();

     $(this).focusin(function () {
        $(range).css('left', ('calc('+$(this).val()*(1/7)*100)+'% - 60px)');
         $(range).show();
     });

     $(this).focusout(function () {
        $(range).hide();
     });

      $(this).on('input', function() {
        $(range).css('left', ('calc('+$(this).val()*(1/7)*100)+'% - 60px)');
        $(p).text($(this).val());
      });
    });
  }
  
  setMood = (event) => {
    this.setState({mood: event.target.value});
  };
  
  render (){ 
    let checkinQs = [], checkins = this.props.checkins;
    for (var i = 0; i < checkins.length; i++){
      let addEl;
      if (checkins[i].type == 'text'){
        addEl = (
         <TextQ 
           q={checkins[i].q}
         />
        );
      }
      else if (checkins[i].type == 'yes/no'){
        addEl = (
         <YesNoQ 
           q={checkins[i].q}
         />
        );
      }
      else{
        addEl = (
         <RangeQ 
           q={checkins[i].q}
           mood={this.state.mood}
           setMood={this.setMood}
         />
        );
      }
      checkinQs.push(addEl);
    }

    return (
      <div className="modal-bg">
        <div className="checkin modal"><img className="bg-texture first" src={texture1}/><img className="bg-texture second" src={texture2}/>
          <div className="bg"></div>
          <h1>{moment().format('MMMM D')}</h1>
          <h1 className="title"> 
            <div className="highlight"></div><span>check-in</span>
          </h1>

          {checkinQs}

          <button id="submit" onClick={()=>this.props.updateCheckin()}><span className="jam jam-check"   style={{color: '#9FC6C1'}}></span></button>
        </div>
      </div>
    );
  }
}

export default CheckinModal;