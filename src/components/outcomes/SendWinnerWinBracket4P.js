'use strict';

export default function SendWinnerWinBracket4P(currentGameNum, roundNumber, wp1,wp2, bracketSpots){
	//winner bracket path
	var destGame = 0.5*((currentGameNum % 2 ==0 ? currentGameNum : currentGameNum+1)+bracketSpots/2);
	var topGame = (destGame * 2 - bracketSpots/2) - 1;
	var botGame = (destGame * 2 - bracketSpots/2);

	this.SetPlayerInDestGame4P(currentGameNum,destGame, topGame, botGame, wp1,wp2);
}