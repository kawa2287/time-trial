'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container" height={'100%'}>
        <header>
            <img className="logo" src="/img/headers/bracketTitle.png"/>
        </header>
        
        <div className="app-content" height={'100%'}>{this.props.children}</div>
        <footer>
          <img className="logo" src="/img/headers/bracketFooter.png"/>
        </footer>
      </div>
    );
  }
}