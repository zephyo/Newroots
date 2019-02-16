import React, { Component } from 'react';
import $ from 'jquery';
import autosize from 'autosize';

class FeedTab extends React.Component {
  constructor(props) {
    super(props);
  }
  
   componentDidMount() {
    autosize($('textarea'));
  }
  
  render (){ 
    return (
     <section className="feed">
      <div className="create-thought">
        <textarea rows="2" placeholder="Your thoughts"></textarea>
        <button id="update">update</button>
      </div>
      <h1 className="date-marker">February 15</h1>
      <div className="checkin activity">
        <div className="header">
          <div className="pic"></div><span className="name">Gloria Wang </span><span className="sub">&nbsp;checked in</span><span className="date">A few seconds ago</span>
          <button className="user-edit"><span className="jam jam-pencil"  style={{color: '#EFF0DA'}}></span></button>
        </div>
        <div className="content">
          <div className="mood"><span>feeling </span>
            <div className="mood-icon">5</div>
          </div><span>feeling better but still kinda sad because I don't know anyone in my dorm :/ is that just me?</span>
          <div className="mood"><span>took meds </span>
            <div className="mood-icon"><span className="jam jam-check"  style={{color: '#EFF0DA'}}></span></div>
          </div>
        </div>
        <div className="leave-comment">
          <input type="text" placeholder="comment.."/>
          <button><span className="jam jam-paper-plane"  style={{color: '#9FC6C1'}}></span></button>
        </div>
      </div>
      <div className="thought activity">
        <div className="header">
          <div className="pic"></div><span className="name">Brianna Burman</span><span className="sub">&nbsp;updated</span><span className="date">12 min ago</span>
        </div>
        <div className="reply"><span>worried/stressed abt interviews</span></div>
        <div className="comment"><span>you got this!!</span></div>
        <div className="comment"><span>So awesome you’re planning for them! Since you’re thinking about it, I’m sure you’ll be super prepared!</span></div>
        <div className="reply"><span>thx guys :) i appreicate it</span></div>
        <div className="leave-comment">
          <input type="text" placeholder="comment.."/>
          <button><span className="jam jam-paper-plane"  style={{color: '#9FC6C1'}}></span></button>
        </div>
      </div>
    </section>
    );
  }
}

export default FeedTab;