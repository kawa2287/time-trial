'use strict';

import React from 'react';
import Flag from './Flag';

const formattedSeconds = (sec) =>
  Math.floor(sec) + '.' + 
  (sec < 1 ? Math.round(Math.floor(sec*10)) : Math.round(10*( (Math.floor(sec*10)/10) % (Math.floor(sec)))) ) +
  Math.floor((sec % 0.1)*100);

export default class TimeTrialTemplate extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name: '',
      country:'Select Country',
      players: this.props.players,
      timeElapsed: this.props.timeElapsed,
      stopSwitch: null,
      stopTime: null,
      finish: 0
    };

  }

  handleStopClick() {
    
    this.setState((state) => {
      if(state.finish >= 1) return undefined;
      else return (
        { finish: 1, 
        stopTime: this.props.timeElapsed,
        stopSwitch: 1}
        );
    });

    if (this.state.finish <= 1){
      this.props.finishHandle(this.state.finish);
    }
  }
  
  render() {
    
    var playerNames = [];

    for (var x in this.state.players){
      playerNames.push(this.state.players[x].name);
    }
    
    return (
      <div className ="indyWrap">
          <div className="input-line">
              <label className="string">Select Player {this.props.position}</label>
              <input  
              list="playerList" 
              placeholder="Select Player" 
              value={this.props.name}
              onChange={(e)=>{this.setState({name: e.target.value})}} 
              type="text" id="name" 
              />
              <datalist id="playerList">
                  {playerNames.map((name, i) => <option data-id={i} value={name}/>)}
              </datalist>
          </div>
          <div className="country-select-image">
              <Flag 
              icon={typeof(this.state.players[this.state.name]) != "undefined" ? this.state.players[this.state.name].country.flagPathXL :"/img/flagsXL/XX.png"}
              />
          </div>
          <span className="timeContainer">
            <div className="stopTime">{this.state.stopSwitch == null ? formattedSeconds(this.props.timeElapsed) : formattedSeconds(this.state.stopTime)}</div>
            <div className="stopButton">
              <button onClick={this.handleStopClick.bind(this)}>Stop Time</button>
            </div>
          </span>
      </div>
    );
  }
}