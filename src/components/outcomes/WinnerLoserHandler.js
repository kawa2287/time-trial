'use strict';

import DetermineRoundNumber from '../vsBracketMethods/higherOrderMethods/DetermineRoundNumber';
import DetermineBracket from '../vsBracketMethods/baseMethods/DetermineBracket';
import DetermineAvgTime from '../vsBracketMethods/baseMethods/DetermineAvgTime';
import DetermineBracketPower from '../vsBracketMethods/baseMethods/DetermineBracketPower';
import Settings from '../../static/Settings';

export default function WinnerLoserHandler (currentGameNum, bracketSpots, winPlayer, losePlayer, winTime, loseTime, byeRound){
    var currentBracket = DetermineBracket(currentGameNum,bracketSpots);
	var roundNumber = DetermineRoundNumber(currentGameNum, bracketSpots, currentBracket);
    var bracketPower = DetermineBracketPower(bracketSpots);
    
    if (winTime == null || winTime == 0){
    	winTime = winPlayer.timeTrial;
    }
    
    // update stats [GLOBAL]
    if(byeRound === false) {
    	winPlayer.wins = winPlayer.wins + 1;
    	losePlayer.losses = losePlayer.losses + 1;
    	winPlayer.totalTime = Number(winPlayer.totalTime) + Number(winTime);
    	losePlayer.totalTime = Number(losePlayer.totalTime) + Number(loseTime);
    	winPlayer.bestTime = winPlayer.bestTime > winTime ? winTime : winPlayer.bestTime;
    	winPlayer.avgTime = DetermineAvgTime(winPlayer.timeTrial,winPlayer.totalTime,winPlayer.wins,winPlayer.losses);
    	winPlayer.index = Math.round(100*winPlayer.timeTrial / winPlayer.avgTime)/100;
    	winPlayer.avgCupTime = Math.round(100*winPlayer.avgTime/Settings.cupsPerPerson)/100;
    	var loserEliminated = losePlayer.losses == 2 ? true : false;
    	
    	if(currentBracket == 'loserBracket'){
    		losePlayer.maxRound = roundNumber;
    	} else if (currentBracket == 'specialBracket'){
    		if (currentGameNum == bracketSpots) {
    			losePlayer.maxRound = 2*(bracketPower-1) +1;
    		} else {
    			losePlayer.maxRound = 2*(bracketPower-1) +2;
    		}
    	}
    }
    
    // set game object with results
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

	// send player based on bracket Location
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