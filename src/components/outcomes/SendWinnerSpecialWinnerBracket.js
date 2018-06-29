'use strict';

export default function SendWinnerSpecialLoserBracket(currentGameNum, winPlayer,losePlayer, bracketSpots,beginConstruction){
	var destGame = bracketSpots*2 - 1;
	var loserEliminated = losePlayer.losses == 2 ? true : false;

	if( loserEliminated == false){
		this.setState({
			masterGameObject : {
	    		...this.state.masterGameObject,
	    		[destGame] : {
	    			...this.state.masterGameObject[destGame],
	    			playerA : winPlayer,
	    			playerB : losePlayer,
	    			spotsFilled : 2
	    		}
	    	}
	    });
	} else {
		this.setState({
			masterGameObject : {
	    		...this.state.masterGameObject,
	    		[destGame] : {
	    			...this.state.masterGameObject[destGame],
	    			playerA : winPlayer,
	    			playerB : {
	    				name : 'BYE',
					    country : '',
					    seed : '-',
					    timeTrial : '-',
					    wins : 0,
					    losses : 0,
					    totalTime : 0,
					    avgTime : 0,
					    splitTIme : 0
	    			},
	    			spotsFilled : 2,
	    			status : 'COMPLETE'
	    		}
	    	}
	    });
	}

	
	
}