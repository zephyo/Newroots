import React from 'react';
import Avatar from '../Misc/Avatar';


const ConvoBase = (props) => {
  let classN;
  if (!props.isMyPost) {
    classN = 'reply';
  } else {
    classN = 'comment';
  }

  return (
    <div className={classN}
      onMouseEnter={props.mouseEnter}
      onMouseLeave={props.mouseLeave}
    >
      <Avatar PpfURL={props.PpfURL} />
      <div className="bubble">
        {props.message}
      </div>
      {props.optionalContent}
    </div>
  );
};

export default ConvoBase;
