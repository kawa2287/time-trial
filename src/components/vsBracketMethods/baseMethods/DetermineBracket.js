'use strict';

export default function DetermineBracket (gameNumber,bracketSpots){
	if(gameNumber <= bracketSpots/2){
		return 'startBracket';
	} else if (gameNumber < bracketSpots && gameNumber > bracketSpots/2){
		return 'winnerBracket';
	} else if (gameNumber > bracketSpots && gameNumber < 2*(bracketSpots-1)){
		return 'loserBracket';
	} else {
		return 'specialBracket';
	}
}