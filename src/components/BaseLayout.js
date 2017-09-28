import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


//import components and containers


class BaseLayout extends Component {
  render() {
    return (
        <div className="container">
            <div className="navbar navbar-expand-lg navbar-light bg-light">
              <NavLink className="navbar-brand" to="/">BankShot</NavLink>
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/users">Users</NavLink>
            </div>
            {this.props.children}
        </div>
    );
  }
}

export default BaseLayout;
