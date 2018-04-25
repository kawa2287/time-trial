'use strict';

import DetermineBracket from '../baseMethods/DetermineBracket';

export default function CreateMasterGameObject(nGamesTotal,bracketSpots){
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
		masterGameObj[game] = {
			gameNumber : game,
			playerA : playerObj,
			playerB: playerObj,
			bracket : DetermineBracket(game,bracketSpots),
			status : '',
			spotsFilled : 0,
			winner: '',
			loser: '',
			loserEliminated : false
		};
	}
	
	console.log('mastGmObj', masterGameObj);
	
	return masterGameObj;
	
}