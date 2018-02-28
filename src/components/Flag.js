'use strict';

import React from 'react';

const data = {
  'cu': {
    'name': 'Cuba',
    'icon': 'cu.png',
  },
  'fr': {
    'name': 'France',
    'icon': 'fr.png',
  },
  'jp': {
    'name': 'Japan',
    'icon': 'JP.png',
  },
  'nl': {
    'name': 'Netherlands',
    'icon': 'nl.png',
  },
  'uz': {
    'name': 'Uzbekistan',
    'icon': 'uz.png',
  }
};

export default class Flag extends React.Component {
  render() {
    const name = data[this.props.code].name;
    const icon = data[this.props.code].icon;
    return (
      <span className="flag">
        <img className="icon" title={name} src={`/img/flags/${icon}`} align="middle"/>
        {this.props.showName && <span className="name"> {name}</span>}
      </span>
    );
  }
}