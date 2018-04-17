'use strict';

import React from 'react';
import BezierCurves from './BezierCurves';
import GameComponent from './GameComponent';
import BracketLine from './BracketLine';
import VsMatchup from './VsMatchup';
import PropogateSeedsArr from './vsBracketMethods/higherOrderMethods/PropogateSeedsArr';
import DetermineBracketPower from './vsBracketMethods/baseMethods/DetermineBracketPower';
import * as NgmsInRnd from './vsBracketMethods/baseMethods/NgamesInRound';
import DetermineBracket from './vsBracketMethods/baseMethods/DetermineBracket';
import WinnerLoserHandler from './outcomes/WinnerLoserHandler';
import SetPlayerInDestGame from './outcomes/SetPlayerInDestGame';
import SendWinnerWinBracket from './outcomes/SendWinnerWinBracket';
import SendWinnerLoseBracket from './outcomes/SendWinnerLoseBracket';
import SendLoserWinBracket from './outcomes/SendLoserWinBracket';
import SendLoserStartBracket from './outcomes/SendLoserStartBracket';
import SendWinnerSpecialLoserBracket from './outcomes/SendWinnerSpecialLoserBracket';
import { Stage, Group, Layer } from "react-konva";

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

export default class VsTournament extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			masterGameObject:{},
			scale:1,
			posX:null,
			posY:null
		};
		
		//bind imported state dependent functions
		this.WinnerLoserHandler = WinnerLoserHandler.bind(this);
		this.SetPlayerInDestGame = SetPlayerInDestGame.bind(this);
		this.SendWinnerWinBracket = SendWinnerWinBracket.bind(this);
		this.SendWinnerLoseBracket = SendWinnerLoseBracket.bind(this);
		this.SendLoserWinBracket = SendLoserWinBracket.bind(this);
		this.SendLoserStartBracket = SendLoserStartBracket.bind(this);
		this.SendWinnerSpecialLoserBracket = SendWinnerSpecialLoserBracket.bind(this);
		
		var teams = Object.keys(this.props.location.state.players).length;
		var mastArr = [];
		var seededArray = [];
		var toggle = 0;
		var bracketSpots = Math.pow(2,DetermineBracketPower(teams));
		
		//populate seeded array
		PropogateSeedsArr(teams,mastArr);
		
		//Create Master Game Object
		var nGamesTotal = bracketSpots*2-1;
		for(var game = 1; game <= nGamesTotal; game++){
			this.state.masterGameObject[game] = {
				gameNumber : game,
				playerA:{
					name : '',
				    country : '',
				    seed : '',
				    timeTrial : 0,
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
				    timeTrial : 0,
				    wins : 0,
				    losses : 0,
				    totalTime : 0,
				    avgTime : 0,
				    splitTIme : 0
				},
				bracket : DetermineBracket(game,bracketSpots),
				status : '',
				spotsFilled : 0,
				winner: '',
				loser: '',
				loserEliminated : false
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

	wheel(e){
		
		e.evt.preventDefault();
		
		var scaleBy = 1.15;
		var oldScale = this.state.scale;
		var newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

		var mousePointTo = {
                x: e.target.getStage().getPointerPosition().x / oldScale - e.target.getStage().x() / oldScale,
                y: e.target.getStage().getPointerPosition().y / oldScale - e.target.getStage().y() / oldScale,
            };
        
        this.setState({
        	scale : newScale
        });
        
        var newPos = {
                x: -(mousePointTo.x - e.target.getStage().getPointerPosition().x / newScale) * newScale,
                y: -(mousePointTo.y - e.target.getStage().getPointerPosition().y / newScale) * newScale
            };
        
        this.setState({
        	posX:newPos.x,
        	posY:newPos.y
        });
	}
	
	render() {
		
		//------------------------------------------------------------------
		//this.props.location.state.'GIVEN NAME' to access props thru Link
		//------------------------------------------------------------------
		var k = 0;
		var teams = Object.keys(this.props.location.state.players).length;
		var bracketSpots = Math.pow(2,DetermineBracketPower(teams));
		var bracketPower = DetermineBracketPower(teams);
		var gameWidth = vizGeo.teamWidth + 2*vizGeo.teamHeight;
		var gameHeight = vizGeo.teamHeight*3.5;
		var boardHeight = vizGeo.vertSpace*(3+(bracketSpots/2)) + bracketSpots*gameHeight/2;
		
		//create loserArr
		var LoserArr = [];
		for (k = 1; k <= 2*(bracketPower-1); k++){
			LoserArr.push(NgmsInRnd.loserBracket(bracketSpots,k));
		}
		//create winnerArr
		var winnerArr = [];
		for (k = 0; k < bracketPower; k++){
			winnerArr.push(NgmsInRnd.winnerBracket(bracketSpots,k));
		}
		
		//create Games in Winner Bracket (includes start round)
		var winnerBracket = [];
		var bezArr = [];
		var gameCounter = 1;
		var moduleCCht;
		var halfModuleHeight;
		var xLoc;
		var yLoc;
		
		for (k = 0; k < winnerArr.length; k++){
			for(var i = 0; i < winnerArr[k]; i++){
				
				moduleCCht = (gameHeight+vizGeo.vertSpace)*Math.pow(2,k);		
				halfModuleHeight = ((gameHeight+vizGeo.vertSpace)*(Math.pow(2,k))-vizGeo.vertSpace)/2;
				xLoc = (k+(bracketPower-1)*2)*(gameWidth+vizGeo.horizSpace) + vizGeo.horizSpace;
				yLoc = boardHeight-(winnerArr[k]-i)*(gameHeight+vizGeo.vertSpace)*(Math.pow(2,k)) - vizGeo.vertSpace + halfModuleHeight - gameHeight/2;
				
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
						status = {this.state.masterGameObject[gameCounter].status}
						winner = {this.state.masterGameObject[gameCounter].winner}
						loser = {this.state.masterGameObject[gameCounter].loser}
						loserEliminated = {this.state.masterGameObject[gameCounter].loserEliminated}
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
							color = 'red'
							stroke = {2}
							bracket = {this.state.masterGameObject[gameCounter].bracket + (k%2 == 0?'':2)}
						/>
					);
				}
				
				//push in loser lines of winner bracket
				if(k!==0){
					var xToLoser = xLoc - 3*k*(gameWidth+vizGeo.horizSpace) + gameWidth/2;
					bezArr.push(
						<BracketLine
							xs = {xLoc + gameWidth/2}
							ys = {yLoc + gameHeight}
							x1 = {xLoc + gameWidth/2}
							y1 = {yLoc + (gameHeight + moduleCCht)/2}
							x2 = {xToLoser}
							y2 = {yLoc + (gameHeight + moduleCCht)/2}
							x3 = {xToLoser}
							y3 = {yLoc + gameHeight}
							radius = {vizGeo.radius}
							color = {vizGeo.lColAr[k-1]}
							stroke = {8*k}
							bracket = {this.state.masterGameObject[gameCounter].bracket + (k%2 == 0?'':2)}
							direction = 'clockwise'
						/>
					); 
				}
				
				bezArr.push(
					<BezierCurves
						xs = {xLoc + gameWidth}
						ys = {yLoc + gameHeight/2}
						xe = {xLoc + gameWidth + vizGeo.horizSpace}
						ye = {ye}
						color = 'blue'
						stroke = {4}
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
				status = {this.state.masterGameObject[gameCounter].status}
				winner = {this.state.masterGameObject[gameCounter].winner}
				loser = {this.state.masterGameObject[gameCounter].loser}
				loserEliminated = {this.state.masterGameObject[gameCounter].loserEliminated}
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
						status = {this.state.masterGameObject[gameCounter].status}
						winner = {this.state.masterGameObject[gameCounter].winner}
						loser = {this.state.masterGameObject[gameCounter].loser}
						loserEliminated = {this.state.masterGameObject[gameCounter].loserEliminated}
					/>
				);
				
				ye = i % 2 == 0 ? yLoc + (gameHeight + moduleCCht)/2 : yLoc + (gameHeight - moduleCCht)/2;
				
				if(k%2 ==0 ){
					ye = yLoc + gameHeight/2;
				}
				
				if (k==LoserArr.length -1){
					var xEnd = xLoc + (LoserArr.length + winnerArr.length + 1)*(gameWidth + vizGeo.horizSpace) - vizGeo.horizSpace - gameWidth/2;
					bezArr.push(
						<BracketLine
							xs = {xLoc + gameWidth/2}
							ys = {yLoc}
							x1 = {xLoc + gameWidth/2}
							y1 = {vizGeo.vertSpace/2}
							x2 = {xEnd}
							y2 = {vizGeo.vertSpace/2}
							x3 = {xEnd}
							y3 = {yLoc}
							radius = {vizGeo.radius}
							color = 'blue'
							stroke = {4}
							bracket = {this.state.masterGameObject[gameCounter].bracket + (k%2 == 0?'':2)}
							direction = 'counter-clockwise'
						/>
					); 
				} else {
					bezArr.push(
						<BezierCurves
							xs = {xLoc}
							ys = {yLoc + gameHeight/2}
							xe = {xLoc - vizGeo.horizSpace}
							ye = {ye}
							color = 'blue'
							stroke = {4}
							bracket = {this.state.masterGameObject[gameCounter].bracket + (k%2 == 0?'':2)}
						/>
					); 
				}
				gameCounter = gameCounter + 1;
			}
		}
		
		bezArr.reverse();
		
		console.log(this.state.masterGameObject);
		
		
		return (
			<div>
				<VsMatchup/>
				<Stage 
					ref={"stage"}
					x={this.state.posX}
					y={this.state.posY}
					width={window.innerWidth} 
					height={window.innerHeight} 
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
						</Group>
					</Layer>
				</Stage>
			</div>
		);
	}
}