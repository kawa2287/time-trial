'use strict';

//clear for VS & 4P Mode

export function loserBracket(bracketSpots,curRnd,mode){
	
	if(mode=='VS'){
		bracketSpots = bracketSpots;
	}else{
		bracketSpots = bracketSpots/2;
	}
	
	if(curRnd % 2 == 0){
		return bracketSpots/(2*Math.pow(2,curRnd/2));
	} else {
		return bracketSpots/(2*Math.pow(2,(curRnd+1)/2));
	}
}
	
export function	winnerBracket(bracketSpots,curRnd,mode){
	
	if(mode=='VS'){
		bracketSpots = bracketSpots;
	}else{
		bracketSpots = bracketSpots/2;
	}
	
	return bracketSpots/(2*Math.pow(2,curRnd));
}