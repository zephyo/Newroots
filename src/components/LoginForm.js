import React from 'react';

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
    let element = this;
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        element.props.checkLogin(authUser.user.uid);
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
        <h2>Newroots
       <button className="back-but" onClick={this.props.goBack}>
            <span className="jam jam-arrow-left" style={{ color: '#635358' }}></span>
          </button>
        </h2>
        <span className="input-label">
          Email
        </span>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
        />
        <span className="input-label">
          Password
        </span>
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        {error && <p>{error.message}</p>}
        <button className="login-but" onClick={this.onSubmit} disabled={isInvalid} >Login</button>
      </div>
    );
  }
}

export default LoginForm;