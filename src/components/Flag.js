'use strict';

import React from 'react';

export default class Flag extends React.Component {
  render(){

    return(
      <img className="icon" src={this.props.icon} align="middle"/>
    );
  }
}