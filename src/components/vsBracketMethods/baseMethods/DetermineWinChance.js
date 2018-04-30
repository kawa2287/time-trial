'use strict';

import Settings from '../../../static/Settings';

export default function DetermineWinChance(playerArr,playerAvgTmArr, i, mode){


	var mainPayerName = playerArr[i].name;
	var mainPlayerTime = playerAvgTmArr[i];
	
	if(mode == 'VS'){
		var opponentName = null;
		var opponentTime = null;
		
		if (playerArr[0].name === mainPayerName){
			opponentName = playerArr[1].name;
			opponentTime = playerAvgTmArr[1];
		} else {
			opponentName = playerArr[0].name;
			opponentTime = playerAvgTmArr[0];
		}
		
		
		if(mainPayerName == 'BYE') {
			return 0;
		} else if (opponentName == 'BYE'){
			return 100;
		} else {
			return Math.min(99,Math.max(1,Math.round(100-50*(Settings.timeToWinOutright -(opponentTime - mainPlayerTime))/Settings.timeToWinOutright)));
		}
		
	} else {
		//determine opponents avg time
		var opponentsTotalTime = 0;
		var nOpp = 0;
		
		
		for (var p = 0 ; p <4; p++){
			if(playerArr[p].name !== mainPayerName  && playerArr[p].name !== 'BYE'){
				opponentsTotalTime = opponentsTotalTime + playerAvgTmArr[p];
				nOpp = nOpp + 1;
			}
		}
		
		var avgOpTime = opponentsTotalTime/nOpp;
		
		
		
		return Math.min(99,Math.max(1,Math.round(100-50*(Settings.timeToWinOutright -(avgOpTime - mainPlayerTime))/Settings.timeToWinOutright)));
	}
}