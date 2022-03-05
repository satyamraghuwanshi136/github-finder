import React, { Component, Fragment } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import User from './components/users/User';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
    warning: false,
  };

  searchUsers = async (text) => {
    this.setState({ loading: true, warning: false });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${process.env.githubClientSecret}`
    );
    if (res.data) this.setState({ users: res.data.items, loading: false });
    if (this.state.users.length === 0) this.setState({ warning: true });
  };

  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${process.env.githubClientSecret}`
    );
    if (res.data) this.setState({ user: res.data, loading: false });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${process.env.githubClientSecret}`
    );
    if (res.data) this.setState({ repos: res.data, loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  clearUsers = () => {
    this.setState({ users: [] });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar title="github finder" icon="fab fa-github" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route path="/about" exact component={About} />
              <Route
                path="/"
                exact
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showUsers={this.state.users.length ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      users={this.state.users}
                      loading={this.state.loading}
                      warning={this.state.warning}
                    />
                  </Fragment>
                )}
              />
              <Route
                path="/users/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    repos={this.state.repos}
                    user={this.state.user}
                    loading={this.state.loading}
                  />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
