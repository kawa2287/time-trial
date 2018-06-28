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
import Settings from '../static/Settings';


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
	
	randomIntFromInterval(min,max){
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
		    totalTime : 0,
		    avgTime : 0,
		    splitTime : 0,
		    bestTime : timeTrial == '-'?0:timeTrial,
		    index: 1,
		    avgCupTime : 0,
		    maxRound: 0,
		    vsGroupAvg: 0,
		    avgPlacement:'-',
		    final4Spot:999,
		    mascot:null,
		    nLastPlace : 0
		};
		
		this.setState({
	  		nRows : this.state.nRows + 1
	  	});
	}
	
	addTimeTrial(name,time){
		this.state.players[name].timeTrial = Number(time);
		this.state.players[name].bestTime = Number(time);
		this.state.players[name].avgTime = Number(time);
		this.state.players[name].avgCupTime = Math.round(100*time/Settings.cupsPerPerson)/100;
		this.setState({
			players: this.state.players
		}, function afterClick(){this.getBestTime(this.state.players)});
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
	
	removePlayer(player){
		for (var k in this.state.players){
			if (this.state.players[k].name == player){
				delete this.state.players[k];
			}
		}
		this.forceUpdate();
	}
	
	editPlayer(oldName,newName,oldCountry,newCountry){
		
		if(oldName !== newName || oldCountry !== newCountry){
			for (var k in this.state.players){
				if(this.state.players[k].name == oldName){
					if(oldName!== newName){
						this.state.players[k].name = newName;
					}
					if(oldCountry !==newCountry){
						this.state.players[k].country = CountryKeyVal[newCountry];
					}
				}
			}
		}
		this.forceUpdate();
	}
  
    componentDidMount() {
    	
  	

  		//this section is to populate random number of teams... delete for production use
	  	//---------------------------------------------------------------------------------
	  	var nTeams = 12;
	  	var countryArr = [];
	  	for (var item in countries[0]){
	  		countryArr.push(countries[0][item].name);
	  	}
	  	
	  	for (var i = 0 ; i <nTeams; i++){
	  		var name = demoNames[this.randomIntFromInterval(0,demoNames.length)] + 
	  			this.randomIntFromInterval(1,999);
	  			
	  		this.addTeam(name, countryArr[this.randomIntFromInterval(0,countryArr.length)], 0);
	  		
	  		this.addTimeTrial(name, Math.round(this.randomIntFromInterval(1500,2500))/100);
	  	}
	  	this.getBestTime(this.state.players);
	  	// --------------------------------------------------------------------------------
 

    }
  
    render() {
    	
    	var blindButtonColorsVS;
    	var seededButtonColorsVS;
    	var blindButtonColors4P;
    	var seededButtonColors4P;
    	var vsBlindJumblePath;
    	var vsSeededJumblePath;
    	var vsSeededDivPath;
    	var Blind4PJumblePath;
    	var Seeded4PJumblePath;
    	var Seeded4PDivPath;
    	var nTimeTrials = 0;
    	var secBkrdClrNA = '#D3D3D3';
    	var secBkrdClrAvail = '#9489b0';
    	
    	for (var m in this.state.players){
    		if(this.state.players[m].timeTrial !== null && this.state.players[m].timeTrial !== 0 && this.state.players[m].timeTrial !== '-'){
    			nTimeTrials += 1;
    		}
    	}
    	
    	if(Object.keys(this.state.players).length > 3 ){
    		blindButtonColorsVS = {
    			background: secBkrdClrAvail,
    			color: 'white'
    		};
    		vsBlindJumblePath= {
    			pathname:"/VsTournament", 
    			state:{
    				players : this.state.players, 
    				mode : 'VS', 
    				seeding:'blind', 
    				order:'random'
    			}
    		};
    	} else {
    		blindButtonColorsVS = {
    			background : secBkrdClrNA,
    			color: '#888888'
    		};
    		vsBlindJumblePath= null;
    	}
    	
    	if (Object.keys(this.state.players).length > 7 ){
    		blindButtonColors4P = {
    			background : secBkrdClrAvail,
    			color: 'white'
    		};
    		Blind4PJumblePath= {
    			pathname:"/VsTournament", 
    			state:{
    				players : this.state.players, 
    				mode : '4P', 
    				seeding:'blind', 
    				order:'random'
    			}
    		};
    	} else {
    		blindButtonColors4P = {
    			background : secBkrdClrNA,
    			color: '#888888'
    		};
    		Blind4PJumblePath= null;
    	}
    	
    	if(Object.keys(this.state.players).length == nTimeTrials && Object.keys(this.state.players).length>3){
    		seededButtonColorsVS = {
    			background : secBkrdClrAvail,
    			color: 'white'
    		};
    		vsSeededJumblePath= {
    			pathname:"/VsTournament", 
    			state:{
    				players : this.state.players, 
    				mode : 'VS', 
    				seeding:'blind', 
    				order:'timeTrial'
    			}
    		};
    		vsSeededDivPath= {
    			pathname:"/VsTournament", 
    			state:{
    				players : this.state.players, 
    				mode : 'VS', 
    				seeding:'seeded', 
    				order:'timeTrial'
    			}
    		};
    		
    	} else {
    		seededButtonColorsVS = {
    			background : secBkrdClrNA,
    			color: '#888888'
    		};
    		vsSeededJumblePath = null;
    		vsSeededDivPath = null;
    	}
    	
    	if(Object.keys(this.state.players).length == nTimeTrials && Object.keys(this.state.players).length>7) {
    		seededButtonColors4P = {
    			background : secBkrdClrAvail,
    			color: 'white'
    		};
    		
    		Seeded4PJumblePath= {
    			pathname:"/VsTournament", 
    			state:{
    				players : this.state.players, 
    				mode : '4P', 
    				seeding:'blind', 
    				order:'timeTrial'
    			}
    		};
    		Seeded4PDivPath= {
    			pathname:"/VsTournament", 
    			state:{
    				players : this.state.players, 
    				mode : '4P', 
    				seeding:'seeded', 
    				order:'timeTrial'
    			}
    		};
		} else {
    		seededButtonColors4P = {
    			background : secBkrdClrNA,
    			color: '#888888'
    		};
    		Seeded4PJumblePath = null;
    		Seeded4PDivPath = null;
    	}

	    return (
	    	<div className="main-page">
	    		<div className = "menu">
	    			<AddTeamPopUp 
	        			addTeamClick={this.addTeam.bind(this)}
	        			editPlayer={this.editPlayer.bind(this)}
		            />
	    			<TimeTrialPopUp
		        		players={this.state.players}
		        		addTimeTrial={this.addTimeTrial.bind(this)}
	        		/>
	    			<div className = "row" >
	    				<div className = "picture">
	    					<img src="./img/buttons/tournament.png"></img>
	    				</div>
	    				<div className = "desc">
	    					VS Tournament
    					</div>
					</div>
					<Link className="secondary-row" style={blindButtonColorsVS} to={vsBlindJumblePath}>Blind Draw - Loser Jumble</Link>
					<Link className="secondary-row" style={seededButtonColorsVS} to={vsSeededJumblePath}>Seeded Draw - Loser Jumble</Link>
					<Link className="secondary-row" style={seededButtonColorsVS} to={vsSeededDivPath}>Seeded Draw - Division Structured</Link>
					
	    			<div className = "row" >
	    				<div className = "picture">
	    					<img src="./img/buttons/4P.png"></img>
	    				</div>
	    				<div className = "desc">
	    					4P Tournament
    					</div>
					</div>
					<Link className="secondary-row" style={blindButtonColors4P} to={Blind4PJumblePath}>Blind Draw - Loser Jumble</Link>
					<Link className="secondary-row" style={seededButtonColors4P} to={Seeded4PJumblePath}>Seeded Draw - Loser Jumble</Link>
					<Link className="secondary-row" style={seededButtonColors4P} to={Seeded4PDivPath}>Seeded Draw - Division Structured</Link>

	    		</div>
		        <div className="home">
				      <Table 
					      teamRows={this.state.nRows}
					      players={this.state.players}
					      bestTime={this.state.bestTime}
					      removePlayer={this.removePlayer.bind(this)}
					      editPlayer={this.editPlayer.bind(this)}
					      removePlayer={this.removePlayer.bind(this)}
				      />
	    		</div>
    		</div>
    	);
    }
}