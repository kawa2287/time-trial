'use strict';

import React from 'react';
import SkyLight from 'react-skylight';
import Colors from '../static/Colors';
import divisionNames from '../data/divisionNames';
import Firebase from '../firebase';
import GameListReceiver from './GameListReceiver';
import StatsMobileReceiver from './StatsMobileReceiver';
import BracketReceiver from './BracketReceiver';
import MobileMatchup from './MobileMatchup';

import Settings from '../static/Settings';
import PropogateSeedsArr from './vsBracketMethods/higherOrderMethods/PropogateSeedsArr';
import CreateMasterGameObject from './vsBracketMethods/higherOrderMethods/CreateMasterGameObject';

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

//------------------------------------------------------------------
//declare geometries here
//------------------------------------------------------------------
var vizGeo = {
	lColAr: []
};

var addTeamDialog = {
    backgroundColor: '#303030',
    color: '#494949',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0%',
    left: '50%',
    marginTop: '0px',
    marginLeft: '-50%',
    padding: '0px'
};

var closeButtonStyle ={
	fontSize: '0em'
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


export default class VsMobile extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			masterGameObject:{},
			playerA:null,
			playerB:null,
			gameTitle:null,
			gameNumber:null,
			render:'Stats',
			connection: 'Disconnected'
		};
		
		// set settings
		mode = this.props.location.state.mode;
		Settings.seedMode = this.props.location.state.seeding; 
		
		// init colors
		for (var c = 0; c <30; c++){
			vizGeo.lColAr.push("#"+((1<<24)*Math.random()|0).toString(16));
		}
		
		/////DATABASE/////
		GamesDB = Firebase.database().ref(this.props.location.state.gameName);
		
		var connectedRef = Firebase.database().ref(".info/connected");
		connectedRef.on('value', (connectedSnap) => {
		    if (connectedSnap.val() === true) {
		    	this.setState({connection : 'Connected!'});
		    } else {
				this.setState({connection : 'Disconnected'});
		    }
		});
	
		
		//bind imported state dependent functions
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
		
		teams = Object.keys(this.props.location.state.players).length;
		bracketSpots = Math.pow(2,DetermineBracketPower(teams));
		bracketPower = DetermineBracketPower(teams);
		nGamesTotal = bracketSpots*2 * (mode == 'VS' ? 1 : 0.5)-1;

		var toggle = 0;
		
		//create loserArr
		for (k = 1; k <= 2*(bracketPower-(mode == 'VS' ? 0 : 1)-1); k++){
			loserArr.push(NgmsInRnd.loserBracket(bracketSpots,k,mode));
			elimRoundsArr.push('Elimination Round '+ k);
		}
		
		//create winnerArr
		var winRounds = bracketPower+(mode == 'VS' ? 1 : 0);
		for (k = 0; k <= winRounds; k++){
			winnerArr.push(Math.ceil(NgmsInRnd.winnerBracket(bracketSpots,k,mode)));  //ceil feels like a hack
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
		divisions = [div1,div2,div3,div4];
	
	
			
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
			if (divisionCounter % (bracketSpots/4) == 0 && divisionCounter !==0){
				divisionTrigger += 1;
			}
			divisionCounter +=1;
			
		}
		
		
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
		
		//combine array names into one array to pass to Bracket Receiver
		elimRoundsArr.reverse();
		tempRoundNamesArray = elimRoundsArr.concat(winRoundsArr);
		
		for (var i = 0; i < tempRoundNamesArray.length; i++){
			roundNamesArray.push(
				<h1 key={i} className="brHeading">
					{tempRoundNamesArray[i]}
				</h1>
			);
			cleanRoundNamesArray.push(tempRoundNamesArray[i]);
		}
		
		
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
		

		//protect against window reload
		window.onbeforeunload = function() {
		    return "Data will be lost if you leave the page, are you sure?";
		};
		
		beginConstruction = false;
		GamesDB.set({
			masterGameObject: this.state.masterGameObject,
			gameName: this.props.location.state.gameName,
			mode: mode,
			seeding: this.props.location.state.seeding,
			order: this.props.location.state.order,
			players: this.props.location.state.players,
			seededArray: seededArray
		});
		
	}
	
	ShowMatchup (playerA,playerB,gameTitle,gameNumber) {
		
		if (playerA.name=='BYE' && playerB.name == 'BYE'){
			this.HandleSubmit(gameNumber,playerA,playerB,true);
		} else if (playerA.name == 'BYE'){
			this.HandleSubmit(gameNumber,playerB,playerA,true);
		} else if (playerB.name == 'BYE'){
			this.HandleSubmit(gameNumber,playerA,playerB,true);
		}else{
			this.setState({
				playerA:playerA,
				playerB:playerB,
				gameTitle:gameTitle,
				gameNumber:gameNumber
			}, function callBack(){
				this.customDialog.show();
				var elementA = document.getElementById("pAspan");
				var elementB = document.getElementById("pBspan");
				elementA.style.animation= 'none';
				elementB.style.animation= 'none';
				elementA.offsetHeight;
				elementB.offsetHeight;
				elementA.style.animation= null;
				elementB.style.animation= null;
			});
		}
	}
	
	HandleRender(compName,e){
		this.setState({render:compName});
	}
	
	RenderSubComp(){
        switch(this.state.render){
            case 'GameList': 
            	return (
            		<GameListReceiver
            			masterGameObject={this.state.masterGameObject}
            			ShowMatchup={this.ShowMatchup.bind(this)}
            		/>
        		);
    		case 'Stats': 
            	return (
            		<StatsMobileReceiver
            			seededArray={seededArray}
            		/>
        		);
    		case 'Bracket': 
            	return (
            		<BracketReceiver
            			masterGameObject={this.state.masterGameObject}
            			roundNamesArray = {roundNamesArray}
            			cleanRoundNamesArray = {cleanRoundNamesArray}
            			startValue = {loserArr.length}
            			height = {bracketSpots/2*120}
            		/>
        		);
        }
    }
	
	
	HandleSubmit(gameNumber,winner,loser,byeRound){
		var WLpkg = {
			gameNumber : gameNumber,
			bracketSpots : bracketSpots,
			mode : mode,
			winner1 : winner,
			loser1 : loser,
			byeRound : byeRound,
		};
		
		var RTpkg = {
			winner1time : 0,
			loser1time : 0
		};
		
		this.setState({
			playerA:null,
			playerB:null,
			gameTitle:null,
			winner:null,
			loser:null,
			gameNumber:null
		},function hide() {
			this.customDialog.hide();
			this.WinnerLoserHandler(WLpkg,RTpkg);
			this.forceUpdate();
		});
		
	}
	
	HandleCancel(){
		
		this.setState({
			playerA:null,
			playerB:null,
			gameTitle:null,
			winner:null,
			loser:null,
			gameNumber:null
		},function hide() {
			this.customDialog.hide();
		});
		
	}
	
	

	render() {
		
		//sendMasterGameArray to Firebase
		GamesDB.update({
			masterGameObject: JSON.parse( JSON.stringify(this.state.masterGameObject)) ,
			seededArray: JSON.parse( JSON.stringify(seededArray))
		});
		
		
		return (
			<div className="moblieMainContainer">
				<SkyLight 
			    	closeButtonStyle={closeButtonStyle}
			    	dialogStyles={addTeamDialog} hideOnOverlayClicked 
			    	ref={ref => this.customDialog = ref} 
		    	>
		    		<MobileMatchup
		    			playerA={this.state.playerA}
		    			playerB={this.state.playerB}
		    			gameTitle={this.state.gameTitle}
		    			HandleSubmit={this.HandleSubmit.bind(this)}
		    			HandleCancel={this.HandleCancel.bind(this)}
		    			gameNumber={this.state.gameNumber}
		    		/>
			    </SkyLight>
			    <h2> {this.state.connection}</h2>
				
				<div className="mobileMid">
					{this.RenderSubComp()}
				</div>
				<div className="mobileBotBand">
					<div className="mmButtonContainer">
						<div 
							className="mmButton" 
							onClick={this.HandleRender.bind(this,'GameList')}
						>
							Game List
						</div>
						<div 
							className="mmButton" 
							onClick={this.HandleRender.bind(this,'Stats')}
						>
							Stats
						</div>
						<div 
							className="mmButton" 
							onClick={this.HandleRender.bind(this,'Bracket')}
						>
							Bracket
						</div>
					</div>
				</div>
			</div>
		);
	}
}