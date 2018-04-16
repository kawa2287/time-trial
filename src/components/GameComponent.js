'use strict';

import React from 'react';
import Konva from "konva";
import { Rect, Group, Text } from "react-konva";
import TileTeam from './TileTeam';
import Colors from '../static/Colors';

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
			flagA : this.props.playerA.country.flagPathSVG,
			flagB : this.props.playerB.country.flagPathSVG,
			lossesA : this.props.playerA.losses,
			lossesB : this.props.playerB.losses,
			hover : false,
			status : this.props.status
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
	
	
	handleOnclick (e){
		
		var pAtime = this.props.playerA.timeTrial + (this.randomIntFromInterval(-10,15));
		var pBtime = this.props.playerB.timeTrial + (this.randomIntFromInterval(-10,15));
		
		var winner;
		var loser;
		
		// decide winner or loser
		if (this.props.playerB.name =="BYE") {
			winner = this.props.playerA;
			loser = this.props.playerB;
		} else if ( this.props.playerA.name == "BYE"){
			winner = this.props.playerB;
			loser = this.props.playerA;
		}else if (pAtime <= pBtime){
			winner = this.props.playerA;
			loser = this.props.playerB;
		} else if (pAtime > pBtime) {
			winner = this.props.playerB;
			loser = this.props.playerA;
		}
		
		//determine where to send players
		this.props.WinnerLoserHandler(
			e,
			this.props.gameNumber, 
			this.props.bracketSpots,
			winner, 
			loser,
			this.props.bracket
		);
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
				flagA : newProps.playerA.country.flagPathSVG,
				flagB : newProps.playerB.country.flagPathSVG,
				lossesA : newProps.playerA.losses,
				lossesB : newProps.playerB.losses,
				status : newProps.status
		    });
		}
	}


	render(){
		var teamHeight = this.props.vizGeo.teamHeight;
		var teamWidth = this.props.vizGeo.teamWidth;
		var gameWidth = teamWidth + 2 * teamHeight;
		var gameHeight = teamHeight * 3.5;
		var gameFontSize = 16;
		
		console.log('gameNumber', this.props.gameNumber);
		console.log('gameComponentStatus', this.props.status);
		console.log('dumbStatus', this.props.playerA.seed>=1 && this.props.playerB.seed >=1);
		console.log('-----------------------');
		
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
					time = {this.state.timeTrialA}
					img = {this.state.flagA}
					height = {teamHeight}
					width = {teamWidth}
					globalX = {1.5*teamHeight}
					globalY = {0.5*teamHeight}
					hover = {this.state.hover}
					losses = {this.state.lossesA}
				/>
				<TileTeam
					seed = {this.state.seedB}
					country = {this.state.countryB}
					name = {this.state.nameB}
					time = {this.state.timeTrialB}
					img = {this.state.flagB}
					height = {teamHeight}
					width = {teamWidth}
					globalX = {1.5*teamHeight}
					globalY = {2*teamHeight}
					hover = {this.state.hover}
					losses = {this.state.lossesB}
				/>
			</Group>
		);
	}
}