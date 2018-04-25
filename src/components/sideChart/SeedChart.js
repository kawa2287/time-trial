'use strict';

import React from 'react';

export default function SeedChart(seededArray)  {


	var tempArr = [];
	var tempPlayerArr = [];
	var packagedArray = [];

	//push data into unsorted array
	for (var player in seededArray){
		if(seededArray[player].name !== 'BYE' ){
			tempPlayerArr.push(seededArray[player].country);
			tempPlayerArr.push(seededArray[player].name);
			tempPlayerArr.push(seededArray[player].seed);
			
			tempArr.push(tempPlayerArr);
			tempPlayerArr = [];
		}
	}
		
	//sort the array
	tempArr.sort(function(a, b) {
	    var valueA, valueB;
	    valueA = a[2];
	    valueB = b[2];
	    
	    if (valueA < valueB) {
	    	return -1;
	    }
	    else if (valueA > valueB) {
	        return 1;
	    }
	    return 0;
	});
	
	//pump html into final array
	var tempHtmlArr = [];
	for (var i = 0; i < tempArr.length; i++) {
		tempHtmlArr.push(<div className={"rank"}>{i + 1}</div>);
		tempHtmlArr.push(<div className={"flag"}><img  src={tempArr[i][0].flagPathSVG} width={32} /></div>);
		tempHtmlArr.push(<div className={"player-name"}>{tempArr[i][1]}</div>);
		tempHtmlArr.push(<div className={"time"}></div>);
		
		packagedArray.push(<div className={"chart-row"}>{tempHtmlArr}</div>);
		
		tempHtmlArr = [];
	}
	
	return packagedArray;
}
  
