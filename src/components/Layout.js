'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to="/">
            <img className="logo" />
          </Link>
        </header>
        
        <div className="app-content">{this.props.children}</div>

      </div>
    );
  }
}