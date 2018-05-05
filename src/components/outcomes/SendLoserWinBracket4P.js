'use strict';

import * as NgmsInRnd from '../vsBracketMethods/baseMethods/NgamesInRound';
import DetermineRoundNumber from '../vsBracketMethods/higherOrderMethods/DetermineRoundNumber';

export default function SendLoserWinBracket4P(currentGameNum, roundNumber,l1,l2, bracketSpots, mode){
	var destGame = currentGameNum + bracketSpots/2 - NgmsInRnd.winnerBracket(bracketSpots, roundNumber, mode);
	var destGameRnd = DetermineRoundNumber(destGame,bracketSpots/2,"loserBracket");
	var topGame;
	var botGame;

	if (destGameRnd % 2 == 0){
		topGame = destGame - NgmsInRnd.loserBracket(bracketSpots,destGameRnd, mode);
		botGame = destGame + NgmsInRnd.loserBracket(bracketSpots,destGameRnd, mode) - bracketSpots/2;
	} else {
		topGame = 2 * (destGame - bracketSpots/2 + NgmsInRnd.loserBracket(bracketSpots,destGameRnd, mode)) - 1;
		botGame = 2 * (destGame - bracketSpots/2 + NgmsInRnd.loserBracket(bracketSpots,destGameRnd, mode));
	}
	
	this.SetPlayerInDestGame4P(currentGameNum, destGame, topGame, botGame, l1,l2);

}