'use strict';

import React from 'react';

export default class TaskPreview extends React.Component {
  render() {
    return (
      <div className="task-preview">
        <img src={`img/buttons/${this.props.image}`} />
        <h2 className="name">{this.props.name}</h2>
      </div>
    );
  }
}