'use strict';

import DetermineRoundNumber from '../vsBracketMethods/higherOrderMethods/DetermineRoundNumber';
import DetermineBracket from '../vsBracketMethods/baseMethods/DetermineBracket';
import DetermineAvgTime from '../vsBracketMethods/baseMethods/DetermineAvgTime';

export default function WinnerLoserHandler (currentGameNum, bracketSpots, winPlayer, losePlayer, winTime, loseTime, byeRound){
    var currentBracket = DetermineBracket(currentGameNum,bracketSpots);
    
     //update stats [GLOBAL]
    
    if(byeRound === false) {
    	winPlayer.wins = winPlayer.wins + 1;
    	losePlayer.losses = losePlayer.losses + 1;
    	winPlayer.totalTime = Number(winPlayer.totalTime) + Number(winTime);
    	losePlayer.totalTime = Number(losePlayer.totalTime) + Number(loseTime);
    	winPlayer.bestTime = winPlayer.bestTime > winTime ? winTime : winPlayer.bestTime;
    	winPlayer.avgTime = DetermineAvgTime(winPlayer.timeTrial,winPlayer.totalTime,winPlayer.wins,winPlayer.losses);
    	var loserEliminated = losePlayer.losses == 2 ? true : false;
    }
    
    this.setState({
    	masterGameObject : {
    		...this.state.masterGameObject,
    		[currentGameNum] : {
    			...this.state.masterGameObject[currentGameNum],
    			status : 'COMPLETE',
    			winner : winPlayer.name,
    			loser : losePlayer.name,
    			loserEliminated : loserEliminated
    		}
    	}
    });

	var roundNumber = DetermineRoundNumber(currentGameNum, bracketSpots, currentBracket);
	//Handle based on bracket Location
	if (currentBracket == "startBracket"){
		this.SendWinnerWinBracket(currentGameNum, roundNumber, winPlayer, bracketSpots);
		this.SendLoserStartBracket(currentGameNum, losePlayer, bracketSpots);
	} else if (currentBracket == "winnerBracket"){
		this.SendWinnerWinBracket(currentGameNum, roundNumber, winPlayer, bracketSpots);
		this.SendLoserWinBracket(currentGameNum, roundNumber,losePlayer, bracketSpots);
	} else if (currentBracket == "specialBracket"){
		if(currentGameNum == bracketSpots){
			this.SendWinnerSpecialWinnerBracket(currentGameNum,winPlayer,losePlayer,bracketSpots);
		} else {
			this.SendWinnerSpecialLoserBracket(currentGameNum,winPlayer,bracketSpots);
		}
	} else {
		this.SendWinnerLoseBracket(currentGameNum, roundNumber, winPlayer, bracketSpots);
	}
}