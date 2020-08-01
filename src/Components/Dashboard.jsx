import React, { Component } from "react";
import "./Dashboard.css";

class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      userList: [],
      maxCount: Number.MAX_VALUE,
    };
  }

  // componentDidMount() {
  //   fetch("https://reqres.in/api/users?page=2")
  //     .then((res) => res.json())
  //     .then((rec) => this.setState({ userList: [...rec.data] }));
  // }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("https://reqres.in/api/users?page=" + this.state.count)
      .then((res) => res.json())
      .then((rec) => {
        this.setState({ userList: [...rec.data], maxCount: rec.total_pages });
      });
  }

  moveBackward = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  moveForward = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.count !== this.state.count &&
      this.state.count <= this.state.maxCount &&
      this.state.count > 0
    )
      this.fetchData();

    if (this.state.count === this.state.maxCount) {
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.state.count !== nextState.count &&
        nextState.count <= this.state.maxCount &&
        nextState.count > 0) ||
      this.state.userList !== nextState.userList
    );
  }

  handleUserInfo = (e) => this.props.history.push(`/users/${e}`);

  logout = () => {
    this.props.history.replace(`/`);
    localStorage.setItem("loggedIn", false);
  };
  render() {
    let forwardButton;
    if (this.state.count === this.state.maxCount) {
      forwardButton = null;
    } else {
      forwardButton = (
        <button onClick={this.moveForward} className="forwardButton">
          &gt;
        </button>
      );
    }
    let backwardButton;
    if (this.state.count === 1) {
      backwardButton = null;
    } else {
      backwardButton = (
        <button onClick={this.moveBackward} className="backwardButton">
          &lt;
        </button>
      );
    }
    return (
      <div className="mainContainer">
        <button className="logout" onClick={this.logout}>
          Logout
        </button>
        <div id="container">
          {this.state.userList &&
            this.state.userList.map((item) => (
              <div
                className="card"
                key={item.id}
                onClick={() => this.handleUserInfo(item.id)}
              >
                <div className="inner">
                  <div className="front">
                    <img
                      className="imgClass"
                      alt="avatar"
                      style={{ width: "200px", height: "200px" }}
                      src={item.avatar}
                    />
                  </div>
                  <div className="back">
                    {item.first_name} {item.last_name}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="lowercontainer">
          {backwardButton}
          <button className="countButton">{this.state.count}</button>
          {forwardButton}
        </div>
      </div>
    );
  }
}

export default Dashboard;
