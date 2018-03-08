
'use strict';

import React, { Component } from 'react';
import Flag from './Flag';
import countryData from './Country';

export default class Table extends Component {
  constructor(){
    super();
    this.state = {nRows : 0};
  }

  updateRows(){
    this.props.clickHandle();
    this.setState({
      nRows : this.props.nRows
    })
  }


  render(){

    function randomIntFromInterval(min,max){
      return Math.floor(Math.random()*(max-min+1)+min);
    }


    let rows = [];
    var headerCells = [];
    headerCells.push(<td className="cell" key="headerCell 1" id="headerCell 1"><strong>Country</strong></td>);
    headerCells.push(<td className="cell" key="headerCell 2" id="headerCell 2"><strong>Player</strong></td>);
    headerCells.push(<td className="cell" key="headerCell 3" id="headerCell 3"><strong>Time Trial</strong></td>);

    rows.push(<tr key="header" id="header">{headerCells}</tr>);

    for (var i = 0; i < this.state.nRows; i++){
      let rowID = `row${i}`;
      let cell = [];

      var n =randomIntFromInterval(0,countryData.length);
      var time = randomIntFromInterval(200,500)/10;
      
      let cellID = "cell " + {i};
      cell.push(<td className="cell" key={cellID + " -1"} id={cellID + " -1"}><Flag icon={countryData[n].flagPathMD}/></td>);
      cell.push(<td className="cell" key={cellID + " -2"} id={cellID + " -2"}>{countryData[n].name}</td>);
      cell.push(<td className="cell" key={cellID + " -3"} id={cellID + " -3"}>{time}  sec</td>);
      
      rows.push(<tr key={i} id={rowID}>{cell}</tr>);
    }

    return(
        <div>
            <table className="country-chart" id="simple-board">
                <tbody>
                    {rows}
                </tbody>
            </table>
            <div>
                <button onClick={this.updateRows.bind(this)}>Check Players</button>
            </div>
        </div>
    );
  }
}