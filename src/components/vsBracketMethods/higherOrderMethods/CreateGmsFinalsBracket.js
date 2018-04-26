'use strict';

import React from 'react';
import GameComponent from '../../GameComponent';
import GameComponentProps from '../baseMethods/GameComponentProps';

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
				gProps = {
					GameComponentProps(
						gVars,
						gameCounter,
						masterGameObject,
						bracketSpots,
						vizGeo,
						xLoc,
						yLoc
					)
				}
			/>
		);
		
		gameCounter = gameCounter + 1;
	
	}
	
	return  {
	    finalsBracket : finalsBracket,
	    gameCounter : gameCounter
	};
	
}