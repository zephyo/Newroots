import React from 'react';
import SaveCancelHeader from '../../Misc/SaveCancelHeader';
import SimpleModal from '../../Misc/SimpleModal';

/*
  goBack
  key
  inputType
  verifyInput : func(str), return str
  successCallback
  failCallback
  firebase
*/
class EditSecurity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: '',
      password: '',
      confirmPword: false
    }
  }

  setValue = (e) => this.setState({ value: e.target.value })

  setPassword = (e) => this.setState({ password: e.target.value })

  confirmPword = (bool) => this.setState({ confirmPword: bool })

  checkSubmit = () => {
    let error = this.props.verifyInput(this.state.value);
    this.setState({ error });
    if (error === '') {
      this.confirmPword(true)
    }
  }

  reAuth = () => {
    this.confirmPword(false);
    this.props.firebase.reAuth(this.state.password, () => this.props.successCallback(this.state.value), this.onFail)
  }

  onFail = (error) => {
    this.setState({ error: error.message })
  }

  render() {
    let modal;
    let isInvalid = this.state.value == null || this.state.value == '';

    if (this.state.confirmPword == true) {
      modal = <SimpleModal
        t='Enter your password'
        footer={<div>
          <input type="password" placeholder="Password" onChange={this.setPassword} />
          <div>
            <button onClick={() => this.confirmPword(false)}>Cancel</button>
            <button onClick={this.reAuth}>Confirm</button>
          </div>
        </div>}
      />;
    }

    return (
      <div className="content">
        <SaveCancelHeader
          Cancel={this.props.goBack}
          Save={this.checkSubmit}
          disabled={isInvalid}
        />
        <p>{'Change your ' + this.props.key}</p>
        <input type={inputType} placeholder={'New ' + this.props.key} onChange={this.setValue} />
        {this.state.error != '' ? <small>{this.state.error}</small> : null}
        {modal}
      </div>
    );
  }
}


export default EditSecurity;