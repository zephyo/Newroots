import React, { Component } from 'react';
import StaticUserData from '../data/StaticUserData';


const INITIAL_STATE = {
  name: '',
  lastName: '',
  email: '',
  passwordOne: '',
  error: '',
  page: 0,
  hidePass: true
};

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = () => {
    const { name, lastName, email, passwordOne } = this.state;
    let element = this;
    const default_vals = StaticUserData.getDefaultData(name, lastName, email);
    let ID;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        ID = authUser.user.uid;

        return element.props.firebase
          .user(ID)
          .set({
            uid: ID,
            ...default_vals
          }).then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.SignUp({
              uid: ID,
              ...default_vals

            });
          });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });

  };

  increasePage = () => {

    //form validation
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.state.page === 1 && !re.test(this.state.email)) {
      this.setState({ error: "Please enter a valid email address." })
      return;
    }

    //increase page if inputs are valid
    this.setState({ page: this.state.page + 1, error: '' })
  }

  hidePassword = () => {
    this.setState({ hidePass: !this.state.hidePass })
  }

  render() {
    const {
      name,
      lastName,
      email,
      passwordOne,
      error,
      page,
      hidePass
    } = this.state;

    const maxPages = 2;

    let isInvalid;

    let progressbar;

    let header;
    let input;

    let small;


    progressbar = <div className="progress-bar">
      <div className="progress" style={{
        width: (page + 1) / (maxPages + 1) * 100 + '%'
      }}></div>
    </div>;


    if (page === 0) {
      isInvalid = name === '' || lastName === '';
      header =
        <h2 className="sign-up-header">My name is
          <button className="back-but" onClick={() => this.props.setSignUp(false)}>
            <span className="jam jam-arrow-left" style={{ color: '#635358' }}></span>
          </button>
        </h2>;
      input =
        <div>
          <input
            name="name"
            type="text"
            placeholder="First name"
            value={name}
            onChange={this.onChange}>
          </input>

          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={this.onChange}
          >
          </input>
        </div>
        ;
    }
    else if (page === 1) {
      isInvalid = email === '';
      header =
        <h2 className="sign-up-header">My email is
          <button className="back-but" onClick={() => this.props.setSignUp(false)}>
            <span className="jam jam-arrow-left" style={{ color: '#635358' }}></span>
          </button>
        </h2>;
      input =
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={this.onChange}>
        </input>;
    }
    else if (page === 2) {
      isInvalid = passwordOne === '';
      header =
        <h2 className="sign-up-header">My password is
          <button className="back-but" onClick={() => this.props.setSignUp(false)}>
            <span className="jam jam-arrow-left" style={{ color: '#635358' }}></span>
          </button>
        </h2>;

      let passIcon, passType;
      if (hidePass) {
        passIcon = "jam jam-eye-close";
        passType = "password";
      } else {
        passIcon = "jam jam-eye";
        passType = "text";
      }
      input =
        <div className="pass-input">
          <input
            name="passwordOne"
            type={passType}
            placeholder="Password"
            value={passwordOne}
            onChange={this.onChange}>
          </input>
          <button className="hidePassword" onClick={this.hidePassword}>
            <span className={passIcon}></span>
          </button>
        </div>
        ;

      small =
        <small>
          Use 6 or more characters with a mix of letters, numbers, & symbols
       </small>;
    }

    if (error.length > 0) {
      small = <small className="error">
        {error}
      </small>
    }


    let button;

    if (page < maxPages) {
      button = <button disabled={isInvalid}
        className="signup-but"
        onClick={() => this.increasePage()}>
        Next
      </button>;
    } else {
      button = <button disabled={isInvalid}
        className="signup-but"
        onClick={() => this.onSubmit()}>
        Sign up
    </button>;
    }

    return (
      <div className="login-page">
        {progressbar}

        {header}
        <div className="input-container">
          {input}
          {small}
        </div>

        {button}

      </div>
    );
  }
}

export default SignupForm;