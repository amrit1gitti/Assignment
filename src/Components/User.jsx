import React, { Component } from "react";
import "./User.css";
class User extends Component {
  state = { user: "" };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;


    console.log(this.props);

    

    fetch(`https://reqres.in/api/users/${params.userId}`)
      .then((res) => res.json())
      .then(({ data: user }) => {
        this.setState({ user });
      });
  }

  render() {
    return (
      <div className="userCardParent">
        <div key={this.state.id} className="userCard">
          <img
            src={this.state.user.avatar}
            alt="avatar"
            height="200"
            width="200"
            style={{ borderRadius: "50%" }}
          />
          <h1>
            {this.state.user.first_name} {this.state.user.last_name}
          </h1>
          <p>{this.state.user.email}</p>
        </div>
      </div>
    );
  }
}

export default User;
