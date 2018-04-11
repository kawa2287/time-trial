'use strict';

import React from 'react';
import Table from	'./FrontPageTable';
import AddTeamPopUp from './AddTeamPopUp';
import CountryKeyVal from './CountryKeyVal';
import TimeTrialPopUp from './TimeTrialPopUp';
import VsTournament from './VsTournament';
import {BrowserRouter as Router, Route, Link} from 'react-router';
import demoNames from '../data/demoNames';
import countries from '../data/countries';




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
  
   randomIntFromInterval(min,max)
	{
	    return Math.floor(Math.random()*(max-min+1)+min);
	}

  addTeam(name, country, timeTrial){
  	timeTrial = timeTrial || '-';
  	this.state.players[name] = {
		    name : name,
		    country : CountryKeyVal[country],
		    seed : 0,
		    timeTrial : timeTrial,
		    wins : 0,
		    losses : 0,
		    totalTime : timeTrial,
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
  
  componentDidMount() {
  	
  		//this section is to populate random number of teams... delete for production use
	  	//---------------------------------------------------------------------------------
	  	var nTeams = 32;
	  	var countryArr = [];
	  	for (var item in countries[0]){
	  		countryArr.push(countries[0][item].name);
	  	}
	  	
	  	for (var i = 0 ; i <nTeams; i++){
	  		var name = demoNames[this.randomIntFromInterval(0,demoNames.length)] + 
	  			this.randomIntFromInterval(1,999);
	  			
	  		this.addTeam(name, countryArr[this.randomIntFromInterval(0,countryArr.length)], 0);
	  		
	  		this.addTimeTrial(name, Math.round(this.randomIntFromInterval(1000,5000))/100);
	  	}
	  	this.getBestTime(this.state.players);
	  	// --------------------------------------------------------------------------------
  	
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
	          
	          <Link to={{pathname:"/VsTournament", state:{players : this.state.players}}} >
		          <div className="task-preview">
					  <img src="./img/buttons/tournament.png"></img>
					  <h2 className="name">VS Tournament</h2>
				  </div>
			  </Link>
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