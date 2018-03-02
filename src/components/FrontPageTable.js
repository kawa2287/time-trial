
'use strict';

import React, { Component } from 'react';
import Flag from './Flag';
import countries from '../data/countries';

export default class Table extends Component {

  render(){

    function randomIntFromInterval(min,max){
      return Math.floor(Math.random()*(max-min+1)+min);
    }

    var countryData = [];

    function CountryInfo(name, iso2, flagPath) {
      this.name = name;
      this.iso2 = iso2;
      this.flagPath = flagPath;
  }

  for (var key in countries[0]){
      if (countries[0].hasOwnProperty(key)) {
        var x = new CountryInfo;
        x.name = countries[0][key].name;
        x.iso2 = key;
        x.flagPath = "/img/flags/"+key+".png";
        countryData.push(x);
        }
    };

    let rows = [];
    var headerCells = [];
    headerCells.push(<td className="cell" key="headerCell 1" id="headerCell 1"><strong>Country</strong></td>);
    headerCells.push(<td className="cell" key="headerCell 2" id="headerCell 2"><strong>Player</strong></td>);
    headerCells.push(<td className="cell" key="headerCell 3" id="headerCell 3"><strong>Time Trial</strong></td>);

    rows.push(<tr key="header" id="header">{headerCells}</tr>);

    for (var i = 0; i < this.props.nRows; i++){
      let rowID = `row${i}`;
      let cell = [];

      var n =randomIntFromInterval(0,countryData.length);
      var time = randomIntFromInterval(200,500)/10;
      
      let cellID = "cell " + {i};
      cell.push(<td className="cell" key={cellID + " -1"} id={cellID + " -1"}><Flag icon={countryData[n].flagPath}/></td>);
      cell.push(<td className="cell" key={cellID + " -2"} id={cellID + " -2"}>{countryData[n].name}</td>);
      cell.push(<td className="cell" key={cellID + " -3"} id={cellID + " -3"}>{time}  sec</td>);
      
      rows.push(<tr key={i} id={rowID}>{cell}</tr>);
    }
    
    return(
      <table className="country-chart" id="simple-board">
         <tbody>
           {rows}
         </tbody>
       </table>
    );
  }
}