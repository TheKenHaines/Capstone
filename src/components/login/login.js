import React, { Component } from "react";
import cx from "classnames";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class Login extends Component {
  state = {
    user: {
      email: "",
      password1: "",
    },
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempUser = { ...this.state.user };
    tempUser[name] = value;
    this.setState(
      {
      user: tempUser,
    }
    );
  }

  submitLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/login", this.state.user)
    .then(
      (response) => {
        this.props.loginUser()
        localStorage.setItem("loggedInUser", response.data.email);
        this.props.history.push("/BuildList");
      }
    );
  };

  render() {
    return (
      <div
        className={`${cx(
          styles.pageWrapper,
          styles.routeWrapper
        )} row routeWrapper`}
      >
        <div className={styles.main}>
          <p className={styles.sign} align="center">
            Sign In
          </p>
          <form className={styles.form1}>
            <input
              onChange={this.handleChange}
              value={this.state.user.email}
              name="email"
              className={styles.email}
              type="email"
              align="center"
              placeholder="E-mail"
            />
            <input
              onChange={this.handleChange}
              value={this.state.user.password1 }
              name="password1"
              className={styles.pass}
              type="password"
              align="center"
              placeholder="Password"
            />
            <button
              onClick={this.submitLogin}
              className={styles.submit}
              align="center"
            >
              Sign In
            </button>
            <Link className="nav-link" to="/Register">
              <button className={styles.register} align="center" type="button">
                Sign Up
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
