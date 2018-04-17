'use strict';

export function loserBracket(bracketSpots,curRnd){
		if(curRnd % 2 == 0){
			return bracketSpots/(2*Math.pow(2,curRnd/2));
		} else {
			return bracketSpots/(2*Math.pow(2,(curRnd+1)/2));
		}
	}
	
export function	winnerBracket(bracketSpots,curRnd){
		return bracketSpots/(2*Math.pow(2,curRnd));
	}