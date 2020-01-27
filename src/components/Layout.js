'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container" height={'100%'}>
        <header>
            <p>Eagle River 2020</p>
        </header>
        
        <div className="app-content" height={'100%'}>{this.props.children}</div>
        <footer>
        </footer>
      </div>
    );
  }
}