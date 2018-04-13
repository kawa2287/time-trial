'use strict';

import React from 'react';
import BezierCurves from './BezierCurves';
import GameComponent from './GameComponent';
import CountryKeyVal from './CountryKeyVal';
import { Stage, Group, Layer, Line } from "react-konva";



export default class VsTournament extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			masterGameObject:{}
		};
		
		var teams = Object.keys(this.props.location.state.players).length;
		var mastArr = [];
		var seededArray = [];
		var toggle = 0;
		var bracketSpots = Math.pow(2,this.DetermineBracketPower(teams));
		
		
		//populate seeded array
		this.PropogateSeedsArr(teams,mastArr);
		
		//Create Master Game Object
		var nGamesTotal = bracketSpots*2-1;
		for(var game = 1; game <= nGamesTotal; game++){
			this.state.masterGameObject[game] = {
				gameNumber : game,
				playerA:{
					name : '',
				    country : '',
				    seed : '',
				    timeTrial : '',
				    wins : 0,
				    losses : 0,
				    totalTime : 0,
				    avgTime : 0,
				    splitTIme : 0
				},
				playerB:{
					name : '',
				    country : '',
				    seed : '',
				    timeTrial : '',
				    wins : 0,
				    losses : 0,
				    totalTime : 0,
				    avgTime : 0,
				    splitTIme : 0
				},
				bracket : this.DetermineBracket(game,bracketSpots),
				spotsFilled : 0  //hack
			};
		}
		
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
				    splitTIme : 0
					});
			}
			toggle = 0;
		}
		
		//Populate Start Round in Master Game Object
		for (var k = 0; k < seededArray.length; k++){
			if (k % 2 == 0){
				this.state.masterGameObject[k/2 + 1].playerA = seededArray[k];
			} else {
				this.state.masterGameObject[(k+1)/2].playerB = seededArray[k];
			}
		}
		
	}
	
	DetermineBracketPower (nTeams) {
		var bracketPower = 0;
		for (var i = 0; i < nTeams; i++){
			if (Number(nTeams) <= Math.pow(2,i)){
				bracketPower = i;
				return bracketPower;
			}
		}
		return bracketPower;
	}
	
	NgmsInRndLBrkt(bracketSpots,curRnd){
		if(curRnd % 2 == 0){
			return bracketSpots/(2*Math.pow(2,curRnd/2));
		} else {
			return bracketSpots/(2*Math.pow(2,(curRnd+1)/2));
		}
	}
	
	NgmsInRndWBrkt(bracketSpots,curRnd){
		return bracketSpots/(2*Math.pow(2,curRnd));
	}
	
	DetermineRoundNumber (currentGameNum, nTeams, bracketLocation){
		var maxGameNumInRnd = 0;
		if(bracketLocation == 'loserBracket'){
			var nLoserRnds = 2*(this.DetermineBracketPower(nTeams) - 1);
			for (var i= 1; i<= nLoserRnds; i++){
				var x = Number(i) % 2 != 0 ? Number(i)-1 : Number(i)-2;
				var k = (nLoserRnds - x)/2;
				maxGameNumInRnd = Number(i) % 2 == 0 ? nTeams - Math.pow(2,k) : nTeams - 1.5*Math.pow(2,k);
				if(currentGameNum - nTeams <= maxGameNumInRnd){
					return i;
				}
			}
		} else {
			var nWinnerRnds = this.DetermineBracketPower(nTeams);
			for (var i=0; i<= nWinnerRnds; i++){
				maxGameNumInRnd = nTeams/(2*Math.pow(2,i));
				if(currentGameNum <= nTeams- maxGameNumInRnd){
					return i;
				} 
			}
		}
	}
	
	GetRootVal (arr){
		if (Array.isArray(arr)){
			return this.GetRootVal(arr[0]);
		} else {
			return arr;
		}
	}
	
	PropogateSeedsArr(nTeams, mastArr){
		var baseArr = [];
		var nextOrderArr = [];
		var bracketPower = this.DetermineBracketPower(nTeams);

		for (var order = 1; order <= bracketPower; order++){
			var eq = Math.pow(2,bracketPower-order+1)+1;
			for (var i = 1; i <= Math.pow(2,bracketPower)/Math.pow(2,order); i++){
				if (order == 1){
					baseArr.push([i,eq - i]);
					nextOrderArr = baseArr;
				} else {
					for (var item in baseArr){
						if(eq - this.GetRootVal(baseArr[i-1]) == this.GetRootVal(baseArr[item])) {
							nextOrderArr.push([baseArr[i-1],baseArr[item]]);
						}
					}
				}
			}
			if(order == bracketPower){
				return this.PopMastArr(nextOrderArr, mastArr, nTeams);
			} else {
				baseArr = nextOrderArr;
				nextOrderArr = [];
			}
		}
	}
	
	PopMastArr(arr, mastArr, nTeams){
		mastArr = mastArr || [];
		for (var item in arr){
			if(Array.isArray(arr[item])){
				this.PopMastArr(arr[item], mastArr, nTeams);
			} else {
				mastArr.push(arr[item]);
			}
		}
		return mastArr;
	}
	
	DetermineBracket (gameNumber,bracketSpots){
		if(gameNumber <= bracketSpots/2){
			return 'startBracket';
		} else if (gameNumber < bracketSpots && gameNumber > bracketSpots/2){
			return 'winnerBracket';
		} else if (gameNumber > bracketSpots && gameNumber <= 2*(bracketSpots-1)){
			return 'loserBracket';
		} else {
			return 'specialBracket';
		}
	}

	WinnerLoserHandler (currentGameNum, bracketSpots, winPlayer, losePlayer, currentBracket){
		var roundNumber = this.DetermineRoundNumber(currentGameNum, bracketSpots, currentBracket);
		//Handle based on bracket Location
		if (currentBracket == "startBracket"){
			this.SendWinnerWinBracket(currentGameNum, roundNumber, winPlayer, bracketSpots);
			this.SendLoserStartBracket(currentGameNum, losePlayer, bracketSpots);
		} else if (currentBracket == "winnerBracket"){
			this.SendWinnerWinBracket(currentGameNum, roundNumber, winPlayer, bracketSpots);
			this.SendLoserWinBracket(currentGameNum, roundNumber,losePlayer, bracketSpots);
		} else {
			this.SendWinnerLoseBracket(currentGameNum, roundNumber, winPlayer, bracketSpots);
		}
	}
	
	SendWinnerWinBracket(currentGameNum, roundNumber, winPlayer, bracketSpots){
		//winner bracket path
		var destGame = 0.5*((currentGameNum % 2 ==0 ? currentGameNum : currentGameNum+1)+bracketSpots);
		var topGame = (destGame * 2 - bracketSpots) - 1;
		var botGame = (destGame * 2 - bracketSpots);


		if (currentGameNum == topGame){
			this.setState({
        	masterGameObject : {
	        		...this.state.masterGameObject,
	        		[destGame] : {
	        			...this.state.masterGameObject[destGame],
	        			playerA : winPlayer
	        		}
	        	}
	        });
		} else if(currentGameNum == botGame) {
			this.setState({
        	masterGameObject : {
	        		...this.state.masterGameObject,
	        		[destGame] : {
	        			...this.state.masterGameObject[destGame],
	        			playerB : winPlayer
	        		}
	        	}
	        });
		}
	}

	SendWinnerLoseBracket(currentGameNum, roundNumber,winPlayer, bracketSpots){
		var destGame;
		if (roundNumber % 2 == 0) {
			destGame = (currentGameNum % 2 == 0 ? currentGameNum : currentGameNum + 1)*0.5 + bracketSpots - this.NgmsInRndLBrkt(bracketSpots,roundNumber)/2;
		} else {
			destGame = currentGameNum + this.NgmsInRndLBrkt(bracketSpots,roundNumber);
		}
		console.log(destGame);

		var topGame;
		var botGame;
		var destGameRnd = this.DetermineRoundNumber(destGame,bracketSpots,"loserBracket");

		if (destGameRnd % 2 == 0){
			topGame = destGame - this.NgmsInRndLBrkt(bracketSpots,destGameRnd);
			botGame = destGame + this.NgmsInRndLBrkt(bracketSpots,destGameRnd) - bracketSpots;
		} else {
			topGame = 2 * (destGame - bracketSpots + this.NgmsInRndLBrkt(bracketSpots,destGameRnd)) - 1;
			botGame = 2 * (destGame - bracketSpots + this.NgmsInRndLBrkt(bracketSpots,destGameRnd));
		}

		if (currentGameNum == topGame){
			this.setState({
        	masterGameObject : {
	        		...this.state.masterGameObject,
	        		[destGame] : {
	        			...this.state.masterGameObject[destGame],
	        			playerA : winPlayer
	        		}
	        	}
	        });
		} else if(currentGameNum == botGame) {
			this.setState({
        	masterGameObject : {
	        		...this.state.masterGameObject,
	        		[destGame] : {
	        			...this.state.masterGameObject[destGame],
	        			playerB : winPlayer
	        		}
	        	}
	        });
		}
	}

	SendLoserWinBracket(currentGameNum, roundNumber,losePlayer, bracketSpots){
		var destGame = currentGameNum + bracketSpots - this.NgmsInRndWBrkt(bracketSpots, roundNumber);
		var destGameRnd = this.DetermineRoundNumber(destGame,bracketSpots,"loserBracket");
		var topGame;
		var botGame;

		if (destGameRnd % 2 == 0){
			topGame = destGame - this.NgmsInRndLBrkt(bracketSpots,destGameRnd);
			botGame = destGame + this.NgmsInRndLBrkt(bracketSpots,destGameRnd) - bracketSpots;
		} else {
			topGame = 2 * (destGame - bracketSpots + this.NgmsInRndLBrkt(bracketSpots,destGameRnd)) - 1;
			botGame = 2 * (destGame - bracketSpots + this.NgmsInRndLBrkt(bracketSpots,destGameRnd));
		}

		if (currentGameNum == topGame){
			this.setState({
        	masterGameObject : {
	        		...this.state.masterGameObject,
	        		[destGame] : {
	        			...this.state.masterGameObject[destGame],
	        			playerA : losePlayer
	        		}
	        	}
	        });
		} else if(currentGameNum == botGame) {
			this.setState({
        	masterGameObject : {
	        		...this.state.masterGameObject,
	        		[destGame] : {
	        			...this.state.masterGameObject[destGame],
	        			playerB : losePlayer
	        		}
	        	}
	        });
		}
	}

	SendLoserStartBracket(currentGameNum, losePlayer, bracketSpots){
		var destGame = 0.5*(currentGameNum % 2 ==0 ? currentGameNum : currentGameNum+1)+bracketSpots;
		var topGame = 2 * (destGame - bracketSpots) - 1;
		var botGame = 2 * (destGame - bracketSpots);

		if (currentGameNum == topGame){
			this.setState({
        	masterGameObject : {
	        		...this.state.masterGameObject,
	        		[destGame] : {
	        			...this.state.masterGameObject[destGame],
	        			playerA : losePlayer
	        		}
	        	}
	        });
		} else if(currentGameNum == botGame) {
			this.setState({
        	masterGameObject : {
	        		...this.state.masterGameObject,
	        		[destGame] : {
	        			...this.state.masterGameObject[destGame],
	        			playerB : losePlayer
	        		}
	        	}
	        });
		}		
	}

	render() {
		//------------------------------------------------------------------
		//declare geometries here
		//------------------------------------------------------------------
		var vizGeo = {
			teamHeight : 48,
			teamWidth : 300,
			horizSpace : 96,
			vertSpace : 84
		};
		
		//------------------------------------------------------------------
		//this.props.location.state.'GIVEN NAME' to access props thru Link
		//------------------------------------------------------------------
		var k = 0;
		var teams = Object.keys(this.props.location.state.players).length;
		var bracketSpots = Math.pow(2,this.DetermineBracketPower(teams));
		var bracketPower = this.DetermineBracketPower(teams);
		var gameWidth = vizGeo.teamWidth + 2*vizGeo.teamHeight;
		var gameHeight = vizGeo.teamHeight*3.5;
		var boardHeight = vizGeo.vertSpace*(3+(bracketSpots/2)) + bracketSpots*gameHeight/2;
		
		//create loserArr
		var LoserArr = [];
		for (k = 1; k <= 2*(bracketPower-1); k++){
			LoserArr.push(this.NgmsInRndLBrkt(bracketSpots,k));
		}
		//create winnerArr
		var winnerArr = [];
		for (k = 0; k < bracketPower; k++){
			winnerArr.push(this.NgmsInRndWBrkt(bracketSpots,k));
		}
		
		//create Games in Winner Bracket (includes start round)
		var winnerBracket = [];
		var bezArr = [];
		var gameCounter = 1;
		
		for (k = 0; k < winnerArr.length; k++){
			for(var i = 0; i < winnerArr[k]; i++){
				
				var moduleCCht = (gameHeight+vizGeo.vertSpace)*Math.pow(2,k);		
				var halfModuleHeight = ((gameHeight+vizGeo.vertSpace)*(Math.pow(2,k))-vizGeo.vertSpace)/2;
				var xLoc = (k+(bracketPower-1)*2)*(gameWidth+vizGeo.horizSpace) + vizGeo.horizSpace;
				var yLoc = boardHeight-(winnerArr[k]-i)*(gameHeight+vizGeo.vertSpace)*(Math.pow(2,k)) - vizGeo.vertSpace + halfModuleHeight - gameHeight/2;
				
				winnerBracket.push(
					<GameComponent
						playerA = {this.state.masterGameObject[gameCounter].playerA}
						playerB = {this.state.masterGameObject[gameCounter].playerB}
						gameNumber = {this.state.masterGameObject[gameCounter].gameNumber}
						bracket = {this.state.masterGameObject[gameCounter].bracket}
						WinnerLoserHandler = {this.WinnerLoserHandler.bind(this)}
						bracketSpots = {bracketSpots}
						vizGeo = {vizGeo}
						x = {xLoc}
						y = {yLoc}
					/>
				);
				
				var ye = i % 2 == 0 ? yLoc + (gameHeight + moduleCCht)/2 : yLoc + (gameHeight - moduleCCht)/2;
				
				if(k == winnerArr.length -1 && i == winnerArr[k]-1){
					ye = yLoc + gameHeight/2;
				}
				
				//push in loser side at same time for start round
				if(k==0){
					bezArr.push(
						<BezierCurves
							xs = {xLoc}
							ys = {yLoc + gameHeight/2}
							xe = {xLoc - vizGeo.horizSpace}
							ye = {ye}
							bracket = {this.state.masterGameObject[gameCounter].bracket + (k%2 == 0?'':2)}
						/>
					);
				}
				
				bezArr.push(
					<BezierCurves
						xs = {xLoc + gameWidth}
						ys = {yLoc + gameHeight/2}
						xe = {xLoc + gameWidth + vizGeo.horizSpace}
						ye = {ye}
						bracket = {this.state.masterGameObject[gameCounter].bracket}
					/>
				);
				gameCounter = gameCounter + 1;
			}
		}
		
		//create Special Bracket for Winners
		winnerBracket.push(
			<GameComponent
				playerA = {this.state.masterGameObject[gameCounter].playerA}
				playerB = {this.state.masterGameObject[gameCounter].playerB}
				gameNumber = {this.state.masterGameObject[gameCounter].gameNumber}
				bracket = {this.state.masterGameObject[gameCounter].bracket}
				WinnerLoserHandler = {this.WinnerLoserHandler.bind(this)}
				bracketSpots = {bracketSpots}
				vizGeo = {vizGeo}
				x = {(winnerArr.length+(bracketPower-1)*2)*(gameWidth+vizGeo.horizSpace) + vizGeo.horizSpace}
				y = {(boardHeight-gameHeight)/2}
			/>
		);
		gameCounter = gameCounter + 1;
		
		//create Games in Losers Bracket
		var loserBracket = [];
		
		for (k = 0; k < LoserArr.length; k++){
			for( i = 0; i < LoserArr[k]; i++){
				
				moduleCCht = (gameHeight+vizGeo.vertSpace)*Math.pow(2,k%2==0?(k/2)+1:(k+1)/2);
				xLoc = ((bracketPower-1)*2)*vizGeo.horizSpace + (((bracketPower-1)*2)-1)*gameWidth - k*(gameWidth+vizGeo.horizSpace);
				yLoc = boardHeight-(LoserArr[k]-i)*(gameHeight+vizGeo.vertSpace)*(Math.pow(2,(k%2==0?(k/2)+1:(k+1)/2))) - vizGeo.vertSpace + ((gameHeight+vizGeo.vertSpace)*(Math.pow(2,(k%2==0?(k/2)+1:(k+1)/2)))-vizGeo.vertSpace)/2 - gameHeight/2;
				console.log('moduleCCht' + moduleCCht);
				
						
				loserBracket.push(
					<GameComponent
						playerA = {this.state.masterGameObject[gameCounter].playerA}
						playerB = {this.state.masterGameObject[gameCounter].playerB}
						gameNumber = {this.state.masterGameObject[gameCounter].gameNumber}
						bracket = {this.state.masterGameObject[gameCounter].bracket}
						WinnerLoserHandler = {this.WinnerLoserHandler.bind(this)}
						bracketSpots = {bracketSpots}
						vizGeo = {vizGeo}
						x = {xLoc}
						y = {yLoc}
					/>
				);
				
				ye = i % 2 == 0 ? yLoc + (gameHeight + moduleCCht)/2 : yLoc + (gameHeight - moduleCCht)/2;
				
				if(k%2 ==0 ){
					ye = yLoc + gameHeight/2;
				}
				
				bezArr.push(
					<BezierCurves
						xs = {xLoc}
						ys = {yLoc + gameHeight/2}
						xe = {xLoc - vizGeo.horizSpace}
						ye = {ye}
						bracket = {this.state.masterGameObject[gameCounter].bracket + (k%2 == 0?'':2)}
					/>
				); 
				gameCounter = gameCounter + 1;
			}
		}
		
		
		return (
			<Stage width={window.innerWidth} height={window.innerHeight} draggable={true}>
				<Layer>
					<Group>
						{loserBracket.map(element => element)}
						{winnerBracket.map(element => element)}
						{bezArr.map(element => element)}
					</Group>
				</Layer>
			</Stage>
		);
	}
}