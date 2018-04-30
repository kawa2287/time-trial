'use strict';

//clear for VS & 4P Mode

import PopMastArr from '../baseMethods/PopMastArr';
import GetRootVal from '../baseMethods/GetRootVal';


export default function PropogateSeedsArr(nTeams, mastArr, bracketPower){
	var baseArr = [];
	var nextOrderArr = [];

	for (var order = 1; order <= bracketPower; order++){
		var eq = Math.pow(2,bracketPower-order+1)+1;
		for (var i = 1; i <= Math.pow(2,bracketPower)/Math.pow(2,order); i++){
			if (order == 1){
				baseArr.push([i,eq - i]);
				nextOrderArr = baseArr;
			} else {
				for (var item in baseArr){
					if(eq - GetRootVal(baseArr[i-1]) == GetRootVal(baseArr[item])) {
						nextOrderArr.push([baseArr[i-1],baseArr[item]]);
					}
				}
			}
		}
		if(order == bracketPower){
			return PopMastArr(nextOrderArr, mastArr, nTeams);
		} else {
			baseArr = nextOrderArr;
			nextOrderArr = [];
		}
	}
}
	
