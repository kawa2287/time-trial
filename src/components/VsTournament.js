'use strict';

import React from 'react';
import BezierCurves from './BezierCurves';
import GameComponent from './GameComponent';
import CountryKeyVal from './CountryKeyVal';



export default class VsTournament extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			masterGameObject:{}
		};
		
		var teams = Object.keys(this.props.location.state.players).length;
		var mastArr = [];
		var seededArray = [];
		var toggle = 0;
		var bracketSpots = Math.pow(2,this.DetermineBracketPower(teams));
		
		
		//populate seeded array
		this.PropogateSeedsArr(teams,mastArr);
		
		//Create Master Game Object
		var nGamesTotal = bracketSpots*2-1;
		for(var game = 1; game <= nGamesTotal; game++){
			this.state.masterGameObject[game] = {
				gameNumber : game,
				playerA:{
					name : '',
				    country : '',
				    seed : '',
				    timeTrial : '',
				    wins : 0,
				    losses : 0,
				    totalTime : 0,
				    avgTime : 0,
				    splitTIme : 0
				},
				playerB:{
					name : '',
				    country : '',
				    seed : '',
				    timeTrial : '',
				    wins : 0,
				    losses : 0,
				    totalTime : 0,
				    avgTime : 0,
				    splitTIme : 0
				},
				bracket : this.DetermineBracket(game,bracketSpots),
				spotsFilled : 0  //hack
			};
		}
		
		//Add Props to Seeded Array
		for (var item in mastArr) {
			for (var x in this.props.location.state.players){
				if(mastArr[item] == this.props.location.state.players[x].seed){
					seededArray.push(this.props.location.state.players[x]);
					toggle = 1;
				} 
			}
			if (toggle == 0){
				seededArray.push({
					name : 'BYE',
				    country : '',
				    seed : mastArr[item],
				    timeTrial : '-',
				    wins : 0,
				    losses : 0,
				    totalTime : 0,
				    avgTime : 0,
				    splitTIme : 0
					});
			}
			toggle = 0;
		}
		
		//Populate Start Round in Master Game Object
		for (var k = 0; k < seededArray.length; k++){
			if (k % 2 == 0){
				this.state.masterGameObject[k/2 + 1].playerA = seededArray[k];
			} else {
				this.state.masterGameObject[(k+1)/2].playerB = seededArray[k];
			}
		}
		
	}
	
	DetermineBracketPower (nTeams) {
		var bracketPower = 0;
		for (var i = 0; i < nTeams; i++){
			if (Number(nTeams) <= Math.pow(2,i)){
				bracketPower = i;
				return bracketPower;
			}
		}
		return bracketPower;
	}
	
	NgmsInRndLBrkt(bracketSpots,curRnd){
		if(curRnd % 2 == 0){
			return bracketSpots/(2*Math.pow(2,curRnd/2));
		} else {
			return bracketSpots/(2*Math.pow(2,(curRnd+1)/2));
		}
	}
	
	NgmsInRndWBrkt(bracketSpots,curRnd){
		return bracketSpots/(2*Math.pow(2,curRnd));
	}
	
	DetermineRoundNumber (currentGameNum, nTeams, bracketLocation){
		var maxGameNumInRnd = 0;
		if(bracketLocation == 'loserBracket'){
			var nLoserRnds = 2*(this.DetermineBracketPower(nTeams) - 1);
			for (var i= 1; i<= nLoserRnds; i++){
				var x = Number(i) % 2 != 0 ? Number(i)-1 : Number(i)-2;
				var k = (nLoserRnds - x)/2;
				maxGameNumInRnd = Number(i) % 2 == 0 ? nTeams - Math.pow(2,k) : nTeams - 1.5*Math.pow(2,k);
				if(currentGameNum - nTeams <= maxGameNumInRnd){
					return i;
				}
			}
		} else {
			var nWinnerRnds = this.DetermineBracketPower(nTeams);
			for (var i=0; i<= nWinnerRnds; i++){
				maxGameNumInRnd = nTeams/(2*Math.pow(2,i));
				if(currentGameNum <= nTeams- maxGameNumInRnd){
					return i;
				}
			}
		}
	}
	
	GetRootVal (arr){
		if (Array.isArray(arr)){
			return this.GetRootVal(arr[0]);
		} else {
			return arr;
		}
	}
	
	PropogateSeedsArr(nTeams, mastArr){
		var baseArr = [];
		var nextOrderArr = [];
		var bracketPower = this.DetermineBracketPower(nTeams);

		for (var order = 1; order <= bracketPower; order++){
			var eq = Math.pow(2,bracketPower-order+1)+1;
			for (var i = 1; i <= Math.pow(2,bracketPower)/Math.pow(2,order); i++){
				if (order == 1){
					baseArr.push([i,eq - i]);
					nextOrderArr = baseArr;
				} else {
					for (var item in baseArr){
						if(eq - this.GetRootVal(baseArr[i-1]) == this.GetRootVal(baseArr[item])) {
							nextOrderArr.push([baseArr[i-1],baseArr[item]]);
						}
					}
				}
			}
			if(order == bracketPower){
				return this.PopMastArr(nextOrderArr, mastArr, nTeams);
			} else {
				baseArr = nextOrderArr;
				nextOrderArr = [];
			}
		}
	}
	
	PopMastArr(arr, mastArr, nTeams){
		mastArr = mastArr || [];
		for (var item in arr){
			if(Array.isArray(arr[item])){
				this.PopMastArr(arr[item], mastArr, nTeams);
			} else {
				mastArr.push(arr[item]);
			}
		}
		return mastArr;
	}
	
	DetermineBracket (gameNumber,bracketSpots){
		if(gameNumber <= bracketSpots/2){
			return 'startBracket';
		} else if (gameNumber < bracketSpots && gameNumber > bracketSpots/2){
			return 'winnerBracket';
		} else if (gameNumber > bracketSpots && gameNumber <= 2*(bracketSpots-1)){
			return 'loserBracket';
		} else {
			return 'specialBracket';
		}
	}
	
	SendWinner(currentGameNum, bracketSpots, winPlayer, losePlayer){
		var gameForWinner = 0.5*((currentGameNum % 2 ==0 ? currentGameNum : currentGameNum+1)+bracketSpots);
		let masterGameObject2 = Object.assign({},this.state.masterGameObject);
		
		if (masterGameObject2[gameForWinner].spotsFilled == 0){ //hack
			console.log('first spot should be filled');
			masterGameObject2[gameForWinner].playerA = winPlayer;
			masterGameObject2[gameForWinner].spotsFilled = 0;
			console.log(masterGameObject2);
			this.setState({masterGameObject : masterGameObject2}, function afterClick(){console.log(this.state.masterGameObject)});
			
		} else if(this.state.masterGameObject[gameForWinner].spotsFilled == 1) {
			console.log('second spot should be filled');
			//masterGameObject[gameForWinner].playerB = winPlayer;
			//masterGameObject[gameForWinner].spotsFilled = 2;
		}
		
		//this.setState({masterGameObject});

	}
	
	buttonClick(){
		
        
        this.setState({
        	masterGameObject : {
        		...this.state.masterGameObject,
        		9 : {
        			...this.state.masterGameObject[9],
        			playerA : {
        				...this.state.masterGameObject[9].playerA,
        				name : 'MATT'
        			}
        		}
        	}
        }, function afterClick() {
        	console.log(this.state.masterGameObject);
        	this.forceUpdate();
        });
			
	}
	

	render() {
		//------------------------------------------------------------------
		//this.props.location.state.'GIVEN NAME' to access props thru Link
		//------------------------------------------------------------------
		var teams = Object.keys(this.props.location.state.players).length;
		var bracketSpots = Math.pow(2,this.DetermineBracketPower(teams));
		var bracketPower = this.DetermineBracketPower(teams);
		var baseStageHeight = 120;
		var baseStageWidth = 300;
		var overallWidth = baseStageWidth*(this.DetermineBracketPower(teams)+1);
		var k = 0;
		
		
		//create tournament skeleton
		//create loserArr
		var LoserArr = [];
		for (k = 2*(bracketPower-1); k > 0; k--){
			LoserArr.push(this.NgmsInRndLBrkt(bracketSpots,k));
		}
		//create winnerArr
		var winnerArr = [];
		for (k = 0; k < bracketPower; k++){
			console.log('found');
			winnerArr.push(this.NgmsInRndWBrkt(bracketSpots,k));
		}
		
		//create Games in Winner Bracket
		var winnerBracket = [];
		var nextRoundArr = [];
		var nextBezArr = [];
		var gameCounter = 1;
		
		for (k = 0; k < winnerArr.length; k++){
			for(var i = 0; i < winnerArr[k]; i++){
				nextRoundArr.push(<GameComponent
					playerA = {this.state.masterGameObject[gameCounter].playerA}
					playerB = {this.state.masterGameObject[gameCounter].playerB}
					height = {baseStageHeight * Math.pow(2,this.DetermineRoundNumber(
						this.state.masterGameObject[gameCounter].gameNumber,
						bracketSpots,
						this.state.masterGameObject[gameCounter].bracket))
					}
					width = {baseStageWidth}
					gameNumber = {this.state.masterGameObject[gameCounter].gameNumber}
					bracket = {this.state.masterGameObject[gameCounter].bracket}
					SendWinner = {this.SendWinner.bind(this)}
					bracketSpots = {bracketSpots}
					/>);
				/*
				nextBezArr.push(<BezierCurves
					height = {baseStageHeight*Math.pow(2,k+1)}
					width = {40}
					/>);
				*/
				gameCounter = gameCounter + 1;
			}
			//winnerBracket.push(<div className = "round-test">{nextBezArr}</div>);
			winnerBracket.push(<div>{nextRoundArr}</div>);
			nextRoundArr=[];
			//nextBezArr=[];
		}
		
		
		
		
		
		return (
			<div className= "outside-container">
				<button onClick={this.buttonClick.bind(this)}>DO SOMETHING</button>
				<div className = "tourny-lay" style={{"width" : {overallWidth}}}>
					{winnerBracket}
				</div>
			</div>
		);
	}
}