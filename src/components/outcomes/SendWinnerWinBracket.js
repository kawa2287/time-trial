'use strict';

export default function SendWinnerWinBracket(currentGameNum, roundNumber, winPlayer, bracketSpots,beginConstruction){
	//winner bracket path
	var destGame = 0.5*((currentGameNum % 2 ==0 ? currentGameNum : currentGameNum+1)+bracketSpots);
	var topGame = (destGame * 2 - bracketSpots) - 1;
	var botGame = (destGame * 2 - bracketSpots);

	this.SetPlayerInDestGame(currentGameNum,destGame, topGame, botGame, winPlayer,beginConstruction, 'win');
}