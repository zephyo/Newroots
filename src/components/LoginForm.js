import React, { Component } from 'react';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = () => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((data) => {
        this.setState({ ...INITIAL_STATE });
        this.props.checkLogin(data);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="login-page">
      <h2>my_friends
       <button className="back-but" onClick={()=>this.props.setLogin(false) }>
         <span className="jam jam-arrow-left" style={{color: '#635358'}}></span>
       </button>
     </h2>
     <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="email"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="password"
        />
     {error && <p>{error.message}</p>}
     <button className="login-but" onClick={this.onSubmit} disabled={isInvalid} >login</button>
   </div>
    );
  }
}

export default LoginForm;