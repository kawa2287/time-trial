'use strict';

//clear for VS & 4P Mode

export default function PopMastArr(arr, mastArr, nTeams){
	mastArr = mastArr || [];
	for (var item in arr){
		if(Array.isArray(arr[item])){
			PopMastArr(arr[item], mastArr, nTeams);
		} else {
			mastArr.push(arr[item]);
		}
	}
	return mastArr;
}