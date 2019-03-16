'use strict';

export default function SendWinnerSpecialLoserBracket(currentGameNum, winPlayer, bracketSpots,beginConstruction){
	var destGame = bracketSpots;
	var topGame = bracketSpots - 1;
	var botGame = bracketSpots * 2 - 2;

	this.SetPlayerInDestGame(currentGameNum, destGame, topGame, botGame, winPlayer,beginConstruction, 'win');

}