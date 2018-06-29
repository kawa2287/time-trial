'use strict';

import * as NgmsInRnd from '../vsBracketMethods/baseMethods/NgamesInRound';
import DetermineRoundNumber from '../vsBracketMethods/higherOrderMethods/DetermineRoundNumber';
import Settings from '../../static/Settings';

export default function SendLoserWinBracket4P(currentGameNum, roundNumber,l1,l2, bracketSpots, mode,beginConstruction){
	var coeff;
	 if(Settings.seedMode !== 'blind' || currentGameNum == bracketSpots/2 - 1) {
	 	coeff = 0;
	 } else if (currentGameNum %2 == 0){
	 	coeff = -1;
	 } else{
	 	coeff = 1;
	 }
	
	var destGame = currentGameNum + bracketSpots/2 - NgmsInRnd.winnerBracket(bracketSpots, roundNumber, mode) + coeff;
	var destGameRnd = DetermineRoundNumber(destGame,bracketSpots/2,"loserBracket");
	var topGame;
	var botGame;
	console.log('destGame', destGame);
	console.log('seedMode', Settings.seedMode );

	if (destGameRnd % 2 == 0){
		topGame = destGame - NgmsInRnd.loserBracket(bracketSpots,destGameRnd, mode);
		botGame =  currentGameNum; //destGame + NgmsInRnd.loserBracket(bracketSpots,destGameRnd, mode) - bracketSpots/2 + (Settings.seedMode !== 'blind' ? 0 : (destGame %2 == 0 ? -1 : 1));
	} else {
		topGame = 2 * (destGame - bracketSpots/2 + NgmsInRnd.loserBracket(bracketSpots,destGameRnd, mode)) - 1;
		botGame = 2 * (destGame - bracketSpots/2 + NgmsInRnd.loserBracket(bracketSpots,destGameRnd, mode));
	}
	
	this.SetPlayerInDestGame4P(currentGameNum, destGame, topGame, botGame, l1,l2,beginConstruction);

}