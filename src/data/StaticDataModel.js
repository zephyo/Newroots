
import React from 'react';


class StaticDataModel extends React.Component {
  constructor() { }

  /*
     uid: dat.uid,
              isMyPost: dat.uid == this.props.uid,
              PpfURL: dat.PpfURL,
              poster: dat.poster,
              timestamp: dat.timestamp,
              message: dat.message */


  static getCheckinObject(postid, data, timestamp) {
    return {
      uid: data.uid,
      name: data.name,
      PpfURL: data.PpfURL,
      timestamp: timestamp,
      postid: postid,
      checkinData: data.checkinData
    };
  }

  static getThoughtObject(postid, data, timestamp) {
    return {
      uid: data.uid,
      name: data.name,
      PpfURL: data.PpfURL,
      thought: data.thought,
      message: data.message,
      comments: data.comm_cont,
      conversation: [],
      postid: postid,
      timestamp: timestamp
    };
  }

  static getConvoObject(convoid, dat, uid) {
    return {
      uid: dat.uid,
      convoid: convoid,
      isMyPost: dat.uid == uid,
      PpfURL: dat.PpfURL,
      poster: dat.poster,
      timestamp: dat.timestamp,
      message: dat.message
    };
  }

  static getPostObject(conversation, conversationLength, showComments) {
    return {
      conversation: conversation,
      conversationLength: conversationLength,
      showComments: showComments
    };
  }
}

export default StaticDataModel;