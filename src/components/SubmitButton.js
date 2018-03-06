'use strict';

import React from 'react';

export default class Button extends React.Component {
 render() {
  return (
   <fieldset>
    <button
     type={this.props.type || 'button'}
     value={this.props.value || null}
    >
     {this.props.text}
    </button>
   </fieldset>
  );
 }
}

