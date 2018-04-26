'use strict';

export default function GameComponentProps (gVars,gameCounter,masterGameObject,bracketSpots,vizGeo,xLoc,yLoc) {
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
		showMatchup : gVars.showMatchup
	};
}