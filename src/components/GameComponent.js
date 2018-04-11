'use strict';

import React from 'react';
import Konva from "konva";
import { Stage, Layer, Text } from "react-konva";
import TileTeam from './TileTeam';


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
	
	
	//for testing
	randomIntFromInterval(min,max)
	{
	    return Math.floor(Math.random()*(max-min+1)+min);
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
		var stageWidth = this.props.width;
		var stageHeight = this.props.height;
		var gameNumber = this.props.gameNumber;

		var tiles = [];
		
		
		return(
			<Stage 
				width={stageWidth} 
				height={stageHeight}
				onClick={this.handleOnclick.bind(this)}
				onmouseover={this.handleOnMouseOver.bind(this)}
				onmouseout={this.handleOnMouseOut.bind(this)}
			>
				<Layer>
					<TileTeam
						seed = {this.state.seedA}
						name = {this.state.nameA}
						time = {this.state.timeTrialA}
						img = {this.state.flagA}
						height = {stageHeight/2}
						width = {stageWidth}
						globalY = {0}
						hover = {this.state.hover}
					/>
					<TileTeam
						seed = {this.state.seedB}
						name = {this.state.nameB}
						time = {this.state.timeTrialB}
						img = {this.state.flagB}
						height = {stageHeight/2}
						width = {stageWidth}
						globalY = {stageHeight/2}
						hover = {this.state.hover}
					/>
				</Layer>
			</Stage>
		);
	}
}