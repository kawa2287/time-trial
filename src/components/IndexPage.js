'use strict';

import React from 'react';
import Table from	'./FrontPageTable';
import AddTeamPopUp from './AddTeamPopUp';
import CountryKeyVal from './CountryKeyVal';
import TimeTrialPopUp from './TimeTrialPopUp';

export default class IndexPage extends React.Component {
  constructor(){
    super();
    this.state = {
    	nRows : 0,
    	players : {}
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
  
  render() {

    return (
      <div className="home">
      
        <div className="buttons-selector">
	          <AddTeamPopUp 
	          addTeamClick={this.addTeam.bind(this)}
	          />
	          <TimeTrialPopUp
	          players={this.state.players}/>
        </div>
        
        <div className="buttons-selector">
		      <Table 
		      teamRows={this.state.nRows}
		      players={this.state.players}
		      />
        </div>        
      </div>
    );
  }
}