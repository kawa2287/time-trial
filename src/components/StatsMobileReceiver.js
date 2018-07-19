import React from 'react';
import StatsMobileTile from './StatsMobileTile';

export default class StatsMobileReceiver extends React.Component {

	render(){
		
		if(this.props.masterGameObject !==null && this.props.masterGameObject !== undefined){

			var rankedArray = [];
			var parsedArray = [];
			var playersArray = [];
			
			var cloned = JSON.parse(JSON.stringify(this.props.players));
			
			for (var k in cloned){
				cloned[k].wins=0;
				cloned[k].losses=0;
				playersArray.push(cloned[k]);
			}
			
			console.log('playersArray before',JSON.parse(JSON.stringify(playersArray)));
			
			for(k = 0 ; k < playersArray.length; k++){
				for (var x in this.props.masterGameObject){
					
					if(playersArray[k].name == this.props.masterGameObject[x].winner){
	
						playersArray[k].wins = playersArray[k].wins + 1;
						console.log('adding a win for '+playersArray[k].name);
					}
					if(playersArray[k].name == this.props.masterGameObject[x].loser){
				
						playersArray[k].losses += 1;
						console.log('adding a loss for '+playersArray[k].name);
					}
				}
			}
			
			console.log('playersArray',JSON.parse(JSON.stringify(playersArray)));

			
			for(var i = 0; i < playersArray.length; i++){
				if (playersArray[i].name !== 'BYE'){
					parsedArray.push(playersArray[i]);
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
		}
		
		
		
		
		return(
			<div>
				{rankedArray.map(element => element)}
			</div>
		);
	}
}
  
