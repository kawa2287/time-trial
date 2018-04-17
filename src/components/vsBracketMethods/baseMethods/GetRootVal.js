'use strict';

export default function GetRootVal (arr){
	if (Array.isArray(arr)){
		return GetRootVal(arr[0]);
	} else {
		return arr;
	}
}