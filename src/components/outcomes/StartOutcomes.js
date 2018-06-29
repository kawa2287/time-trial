'use strict';

import DetermineRoundNumber from '../vsBracketMethods/higherOrderMethods/DetermineRoundNumber';

export default function StartOutcomes (currentGameNum, bracketSpots,currentBracket, bracketPower, mode, beginConstruction){
	
	
	var roundNumber;
    
    if (mode == 'VS'){
    	
    	roundNumber = DetermineRoundNumber(currentGameNum, bracketSpots, currentBracket);
    	
    	var winPlayer = 'Winner of ' + currentGameNum;
    	var losePlayer = 'Loser of ' + currentGameNum;
	
		// send player based on bracket Location
		if (currentBracket == "startBracket"){
			this.SendWinnerWinBracket(currentGameNum, roundNumber, winPlayer, bracketSpots,beginConstruction);
			this.SendLoserStartBracket(currentGameNum, losePlayer, bracketSpots,beginConstruction);
		} else if (currentBracket == "winnerBracket"){
			this.SendWinnerWinBracket(currentGameNum, roundNumber, winPlayer, bracketSpots,beginConstruction);
			this.SendLoserWinBracket(currentGameNum, roundNumber,losePlayer, bracketSpots, mode,beginConstruction);
		} else if (currentBracket == "specialBracket"){
			if(currentGameNum == bracketSpots){
				this.SendWinnerSpecialWinnerBracket(currentGameNum,winPlayer,losePlayer,bracketSpots,beginConstruction);
			} else {
				this.SendWinnerSpecialLoserBracket(currentGameNum,winPlayer,bracketSpots,beginConstruction);
			}
		} else {
			this.SendWinnerLoseBracket(currentGameNum, roundNumber, winPlayer, bracketSpots, mode,beginConstruction);
		}
    } else {
    	
    	roundNumber = DetermineRoundNumber(currentGameNum, bracketSpots/2, currentBracket);
    	var winPlayerA = 'WinnerA of ' + currentGameNum;
    	var winPlayerB = 'WinnerB of ' + currentGameNum;
    	var losePlayerA = 'LoserA of ' + currentGameNum;
    	var losePlayerB = 'LoserB of ' + currentGameNum;
    	
	    // send player based on bracket Location
		if (currentBracket == "startBracket"){
			this.SendWinnerWinBracket4P(currentGameNum, roundNumber, winPlayerA, winPlayerB, bracketSpots,beginConstruction);
			this.SendLoserStartBracket4P(currentGameNum, losePlayerA, losePlayerB, bracketSpots,beginConstruction);
		} else if (currentBracket == "winnerBracket"){
			this.SendWinnerWinBracket4P(currentGameNum, roundNumber, winPlayerA, winPlayerB, bracketSpots,beginConstruction);
			this.SendLoserWinBracket4P(currentGameNum, roundNumber, losePlayerA, losePlayerB, bracketSpots, mode,beginConstruction);
		} else if (currentBracket == "specialBracket"){
			this.SendWinnerSpecialLoserBracket4P(currentGameNum, winPlayerA, winPlayerB,bracketSpots,beginConstruction);
		} else {
			this.SendWinnerLoseBracket4P(currentGameNum, roundNumber, winPlayerA, winPlayerB, bracketSpots, mode,beginConstruction);
		}
    }
    
    
}