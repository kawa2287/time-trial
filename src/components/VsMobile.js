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


var mode;
var divisions=[];

var beginConstruction = true;

export default class VsMobile extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			masterGameObject:{},
			playerA:null,
			playerB:null,
			playerC:null,
			playerD:null,
			gameTitle:null,
			gameNumber:null,
			render:'Stats',
			connection: 'Disconnected',
			seededArray: [],
			playersArray: []
			
		};
		
		// set settings
		mode = this.props.location.state.mode;
		Settings.seedMode = this.props.location.state.seeding; 
		loadGame = this.props.location.state.load;
		
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
		Settings.bracketSpots = bracketSpots;
		Settings.bracketPower = bracketPower;
		Settings.nPlayers = teams;

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

		//protect against window reload
		window.onbeforeunload = function() {
		    return "Data will be lost if you leave the page, are you sure?";
		};
		
		if(loadGame == true){
			//setState with Firebase
			var ref = Firebase.database().ref(this.props.location.state.gameName);
			ref.on("value", (snapshot) => {
				console.log('snapshot',snapshot.val());
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
			//popluate players array
			this.state.playersArray = this.props.location.state.players;
			
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
				this.state.seededArray = shuffle(this.state.seededArray);
				for (var q = 0; q < tempPlayerArr.length; q++){
					tempPlayerArr[q].seed = q+1;
				}
			}
			
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
						this.state.seededArray.push(tempPlayerArr[y]);
						toggle = 1;
					} 
				}
				if (toggle == 0){
					this.state.seededArray.push({
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
			for (var k = 0; k < this.state.seededArray.length; k++){
				if (mode == 'VS'){
					if (k % 2 == 0){
						this.state.masterGameObject[k/2 + 1].playerA = this.state.seededArray[k];
						this.state.masterGameObject[k/2 + 1].spotsFilled +=1;
					} else {
						this.state.masterGameObject[(k+1)/2].playerB = this.state.seededArray[k];
						this.state.masterGameObject[(k+1)/2].spotsFilled +=1;
					}
					
				} else {
					if(sift == 1){
						this.state.masterGameObject[Math.ceil((k+1)/4)].playerA = this.state.seededArray[k];
						sift = sift + 1;
					} else if (sift == 2) {
						this.state.masterGameObject[Math.ceil((k+1)/4)].playerB = this.state.seededArray[k];
						sift = sift + 1;
					} else if (sift == 3) {
						this.state.masterGameObject[Math.ceil((k+1)/4)].playerC = this.state.seededArray[k];
						sift = sift + 1;
					} else {
						this.state.masterGameObject[Math.ceil((k+1)/4)].playerD = this.state.seededArray[k];
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
				seededArray: this.state.seededArray,
				timeTrials: "closed"
			});
		}
		
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
		
		beginConstruction = false;
		
	}
	
	
	//  MATCHUP FOR VS  //
	ShowMatchup (playerA,playerB,gameTitle,gameNumber,mode, playerC, playerD) {
		
		if (mode == 'VS'){
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
		} else {
			//Code for 4P
			var WLtempPkg = CheckIfBye(playerA,playerB,playerC,playerD);
			
			if(WLtempPkg.byeRound == true){
				this.HandleSubmit(gameNumber, WLtempPkg.winner1,WLtempPkg.loser1,true,WLtempPkg.winner2,WLtempPkg.loser2);
			}else{
				this.setState({
					playerA:playerA,
					playerB:playerB,
					playerC:playerC,
					playerD:playerD,
					gameTitle:gameTitle,
					gameNumber:gameNumber
				}, function callBack(){
					this.customDialog.show();
				});
			}
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
            			players={this.state.playersArray}
            			masterGameObject={this.state.masterGameObject}
            		/>
        		);
    		case 'Bracket': 
            	return (
            		<BracketReceiver
            			masterGameObject={this.state.masterGameObject}
            			roundNamesArray = {roundNamesArray}
            			cleanRoundNamesArray = {cleanRoundNamesArray}
            			startValue = {loserArr.length}
            			bracketSpots = {bracketSpots}
            			showMatchup = {this.ShowMatchup.bind(this)}
            			mode = {mode}
            		/>
        		);
        }
    }
    
    UpdateFirebase(){
    	//sendMasterGameArray to Firebase
    	console.log("seededArray before update",this.state.seededArray);
    	console.log("playersArray before update",this.state.playersArray);
		GamesDB.update({
			masterGameObject: JSON.parse( JSON.stringify(this.state.masterGameObject)) ,
			seededArray: JSON.parse( JSON.stringify(this.state.seededArray)) ,
			players: JSON.parse( JSON.stringify(this.state.playersArray)) 
			
		});
    }
	
	
	
	//  UPDATE FOR 4P MODE //
	HandleSubmit(gameNumber,winner,loser,byeRound, winner2, loser2){
		var WLpkg = {
			gameNumber : gameNumber,
			bracketSpots : bracketSpots,
			mode : mode,
			winner1 : winner,
			loser1 : loser,
			byeRound : byeRound,
			winner2 : winner2,
			loser2 : loser2
		};
		
		var RTpkg = {
			winner1time : 0,
			loser1time : 0
		};
		
		this.setState({
			playerA:null,
			playerB:null,
			playerC:null,
			playerD:null,
			gameTitle:null,
			winner:null,
			loser:null,
			gameNumber:null
		},function hide() {
			this.customDialog.hide();
			this.WinnerLoserHandler(WLpkg,RTpkg);
			this.UpdateFirebase();
			this.forceUpdate();
		});
		
	}
	
	// UPDATE FOR 4P MODE //
	HandleCancel(){
		
		this.setState({
			playerA:null,
			playerB:null,
			playerC:null,
			playerD:null,
			gameTitle:null,
			winner:null,
			loser:null,
			gameNumber:null
		},function hide() {
			this.customDialog.hide();
		});
	}
	
	render() {
		
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
		    			playerC={this.state.playerC}
		    			playerD={this.state.playerD}
		    			gameTitle={this.state.gameTitle}
		    			HandleSubmit={this.HandleSubmit.bind(this)}
		    			HandleCancel={this.HandleCancel.bind(this)}
		    			gameNumber={this.state.gameNumber}
		    			mode = {mode}
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
    var randIndex = keys.length * Math.random() << 0;
    return obj[keys[randIndex]];
}

function selectUnique(prop, obj){
	var tempProp = pickRandomProperty(obj);
	if (tempProp!== prop){
		return tempProp;
	} else {
		return selectUnique(prop,obj);
	}
}

function CheckIfBye(pA,pB,pC,pD){
	
	var pAcode = pA.name == 'BYE' ? 1 : 0;
	var pBcode = pB.name == 'BYE' ? 1 : 0;
	var pCcode = pC.name == 'BYE' ? 1 : 0;
	var pDcode = pD.name == 'BYE' ? 1 : 0;
	
	var WLpkg ={
		winner1:null,
		winner2:null,
		loser1:null,
		loser2:null
	};
	
	var WLcode = pAcode.toString()+pBcode.toString()+pCcode.toString()+pDcode.toString();
	// decide winner or loser if (2) or more BYEs present
	switch(WLcode){
		case '1100' :
			WLpkg.winner1 = pC;
			WLpkg.winner2 = pD;
			WLpkg.loser1 = pA;
			WLpkg.loser2 = pB;
			WLpkg.byeRound = true;
			break;
		case '1010' :
			WLpkg.winner1 = pB;
			WLpkg.winner2 = pD;
			WLpkg.loser1 = pA;
			WLpkg.loser2 = pC;
			WLpkg.byeRound = true;
			break;
		case '1001' :
			WLpkg.winner1 = pB;
			WLpkg.winner2 = pC;
			WLpkg.loser1 = pA;
			WLpkg.loser2 = pD;
			WLpkg.byeRound = true;
			break;
		case '0110' :
			WLpkg.winner1 = pA;
			WLpkg.winner2 = pD;
			WLpkg.loser1 = pB;
			WLpkg.loser2 = pC;
			WLpkg.byeRound = true;
			break;
		case '0101' :
			WLpkg.winner1 = pA;
			WLpkg.winner2 = pC;
			WLpkg.loser1 = pB;
			WLpkg.loser2 = pD;
			WLpkg.byeRound = true;
			break;
		case '0011' :
			WLpkg.winner1 = pA;
			WLpkg.winner2 = pB;
			WLpkg.loser1 = pC;
			WLpkg.loser2 = pD;
			WLpkg.byeRound = true;
			break;
		case '0111' :
			WLpkg.winner1 = pA;
			WLpkg.winner2 = pB;
			WLpkg.loser1 = pC;
			WLpkg.loser2 = pD;
			WLpkg.byeRound = true;
			break;
		case '1011' :
			WLpkg.winner1 = pB;
			WLpkg.winner2 = pA;
			WLpkg.loser1 = pC;
			WLpkg.loser2 = pD;
			WLpkg.byeRound = true;
			break;
		case '1101' :
			WLpkg.winner1 = pC;
			WLpkg.winner2 = pB;
			WLpkg.loser1 = pA;
			WLpkg.loser2 = pD;
			WLpkg.byeRound = true;
			break;
		case '1110' :
			WLpkg.winner1 = pD;
			WLpkg.winner2 = pB;
			WLpkg.loser1 = pC;
			WLpkg.loser2 = pA;
			WLpkg.byeRound = true;
			break;
		case '1111' :
			WLpkg.winner1 = pA;
			WLpkg.winner2 = pB;
			WLpkg.loser1 = pC;
			WLpkg.loser2 = pD;
			WLpkg.byeRound = true;
			break;
	}
	return WLpkg;
}