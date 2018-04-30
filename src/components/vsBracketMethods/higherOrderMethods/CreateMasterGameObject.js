'use strict';

//clear for VS & 4P Mode... may need to adjust 4P variables

import DetermineBracket from '../baseMethods/DetermineBracket';

export default function CreateMasterGameObject(nGamesTotal,bracketSpots, mode){
    var masterGameObj = {};
    var playerObj = {
		name : '',
	    country : '',
	    seed : '',
	    timeTrial : 0,
	    wins : 0,
	    losses : 0,
	    totalTime : 0,
	    avgTime : 0,
	    splitTime : 0,
	    bestTime: 0,
	    index: 1,
	    maxRound: 0
	};
    
    for(var game = 1; game <= nGamesTotal; game++){
    	if (mode == 'VS'){
    		masterGameObj[game] = {
				gameNumber : game,
				playerA : playerObj,
				playerB: playerObj,
				bracket : DetermineBracket(game,bracketSpots, mode),
				status : '',
				spotsFilled : 0,
				winner: '',
				loser: '',
				loserEliminated : false
			};
    	} else {
    		masterGameObj[game] = {
				gameNumber : game,
				playerA : playerObj,
				playerB: playerObj,
				playerC: playerObj,
				playerD: playerObj,
				bracket : DetermineBracket(game,bracketSpots, mode),
				status : '',
				spotsFilled : 0,
				winner1: '',
				winner2: '',
				loser1: '',
				loser2: '',
				loser1Eliminated : false,
				loser2Eliminated : false
			};
    	}
		
	}
	
	
	return masterGameObj;
	
}