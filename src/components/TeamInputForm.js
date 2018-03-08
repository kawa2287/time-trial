'use strict';

import React from 'react';
import countryData from './Country';
import Flag from './Flag';
import CountryKeyVal from './CountryKeyVal';
import SubmitButton from './SubmitButton';

export default class TeamInputForm extends React.Component {
  constructor(){
    super();
    this.state={
      name: '', 
      country: 'Select Country'
    };
  }
  
  addTeam(){
    this.props.players[this.state.name] = {
        name : this.state.name,
        country : this.state.country,
        seed : 0,
        timeTrial : 0,
        wins : 0,
        losses : 0,
        totalTime : 0,
        avgTime : 0
    }
  }
  
  render() {
    
    var countryNames = [];

    for (var x in countryData){
      countryNames.push(countryData[x].name);
    }
    
    return (
      <div className ="wrap">
        <div className="input-line">
          <label className="string">Enter Name</label>
          <input placeholder="Input Name" value={this.state.name} type="text" id="name" onChange={(e)=>{this.setState({name: e.target.value})}}/>
        </div>
        <div className="input-line">
          <label className="string">Select Country</label>
          <input  list="countryList" placeholder="Select Country" value={this.props.country} onChange={(e)=>{this.setState({country: e.target.value})}} type="text" id="country" />
          <datalist id="countryList">{countryNames.map((name, i) => <option data-id={i} value={name}/>)}</datalist>
        </div>
        <div className="country-select-image">
          <Flag icon={CountryKeyVal[this.state.country].flagPathXL} />
        </div>
        <div className="name-display">
          {this.state.name}
        </div>
        <SubmitButton onClick={this.addTeam.bind(this)}/>
      </div>
    );
  }
}