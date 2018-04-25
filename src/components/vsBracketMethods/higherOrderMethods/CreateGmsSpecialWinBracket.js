'use strict';

import React from 'react';
import GameComponent from '../../GameComponent';

export default function CreateGmsSpecialWinBracket(gVars,gameCounter,masterGameObject ){
    
    // unwrap
    var gameWidth = gVars.gameWidth;
	var gameHeight = gVars.gameHeight;
	var boardHeight = gVars.boardHeight;
	var winnerArr = gVars.winnerArr;
	var vizGeo = gVars.vizGeo;
	var bracketPower = gVars.bracketPower;
	var bracketSpots = gVars.bracketSpots;

	return  (
	    <GameComponent
			playerA = {masterGameObject[gameCounter].playerA}
			playerB = {masterGameObject[gameCounter].playerB}
			gameNumber = {masterGameObject[gameCounter].gameNumber}
			bracket = {masterGameObject[gameCounter].bracket}
			bracketSpots = {bracketSpots}
			vizGeo = {vizGeo}
			x = {(winnerArr.length+(bracketPower-1)*2)*(gameWidth+vizGeo.horizSpace) + vizGeo.horizSpace}
			y = {(boardHeight-gameHeight)/2}
			status = {masterGameObject[gameCounter].status}
			winner = {masterGameObject[gameCounter].winner}
			loser = {masterGameObject[gameCounter].loser}
			loserEliminated = {masterGameObject[gameCounter].loserEliminated}
			showMatchup = {gVars.showMatchup}
		/>
	);
	
}