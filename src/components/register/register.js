import React, { Component } from "react";
import Axios from "axios";
import styles from "../styles.module.css";
import cx from "classnames";

export default class Register extends Component {
  state = {
    user: {
      email: "",
      password1: "",
      password2: "",
    },
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempUser = { ...this.state.user };
    tempUser[name] = value;
    this.setState({
      user: tempUser,
    });
  };

  registerSubmitHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/submitUserDetails", this.state.user)
      .then((reponse) => { 
        this.props.history.push("/ThankYou");
      })
      .catch((error) => {
        this.props.history.push("/Error");
        console.log(error);
      });
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
            Register
          </p>
          <form className={styles.form1} onSubmit={this.registerSubmitHandler}>
            <input
              onChange={this.handleChange}
              value={this.state.email}
              name="email"
              className={styles.email}
              type="text"
              align="center"
              placeholder="E-mail"
            />
            <input
              onChange={this.handleChange}
              value={this.state.password}
              name="password1"
              className={styles.pass}
              type="password"
              align="center"
              placeholder="Password"
            />
            <input
              onChange={this.handleChange}
              value={this.state.password2}
              name="password2"
              className={styles.pass}
              type="password"
              align="center"
              placeholder="Repeat Password"
            />
            <button
              className={styles.submit}
              onClick={this.registerSubmitHandler}
              align="center"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}
