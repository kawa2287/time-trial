'use strict';

import React from 'react';
import SkyLight from 'react-skylight';
import { Stage, Group, Layer, Rect, Text } from "react-konva";
import Colors from '../static/Colors';
import divisionNames from '../data/divisionNames';
import DivisionImage from './matchup/DivisionImage';
import Firebase from '../firebase';


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
import StartOutcomes from './outcomes/StartOutcomes';
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
	horizSpace : 192,
	vertSpace : 84,
	radius: 100,
	lColAr: []
};

//------------------------------------------------------------------
//declare global variables here
//------------------------------------------------------------------
var GamesDB;

var loserArr = [];
var winnerArr = [];
var mastArr = [];
var seededArray = [];
var elimRoundsArr = [];
var winRoundsArr = [];
var tempRoundNamesArray = [];
var roundNamesArray = [];
var cleanRoundNamesArray = [];

var teams;
var bracketSpots;
var bracketPower;
var nGamesTotal;
var loadGame;

var gameWidth;
var gameHeight;
var boardHeight;

var gVars = {};
var mode;
var divisions=[];

var beginConstruction = true;


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
			scale:0.5,
			posX:-1000,
			posY:null,
			matchupPlayerA :{},
			matchupPlayerB :{},
			matchupPlayerC :{},
			matchupPlayerD :{},
			matchupGameNumber : 1,
			windowWidth : window.innerWidth,
			windowHeight : window.innerHeight,
			chartDisplay : 'Place',
			playersArray: [],
			gameTitle:null,
			gameNumber:null
		};
		// set settings
		mode = this.props.location.state.mode;
		Settings.seedMode = this.props.location.state.seeding; 
		loadGame = this.props.location.state.load;
		
		// init colors
		for (var c = 0; c <30; c++){
			vizGeo.lColAr.push("#"+((1<<24)*Math.random()|0).toString(16));
		}
		
		///// DATABASE/////
		GamesDB = Firebase.database().ref(this.props.location.state.gameName);
	
		
		//bind imported state dependent functions
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.WinnerLoserHandler = WinnerLoserHandler.bind(this);
		this.StartOutcomes = StartOutcomes.bind(this);
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
		
		//create loserArr
		for (k = 1; k <= 2*(bracketPower-(mode == 'VS' ? 0 : 1)-1); k++){
			loserArr.push(NgmsInRnd.loserBracket(bracketSpots,k,mode));
			elimRoundsArr.push('Elimination Round '+ k);
		}
		
		//create winnerArr
		var winRounds = bracketPower+(mode == 'VS' ? 1 : 0);
		for (k = 0; k <= winRounds; k++){
			winnerArr.push(Math.ceil(NgmsInRnd.winnerBracket(bracketSpots,k,mode))); 
			if( k == 0) {
				winRoundsArr.push('Round of ' + Math.pow(2,bracketPower-k)); 
			} else if (k == winRounds){
				winRoundsArr.push('Championship 2');
			} else if (k ==winRounds-1){
				winRoundsArr.push('Championship 1');
			} else if (k == winRounds -2){
				winRoundsArr.push('Semi Final');
			} else if (k == winRounds -3){
				winRoundsArr.push('Conference Final');
			} else if (k == winRounds -4){
				winRoundsArr.push('Division Final');
			} else {
				winRoundsArr.push('Round of ' + Math.pow(2,bracketPower-k)); 
			}
		}
		
		
		if(loadGame == true){
			//setState with Firebase
			var ref = Firebase.database().ref(this.props.location.state.gameName);
			ref.on("value", (snapshot) => {
				this.setState ({
					masterGameObject : snapshot.val().masterGameObject,
					seededArray : snapshot.val().seededArray,
					playersArray : snapshot.val().players
				}, print => {
					console.log('seededArray construct',this.state.seededArray);
					console.log('masterGameObject construct',this.state.masterGameObject);
				});
				
			}, function (error) {
			    console.log("Error: " + error.code);
			});
			this.forceUpdate();
			loadGame = false;
		} else {
		
			//populate seeded array
			PropogateSeedsArr(teams,mastArr, bracketPower);
			
			//Create Master Game Object
			this.state.masterGameObject = CreateMasterGameObject(nGamesTotal, bracketSpots, mode);
			console.log('masterGameObject',this.state.masterGameObject);
			
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

			//popluate players array
			this.state.playersArray = this.props.location.state.players;
			
			//assign teams to divisions
			var divisionTrigger = 0;
			var divisionCounter = 1;
			var darkArray = [];
			var lightArray = [];
			for (var c = 0; c < 4; c++){
				if (c === 0){
					darkArray.push(pickRandomProperty(Colors.darkArray));
					lightArray.push(pickRandomProperty(Colors.lightArray));
				} else {
					var tempDark = null;
					var tempLight = null;
					for (var x = 0; x < darkArray.length; x++){
						tempDark = selectUnique(darkArray[x],Colors.darkArray);
						tempLight = selectUnique(lightArray[x],Colors.lightArray);
					}
					darkArray.push(tempDark);
					lightArray.push(tempLight);
				}
			}
			
			var conference1 = pickRandomProperty(divisionNames);
			var conference2 = selectUnique(conference1,divisionNames);
			var conf1MascotA = pickRandomProperty(conference1.divisions);
			var conf2MascotA = pickRandomProperty(conference2.divisions);
			var conf1MascotB = selectUnique(conf1MascotA, conference1.divisions);
			var conf2MascotB = selectUnique(conf2MascotA,conference2.divisions);
			var div1 = {
				conference: conference1.conference,
				mascot: conf1MascotA,
				primaryColor: darkArray[0],
				secondaryColor: lightArray[0]
			};
			var div2 = {
				conference: conference1.conference,
				mascot: conf1MascotB,
				primaryColor: darkArray[1],
				secondaryColor: lightArray[1]
			};
			var div3 = {
				conference: conference2.conference,
				mascot: conf2MascotA,
				primaryColor: lightArray[2],
				secondaryColor: darkArray[2]
			};
			var div4 = {
				conference: conference2.conference,
				mascot: conf2MascotB,
				primaryColor: lightArray[3],
				secondaryColor: darkArray[3]
			};
	
			divisions = [div1,div2,div3,div4];
		
		
				
			//Add Props to Seeded Array
			for (var item in mastArr) {
				for (var y = 0; y < tempPlayerArr.length; y++){
					if(mastArr[item] == tempPlayerArr[y].seed){
						tempPlayerArr[y].conference = divisions[divisionTrigger].conference;
						tempPlayerArr[y].mascot = divisions[divisionTrigger].mascot;
						tempPlayerArr[y].primaryColor = divisions[divisionTrigger].primaryColor;
						tempPlayerArr[y].secondaryColor = divisions[divisionTrigger].secondaryColor;
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
				if (divisionCounter % (bracketSpots/4) == 0 && divisionCounter !==0){
					divisionTrigger += 1;
				}
				divisionCounter +=1;
				
			}
			
			/*
			//try adding data to firebase
			const playersRef = Firebase.database().ref('players');
			console.log('seededArray',seededArray);
			for (var p = 0; p < seededArray.length; p++){
				playersRef.push(seededArray[p]);
			}
			*/
			
			//Populate Start Round in Master Game Object
			var sift = 1;
			for (var k = 0; k < seededArray.length; k++){
				if (mode == 'VS'){
					if (k % 2 == 0){
						this.state.masterGameObject[k/2 + 1].playerA = seededArray[k];
						this.state.masterGameObject[k/2 + 1].spotsFilled +=1;
					} else {
						this.state.masterGameObject[(k+1)/2].playerB = seededArray[k];
						this.state.masterGameObject[(k+1)/2].spotsFilled +=1;
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

			//Add titles to games for win rounds
			var gmCounter = 1;
			for (k = 0; k < winRoundsArr.length - 1; k++){
				for (y = 1; y <= winnerArr[k]; y++){
					this.state.masterGameObject[gmCounter].gameTitle = winRoundsArr[k];
					gmCounter += 1;
				}
			}
			
			//Add titles to games for elimination rounds
			for (k = 0; k < elimRoundsArr.length; k++){
				for (y = 1; y <= loserArr[k]; y++){
					this.state.masterGameObject[gmCounter].gameTitle = elimRoundsArr[k];
					gmCounter += 1;
				}
			}
			
			//Add title to Championship 2 Round
			this.state.masterGameObject[gmCounter].gameTitle = winRoundsArr[winRoundsArr.length -1];
			
			
			//Populate rest of games in Master Game Object
			for (var k in this.state.masterGameObject){
			
				this.StartOutcomes(
					this.state.masterGameObject[k].gameNumber,
					bracketSpots,
					this.state.masterGameObject[k].bracket,
					bracketPower,
					mode,
					beginConstruction
				);
				
			}
			GamesDB.set({
				masterGameObject: this.state.masterGameObject,
				gameName: this.props.location.state.gameName,
				mode: mode,
				seeding: this.props.location.state.seeding,
				order: this.props.location.state.order,
				players: this.props.location.state.players,
				seededArray: seededArray,
				timeTrials: "closed"
			});
		}
		
		
		//protect against window reload
		window.onbeforeunload = function() {
		    return "Data will be lost if you leave the page, are you sure?";
		};
		
		beginConstruction = false;
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
				this.UpdateFirebase();
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
	
	UpdateFirebase(){
    	//sendMasterGameArray to Firebase
    	console.log('updateRequested');
		GamesDB.update({
			masterGameObject: JSON.parse( JSON.stringify(this.state.masterGameObject)) ,
			seededArray: JSON.parse( JSON.stringify(seededArray)),
			players: JSON.parse( JSON.stringify(this.state.playersArray)) 
		});
    }

	
	
	render() {
		
		console.log('masterGameObject',this.state.masterGameObject);
		
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

		console.log(winnerBracket);
		
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
		
		
		
		var matchupPlayers = [];
		if (mode == 'VS'){
			matchupPlayers = [this.state.matchupPlayerA,this.state.matchupPlayerB];
		} else {
			matchupPlayers = [this.state.matchupPlayerA,this.state.matchupPlayerB,this.state.matchupPlayerC,this.state.matchupPlayerD];
		}
		
		// create backround rectangles for elimination rounds
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
					y={vizGeo.vertSpace*1.5}
					width={gameWidth + vizGeo.horizSpace}
					height={boardHeight - 3*vizGeo.vertSpace}
					fill={'#FF3B3B'}
					opacity = {0.8*(loserArr.length-(Math.abs(r)-1))/loserArr.length}
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
		for (var w =0; w <=winnerArr.length - 2;w++){
			xLoc = (w+(bracketPower-(mode == 'VS' ? 0 : 1)-1)*2)*(gameWidth+vizGeo.horizSpace) + vizGeo.horizSpace/2;
			if (w !== 0 ){
				winBackgrounds.push(
					<Rect
						x={xLoc}
						width={((mode == 'VS' && w == winnerArr.length) ? 2 : 1)*(gameWidth + vizGeo.horizSpace)}
						height={boardHeight}
						fill={'#8C69CE'}
						opacity = {0.8*Math.abs(w)/winnerArr.length}
					/>
				);
			}
			if(w == 0 ){
				winTextHeader = "ROUND OF " + Math.pow(2,bracketPower-w);
			} else if (w == winnerArr.length-2){
				winTextHeader = "CHAMPIONSHIP";
			} else if (w ==winnerArr.length-3){
				winTextHeader = "SEMI-FINAL";
			} else if (w == winnerArr.length -4){
				winTextHeader = "CONFERENCE FINAL";
			} else if (w == winnerArr.length -5){
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
	var divImgArr = [];
	for (var d = 0 ; d < 4; d++){
		divisionRects.push(
			<Rect
				x={vizGeo.horizSpace/2 + loserArr.length*(gameWidth + vizGeo.horizSpace)}
				y={vizGeo.vertSpace*1.5+ d*(gameHeight+vizGeo.vertSpace)*bracketSpots/(4*(mode=='VS'?2:4))}
				width={(winnerArr.length-2+(mode=='VS'?1:0))*(gameWidth + vizGeo.horizSpace) +vizGeo.horizSpace*(bracketSpots<=8?5:6) + gameWidth/2 }
				height={(gameHeight+vizGeo.vertSpace)*bracketSpots/(4*(mode=='VS'?2:4))}
				fill={d%2==0?'#DFDFDF':"#CACACA"}
				opacity = {0.5}
			/>
		);
		divImgArr.push(
			<DivisionImage
				x = {(loserArr.length+winnerArr.length+(mode=='VS'?1:0))*(gameWidth + vizGeo.horizSpace) +vizGeo.horizSpace*3.5 + gameWidth/2}
				y = {vizGeo.vertSpace*1.5+  d*(gameHeight+vizGeo.vertSpace)*bracketSpots/(4*(mode=='VS'?2:4)) + (gameHeight+vizGeo.vertSpace)*bracketSpots/(4*(mode=='VS'?2:4))/2 - gameHeight*(mode=='VS'?2:1)*(bracketSpots<=8?0.5:1)/2}
				imgHeight = {gameHeight*(mode=='VS'?2:1)*(bracketSpots<=8?0.5:1)}
				img = {'/img/divisions/'+divisions[d]+'.svg'}
				opacity={1.0}
				
			/>
		);
	}
	
	//create conference rects
	var conferenceRects= [];
	for (var w =0; w < 2;w++){
		conferenceRects.push(
			<Rect
				x={vizGeo.horizSpace/2 + (loserArr.length + (winnerArr.length-4))*(gameWidth + vizGeo.horizSpace)}
				y={vizGeo.vertSpace*1.5+ w*(gameHeight+vizGeo.vertSpace)*bracketSpots/(4*(mode=='VS'?1:2))}
				width={(gameWidth + vizGeo.horizSpace) }
				height={(gameHeight+vizGeo.vertSpace)*bracketSpots/(4*(mode=='VS'?1:2))}
				fill={w%2==0?'#CBCBCB':"#B7B7B7"}
				opacity = {1}
			/>
		);
	}
	
	//create finals rect
	var finalsRect= [];
	finalsRect.push(
		<Rect
			x={vizGeo.horizSpace/2 + (loserArr.length + (winnerArr.length-3))*(gameWidth + vizGeo.horizSpace)}
			y={vizGeo.vertSpace*1.5}
			width={((mode=='VS'?3:2))*(gameWidth + vizGeo.horizSpace) }
			height={(gameHeight+vizGeo.vertSpace)*bracketSpots/(2*(mode=='VS'?1:2))}
			fill={'#A3A3A3'}
			opacity = {1}
		/>
	);

	
	
	//Determine median time
	var tempAvgTime = [];
	var half;
	var allAvgTime = 0;
	for (var a = 0; a < seededArray.length ; a++){
		if(seededArray[a].avgTime!== '-' && seededArray[a].avgTime!== 0 && seededArray[a].avgTime!== null){
			tempAvgTime.push(seededArray[a].avgTime);
		}
	}
	tempAvgTime.sort( function(a,b) {return a - b;} );
	half = Math.floor(tempAvgTime.length/2);
	if(tempAvgTime.length % 2 ==0){
		allAvgTime = tempAvgTime[half-1];
	} else {
		allAvgTime = tempAvgTime[half];
	}
	
	var chartTitle = this.ChartTitle(this.state.chartDisplay,allAvgTime);

		
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
						allAvgTime = {allAvgTime}
						updateFirebase = {this.UpdateFirebase.bind(this)}
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
							{conferenceRects.map(element => element)}
							{finalsRect.map(element => element)}
							{/*winBackgrounds.map(element => element)*/}
							{bezArr.map(element => element)}
							{loserBracket.map(element => element)}
							{winnerBracket.map(element => element)}
							{finalsBracket.map(element => element)}
							{elimText.map(element => element)}
							{winText.map(element => element)}
							{divImgArr.map(element => element)}
							
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
					    	allAvgTime = {allAvgTime}
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
							<Button title='Median Time Split' clickHandle={this.handleStatButtonClick.bind(this)}/>
							{mode=='VS'?null:<Button title='Avg Place' clickHandle={this.handleStatButtonClick.bind(this)}/>}
						</div>
					</div>
				</div>
			</div>
		);
	}
}