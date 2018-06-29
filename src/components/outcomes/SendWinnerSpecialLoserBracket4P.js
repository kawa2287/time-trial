'use strict';

export default function SendWinnerSpecialLoserBracket4P(currentGameNum, w1,w2, bracketSpots,beginConstruction){
	var destGame = bracketSpots/2;
	var topGame = bracketSpots/2 - 1;
	var botGame = bracketSpots/2 * 2 - 2;

	this.SetPlayerInDestGame4P(currentGameNum, destGame, topGame, botGame, w1,w2,beginConstruction);

}