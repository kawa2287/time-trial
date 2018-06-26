'use strict';

//clear for VS & 4P Mode

export default function GameComponentProps (gVars,gameCounter,masterGameObject,bracketSpots,vizGeo,xLoc,yLoc,mode) {
	if(mode == 'VS'){
		return {
			playerA : masterGameObject[gameCounter].playerA,
			playerB : masterGameObject[gameCounter].playerB,
			gameNumber : masterGameObject[gameCounter].gameNumber,
			bracket : masterGameObject[gameCounter].bracket,
			bracketSpots : bracketSpots,
			vizGeo : vizGeo,
			x : xLoc,
			y : yLoc,
			status : masterGameObject[gameCounter].status,
			winner : masterGameObject[gameCounter].winner,
			loser : masterGameObject[gameCounter].loser,
			loserEliminated : masterGameObject[gameCounter].loserEliminated,
			showMatchup : gVars.showMatchup,
			gVars,
			mode,
			playerAtime : masterGameObject[gameCounter].playerAtime,
			playerBtime : masterGameObject[gameCounter].playerBtime
			
		};
	} else {
		
		return {
			playerA : masterGameObject[gameCounter].playerA,
			playerB : masterGameObject[gameCounter].playerB,
			playerC : masterGameObject[gameCounter].playerC,
			playerD : masterGameObject[gameCounter].playerD,
			gameNumber : masterGameObject[gameCounter].gameNumber,
			bracket : masterGameObject[gameCounter].bracket,
			bracketSpots : bracketSpots,
			vizGeo : vizGeo,
			x : xLoc,
			y : yLoc,
			status : masterGameObject[gameCounter].status,
			winner1 : masterGameObject[gameCounter].winner1,
			winner2 : masterGameObject[gameCounter].winner2,
			loser1 : masterGameObject[gameCounter].loser1,
			loser2 : masterGameObject[gameCounter].loser2,
			loserEliminated1 : masterGameObject[gameCounter].loserEliminated1,
			loserEliminated2 : masterGameObject[gameCounter].loserEliminated2,
			showMatchup : gVars.showMatchup,
			gVars,
			mode,
			playerAtime : masterGameObject[gameCounter].playerAtime,
			playerBtime : masterGameObject[gameCounter].playerBtime,
			playerCtime : masterGameObject[gameCounter].playerCtime,
			playerDtime : masterGameObject[gameCounter].playerDtime,
			
		};
	}
	
	
}