'use strict';

import React from 'react';
import countryData from './Country';
import Flag from './Flag';
import CountryKeyVal from './CountryKeyVal';
import SubmitButton from './SubmitButton';

export default class TeamInputForm extends React.Component {
  constructor(){
    super();
    this.state={name: '', country: 'Select Country'};
  }
  
  addTeam(){
    console.log(this.props.players["Mike"]);
    this.props.players[this.state.name] = this.state.country;
    console.log(this.props.players["Matt"]);
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