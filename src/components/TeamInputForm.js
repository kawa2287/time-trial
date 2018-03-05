'use strict';

import React from 'react';

let name="{name from input}";
let country= "{country from input}";

export default class TeamInputForm extends React.Component {
  constructor(){
    super();
    this.state={name: '', country: ''}
  }
  render() {
    return (
      <div className ="wrap">
          <h1 className="string">What's your name?</h1>
          <input value={this.state.name} type="text" id="name" onChange={(e)=>{this.setState({name: e.target.value})}}/>
          <h1 className="string">Input Country?</h1>
          <input  value={this.props.country} onChange={(e)=>{this.setState({country: e.target.value})}} type="text" id="country" />
          <h1 className="string">Welcome {this.state.name} From {this.state.country}!</h1>
       </div>
    )
  }
}