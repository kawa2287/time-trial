'use strict';

import React from 'react';

export default class SubmitButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick} >Submit Team</button>
    );
  }
}