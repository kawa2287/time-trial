'use strict';

import React from 'react';

export default function PlaceChart(seededArray)  {


	var tempArr = [];
	var tempPlayerArr = [];
	var packagedArray = [];
	
	
	//push data into unsorted array
	for (var player in seededArray){
		if(seededArray[player].name !== 'BYE'){
			tempPlayerArr.push(seededArray[player].country);
			tempPlayerArr.push(seededArray[player].wins);
			tempPlayerArr.push(seededArray[player].losses);
			tempPlayerArr.push(seededArray[player].seed);
			tempPlayerArr.push(seededArray[player].name);
			tempPlayerArr.push(seededArray[player].maxRound);
			tempPlayerArr.push(seededArray[player].final4Spot);
			
			tempArr.push(tempPlayerArr);
			tempPlayerArr = [];
		}
	}
	
	console.log('tempArr',tempArr);
		
	//sort the array
	tempArr.sort(function(a, b) {
		//sort by final4Spot
	    if (a[6] < b[6]) {
	    	return -1;
	    }
	    else if (a[6]  > b[6]) {
	        return 1;
	    }
	    
	    //sort by losses
	    if (a[2] < b[2]) {
	    	return -1;
	    }
	    else if (a[2]  > b[2]) {
	        return 1;
	    }
	    
	    //sort by maxRound
	    if (a[5]  < b[5] ) {
	    	return 1;
	    }
	    else if (a[5]  > b[5]) {
	        return -1;
	    }
	    
	    //sort by wins
	    /*
	    if (a[1]  < b[1] ) {
	    	return 1;
	    }
	    else if (a[1]  > b[1]) {
	        return -1;
	    }
	    */
	    
	    //sort by seed
	    if (a[3] < b[3]) {
	    	return -1;
	    }
	    else if (a[3]  > b[3]) {
	        return 1;
	    }
	    
	    return 0;
	});
	
	//pump html into final array
	var tempHtmlArr = [];
	var widthAdj = {
			width: '60px'
		};
	for (var i = 0; i < tempArr.length; i++) {
		tempHtmlArr.push(<div className={"rank"}>{i + 1}</div>);
		tempHtmlArr.push(<div className={"flag"}><img  src={tempArr[i][0].flagPathSVG} width={32} /></div>);
		tempHtmlArr.push(<div className={"time"} style = {widthAdj}>{tempArr[i][4]}</div>);
		tempHtmlArr.push(<div className={"time"}>{tempArr[i][1]}</div>);
		tempHtmlArr.push(<div className={"time"}>{tempArr[i][2]}</div>);
		
		packagedArray.push(<div className={"chart-row"}>{tempHtmlArr}</div>);
		
		tempHtmlArr = [];
	}
	
	return packagedArray;
}
  
