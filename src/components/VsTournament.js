'use strict';

import React from 'react';
import SkyLight from 'react-skylight';
import { Stage, Group, Layer, Rect, Text } from "react-konva";
import Colors from '../static/Colors';
import divisionNames from '../data/divisionNames';

import Button from './Button';
import Settings from '../static/Settings';
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
import SetPlayerInDestGame4P from './outcomes/SetPlayerInDestGame4P';
import SendWinnerWinBracket from './outcomes/SendWinnerWinBracket';
import SendWinnerWinBracket4P from './outcomes/SendWinnerWinBracket4P';
import SendWinnerLoseBracket from './outcomes/SendWinnerLoseBracket';
import SendWinnerLoseBracket4P from './outcomes/SendWinnerLoseBracket4P';
import SendLoserWinBracket from './outcomes/SendLoserWinBracket';
import SendLoserWinBracket4P from './outcomes/SendLoserWinBracket4P';
import SendLoserStartBracket from './outcomes/SendLoserStartBracket';
import SendLoserStartBracket4P from './outcomes/SendLoserStartBracket4P';
import SendWinnerSpecialLoserBracket from './outcomes/SendWinnerSpecialLoserBracket';
import SendWinnerSpecialLoserBracket4P from './outcomes/SendWinnerSpecialLoserBracket4P';
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
	horizSpace : 128,
	vertSpace : 84,
	radius: 100,
	lColAr: []
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


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function pickRandomProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
}

function selectUnique(prop, obj){
	var tempProp = pickRandomProperty(obj);
	if (tempProp!== prop){
		return tempProp;
	} else {
		return selectUnique(prop,obj);
	}
}


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
			chartDisplay : 'Place'
		};
		// set settings
		mode = this.props.location.state.mode;
		Settings.seedMode = this.props.location.state.seeding; 
		
		// init colors
		for (var c = 0; c <30; c++){
			vizGeo.lColAr.push("#"+((1<<24)*Math.random()|0).toString(16));
		}
		
		//TODO DATABASE/////
	
		
		//bind imported state dependent functions
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.WinnerLoserHandler = WinnerLoserHandler.bind(this);
		this.SetPlayerInDestGame = SetPlayerInDestGame.bind(this);
		this.SetPlayerInDestGame4P = SetPlayerInDestGame4P.bind(this);
		this.SendWinnerWinBracket = SendWinnerWinBracket.bind(this);
		this.SendWinnerWinBracket4P = SendWinnerWinBracket4P.bind(this);
		this.SendWinnerLoseBracket = SendWinnerLoseBracket.bind(this);
		this.SendWinnerLoseBracket4P = SendWinnerLoseBracket4P.bind(this);
		this.SendLoserWinBracket = SendLoserWinBracket.bind(this);
		this.SendLoserWinBracket4P = SendLoserWinBracket4P.bind(this);
		this.SendLoserStartBracket = SendLoserStartBracket.bind(this);
		this.SendLoserStartBracket4P = SendLoserStartBracket4P.bind(this);
		this.SendWinnerSpecialLoserBracket = SendWinnerSpecialLoserBracket.bind(this);
		this.SendWinnerSpecialLoserBracket4P = SendWinnerSpecialLoserBracket4P.bind(this);
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
		
		//place players into Temp array
		var tempPlayerArr = [];
		for (var p in this.props.location.state.players){
			tempPlayerArr.push(this.props.location.state.players[p]);
		}
		if(this.props.location.state.order == 'random' ){
			seededArray = shuffle(seededArray);
			for (var q = 0; q < tempPlayerArr.length; q++){
				tempPlayerArr[q].seed = q+1;
			}
		}
		
		//assign teams to divisions
		var divisionTrigger = 0;
		var divisionCounter = 1;
		var conference1 = pickRandomProperty(divisionNames);
		var conference2 = selectUnique(conference1,divisionNames);
		var div1 = pickRandomProperty(conference1);
		var div2 = selectUnique(div1,conference1);
		var div3 = pickRandomProperty(conference2);
		var div4 = selectUnique(div3,conference2);
		var divisions = [div1,div2,div3,div4];
	
	
			
		//Add Props to Seeded Array
		for (var item in mastArr) {
			for (var y = 0; y < tempPlayerArr.length; y++){
				if(mastArr[item] == tempPlayerArr[y].seed){
					tempPlayerArr[y].mascot = divisions[divisionTrigger];
					seededArray.push(tempPlayerArr[y]);
					toggle = 1;
				} 
			}
			if (toggle == 0){
				seededArray.push({
					name : 'BYE',
				    country : '',
				    seed : mastArr[item],
				    timeTrial : '-',
				    wins : null,
				    losses : null,
				    totalTime : 0,
				    avgTime : 0,
				    splitTime : 0
					});
			}
			toggle = 0;
			if (divisionCounter % (bracketSpots/(mode=='VS'?2:4)) == 0 && divisionCounter !==0){
				divisionTrigger += 1;
				console.log('divisionTrigger',divisionTrigger);
			}
			divisionCounter +=1;
			
		}
		console.log('seededArray',seededArray);
		
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
		
		//create loserArr
		for (k = 1; k <= 2*(bracketPower-(mode == 'VS' ? 0 : 1)-1); k++){
			loserArr.push(NgmsInRnd.loserBracket(bracketSpots,k,mode));
		}
		
		//create winnerArr
		for (k = 0; k < bracketPower-(mode == 'VS' ? 0 : 1); k++){
			winnerArr.push(NgmsInRnd.winnerBracket(bracketSpots,k,mode));
		}
		
		//create elimination round text
		
		
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
				matchupPlayerC: winLosePackage.playerC,
				matchupPlayerD: winLosePackage.playerD,
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
			 winLosePackage['playerAtime'] = '-';
			 winLosePackage['playerBtime'] = '-';
			 winLosePackage['playerCtime'] = '-';
			 winLosePackage['playerDtime'] = '-';
			
			this.WinnerLoserHandler(winLosePackage,resultTimePackage);
		}
	}
	
	hideMatchup(){
		this.customDialog.hide();
		this.setState({
			matchupPlayerA : {},
			matchupPlayerB : {},
			matchupPlayerC : {},
			matchupPlayerD : {}
		});
	}

	
	
	render() {
		
		var matchupDialog = {
			width: mode=='VS'?'1000':'1400',
		    height: mode=='VS'?'600':'800',
		    position: 'fixed',
		    top: '50%',
		    left: '50%',
		    marginTop: mode=='VS'?'-300':'-400',
		    marginLeft: mode=='VS'?'-500':'-700',
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
		if (mode == 'VS'){
			var createdFinalsGames = CreateGmsFinalsBracket(gVars,gameCounter,this.state.masterGameObject,mode);
			finalsBracket = createdFinalsGames.finalsBracket;
		}
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
		
		// create backround rectangles for elimination rounds
		console.log('loserArr',loserArr);
		var elimBackgrounds = [];
		var winBackgrounds = [];
		var elimText = [];
		var winText = [];
		var xLoc;
		var winTextHeader;
		
		for(var r = -1; r >= -loserArr.length; r--){
			xLoc = (r+(bracketPower-(mode == 'VS' ? 0 : 1)-1)*2)*(gameWidth+vizGeo.horizSpace) + vizGeo.horizSpace/2;
			elimBackgrounds.push(
				<Rect
					x={xLoc}
					width={gameWidth + vizGeo.horizSpace}
					height={boardHeight}
					fill={'#FF3B3B'}
					opacity = {0.8*Math.abs(r)/loserArr.length}
				/>
			);
			elimText.push(
				<Text
					text={'ELIMINATION ROUND ' + Math.abs(r)}
					x={xLoc}
					y={-vizGeo.vertSpace*2}
					width={gameWidth + vizGeo.horizSpace}
					fontSize = {30}
            		fontStyle = 'bold'
            		shadowBlur = {2}
            		fill = {'#121212'}
            		align = 'center'
            		fontFamily = 'Open Sans'
				/>
			);
		}
		for (var w =0; w <=winnerArr.length;w++){
			xLoc = (w+(bracketPower-(mode == 'VS' ? 0 : 1)-1)*2)*(gameWidth+vizGeo.horizSpace) + vizGeo.horizSpace/2;
			if (w !== 0 ){
				winBackgrounds.push(
					<Rect
						x={xLoc}
						width={gameWidth + vizGeo.horizSpace}
						height={boardHeight}
						fill={'#8C69CE'}
						opacity = {0.8*Math.abs(w)/winnerArr.length}
					/>
				);
			}
			if(w == 0 ){
				winTextHeader = "ROUND OF " + Math.pow(2,bracketPower-w);
			} else if (w == winnerArr.length){
				winTextHeader = "CHAMPIONSHIP";
			} else if (w ==winnerArr.length-1){
				winTextHeader = "SEMI-FINAL";
			} else if (w == winnerArr.length -2){
				winTextHeader = "CONFERENCE FINAL";
			} else if (w == winnerArr.length -3){
				winTextHeader = "DIVISION FINAL";
			} else {
				winTextHeader = "ROUND OF " + Math.pow(2,bracketPower-w);
			}
			
			winText.push(
				<Text
					text={winTextHeader}
					x={xLoc}
					y={-vizGeo.vertSpace*2}
					width={gameWidth + vizGeo.horizSpace}
					fontSize = {30}
            		fontStyle = 'bold'
            		shadowBlur = {2}
            		fill = {'#121212'}
            		align = 'center'
            		fontFamily = 'Open Sans'
				/>
			);
		}
		
		//create division rects
		
	var divisionRects= [];
	for (var d = 0 ; d < 4; d++){
		divisionRects.push(
			<Rect
				x={vizGeo.horizSpace/2}
				y={vizGeo.vertSpace*1.5+ d*(gameHeight+vizGeo.vertSpace)*bracketSpots/(4*(mode=='VS'?2:4))}
				width={(winnerArr.length+loserArr.length)*(gameWidth + vizGeo.horizSpace) +vizGeo.horizSpace*2.5 + gameWidth/2 }
				height={(gameHeight+vizGeo.vertSpace)*bracketSpots/(4*(mode=='VS'?2:4))}
				fill={d%2==0?'#121212':"yellow"}
				opacity = {0.1}
			/>
		);
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
							{divisionRects.map(element => element)}
							{elimBackgrounds.map(element => element)}
							{winBackgrounds.map(element => element)}
							{bezArr.map(element => element)}
							{loserBracket.map(element => element)}
							{winnerBracket.map(element => element)}
							{finalsBracket.map(element => element)}
							{elimText.map(element => element)}
							{winText.map(element => element)}
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
					    	mode = {mode}
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
							{mode=='VS'?null:<Button title='Avg Place' clickHandle={this.handleStatButtonClick.bind(this)}/>}
						</div>
					</div>
				</div>
			</div>
		);
	}
}