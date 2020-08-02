import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  validate = () => {
    if (this.state.username === "") {
      alert("Please Enter Username");
      return false;
    } else if (this.state.password === "") {
      alert("Please Enter Password");
      return false;
    }
    return true;
  };
  handleLogin = () => {
    const isValid = this.validate();
    if (isValid === false) {
      return;
    }
    fetch("https://reqres.in/api/login", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        clientId: "authService",
        clientSecret: "123",
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          localStorage.setItem("loggedIn", true);
          this.props.history.replace("/dashboard");
        } else {
          localStorage.setItem("loggedIn", false);
          alert("User not found!");
        }
      });
  };

  handleUsername = event =>
    this.setState({ username: event.currentTarget.value });
  handlePassword = event =>
    this.setState({ password: event.currentTarget.value });

  render() {
    return (
      <div className="container">
        <div>
          <div>
            <label>UserName:</label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="input"
              onChange={this.handleUsername}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Password:</label>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="input"
              onChange={this.handlePassword}
            />
          </div>
        </div>
        <div>
          <button onClick={this.handleLogin} value="Login" className="button">
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
