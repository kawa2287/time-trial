'use strict';

import DetermineRoundNumber from '../vsBracketMethods/higherOrderMethods/DetermineRoundNumber';

export default function WinnerLoserHandler (e, currentGameNum, bracketSpots, winPlayer, losePlayer, currentBracket, winTime, loseTime,byeRound){
	//stabilize view and update game status
	var mousePointTo = {
            x: e.target.getStage().getPointerPosition().x - e.target.getStage().x(),
            y: e.target.getStage().getPointerPosition().y - e.target.getStage().y(),
        };
    var newPos = {
            x: -(mousePointTo.x - e.target.getStage().getPointerPosition().x),
            y: -(mousePointTo.y - e.target.getStage().getPointerPosition().y)
        };
    
     //update stats [GLOBAL]
    
    if(byeRound === false) {
    	winPlayer.wins = winPlayer.wins + 1;
    	losePlayer.losses = losePlayer.losses + 1;
    	winPlayer.totalTime = winPlayer.totalTime + winTime;
    	losePlayer.totalTime = losePlayer.totalTime + loseTime;
    	var loserEliminated = losePlayer.losses == 2 ? true : false;
    }
    
    this.setState({
    	posX:newPos.x,
    	posY:newPos.y,
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
		this.SendWinnerSpecialLoserBracket(currentGameNum,winPlayer,bracketSpots);
	} else {
		this.SendWinnerLoseBracket(currentGameNum, roundNumber, winPlayer, bracketSpots);
	}
}