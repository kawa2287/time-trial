'use strict';

//clear for VS & 4P Mode

import React from 'react';
import GameComponent from '../../GameComponent';
import GameComponentProps from '../baseMethods/GameComponentProps';

export default function CreateGmsSpecialWinBracket(gVars,gameCounter,masterGameObject, mode ){
    
    // unwrap
    var gameWidth = gVars.gameWidth;
	var gameHeight = gVars.gameHeight;
	var boardHeight = gVars.boardHeight;
	var winnerArr = gVars.winnerArr;
	var vizGeo = gVars.vizGeo;
	var bracketPower = gVars.bracketPower;
	var bracketSpots = gVars.bracketSpots;
	
	var xLoc = (winnerArr.length+(bracketPower-(mode == 'VS' ? 0 : 1)-1)*2)*(gameWidth+vizGeo.horizSpace) + vizGeo.horizSpace;
	var yLoc = (boardHeight-gameHeight)/2;
	

	return  (
	    <GameComponent
	    	gProps = {
				GameComponentProps(
					gVars,
					gameCounter,
					masterGameObject,
					bracketSpots,
					vizGeo,
					xLoc,
					yLoc,
					mode
				)
			}
		/>
	);
	
}