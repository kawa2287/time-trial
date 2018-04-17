'use strict';

export default function SendLoserStartBracket(currentGameNum, losePlayer, bracketSpots){
	var destGame = 0.5*(currentGameNum % 2 ==0 ? currentGameNum : currentGameNum+1)+bracketSpots;
	var topGame = 2 * (destGame - bracketSpots) - 1;
	var botGame = 2 * (destGame - bracketSpots);

	this.SetPlayerInDestGame(currentGameNum, destGame, topGame, botGame, losePlayer);

}