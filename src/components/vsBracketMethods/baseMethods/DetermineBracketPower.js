'use strict';

export default function DetermineBracketPower(nTeams){
    var bracketPower = 0;
		for (var i = 0; i < nTeams; i++){
			if (Number(nTeams) <= Math.pow(2,i)){
				bracketPower = i;
				return bracketPower;
			}
		}
	return bracketPower;
}