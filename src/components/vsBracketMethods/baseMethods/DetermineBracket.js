'use strict';

//clear for VS & 4P Mode

export default function DetermineBracket (gameNumber,bracketSpots, mode){
	bracketSpots = (mode == 'VS' ? bracketSpots : bracketSpots /2);
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