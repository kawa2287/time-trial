'use strict';

import * as NgmsInRnd from '../vsBracketMethods/baseMethods/NgamesInRound';
import DetermineRoundNumber from '../vsBracketMethods/higherOrderMethods/DetermineRoundNumber';
import Settings from '../../static/Settings';

export default function SendLoserWinBracket(currentGameNum, roundNumber,losePlayer, bracketSpots, mode,beginConstruction){
	var coeff;
	if(Settings.seedMode !== 'blind' || currentGameNum == bracketSpots - 1) {
	 	coeff = 0;
	 } else if (currentGameNum %2 == 0){
	 	coeff = -1;
	 } else{
	 	coeff = 1;
	 }
	var destGame = currentGameNum + bracketSpots - NgmsInRnd.winnerBracket(bracketSpots, roundNumber, mode) + coeff;
	var destGameRnd = DetermineRoundNumber(destGame,bracketSpots,"loserBracket");
	var topGame;
	var botGame;

	if (destGameRnd % 2 == 0){
		topGame = destGame - NgmsInRnd.loserBracket(bracketSpots,destGameRnd, mode);
		botGame = currentGameNum;
	} else {
		topGame = 2 * (destGame - bracketSpots + NgmsInRnd.loserBracket(bracketSpots,destGameRnd, mode)) - 1;
		botGame = 2 * (destGame - bracketSpots + NgmsInRnd.loserBracket(bracketSpots,destGameRnd, mode));
	}

	this.SetPlayerInDestGame(currentGameNum, destGame, topGame, botGame, losePlayer,beginConstruction, 'loss');

}