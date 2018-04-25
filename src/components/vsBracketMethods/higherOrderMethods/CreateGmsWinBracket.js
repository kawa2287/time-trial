'use strict';

import React from 'react';
import GameComponent from '../../GameComponent';
import BezierCurves from '../../BezierCurves';
import BracketLine from '../../BracketLine';

var k;
var i;
var moduleCCht;
var halfModuleHeight;
var xLoc;
var yLoc;


export default function CreateGmsWinBracket(gVars,gameCounter,masterGameObject ){
    
    // unwrap
    var gameWidth = gVars.gameWidth;
	var gameHeight = gVars.gameHeight;
	var boardHeight = gVars.boardHeight;
	var winnerArr = gVars.winnerArr;
	var vizGeo = gVars.vizGeo;
	var bracketPower = gVars.bracketPower;
	var bracketSpots = gVars.bracketSpots;
	
	var winnerBracket = [];
	var bezArr = [];
    
    for (k = 0; k < winnerArr.length; k++){
		for(i = 0; i < winnerArr[k]; i++){
		    
		    
			
			moduleCCht = (gameHeight+vizGeo.vertSpace)*Math.pow(2,k);		
			halfModuleHeight = ((gameHeight+vizGeo.vertSpace)*(Math.pow(2,k))-vizGeo.vertSpace)/2;
			xLoc = (k+(bracketPower-1)*2)*(gameWidth+vizGeo.horizSpace) + vizGeo.horizSpace;
			yLoc = boardHeight-(winnerArr[k]-i)*(gameHeight+vizGeo.vertSpace)*(Math.pow(2,k)) - vizGeo.vertSpace + halfModuleHeight - gameHeight/2;
			
			winnerBracket.push(
				<GameComponent
					playerA = {masterGameObject[gameCounter].playerA}
					playerB = {masterGameObject[gameCounter].playerB}
					gameNumber = {masterGameObject[gameCounter].gameNumber}
					bracket = {masterGameObject[gameCounter].bracket}
					bracketSpots = {bracketSpots}
					vizGeo = {vizGeo}
					x = {xLoc}
					y = {yLoc}
					status = {masterGameObject[gameCounter].status}
					winner = {masterGameObject[gameCounter].winner}
					loser = {masterGameObject[gameCounter].loser}
					loserEliminated = {masterGameObject[gameCounter].loserEliminated}
					showMatchup = {gVars.showMatchup}
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
						bracket = {masterGameObject[gameCounter].bracket + (k%2 == 0?'':2)}
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
						bracket = {masterGameObject[gameCounter].bracket + (k%2 == 0?'':2)}
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
					bracket = {masterGameObject[gameCounter].bracket}
				/>
			);
			gameCounter = gameCounter + 1;
		}
	}
	
	return  {
	    winnerBracket : winnerBracket,
	    bezArr : bezArr,
	    gameCounter : gameCounter
	};
	
}