import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';

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
    return (
      <div className="modal-bg">
        <div className="checkin modal"><img className="bg-texture first" src={this.props.graphicsURL + "flower.png"}/><img className="bg-texture second" src={this.props.graphicsURL + "thing.png"}/>
          <div className="bg"></div>
          <h1>{moment().format('MMMM D')}</h1>
          <h1 className="title"> 
            <div className="highlight"></div><span>check-in</span>
          </h1>
          <h2>How are you feeling today?</h2>
          <div className="mood-measurer">
            <input type="range" min="1" max="7" value={this.state.mood} onChange={(e) => this.setMood(e)}/>
            <div className="indicator">
              <p>4</p>
            </div>
            <div className="num"><small>1</small><small>7</small></div>
          </div>
          <textarea className="feelings" placeholder="How am I feeling? .."></textarea>
          <h2>Did you take your medication?</h2>
          <div className="yesno">
            <button className="yes"><span className="jam jam-check"   style={{color: 'white'}}></span></button>
            <button className="no"><span className="jam jam-close"   style={{color: '#8A8184'}}> </span></button>
          </div>
          <button id="submit" onClick={()=>this.props.updateCheckin()}><span className="jam jam-check"   style={{color: '#9FC6C1'}}></span></button>
        </div>
      </div>
    );
  }
}

export default CheckinModal;