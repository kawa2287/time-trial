
'use strict';

import React, { Component } from 'react';
import Flag from './Flag';

export default class Table extends Component {
  constructor(props){
    super(props);
    this.setSplitTimes = this.setSplitTimes.bind(this);
  }
    
  setSplitTimes(playersArray){
    for (var n in playersArray){
      playersArray[n].seed = Number(n) + 1;
      if (playersArray[n].timeTrial == '-'){
        playersArray[n].splitTime = '';
      } else {
        playersArray[n].splitTime = Math.round((playersArray[n].timeTrial - this.props.bestTime)*100)/100;
      }
    }
  }

  render(){

    function compare(a, b){
      if(a.timeTrial == '-'){
        return 1;
      } else if (b.timeTrial =='-'){
        return -1;
      } else {
        return a.timeTrial - b.timeTrial;
      }
    }

    var playersArray = [];

    for (var n in this.props.players){
      playersArray.push(this.props.players[n]);
    }

    playersArray.sort(compare);

    //set players seed and split times
    this.setSplitTimes(playersArray);


    let rows = [];
    var headerCells = [];
    headerCells.push(<td className="cell" key="headerCell 1" id="headerCell 1"><strong>Seed</strong></td>);
    headerCells.push(<td className="cell" key="headerCell 2" id="headerCell 2"><strong>Country</strong></td>);
    headerCells.push(<td className="cell" key="headerCell 3" id="headerCell 3"><strong>Player</strong></td>);
    headerCells.push(<td className="cell" key="headerCell 4" id="headerCell 4"><strong>Time Trial</strong></td>);
    headerCells.push(<td className="cell" key="headerCell 5" id="headerCell 5"><strong>Split Time</strong></td>);

    rows.push(<tr key="header" id="header">{headerCells}</tr>);

    for (var i  in playersArray){
      let rowID = `row${i}`;
      let cell = [];

      
      let cellID = "cell " + {i};
      cell.push(<td className="cell" key={cellID + " -1"} id={cellID + " -1"}>{playersArray[i].seed}</td>);
      cell.push(<td className="cell" key={cellID + " -2"} id={cellID + " -1"}><Flag icon={playersArray[i].country.flagPathMD}/></td>);
      cell.push(<td className="cell" key={cellID + " -3"} id={cellID + " -2"}>{playersArray[i].name}</td>);
      cell.push(<td className="cell" key={cellID + " -4"} id={cellID + " -3"}>{playersArray[i].timeTrial}  sec</td>);
      cell.push(<td className="cell" key={cellID + " -5"} id={cellID + " -3"}>+{playersArray[i].splitTime}  sec</td>);
      
      rows.push(<tr key={i} id={rowID}>{cell}</tr>);
    }

    return(
        <div>
            <table className="country-chart" id="simple-board">
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
  }
}