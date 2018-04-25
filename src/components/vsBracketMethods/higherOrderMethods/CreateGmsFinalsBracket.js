'use strict';

import React from 'react';
import GameComponent from '../../GameComponent';

var k;
var xLoc;
var yLoc;


export default function CreateGmsFinalsBracket(gVars,gameCounter,masterGameObject ){
    
    // unwrap
    var gameWidth = gVars.gameWidth;
	var gameHeight = gVars.gameHeight;
	var boardHeight = gVars.boardHeight;
	var winnerArr = gVars.winnerArr;
	var loserArr = gVars.loserArr;
	var vizGeo = gVars.vizGeo;
	var bracketSpots = gVars.bracketSpots;
	
	var finalsBracket = [];
    
    for (k = 0; k < 1; k++){
    	
		xLoc = (winnerArr.length + loserArr.length + 1)*(gameWidth+vizGeo.horizSpace) + vizGeo.horizSpace + (gameWidth+vizGeo.horizSpace)*k;
		yLoc = boardHeight/2 - gameHeight/2;
		
				
		finalsBracket.push(
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
		
		gameCounter = gameCounter + 1;
	
	}
	
	return  {
	    finalsBracket : finalsBracket,
	    gameCounter : gameCounter
	};
	
}