'use strict';

import DetermineBracketPower from '../baseMethods/DetermineBracketPower';

export default function DetermineRoundNumber (currentGameNum, nTeams, bracketLocation){
		var maxGameNumInRnd = 0;
		if(bracketLocation == 'loserBracket'){
			var nLoserRnds = 2*(DetermineBracketPower(nTeams) - 1);
			for (var i= 1; i<= nLoserRnds; i++){
				var x = Number(i) % 2 != 0 ? Number(i)-1 : Number(i)-2;
				var k = (nLoserRnds - x)/2;
				maxGameNumInRnd = Number(i) % 2 == 0 ? nTeams - Math.pow(2,k) : nTeams - 1.5*Math.pow(2,k);
				if(currentGameNum - nTeams <= maxGameNumInRnd){
					return i;
				}
			}
		} else {
			var nWinnerRnds = DetermineBracketPower(nTeams);
			for (var i=0; i<= nWinnerRnds; i++){
				maxGameNumInRnd = nTeams/(2*Math.pow(2,i));
				if(currentGameNum <= nTeams- maxGameNumInRnd){
					return i;
				} 
			}
		}
	}