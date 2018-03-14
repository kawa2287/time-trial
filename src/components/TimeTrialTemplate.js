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
    
    this.setState({ stopSwitch : 1, stopTime : this.props.timeElapsed }, function afterClick () {
      if(this.state.finish == 1) return console.log("ALREADY INPUT");
      else return (
        this.props.addTimeTrial(this.state.name, formattedSeconds(this.state.stopTime)),
        this.setState({finish : 1})
        );
    });
  }
  
  render() {
    
    var playerNames = [];

    for (var x in this.state.players){
      playerNames.push(this.state.players[x].name);
    }
    
    return (
      <div className ="ttQuad">
        <div className="q-a-playerIdLeft">
          X
        </div>
        <div className="q-a-playerInfoRight">
          <div className="q-b-playerSelectTop">
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
          <div className="q-b-infoBottom">
            <div className="q-c-playerFlag">
              <span className="helper">
                <Flag icon={typeof(this.state.players[this.state.name]) != "undefined" ? this.state.players[this.state.name].country.flagPathXL :"/img/flagsXL/XX.png"}/>
              </span>
            </div>
            <div className="q-c-playerTime">
              <div className="q-d-timeTop">
                {this.state.stopSwitch == null ? formattedSeconds(this.props.timeElapsed) : formattedSeconds(this.state.stopTime)}
              </div>
              <div className="q-d-buttonBottom">
                <button onClick={this.handleStopClick.bind(this)}>Stop Time</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}