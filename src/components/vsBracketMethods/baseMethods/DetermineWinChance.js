'use strict';

import Settings from '../../../static/Settings';

export default function DetermineWinChance(playerName, opponentName, playerTime, opponentTime){
	if(playerName == 'BYE') {
		return 0;
	} else if (opponentName == 'BYE'){
		return 100;
	} else {
		return Math.min(99,Math.max(1,Math.round(100-50*(Settings.timeToWinOutright -(opponentTime - playerTime))/Settings.timeToWinOutright)));
	}
}