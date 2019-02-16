import React, { Component } from 'react';

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
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

  onSubmit = event => {
    const { email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.SignUp({
          username: username,
          email: email
        });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const {
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="login-page">
        <h2>welcome 🌱
            <button className="back-but" onClick={() => this.props.setSignUp(false)}>
            <span className="jam jam-arrow-left" style={{ color: '#635358' }}></span>
          </button>
        </h2>
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
        <input 
          name="passwordTwo" 
          type="password" 
          placeholder="confirm password" 
          value={passwordTwo}
          onChange={this.onChange}>
          </input>    

          {error && <p>{error.message}</p>}

        <button disabled={isInvalid}
          className="signup-but" 
          onClick={() => this.onSubmit() }>
          sign up
          </button>
      </div>
    );
  }
}

export default SignupForm;