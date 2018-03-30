'use strict';

import React from 'react';
import Konva from "konva";
import { Stage, Layer, Text } from "react-konva";
import TileTeam from './TileTeam';


export default class GameComponent extends React.Component {
	constructor(){
		super();
		this.state= {
			nameA : '',
			nameB : '',
			seedA : '',
			seedB : '',
			timeTrialA : 0,
			timeTrialB : 0
		};
	}
	
	handleOnclick (){
		/*
		this.props.SendWinner(
			this.props.gameNumber, 
			this.props.bracketSpots,
			this.props.playerA, 
			this.props.playerB);
		*/
		this.setState({
			nameA : 'CHANGED',
			nameB : 'CHANGED'
		});
	}
	
	componentWillMount (){
        this.setState({
			nameA : this.props.playerA.name,
			nameB : this.props.playerB.name,
			seedA : this.props.playerA.seed,
			seedB : this.props.playerB.seed,
			timeTrialA : this.props.playerA.timeTrial,
			timeTrialB : this.props.playerB.timeTrial
		});
	}

	render(){
		var stageWidth = this.props.width;
		var stageHeight = this.props.height;
		var gameNumber = this.props.gameNumber;
		
		return(
			<Stage width={stageWidth} height={stageHeight}>
				<Layer onClick={this.handleOnclick.bind(this)}>
					<TileTeam
						seed = {this.state.seedA}
						name = {this.state.nameA}
						time = {this.state.timeTrialA}
						img = {this.props.playerA.country.flagPathMD}
						height = {stageHeight/2}
						width = {stageWidth}
						globalY = {0}
					/>
					<TileTeam
						seed = {this.state.seedB}
						name = {this.state.nameB}
						time = {this.state.timeTrialB}
						img = {this.props.playerB.country.flagPathMD}
						height = {stageHeight/2}
						width = {stageWidth}
						globalY = {stageHeight/2}
					/>
				</Layer>
			</Stage>
		);
	}
}