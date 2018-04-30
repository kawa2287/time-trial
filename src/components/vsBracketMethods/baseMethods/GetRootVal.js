'use strict';

//clear for VS & 4P Mode

export default function GetRootVal (arr){
	if (Array.isArray(arr)){
		return GetRootVal(arr[0]);
	} else {
		return arr;
	}
}