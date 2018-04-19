'use strict';

import React from 'react';
import Konva from "konva";
import { Rect, Group, Text } from "react-konva";
import TileTeam from './TileTeam';
import Colors from '../static/Colors';
import Settings from '../static/Settings';
import StabilizeView from './viewMethods/StabilizeView';

var defaultColor = Colors.gameNotReadyColor;
var completeColor = Colors.gameCompleteColor;
var availableColor = Colors.gameAvailColor;
var gameNumberColor = Colors.gameNumberColor;

export default class GameComponent extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			nameA : this.props.playerA.name,
			nameB : this.props.playerB.name,
			countryA :this.props.playerA.country.name,
			countryB: this.props.playerB.country.name,
			seedA : this.props.playerA.seed,
			seedB : this.props.playerB.seed,
			timeTrialA : this.props.playerA.timeTrial,
			timeTrialB : this.props.playerB.timeTrial,
			totalTimeA : this.props.playerA.totalTime,
			totalTimeB : this.props.playerB.totalTime,
			avgTimeA : this.props.playerA.avgTime,
			avgTimeB : this.props.playerB.avgTime,
			flagA : this.props.playerA.country.flagPathSVG,
			flagB : this.props.playerB.country.flagPathSVG,
			winsA : this.props.playerA.wins,
			winsB : this.props.playerB.wins,
			lossesA : this.props.playerA.losses,
			lossesB : this.props.playerB.losses,
			hover : false,
			status : this.props.status,
			winner : this.props.winner,
			loser : this.props.loser
		};
	}
	
	
	//for testing/////////////////////////////////////////
	randomIntFromInterval(min,max)
	{
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
	//////////////////////////////////////////////////////
	
	BackgroundColor(status){
		if (status === 'COMPLETE'){
			return completeColor;
		} else if (this.props.playerA.seed>=1 && this.props.playerB.seed >=1) {
			return availableColor;
		} else {
			return defaultColor;
		}
	}
	
	DetermineAvgTime(timeTrial, totalTime, wins, losses){
		if (wins == 0 && losses == 0){
			return timeTrial;
		} else {
			return  Math.round(100*(totalTime + timeTrial)/(1 + wins + losses))/100;
		}
	}
	
	
	DetermineWinChance(playerName, opponentName, playerTime, opponentTime){
		if(playerName == 'BYE') {
			return 0;
		} else if (opponentName == 'BYE'){
			return 100;
		} else {
			return Math.min(99,Math.max(1,Math.round(100-50*(Settings.timeToWinOutright -(opponentTime - playerTime))/Settings.timeToWinOutright)));
		}
	}
	
	handleOnclick (e){
		
		var winner;
		var loser;
		var winnerTime;
		var loserTime;
		var byeRound;
		if (this.props.playerA.seed>=1 && this.props.playerB.seed >=1 && this.props.status !== 'COMPLETE'){
			var newPos = StabilizeView(e);
			var pAtime = this.props.playerA.timeTrial + (this.randomIntFromInterval(-10,15));
			var pBtime = this.props.playerB.timeTrial + (this.randomIntFromInterval(-10,15));
		
			// decide winner or loser
			
			if (this.props.playerA.name == 'BYE' || this.props.playerB.name == 'BYE'){
				if (this.props.playerB.name =="BYE") {
					winner = this.props.playerA;
					loser = this.props.playerB;
					byeRound = true;
				} else if ( this.props.playerA.name == "BYE"){
					winner = this.props.playerB;
					loser = this.props.playerA;
					byeRound = true;
				}
				this.props.WinnerLoserHandler(
					
					this.props.gameNumber, 
					this.props.bracketSpots,
					winner, 
					loser,
					winnerTime,
					loserTime,
					byeRound
				);
			} else {
				if (pAtime <= pBtime){
					winner = this.props.playerA;
					loser = this.props.playerB;
					winnerTime = pAtime;
					loserTime = pBtime;
					byeRound = false;
				} else if (pAtime > pBtime) {
					winner = this.props.playerB;
					loser = this.props.playerA;
					winnerTime = pBtime;
					loserTime = pAtime;
					byeRound = false;
				}
				//Dialog Popup
				this.props.showMatchup(
					newPos,
					this.props.playerA,
					this.props.playerB,
					byeRound,
					this.props.gameNumber
					);
			}
		
			
			
			
			/*
			//determine where to send players
			this.props.WinnerLoserHandler(
				e,
				this.props.gameNumber, 
				this.props.bracketSpots,
				winner, 
				loser,
				this.props.bracket,
				winnerTime,
				loserTime,
				byeRound
			);
			*/
		}
		
	}
	
	handleOnMouseOver(){
		this.setState({
			hover : true
		});
	}
	
	handleOnMouseOut (){
		this.setState({
			hover : false
		});
	}

	componentWillReceiveProps(newProps) {
		if ({...newProps} !== {...this.props}){
		    this.setState({
		    	...this.props,
		    	nameA : newProps.playerA.name,
				nameB : newProps.playerB.name,
				seedA : newProps.playerA.seed,
				seedB : newProps.playerB.seed,
				countryA : newProps.playerA.country.name,
				countryB: newProps.playerB.country.name,
				timeTrialA : newProps.playerA.timeTrial,
				timeTrialB : newProps.playerB.timeTrial,
				totalTimeA : newProps.playerA.totalTime,
				totalTimeB : newProps.playerB.totalTime,
				avgTimeA : newProps.playerA.avgTime,
				avgTimeB : newProps.playerB.avgTime,
				flagA : newProps.playerA.country.flagPathSVG,
				flagB : newProps.playerB.country.flagPathSVG,
				winsA : newProps.playerA.wins,
				winsB : newProps.playerB.wins,
				lossesA : newProps.playerA.losses,
				lossesB : newProps.playerB.losses,
				status : newProps.status,
				winner : newProps.winner,
				loser : newProps.loser,
				loserEliminated : newProps.loserEliminated
		    });
		}
	}


	render(){
		var teamHeight = this.props.vizGeo.teamHeight;
		var teamWidth = this.props.vizGeo.teamWidth;
		var gameWidth = teamWidth + 2 * teamHeight;
		var gameHeight = teamHeight * 3.5;
		var gameFontSize = 16;
		var pAavgTime = this.DetermineAvgTime(this.state.timeTrialA, this.state.totalTimeA, this.state.winsA, this.state.lossesA);
		var pBavgTime = this.DetermineAvgTime(this.state.timeTrialB, this.state.totalTimeB, this.state.winsB, this.state.lossesB);
		
		
		
		return(
			<Group 
				x={this.props.x}
				y={this.props.y}
				width={gameWidth} 
				height={gameHeight}
				onClick={this.handleOnclick.bind(this)}
				onmouseover={this.handleOnMouseOver.bind(this)}
				onmouseout={this.handleOnMouseOut.bind(this)}
				draggable={false}
			>
				<Rect
					x={0}
					y={0}
					width={gameWidth}
        			height={gameHeight}
                    fill= {this.BackgroundColor(this.state.status)}
					stroke= 'black'
					strokeWidth= {2}
				/>
				<Rect
					x={0}
					y={0}
					width={teamHeight}
        			height={gameHeight}
                    fill= {gameNumberColor}
					stroke= 'black'
					strokeWidth= {2}
				/>
				<Text //game number
            		text = {this.props.gameNumber}
            		x = {teamHeight/2 - 9}
            		y = {(gameHeight-gameFontSize)/2}
            		fontSize = {gameFontSize}
            		fontStyle = 'bold'
            		shadowBlur = {2}
            		fill = 'white'
            		width = {18}
            		align = 'center'
            	/>
				<TileTeam
					seed = {this.state.seedA}
					country = {this.state.countryA}
					name = {this.state.nameA}
					time = {pAavgTime}
					img = {this.state.flagA}
					height = {teamHeight}
					width = {teamWidth}
					globalX = {1.5*teamHeight}
					globalY = {0.5*teamHeight}
					hover = {this.state.hover}
					losses = {this.state.lossesA}
					winChance = {this.DetermineWinChance(this.props.playerA.name, this.props.playerB.name, pAavgTime, pBavgTime)}
					loser = {this.props.loser}
					loserEliminated = {this.props.loserEliminated}
				/>
				<TileTeam
					seed = {this.state.seedB}
					country = {this.state.countryB}
					name = {this.state.nameB}
					time = {pBavgTime}
					img = {this.state.flagB}
					height = {teamHeight}
					width = {teamWidth}
					globalX = {1.5*teamHeight}
					globalY = {2*teamHeight}
					hover = {this.state.hover}
					losses = {this.state.lossesB}
					winChance = {this.DetermineWinChance(this.props.playerB.name, this.props.playerA.name, pBavgTime, pAavgTime)}
					loser = {this.props.loser}
					loserEliminated = {this.props.loserEliminated}
				/>
			</Group>
		);
	}
}