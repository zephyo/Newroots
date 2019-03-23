import React from 'react';

/*
  modalOptions: [
    {
      text: 'Edit',
      onClick: this.?,
      class: 'green'
    },
    ...
  ]
*/

//edit / delete

//report / mute

class MoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  setModal = (bool) => {
    this.setState({ showModal: bool })
    if (bool == false) {
      document.removeEventListener('mousedown', this.handleClickOutside, false);
    } else {
      document.addEventListener('mousedown', this.handleClickOutside, false);
    }
  }

  handleClickOutside = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }

    this.setModal(false);
  }


  render() {
    let modal = null;

    if (this.state.showModal) {
      let opts = this.props.modalOptions.map((item, index) => {
        return <button
          key={'option_' + index}
          className={item.class}
          onClick={() => {
            item.onClick();
            this.setModal(false);
          }}
        >
          {item.text}
        </button>

      });

      modal = <div className='post-modal'>{opts}</div>;
    }

    return (
      <div
        ref={node => this.node = node}
        className="flex-child-left"
      >
        <button className="user-filter" onClick={() => this.setModal(!this.state.showModal)}>
          <span className="jam jam-more-horizontal-f" ></span>
        </button>
        {modal}
      </div>
    );
  }
}


export default MoreButton;
