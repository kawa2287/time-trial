'use strict';

import * as NgmsInRnd from '../vsBracketMethods/baseMethods/NgamesInRound';
import DetermineRoundNumber from '../vsBracketMethods/higherOrderMethods/DetermineRoundNumber';

export default function SendWinnerLoseBracket4P(currentGameNum, roundNumber,w1,w2, bracketSpots, mode,beginConstruction){
	var destGame;
	if (roundNumber % 2 == 0) {
		destGame = (currentGameNum % 2 == 0 ? currentGameNum : currentGameNum + 1)*0.5 + bracketSpots/2 - NgmsInRnd.loserBracket(bracketSpots,roundNumber,mode)/2;
	} else {
		destGame = currentGameNum + NgmsInRnd.loserBracket(bracketSpots,roundNumber,mode);
	}

	var topGame;
	var botGame;
	var destGameRnd = DetermineRoundNumber(destGame,bracketSpots/2,"loserBracket");

	if (destGameRnd % 2 == 0){
		topGame = destGame - NgmsInRnd.loserBracket(bracketSpots,destGameRnd,mode);
		botGame = destGame + NgmsInRnd.loserBracket(bracketSpots,destGameRnd,mode) - bracketSpots;
	} else {
		topGame = 2 * (destGame - bracketSpots/2 + NgmsInRnd.loserBracket(bracketSpots,destGameRnd,mode)) - 1;
		botGame = 2 * (destGame - bracketSpots/2 + NgmsInRnd.loserBracket(bracketSpots,destGameRnd,mode));
	}

	this.SetPlayerInDestGame4P(currentGameNum, destGame, topGame, botGame, w1,w2,beginConstruction);
}