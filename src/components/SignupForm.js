import React, { Component } from 'react';

const INITIAL_STATE = {
  name: '',
  email: '',
  passwordOne: '',
  error: null,
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
    const default_vals = {
      name: name,
      email: email,
      network: [],
      requests: [],
      checkins: [
        {
          q: 'How are you feeling today?',
          type: 'range',
        }
      ]
    };
    let ID;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        ID = authUser.user.uid;

        return this.props.firebase
          .user(ID)
          .set({
            uid: ID,
            ...default_vals
          });
      })
      .then(() => {

        this.props.SignUp({
          uid: ID,
          ...default_vals
        });

        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

  };

  render() {
    const {
      name,
      email,
      passwordOne,
      error,
    } = this.state;

    const isInvalid =
      passwordOne === '' ||
      email === '' ||
      name === '';

    return (
      <div className="login-page">
        <h2>welcome 🌱
            <button className="back-but" onClick={() => this.props.setSignUp(false)}>
            <span className="jam jam-arrow-left" style={{ color: '#635358' }}></span>
          </button>
        </h2>
        <input
          name="name"
          type="text"
          placeholder="full name"
          value={name}
          onChange={this.onChange}>
        </input>
        <input
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={this.onChange}>
        </input>
        <input
          name="passwordOne"
          type="password"
          placeholder="password"
          value={passwordOne}
          onChange={this.onChange}>
        </input>

        {error && <p>{error.message}</p>}

        <button disabled={isInvalid}
          className="signup-but"
          onClick={() => this.onSubmit()}>
          sign up
          </button>
      </div>
    );
  }
}

export default SignupForm;