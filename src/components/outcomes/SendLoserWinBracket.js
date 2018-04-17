'use strict';

import * as NgmsInRnd from '../vsBracketMethods/baseMethods/NgamesInRound';
import DetermineRoundNumber from '../vsBracketMethods/higherOrderMethods/DetermineRoundNumber';

export default function SendLoserWinBracket(currentGameNum, roundNumber,losePlayer, bracketSpots){
	var destGame = currentGameNum + bracketSpots - NgmsInRnd.winnerBracket(bracketSpots, roundNumber);
	var destGameRnd = DetermineRoundNumber(destGame,bracketSpots,"loserBracket");
	var topGame;
	var botGame;

	if (destGameRnd % 2 == 0){
		topGame = destGame - NgmsInRnd.loserBracket(bracketSpots,destGameRnd);
		botGame = destGame + NgmsInRnd.loserBracket(bracketSpots,destGameRnd) - bracketSpots;
	} else {
		topGame = 2 * (destGame - bracketSpots + NgmsInRnd.loserBracket(bracketSpots,destGameRnd)) - 1;
		botGame = 2 * (destGame - bracketSpots + NgmsInRnd.loserBracket(bracketSpots,destGameRnd));
	}

	this.SetPlayerInDestGame(currentGameNum, destGame, topGame, botGame, losePlayer);

}