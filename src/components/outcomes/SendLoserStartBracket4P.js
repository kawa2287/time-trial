'use strict';


export default function SendLoserStartBracket4P(currentGameNum, l1,l2, bracketSpots){

	var destGame = 0.5*(currentGameNum % 2 ==0 ? currentGameNum : currentGameNum+1)+bracketSpots/2;
	var topGame = 2 * (destGame - bracketSpots/2) - 1;
	var botGame = 2 * (destGame - bracketSpots/2);

	this.SetPlayerInDestGame4P(currentGameNum, destGame, topGame, botGame, l1,l2);

}