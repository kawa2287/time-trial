'use strict';

import React from 'react';
import countryData from './Country';
import Flag from './Flag';
import CountryKeyVal from './CountryKeyVal';
import SubmitButton from './SubmitButton';

const formattedSeconds = (sec) =>
  Math.floor(sec * 10)/10

export default class TimeTrialTemplate extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name: '',
      country:'Select Country',
      players: this.props.players,
      timeElapsed: this.props.timeElapsed
    };
  }

  handleStopClick() {
    
  }
  
  render() {
    
    var playerNames = [];

    for (var x in this.state.players){
      playerNames.push(this.state.players[x].name);
    }

    
    function extractFlag(){
      if(typeof(this.state.players[this.state.name]) != "undefined"){
        return this.state.players[this.state.name].country.flagPathLG;
      } else {
        return "/img/flagsLG/XX.png";
      }
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
            <div className="stopTime">{formattedSeconds(this.props.timeElapsed)}</div>
            <div className="stopButton">
              <button>Stop Time</button>
            </div>
          </span>
      </div>
    );
  }
}