'use strict';

import React from 'react';
import Table from	'./FrontPageTable';
import AddTeamPopUp from './AddTeamPopUp';
import CountryKeyVal from './CountryKeyVal';
import TimeTrialPopUp from './TimeTrialPopUp';
import {BrowserRouter as Router, Route, Link} from 'react-router';
import demoNames from '../data/demoNames';
import countries from '../data/countries';
import Settings from '../static/Settings'; 

var GamesDB;
var spanStyle = {
	flex : 1
};

export default class IndexPage extends React.Component {
	constructor(){
		super();
		this.getBestTime = this.getBestTime.bind(this);
		this.state = {
			nRows : 0,
			players : {},
			bestTime : null,
			gameName : null,
			FourPmode: false,
			DblElim: true,
			RandSeed: false,
			CompDisplay: false
		};

		this.PopulateTestTeams(true,16);
	}
	
	
	//  METHODS // 
	randomIntFromInterval(min,max){
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	getBestTime(playersObj){
		for (var k in playersObj){
			if(playersObj[k].timeTrial != '-'){
			    if (this.state.bestTime == null){
			        this.setState({bestTime:playersObj[k].bestTime});
			    } else if (Number(playersObj[k].bestTime) < Number(this.state.bestTime)) { 
			        this.setState({bestTime:playersObj[k].bestTime});
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
	
	addTeam(name, country, timeTrial){
		timeTrial = timeTrial || '-';
  
    	this.state.players[name] = {
			name : name,
		    country : CountryKeyVal[country],
		    seed : 0,
			timeTrial : timeTrial,
			timeTrial2 : '-',
		    totalTime : 0,
		    avgTime : 0,
		    splitTime : 0,
		    bestTime : timeTrial == '-'?0:timeTrial,
		};
		
		this.setState({nRows : this.state.nRows + 1});
	}
	
	addTimeTrial(name,time){
		for(var x in this.state.players)
		{
			if(this.state.players[x].name == name)
			{
				try 
				{
					if(time == '-')
					{
						this.state.players[x].timeTrial = '-';
					}
					else
					{
						if(this.state.players[x].timeTrial == '-')
						{
							this.state.players[x].timeTrial = Number(time);
							this.state.players[x].bestTime = Number(time);
						}
						else if(this.state.players[x].timeTrial2 == '-')
						{
							this.state.players[x].timeTrial2 = Number(time);
							this.state.players[x].bestTime = Math.min(Number(time),this.state.players[x].timeTrial);
						}
					}
				} catch (error) 
				{
					console.log("name changed?");
				}
			}
		}
		
		
		
		this.setState({
			players: this.state.players
		}, function afterClick(){
			this.getBestTime(this.state.players);
			
		});
	}

	ClearTimes()
	{
		for(var k in this.state.players)
		{
			this.state.players[k].timeTrial = '-';
			this.state.players[k].timeTrial2 = '-';
			this.state.players[k].bestTime = '-';
			this.addTimeTrial(this.state.players[k].name, '-');
			this.state.bestTime = null;
		}
	}
	
	
	
	PopulateTestTeams(bool, nTeams){
		//this section is to populate random number of teams
	  	//---------------------------------------------------------------------------------
	  	if (bool == true){
	  		var countryArr = [];
		  	for (var item in countries[0]){
		  		countryArr.push(countries[0][item].name);
		  	}
		  	
		  	for (var i = 0 ; i <nTeams; i++){
		  		var name = demoNames[this.randomIntFromInterval(0,demoNames.length)];
		  		//	this.randomIntFromInterval(1,999);
		  			
		  		this.addTeam(name, countryArr[this.randomIntFromInterval(0,countryArr.length)], 0);
			
				this.addTimeTrial(name, Math.round(this.randomIntFromInterval(1500,6000))/100);
				this.addTimeTrial(name, Math.round(this.randomIntFromInterval(1500,6000))/100);
		  	}
		  	this.getBestTime(this.state.players);
	  	}
	  	
	  	// --------------------------------------------------------------------------------
	}
	

	
    render() {
    	
    	var mainOptionButtons;
    	var startCreationButtons;
    	var gamePath;
    	var nTimeTrials = 0;
    	var secBkrdClrNA = '#D3D3D3';
    	var secBkrdClrAvail = '#9489b0';
    	
    	for (var m in this.state.players){
    		if(this.state.players[m].timeTrial !== null && this.state.players[m].timeTrial !== 0 && this.state.players[m].timeTrial !== '-'){
    			nTimeTrials += 1;
    		}
    	}
    	
    	startCreationButtons = {
			background: secBkrdClrNA,
			color: '#888888'
		};
		mainOptionButtons = {
			background: secBkrdClrAvail,
			color: 'white'
		};

		
    
   
    	
	    return (
	    	<div className="main-page">
	    		<div className = "menu">
	    			
	    			<AddTeamPopUp 
	        			addTeamClick={this.addTeam.bind(this)}
	        			editPlayer={this.editPlayer.bind(this)}
	        			style={mainOptionButtons}
		            />
					
					<div 
						onClick={ this.ClearTimes.bind(this)}
						className="row" 
						style={mainOptionButtons} 
					>
						Clear Times
					</div>
	    		</div>
		        <div className="home">
				      <Table 
					      teamRows={this.state.nRows}
					      players={this.state.players}
					      bestTime={this.state.bestTime}
					      removePlayer={this.removePlayer.bind(this)}
					      editPlayer={this.editPlayer.bind(this)}
						  timeTrialPlayer={this.addTimeTrial.bind(this)}
						  addTimeTrial={this.addTimeTrial.bind(this)}
						  mainOptionButtons={mainOptionButtons}
				      />
	    		</div>
    		</div>
    	);
    }
}