import React, { Component } from 'react';
import { Link } from 'react-router-dom';


//import components and containers


class BaseLayout extends Component {
  render() {
    return (
        <div className="container">
          {this.props.children}
        </div>
    );
  }
}

export default BaseLayout;
