import React, { Component } from 'react';

const INITIAL_STATE = {
  name: '',
  email: '',
  passwordOne: '',
  error: null,
  page: 0,
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
    const { name, email, passwordOne } = this.state;
    let element = this;
    const default_vals = {
      name: name,
      easy_name: name.toLowerCase(),
      email: email,
      network: [],
      requests: [],
      checkins: [
        {
          q: 'How are you feeling today?',
          type: 'range',
        }
      ],
      PpfURL: null
    };
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
        this.setState({ error });
      });

  };

  increasePage = () => {
    this.setState({ page: this.state.page + 1 })
  }

  render() {
    const {
      name,
      email,
      passwordOne,
      error,
      page
    } = this.state;

    const maxPages = 2;

    let isInvalid;

    let progressbar;

    let header;
    let input;


    progressbar = <div className="progress-bar">
      <div className="progress" style={{
        width: (page+1) / (maxPages+1) * 100 + '%'
      }}></div>
    </div>;


    if (page === 0) {
      isInvalid = name === '';
      header =
        <h2>My full name is
          <button className="back-but" onClick={() => this.props.setSignUp(false)}>
            <span className="jam jam-arrow-left" style={{ color: '#635358' }}></span>
          </button>
        </h2>;
      input =
        <input
          name="name"
          type="text"
          placeholder="Full name"
          value={name}
          onChange={this.onChange}>
        </input>;
    }
    else if (page === 1) {
      isInvalid = email === '';
      header =
        <h2>My email is
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
        <h2>My password is
          <button className="back-but" onClick={() => this.props.setSignUp(false)}>
            <span className="jam jam-arrow-left" style={{ color: '#635358' }}></span>
          </button>
        </h2>;
      input =
        <input
          name="passwordOne"
          type="password"
          placeholder="Password"
          value={passwordOne}
          onChange={this.onChange}>
        </input>;
    }


    let button;

    if (page < maxPages) {
      button = <button disabled={isInvalid}
        className="signup-but"
        onClick={() => this.increasePage()}>
        Continue
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
        {input}

        {error && <p>{error.message}</p>}
        {button}

      </div>
    );
  }
}

export default SignupForm;