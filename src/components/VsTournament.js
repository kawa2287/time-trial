'use strict';

import React from 'react';
import SkyLight from 'react-skylight';
import { Stage, Group, Layer } from "react-konva";
import Colors from '../static/Colors';

import Button from './Button';
import VsMatchup from './VsMatchup';
import PropogateSeedsArr from './vsBracketMethods/higherOrderMethods/PropogateSeedsArr';
import CreateMasterGameObject from './vsBracketMethods/higherOrderMethods/CreateMasterGameObject';
import CreateGmsWinBracket from './vsBracketMethods/higherOrderMethods/CreateGmsWinBracket';
import CreateGmsSpecialWinBracket from './vsBracketMethods/higherOrderMethods/CreateGmsSpecialWinBracket';
import CreateGmsLoseBracket from './vsBracketMethods/higherOrderMethods/CreateGmsLoseBracket';
import CreateGmsFinalsBracket from './vsBracketMethods/higherOrderMethods/CreateGmsFinalsBracket';
import DetermineBracketPower from './vsBracketMethods/baseMethods/DetermineBracketPower';
import * as NgmsInRnd from './vsBracketMethods/baseMethods/NgamesInRound';
import WinnerLoserHandler from './outcomes/WinnerLoserHandler';
import SetPlayerInDestGame from './outcomes/SetPlayerInDestGame';
import SendWinnerWinBracket from './outcomes/SendWinnerWinBracket';
import SendWinnerLoseBracket from './outcomes/SendWinnerLoseBracket';
import SendLoserWinBracket from './outcomes/SendLoserWinBracket';
import SendLoserStartBracket from './outcomes/SendLoserStartBracket';
import SendWinnerSpecialLoserBracket from './outcomes/SendWinnerSpecialLoserBracket';
import SendWinnerSpecialWinnerBracket from './outcomes/SendWinnerSpecialWinnerBracket';
import ChartHeaders from './sideChart/ChartHeaders';
import ChartTitle from './sideChart/ChartTitle';
import ChartDataManager from './sideChart/ChartDataManager';

//------------------------------------------------------------------
//declare geometries here
//------------------------------------------------------------------
var vizGeo = {
	teamHeight : 48,
	teamWidth : 300,
	horizSpace : 96,
	vertSpace : 84,
	radius: 100,
	lColAr: ['yellow','red','pink','orange','white']
};

//------------------------------------------------------------------
//declare global variables here
//------------------------------------------------------------------
var loserArr = [];
var winnerArr = [];
var mastArr = [];
var seededArray = [];

var teams;
var bracketSpots;
var bracketPower;
var nGamesTotal;

var gameWidth;
var gameHeight;
var boardHeight;

var gVars = {};
var mode;

export default class VsTournament extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			masterGameObject:{},
			scale:1,
			posX:null,
			posY:null,
			matchupPlayerA :{},
			matchupPlayerB :{},
			matchupPlayerC :{},
			matchupPlayerD :{},
			matchupGameNumber : 1,
			windowWidth : window.innerWidth,
			windowHeight : window.innerHeight,
			chartDisplay : 'timeTrial'
		};
		
		mode = this.props.location.state.mode;
		
		
		//DATABASE/////
	
		
		//bind imported state dependent functions
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.WinnerLoserHandler = WinnerLoserHandler.bind(this);
		this.SetPlayerInDestGame = SetPlayerInDestGame.bind(this);
		this.SendWinnerWinBracket = SendWinnerWinBracket.bind(this);
		this.SendWinnerLoseBracket = SendWinnerLoseBracket.bind(this);
		this.SendLoserWinBracket = SendLoserWinBracket.bind(this);
		this.SendLoserStartBracket = SendLoserStartBracket.bind(this);
		this.SendWinnerSpecialLoserBracket = SendWinnerSpecialLoserBracket.bind(this);
		this.SendWinnerSpecialWinnerBracket = SendWinnerSpecialWinnerBracket.bind(this);
		this.ChartTitle = ChartTitle.bind(this);
		
		teams = Object.keys(this.props.location.state.players).length;
		bracketSpots = Math.pow(2,DetermineBracketPower(teams));
		bracketPower = DetermineBracketPower(teams);
		nGamesTotal = bracketSpots*2 * (mode == 'VS' ? 1 : 0.5);
		gameWidth = vizGeo.teamWidth + 2*vizGeo.teamHeight;
		gameHeight = vizGeo.teamHeight* (mode == 'VS' ? 3.5 : 6.5);
		boardHeight = vizGeo.vertSpace*(3+(bracketSpots/(mode == 'VS' ? 2 : 4))) + bracketSpots*gameHeight/(mode == 'VS' ? 2 : 4);
		
		gVars = {
			gameWidth : gameWidth,
			gameHeight : gameHeight,
			boardHeight : boardHeight,
			winnerArr : winnerArr,
			loserArr : loserArr,
			vizGeo : vizGeo,
			bracketPower : bracketPower,
			bracketSpots : bracketSpots,
			showMatchup : this.showMatchup.bind(this)
		};
		
		var toggle = 0;
		
		//populate seeded array
		PropogateSeedsArr(teams,mastArr, bracketPower);
		
		//Create Master Game Object
		this.state.masterGameObject = CreateMasterGameObject(nGamesTotal, bracketSpots, mode);
		
		
		
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
				    splitTime : 0
					});
			}
			toggle = 0;
		}
		
		//Populate Start Round in Master Game Object
		var sift = 1;
		for (var k = 0; k < seededArray.length; k++){
			if (mode == 'VS'){
				if (k % 2 == 0){
					this.state.masterGameObject[k/2 + 1].playerA = seededArray[k];
				} else {
					this.state.masterGameObject[(k+1)/2].playerB = seededArray[k];
				}
			} else {
				if(sift == 1){
					this.state.masterGameObject[Math.ceil((k+1)/4)].playerA = seededArray[k];
					sift = sift + 1;
				} else if (sift == 2) {
					this.state.masterGameObject[Math.ceil((k+1)/4)].playerB = seededArray[k];
					sift = sift + 1;
				} else if (sift == 3) {
					this.state.masterGameObject[Math.ceil((k+1)/4)].playerC = seededArray[k];
					sift = sift + 1;
				} else {
					this.state.masterGameObject[Math.ceil((k+1)/4)].playerD = seededArray[k];
					sift = 1;
				}
			}
		}
		
		////////////////////////////////////////////
		///UP TO THIS POINT IN CHECKING FOR 4P//////
		////////////////////////////////////////////
		
		//create loserArr
		for (k = 1; k <= 2*(bracketPower-(mode == 'VS' ? 0 : 1)-1); k++){
			loserArr.push(NgmsInRnd.loserBracket(bracketSpots,k,mode));
		}
		
		//create winnerArr
		for (k = 0; k < bracketPower-(mode == 'VS' ? 0 : 1); k++){
			winnerArr.push(NgmsInRnd.winnerBracket(bracketSpots,k,mode));
		}
		
		//protect against window reload
		window.onbeforeunload = function() {
		    return "Data will be lost if you leave the page, are you sure?";
		};
	}
	
	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
		this.handleStatButtonClick(seededArray,'timeTrial');
	}
	
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}
	
	updateWindowDimensions() {
		this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
	}

	wheel(e){
		
		e.evt.preventDefault();
		
		var scaleBy = 1.15;
		var oldScale = this.state.scale;
		var newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

		var mousePointTo = {
                x: e.target.getStage().getPointerPosition().x / oldScale - e.target.getStage().x() / oldScale,
                y: e.target.getStage().getPointerPosition().y / oldScale - e.target.getStage().y() / oldScale,
            };
        
        var newPos = {
                x: -(mousePointTo.x - e.target.getStage().getPointerPosition().x / newScale) * newScale,
                y: -(mousePointTo.y - e.target.getStage().getPointerPosition().y / newScale) * newScale
            };
        
        this.setState({
        	scale : newScale,
        	posX:newPos.x,
        	posY:newPos.y
        });
	}
	
	handleStatButtonClick(query){
		this.setState({
			chartDisplay : query
		});
	}
	
	showMatchup(winLosePackage){
		
		if(winLosePackage.byeRound !== true){
			this.setState({
				posX:winLosePackage.newPos.x,
	        	posY:winLosePackage.newPos.y,
				matchupPlayerA: winLosePackage.playerA,
				matchupPlayerB: winLosePackage.playerB,
				matchupGameNumber : winLosePackage.gameNumber
			}, function afterClick(){
				this.customDialog.show();
			});
		} else {
			this.setState({
				posX:winLosePackage.newPos.x,
	        	posY:winLosePackage.newPos.y
			});
			var resultTimePackage = {
				win1time : 0,
				win2time : 0,
				lose1time : 0,
				lose2time : 0
			};
			this.WinnerLoserHandler(winLosePackage,resultTimePackage);
		}
	}
	
	hideMatchup(){
		this.customDialog.hide();
	}
	
	
	render() {
		
		var matchupDialog = {
			width: '1000',
		    height: '600',
		    position: 'fixed',
		    top: '50%',
		    left: '50%',
		    marginTop: '-300',
		    marginLeft: '-500',
			backgroundColor: Colors.gameNotReadyColor,
			color: Colors.gameNotReadyColor,
	    };
		
		//------------------------------------------------------------------
		//this.props.location.state.'GIVEN NAME' to access props thru Link
		//------------------------------------------------------------------
		var bezArr = [];
		var winnerBracket = [];
		var loserBracket = [];
		var finalsBracket = [];

		// Create Games
		var gameCounter = 1;
		
		// create Games in Winner Bracket (includes start round)
		var createdWinGames = CreateGmsWinBracket(gVars,gameCounter,this.state.masterGameObject,mode);
		winnerBracket.push(createdWinGames.winnerBracket);
		createdWinGames.bezArr.map(element => bezArr.push(element));
		gameCounter = createdWinGames.gameCounter;
		
		// create Games in Special Winner Bracket
		winnerBracket.push(CreateGmsSpecialWinBracket(gVars,gameCounter,this.state.masterGameObject, mode));
		gameCounter = gameCounter +1;
		
		// create Games in Loser Bracket
		var createdLoseGames = CreateGmsLoseBracket(gVars,gameCounter,this.state.masterGameObject, mode);
		loserBracket = createdLoseGames.loserBracket;
		createdLoseGames.bezArr.map(element => bezArr.push(element));
		gameCounter = createdLoseGames.gameCounter;
		
		// create Games in Finals Bracket
		var createdFinalsGames = CreateGmsFinalsBracket(gVars,gameCounter,this.state.masterGameObject,mode);
		finalsBracket = createdFinalsGames.finalsBracket;
		
		bezArr.reverse();
		
		var renderHeight = Math.round(this.state.windowHeight*0.8);
		var divStyle = {
	    	height: Math.round(renderHeight)
		};
		
		var chartTitle = this.ChartTitle(this.state.chartDisplay);
		
		var matchupPlayers = [];
		if (mode == 'VS'){
			matchupPlayers = [this.state.matchupPlayerA,this.state.matchupPlayerB];
		} else {
			matchupPlayers = [this.state.matchupPlayerA,this.state.matchupPlayerB,this.state.matchupPlayerC,this.state.matchupPlayerD];
		}
		
		
		return (
			<div className={'tournament-container'}>
				<SkyLight 
					dialogStyles={matchupDialog} 
					hideOnOverlayClicked ref={ref => this.customDialog = ref}
					afterClose={this._executeAfterModalClose}
				>
					<VsMatchup
						players = {matchupPlayers}
						gameNumber = {this.state.matchupGameNumber}
						dialogHeight = {matchupDialog.height}
						dialogWidth = {matchupDialog.width}
						WinnerLoserHandler = {this.WinnerLoserHandler.bind(this)}
						bracketSpots = {bracketSpots}
						hideMatchup = {this.hideMatchup.bind(this)}
						mode = {mode}
					/>
				</SkyLight>
				<Stage 
					className={'bracket-area'}
					ref={"stage"}
					x={this.state.posX}
					y={this.state.posY}
					width={Math.round(this.state.windowWidth*0.75)} 
					height={renderHeight} 
					draggable={true}
					onWheel = {this.wheel.bind(this)}
					scaleX = {this.state.scale}
					scaleY = {this.state.scale}
					>
					<Layer>
						<Group>
							{bezArr.map(element => element)}
							{loserBracket.map(element => element)}
							{winnerBracket.map(element => element)}
							{finalsBracket.map(element => element)}
						</Group>
					</Layer>
				</Stage>
				<div className={'side-panel-area'} style={divStyle} >
					<div className={'side-panel-chart'}>
						<div className={"chart-title"}>
					    	{chartTitle}
					    </div>
					    <ChartHeaders query = {this.state.chartDisplay}/>
					    <ChartDataManager
					    	seededArray = {seededArray}
					    	query = {this.state.chartDisplay}
					    />
					</div>
					<div className={'side-panel-selectors'}>
						<div className={"row-of-buttons"}> 
							<Button title='Seed' clickHandle={this.handleStatButtonClick.bind(this)}/>
							<Button title='Place' clickHandle={this.handleStatButtonClick.bind(this)}/>
						</div>
						<div className={"row-of-buttons"}> 
							<Button title='Time Trial' clickHandle={this.handleStatButtonClick.bind(this)}/>
							<Button title='Avg Times' clickHandle={this.handleStatButtonClick.bind(this)}/>
							<Button title='Best Times' clickHandle={this.handleStatButtonClick.bind(this)}/>
						</div>
						<div className={"row-of-buttons"}> 
							<Button title='Cup Time' clickHandle={this.handleStatButtonClick.bind(this)}/>
							<Button title='Index' clickHandle={this.handleStatButtonClick.bind(this)}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}