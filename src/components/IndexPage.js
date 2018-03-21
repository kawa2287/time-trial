'use strict';

import React from 'react';
import Table from	'./FrontPageTable';
import AddTeamPopUp from './AddTeamPopUp';
import CountryKeyVal from './CountryKeyVal';
import TimeTrialPopUp from './TimeTrialPopUp';




export default class IndexPage extends React.Component {
  constructor(){
    super();
    this.getBestTime = this.getBestTime.bind(this);
    this.state = {
    	nRows : 0,
    	players : {},
    	bestTime : null
    };
  }

  addTeam(name, country){
  	this.state.players[name] = {
		    name : name,
		    country : CountryKeyVal[country],
		    seed : 0,
		    timeTrial : '-',
		    wins : 0,
		    losses : 0,
		    totalTime : 0,
		    avgTime : 0,
		    splitTIme : 0
		};
		this.setState({
	  		nRows : this.state.nRows + 1
	  	});
	}
	
	addTimeTrial(name,time){
		this.state.players[name].timeTrial = time;
		this.setState({players: this.state.players}, function afterClick(){this.getBestTime(this.state.players)});
	}
	
	getBestTime(playersObj){
    for (var k in playersObj){
      if(playersObj[k].timeTrial != '-'){
        if (this.state.bestTime == null){
          this.setState({bestTime:playersObj[k].timeTrial});
        } else if (Number(playersObj[k].timeTrial) < Number(this.state.bestTime)) { 
          this.setState({bestTime:playersObj[k].timeTrial});
        }
      }
    }
  }
  
  render() {

    return (
      <div className="home">
      
        <div className="buttons-selector">
	          <AddTeamPopUp 
	          addTeamClick={this.addTeam.bind(this)}
	          />
	          <TimeTrialPopUp
	          players={this.state.players}
	          addTimeTrial={this.addTimeTrial.bind(this)}/>
        </div>
        
        <div className="buttons-selector">
		      <Table 
		      teamRows={this.state.nRows}
		      players={this.state.players}
		      bestTime={this.state.bestTime}
		      />
        </div>        
      </div>
    );
  }
}