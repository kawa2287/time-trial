'use strict';

import React from 'react';
import Konva from "konva";
import { Rect, Group, Text } from "react-konva";
import TileTeam from './TileTeam';
import Colors from '../static/Colors';
import StabilizeView from './viewMethods/StabilizeView';
import DetermineWinChance from './vsBracketMethods/baseMethods/DetermineWinChance';
import DetermineAvgTime from './vsBracketMethods/baseMethods/DetermineAvgTime';

var defaultColor = Colors.gameNotReadyColor;
var completeColor = Colors.gameCompleteColor;
var availableColor = Colors.gameAvailColor;
var gameNumberColor = Colors.gameNumberColor;

export default class GameComponent extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			hover : false
		};
	}
	
	randomIntFromInterval(min,max)
	{
	    return Math.floor(Math.random()*(max-min+1)+min);
	}

	
	BackgroundColor(status){
		if (status === 'COMPLETE'){
			return completeColor;
		} else if (this.props.gProps.playerA.seed>=1 && this.props.gProps.playerB.seed >=1) {
			return availableColor;
		} else {
			return defaultColor;
		}
	}
	
	handleOnclick (e){
		
		var winner;
		var loser;
		var winnerTime;
		var loserTime;
		var byeRound;
		if (this.props.gProps.playerA.seed>=1 && this.props.gProps.playerB.seed >=1 && this.props.gProps.status !== 'COMPLETE'){
			var newPos = StabilizeView(e);
			var pAtime = this.props.gProps.playerA.timeTrial + (this.randomIntFromInterval(-10,15));
			var pBtime = this.props.gProps.playerB.timeTrial + (this.randomIntFromInterval(-10,15));
		
			// decide winner or loser
			
			if (this.props.gProps.playerB.name =="BYE") {
				winner = this.props.gProps.playerA;
				loser = this.props.gProps.playerB;
			 	byeRound = true;
			} else if ( this.props.gProps.playerA.name == "BYE"){
				winner = this.props.gProps.playerB;
				loser = this.props.gProps.playerA;
				byeRound = true;
			} else if (pAtime <= pBtime){
				winner = this.props.gProps.playerA;
				loser = this.props.gProps.playerB;
				winnerTime = pAtime;
				loserTime = pBtime;
				byeRound = false;
			} else if (pAtime > pBtime) {
				winner = this.props.gProps.playerB;
				loser = this.props.gProps.playerA;
				winnerTime = pBtime;
				loserTime = pAtime;
				byeRound = false;
			}
			//Dialog Popup
			this.props.gProps.showMatchup(
				newPos,
				this.props.gProps.playerA,
				this.props.gProps.playerB,
				byeRound,
				this.props.gProps.gameNumber,
				this.props.gProps.bracketSpots,
				winner,
				loser
			);
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

	render(){
		var teamHeight = this.props.gProps.vizGeo.teamHeight;
		var teamWidth = this.props.gProps.vizGeo.teamWidth;
		var gameWidth = teamWidth + 2 * teamHeight;
		var gameHeight = teamHeight * 3.5;
		var gameFontSize = 16;
		var pAavgTime = DetermineAvgTime(this.props.gProps.playerA.timeTrial, this.props.gProps.playerA.totalTime, this.props.gProps.playerA.wins, this.props.gProps.playerA.losses);
		var pBavgTime = DetermineAvgTime(this.props.gProps.playerB.timeTrial, this.props.gProps.playerB.totalTime, this.props.gProps.playerB.wins, this.props.gProps.playerB.losses);
		
		
		
		return(
			<Group 
				x={this.props.gProps.x}
				y={this.props.gProps.y}
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
                    fill= {this.BackgroundColor(this.props.gProps.status)}
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
            		text = {this.props.gProps.gameNumber}
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
					seed = {this.props.gProps.playerA.seed}
					country = {this.props.gProps.playerA.country.name}
					name = {this.props.gProps.playerA.name}
					time = {pAavgTime}
					img = {this.props.gProps.playerA.country.flagPathSVG}
					height = {teamHeight}
					width = {teamWidth}
					globalX = {1.5*teamHeight}
					globalY = {0.5*teamHeight}
					hover = {this.state.hover}
					losses = {this.props.gProps.playerA.losses}
					winChance = {DetermineWinChance(this.props.gProps.playerA.name, this.props.gProps.playerB.name, pAavgTime, pBavgTime)}
					loser = {this.props.gProps.loser}
					loserEliminated = {this.props.gProps.loserEliminated}
				/>
				<TileTeam
					seed = {this.props.gProps.playerB.seed}
					country = {this.props.gProps.playerB.country.name}
					name = {this.props.gProps.playerB.name}
					time = {pBavgTime}
					img = {this.props.gProps.playerB.country.flagPathSVG}
					height = {teamHeight}
					width = {teamWidth}
					globalX = {1.5*teamHeight}
					globalY = {2*teamHeight}
					hover = {this.state.hover}
					losses = {this.props.gProps.playerB.losses}
					winChance = {DetermineWinChance(this.props.gProps.playerB.name, this.props.gProps.playerA.name, pBavgTime, pAavgTime)}
					loser = {this.props.gProps.loser}
					loserEliminated = {this.props.gProps.loserEliminated}
				/>
			</Group>
		);
	}
}