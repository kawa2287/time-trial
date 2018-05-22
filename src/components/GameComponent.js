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

var teamHeight;
var teamWidth;
var gameWidth;
var gameHeight;
var gameFontSize = 16;

var pAavgTime;
var pBavgTime;
var pCavgTime;
var pDavgTime;

var playerArr =[];
var playerAvgTmArr = [];
var cap;

export default class GameComponent extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			hover : false
		};
		
		teamHeight = this.props.gProps.vizGeo.teamHeight;
		teamWidth = this.props.gProps.vizGeo.teamWidth;
		gameWidth = this.props.gProps.gVars.gameWidth;
		gameHeight = this.props.gProps.gVars.gameHeight;
	}
	
	componentWillReceiveProps(newProps) {
		if ({...newProps} !== {...this.props}){
		    this.gProps = newProps.gProps;
		}
	}
	
	randomIntFromInterval(min,max)
	{
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	BackgroundColor(status){
		if (status === 'COMPLETE'){
			return completeColor;
		} else if (this.props.gProps.mode == 'VS'){
			if (this.props.gProps.playerA.seed>=1 && this.props.gProps.playerB.seed >=1) {
				return availableColor;
			} else {
				return defaultColor;
			}
		} else{
			if ( this.props.gProps.playerA.seed>=1 && this.props.gProps.playerB.seed >=1 && this.props.gProps.playerC.seed>=1 && this.props.gProps.playerD.seed >=1) {
				return availableColor;
			} else {
				return defaultColor;
			}
		} 
	}
	
	handleOnclick (e){
		
		var winLosePackage = {
			playerA : this.gProps.playerA,
			playerB : this.gProps.playerB,
			playerC : this.gProps.playerC,
			playerD : this.gProps.playerD,
			winner1 : null,
			winner2 : null,
			loser1 : null,
			loser2 : null,
			byeRound : null,
			newPos : null,
			gameNumber : this.gProps.gameNumber,
			bracketSpots : this.gProps.bracketSpots,
			bracket : this.gProps.bracket,
			mode : this.gProps.mode
		};
		
		if (this.props.gProps.mode == 'VS'){
			if (this.props.gProps.playerA.seed >=1 && 
				this.props.gProps.playerB.seed >=1 && 
				this.props.gProps.status !== 'COMPLETE'){
					
				winLosePackage.newPos = StabilizeView(e);

				// decide winner or loser if BYE present
				if (this.props.gProps.playerB.name =="BYE") {
					winLosePackage.winner1 = this.props.gProps.playerA;
					winLosePackage.loser1 = this.props.gProps.playerB;
				 	winLosePackage.byeRound = true;
				} else if ( this.props.gProps.playerA.name == "BYE"){
					winLosePackage.winner1 = this.props.gProps.playerB;
					winLosePackage.loser1 = this.props.gProps.playerA;
					winLosePackage.byeRound = true;
				}
				//Dialog Popup
				this.props.gProps.showMatchup(winLosePackage);
			}
		} else {
			if (this.props.gProps.playerA.seed >=1 && 
				this.props.gProps.playerB.seed >=1 && 
				this.props.gProps.playerC.seed >=1 && 
				this.props.gProps.playerD.seed >=1 && 
				this.props.gProps.status !== 'COMPLETE'){
					
				winLosePackage.newPos = StabilizeView(e);
				
				var pAcode = this.props.gProps.playerA.name == 'BYE' ? 1 : 0;
				var pBcode = this.props.gProps.playerB.name == 'BYE' ? 1 : 0;
				var pCcode = this.props.gProps.playerC.name == 'BYE' ? 1 : 0;
				var pDcode = this.props.gProps.playerD.name == 'BYE' ? 1 : 0;
				var WLcode = pAcode.toString()+pBcode.toString()+pCcode.toString()+pDcode.toString();

				// decide winner or loser if (2) or more BYEs present
				switch(WLcode){
					case '1100' :
						winLosePackage.winner1 = this.props.gProps.playerC;
						winLosePackage.winner2 = this.props.gProps.playerD;
						winLosePackage.loser1 = this.props.gProps.playerA;
						winLosePackage.loser2 = this.props.gProps.playerB;
						winLosePackage.byeRound = true;
						break;
					case '1010' :
						winLosePackage.winner1 = this.props.gProps.playerB;
						winLosePackage.winner2 = this.props.gProps.playerD;
						winLosePackage.loser1 = this.props.gProps.playerA;
						winLosePackage.loser2 = this.props.gProps.playerC;
						winLosePackage.byeRound = true;
						break;
					case '1001' :
						winLosePackage.winner1 = this.props.gProps.playerB;
						winLosePackage.winner2 = this.props.gProps.playerC;
						winLosePackage.loser1 = this.props.gProps.playerA;
						winLosePackage.loser2 = this.props.gProps.playerD;
						winLosePackage.byeRound = true;
						break;
					case '0110' :
						winLosePackage.winner1 = this.props.gProps.playerA;
						winLosePackage.winner2 = this.props.gProps.playerD;
						winLosePackage.loser1 = this.props.gProps.playerB;
						winLosePackage.loser2 = this.props.gProps.playerC;
						winLosePackage.byeRound = true;
						break;
					case '0101' :
						winLosePackage.winner1 = this.props.gProps.playerA;
						winLosePackage.winner2 = this.props.gProps.playerC;
						winLosePackage.loser1 = this.props.gProps.playerB;
						winLosePackage.loser2 = this.props.gProps.playerD;
						winLosePackage.byeRound = true;
						break;
					case '0011' :
						winLosePackage.winner1 = this.props.gProps.playerA;
						winLosePackage.winner2 = this.props.gProps.playerB;
						winLosePackage.loser1 = this.props.gProps.playerC;
						winLosePackage.loser2 = this.props.gProps.playerD;
						winLosePackage.byeRound = true;
						break;
					case '0111' :
						winLosePackage.winner1 = this.props.gProps.playerA;
						winLosePackage.winner2 = this.props.gProps.playerB;
						winLosePackage.loser1 = this.props.gProps.playerC;
						winLosePackage.loser2 = this.props.gProps.playerD;
						winLosePackage.byeRound = true;
						break;
					case '1011' :
						winLosePackage.winner1 = this.props.gProps.playerB;
						winLosePackage.winner2 = this.props.gProps.playerA;
						winLosePackage.loser1 = this.props.gProps.playerC;
						winLosePackage.loser2 = this.props.gProps.playerD;
						winLosePackage.byeRound = true;
						break;
					case '1101' :
						winLosePackage.winner1 = this.props.gProps.playerC;
						winLosePackage.winner2 = this.props.gProps.playerB;
						winLosePackage.loser1 = this.props.gProps.playerA;
						winLosePackage.loser2 = this.props.gProps.playerD;
						winLosePackage.byeRound = true;
						break;
					case '1110' :
						winLosePackage.winner1 = this.props.gProps.playerD;
						winLosePackage.winner2 = this.props.gProps.playerB;
						winLosePackage.loser1 = this.props.gProps.playerC;
						winLosePackage.loser2 = this.props.gProps.playerA;
						winLosePackage.byeRound = true;
						break;
					case '1111' :
						winLosePackage.winner1 = this.props.gProps.playerA;
						winLosePackage.winner2 = this.props.gProps.playerB;
						winLosePackage.loser1 = this.props.gProps.playerC;
						winLosePackage.loser2 = this.props.gProps.playerD;
						winLosePackage.byeRound = true;
						break;
				}
				//Dialog Popup
				this.props.gProps.showMatchup(winLosePackage);
			}
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
		
		var tileTeams = [];
		var playerFinishTimeArr = [];
		
		playerArr = [];
		playerArr.push(this.props.gProps.playerA);
		playerArr.push(this.props.gProps.playerB);
		pAavgTime = DetermineAvgTime(this.props.gProps.playerA.timeTrial, this.props.gProps.playerA.totalTime, this.props.gProps.playerA.wins, this.props.gProps.playerA.losses);
		pBavgTime = DetermineAvgTime(this.props.gProps.playerB.timeTrial, this.props.gProps.playerB.totalTime, this.props.gProps.playerB.wins, this.props.gProps.playerB.losses);
		if(this.props.gProps.mode !== 'VS'){
			pCavgTime = DetermineAvgTime(this.props.gProps.playerC.timeTrial, this.props.gProps.playerC.totalTime, this.props.gProps.playerC.wins, this.props.gProps.playerC.losses);
			pDavgTime = DetermineAvgTime(this.props.gProps.playerD.timeTrial, this.props.gProps.playerD.totalTime, this.props.gProps.playerD.wins, this.props.gProps.playerD.losses);
			playerArr.push(this.props.gProps.playerC);
			playerArr.push(this.props.gProps.playerD);
		}
		
		playerAvgTmArr = [pAavgTime,pBavgTime,pCavgTime,pDavgTime];
		playerFinishTimeArr = [this.props.gProps.playerAtime,this.props.gProps.playerBtime,this.props.gProps.playerCtime,this.props.gProps.playerDtime];

		cap = this.props.gProps.mode == 'VS' ? 2 : 4;
		
		
		if( this.props.gProps.mode == 'VS'){
			for (var i = 0; i <cap; i++){
				tileTeams.push(
					<TileTeam
						seed = {playerArr[i].seed}
						country = {playerArr[i].country.name}
						name = {playerArr[i].name}
						time = {playerAvgTmArr[i]}
						img = {playerArr[i].country.flagPathSVG}
						height = {teamHeight}
						width = {teamWidth}
						globalX = {1.5*teamHeight}
						globalY = {((1.5*(i+1))-1)*teamHeight}
						hover = {this.state.hover}
						losses = {playerArr[i].losses}
						winChance = {DetermineWinChance(playerArr,playerAvgTmArr, i, this.props.gProps.mode)}
						loser = {this.props.gProps.loser}
						loserEliminated = {this.props.gProps.loserEliminated}
						mode={this.props.gProps.mode}
					/>
				);
			}
		} else {
			for (var i = 0; i <cap; i++){
				tileTeams.push(
					<TileTeam
						seed = {playerArr[i].seed}
						country = {playerArr[i].country.name}
						name = {playerArr[i].name}
						time = {playerAvgTmArr[i]}
						img = {playerArr[i].country.flagPathSVG}
						height = {teamHeight}
						width = {teamWidth}
						globalX = {1.5*teamHeight}
						globalY = {((1.5*(i+1))-1)*teamHeight}
						hover = {this.state.hover}
						losses = {playerArr[i].losses}
						winChance = {DetermineWinChance(playerArr,playerAvgTmArr, i, this.props.gProps.mode)}
						winner1 = {this.props.gProps.winner1}
						winner2 = {this.props.gProps.winner2}
						loser1 = {this.props.gProps.loser1}
						loser2 = {this.props.gProps.loser2}
						loserEliminated1 = {this.props.gProps.loserEliminated1}
						loserEliminated2 = {this.props.gProps.loserEliminated2}
						mode={this.props.gProps.mode}
						finishTime = {playerFinishTimeArr[i]}
						status = {this.props.gProps.status}
					/>
				);
			}
		}
		
		
		
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
				{tileTeams}
			</Group>
		);
	}
}