import React from 'react';
import StatsMobileTile from './StatsMobileTile';

export default class StatsMobileReceiver extends React.Component {

	render(){
		
		var rankedArray = [];
		var parsedArray = [];
		
		for(var i = 0; i < this.props.seededArray.length; i++){
			if (this.props.seededArray[i].name !== 'BYE'){
				parsedArray.push(this.props.seededArray[i]);
			}
		}
		
		parsedArray.sort(function(a, b) {
			
			//sort by final4Spot
		    if (a.final4Spot < b.final4Spot) {
		    	return -1;
		    } else if (a.final4Spot > b.final4Spot) {
		        return 1;
		    }
		    
		    //sort by losses
		    if (a.losses < b.losses) {
		    	return -1;
		    }else if (a.losses > b.losses) {
		        return 1;
		    }
		    
		    //sort by maxRound
		    if (a.maxRound  < b.maxRound ) {
		    	return 1;
		    } else if (a.maxRound  > b.maxRound ) {
		        return -1;
		    }
		    
		    //sort by seed
		    if (a.seed < b.seed) {
		    	return -1;
		    }else if (a.seed  > b.seed) {
		        return 1;
		    }
		    
		    return 0;
		});
		
		for (var i = 0; i < parsedArray.length; i++){
			rankedArray.push(
				<StatsMobileTile
					rank = {i+1}
					player = {parsedArray[i]}
				/>
			);
		}
		
		
		return(
			<div>
				{rankedArray.map(element => element)}
			</div>
		);
	}
}
  
