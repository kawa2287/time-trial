'use strict';

import React from 'react';
import Konva from "konva";
import { Rect, Group, Text } from "react-konva";
import TileTeam from './TileTeam';

var defaultColor = '#7F7F7F';
var completeColor = '#A3A3CC';
var availableColor = '#FEFCF9';
var hoverColor = '#FBF1E3';

export default class GameComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			nameA : this.props.playerA.name,
			nameB : this.props.playerB.name,
			seedA : this.props.playerA.seed,
			seedB : this.props.playerB.seed,
			timeTrialA : this.props.playerA.timeTrial,
			timeTrialB : this.props.playerB.timeTrial,
			flagA : this.props.playerA.country.flagPathMD,
			flagB : this.props.playerB.country.flagPathMD,
			hover : false
		};
	}
	
	
	//for testing/////////////////////////////////////////
	randomIntFromInterval(min,max)
	{
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
	//////////////////////////////////////////////////////
	
	BackgroundColor(name, hover){
		if (name === 'COMPLETE'){
			return completeColor;
		} else if (hover === true) {
			return hoverColor;
		} else {
			return defaultColor;
		}
	}
	
	
	handleOnclick (){
		var decider = this.randomIntFromInterval(0,100);
		
		var winner = decider > 50 ? this.props.playerA : this.props.playerB;
		var loser = decider <= 50 ? this.props.playerA : this.props.playerB;
		
		if(winner.name == 'BYE'){
			winner = this.props.playerB;
		}
		
		this.props.WinnerLoserHandler(
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
		}, function afterClick() {
			console.log("hover on!");
		});
	}
	
	handleOnMouseOut (){
		this.setState({
			hover : false
		}, function afterClick() {
			console.log("hover off!");
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
				timeTrialA : newProps.playerA.timeTrial,
				timeTrialB : newProps.playerB.timeTrial,
				flagA : newProps.playerA.country.flagPathMD,
				flagB : newProps.playerB.country.flagPathMD
		    });
		}
	}

	render(){
		var teamHeight = this.props.vizGeo.teamHeight;
		var teamWidth = this.props.vizGeo.teamWidth;
		var gameWidth = teamWidth + 2 * teamHeight;
		var gameHeight = teamHeight * 3.5;
		var gameFontSize = 16;
		
		return(
			<Group 
				x={this.props.x}
				y={this.props.y}
				width={gameWidth} 
				height={gameHeight}
				onClick={this.handleOnclick.bind(this)}
				onmouseover={this.handleOnMouseOver.bind(this)}
				onmouseout={this.handleOnMouseOut.bind(this)}
				draggable={true}
			>
				<Rect
					x={0}
					y={0}
					width={gameWidth}
        			height={gameHeight}
                    fill= {this.BackgroundColor(this.props.name,this.props.hover)}
					stroke= 'black'
					strokeWidth= {2}
				/>
				<Rect
					x={0}
					y={0}
					width={teamHeight}
        			height={gameHeight}
                    fill= {'#323232'}
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
					name = {this.state.nameA}
					time = {this.state.timeTrialA}
					img = {this.state.flagA}
					height = {teamHeight}
					width = {teamWidth}
					globalX = {1.5*teamHeight}
					globalY = {0.5*teamHeight}
					hover = {this.state.hover}
				/>
				<TileTeam
					seed = {this.state.seedB}
					name = {this.state.nameB}
					time = {this.state.timeTrialB}
					img = {this.state.flagB}
					height = {teamHeight}
					width = {teamWidth}
					globalX = {1.5*teamHeight}
					globalY = {2*teamHeight}
					hover = {this.state.hover}
				/>
			</Group>
		);
	}
}