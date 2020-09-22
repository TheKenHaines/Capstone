import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Header from "../headnfoot/header";
import Footer from "../headnfoot/footer";
import Login from "../login/login";
import Register from "../register/register";
import ThankYou from "./../thankyou/thankyou";
import Error from "./../thankyou/error";
import BuildList from "./../buildList/BuildList";
import "../globalstyles.css";
import Home from "./../home/home";
import ShoppingList from "./../displayList/ShoppingList";
import Database from './../displayList/Database';

class Layout extends Component {
  state = { isLoggedIn: false };

  loginUser = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  logOutUser = () => {
    this.setState({
      isLoggedIn: false,
    });
  };

  render() {
    return (
      <Router>
        <Header logOutUser={this.logOutUser} {...this.state} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Register" component={Register} />
          <Route
            exact
            path="/Login"
            render={(props) => <Login loginUser={this.loginUser} {...props} />}
          />
          {/* <Route exact  path="/Login" component={Login} /> */}
          <Route exact path="/ThankYou" component={ThankYou} />
          <Route exact path="/Error" component={Error} />
          <Route exact path="/BuildList" component={BuildList} />
          <Route exath path="/ShoppingList" component={ShoppingList} />
          <Route exath path="/Database" component={Database} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default withRouter(Layout);
