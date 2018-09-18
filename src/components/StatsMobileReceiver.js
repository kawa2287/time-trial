import React from 'react';
import StatsMobileTile from './StatsMobileTile';

var tile = {
    fontSize: 'x-small',
    fontWeight: 'bold',
    background: 'white',
    color: 'black'
};

var text ={
    fontSize: 'x-small',
    fontWeight: 'bold',
    color: 'black'
};



export default class StatsMobileReceiver extends React.Component {
	constructor(props){
		super(props);
		this.state={
			render:'Overall'
		};
	}
	
	HandleRender(compName,e){
		this.setState({render:compName});
	}
	
	
	RenderSubComp(players){
		var tempArray = [];
		var divArray = this.ExtractDivisions(players);
		var divisions = [];
		var conferences = [];
		var confToggle = 0;
		var tempPlayers = [];
		var overallArray = [];
		
		for (var n = 0; n < divArray.length; n++){
			if ( n == 0){
				conferences.push(divArray[n].conference);
				divisions.push(divArray[n].primary);
			} else {
				for (var p = 0; p < conferences.length; p++){
					if (conferences[p] == divArray[n].conference){
						confToggle = 1;
					}
				}
				
				if (confToggle == 0 ){
					conferences.push(divArray[n].conference);
				}
				divisions.push(divArray[n].primary);
				confToggle = 0;
				
			}
			
		}

        switch(this.state.render){
        	
            case 'Overall':
            	this.SortData(players);
            	for (var i = 0; i < players.length; i++){
					tempArray.push(
						<StatsMobileTile
							rank = {i+1}
							player = {players[i]}
						/>
					);
				}
            	return ([
        			<StatsFrame
						rankedArray = {tempArray}
					/>
				]);
            	
    		case 'Conference': 
    			
    			for (i = 0; i < conferences.length; i++){
    				tempArray = [];
    				tempPlayers = [];
    				//sift through players in specified conference
    				for (var k =0; k < players.length; k++){
    					if (conferences[i] == players[k].mascot) {
    						tempPlayers.push(players[k]);
    					}
    				}
    				
    				//sort and populate
    				this.SortData(tempPlayers);
    				for (var x = 0; x < tempPlayers.length; x++){
						tempArray.push(
							<StatsMobileTile
								rank = {x+1}
								player = {tempPlayers[x]}
							/>
						);
					}
					overallArray.push(
						<StatsFrame
							rankedArray = {tempArray}
						/>
					);
    			}
    			
            	return overallArray;
            	
    		case 'Division': 
            	for (i = 0; i < divisions.length; i++){
    				tempArray = [];
    				tempPlayers = [];
    				//sift through players in specified conference
    				for (var k =0; k < players.length; k++){
    					if (divisions[i] == players[k].primaryColor) {
    						tempPlayers.push(players[k]);
    					}
    				}
    				
    				//sort and populate
    				this.SortData(tempPlayers);
    				for (var x = 0; x < tempPlayers.length; x++){
						tempArray.push(
							<StatsMobileTile
								rank = {x+1}
								player = {tempPlayers[x]}
							/>
						);
					}
					overallArray.push(
						<StatsFrame
							rankedArray = {tempArray}
						/>
					);
    			}
    			
            	return overallArray;
        }
    }
    
    
    SortData(dataToSort){
    	
    	dataToSort.sort(function(a, b) {
				
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
		
		return dataToSort;
    }
    
    ExtractDivisions(players){
    	var tempArray = [];
    	var toggle = 0;
    	for(var x = 0; x < players.length ; x++){
    		if (x == 0){
    			tempArray.push({
    				conference : players[x].mascot,
    				primary: players[x].primaryColor,
    				secondary : players[x].secondaryColor
    			});
    		} else {
    			for (var y = 0; y < tempArray.length; y++){
    				if ((tempArray[y].conference == players[x].mascot) && 
    					(tempArray[y].primary == players[x].primaryColor) && 
    					(tempArray[y].secondary == players[x].secondaryColor))
					{
    					toggle = 1;
    				}
    			}
    			if (toggle == 0){
    				tempArray.push({
	    				conference : players[x].mascot,
	    				primary: players[x].primaryColor,
	    				secondary : players[x].secondaryColor
	    			});
    			}
    			toggle = 0;
    		}
    	}
    	
    	tempArray.sort(function(a, b) {
			//sort by conference
		    if (a.conference < b.conference) {
		    	return -1;
		    } else if (a.conference > b.conference) {
		        return 1;
		    }
    	});
    	
    	return tempArray;
    }
    
    
    

	render(){
		
		if(this.props.masterGameObject !==null && this.props.masterGameObject !== undefined){

			var parsedArray = [];
			var playersArray = [];
			
			var cloned = JSON.parse(JSON.stringify(this.props.players));
			
			for (var k in cloned){
				playersArray.push(cloned[k]);
			}
			
			
			for(k = 0 ; k < playersArray.length; k++){
				for (var x in this.props.masterGameObject){
					
					if(playersArray[k].name == this.props.masterGameObject[x].winner){
	
						playersArray[k].wins += 1;
					}
					if(playersArray[k].name == this.props.masterGameObject[x].loser){
				
						playersArray[k].losses += 1;
					}
				}
			}

			
			for(var i = 0; i < playersArray.length; i++){
				if (playersArray[i].name !== 'BYE'){
					parsedArray.push(playersArray[i]);
				}
			}
			
			var displyCharts = [];
			displyCharts = this.RenderSubComp(parsedArray);
			
		}
		
		return(
			<div>
				<div className="mmButtonContainer">
					<div 
						className="mmButton" 
						onClick={this.HandleRender.bind(this,'Overall')}
					>
						Overall
					</div>
					<div 
						className="mmButton" 
						onClick={this.HandleRender.bind(this,'Conference')}
					>
						Conference
					</div>
					<div 
						className="mmButton" 
						onClick={this.HandleRender.bind(this,'Division')}
					>
						Division
					</div>
				</div>
				
				{displyCharts.map(element => element)}
			
				
			</div>
		);
	}
}

class StatsFrame extends React.Component {
	render(){
		return(
			<div>
				<div className="smTile" style={tile}>
			
					<div className="smRank" style={text}>
						Rank
					</div>
					<div className="smDivision" style={text}>
						Div
					</div>
					<div className="smSeed" style={text}>
						Seed
					</div>
					<div className="smFlag" style={text}>
						Ctry
					</div>
					<div className="smName" style={text}>
						Name
					</div>
					<div className="smStat" style={text}>
						TT
					</div>
					<div className="smStat" style={text}>
						W
					</div>
					<div className="smStat" style={text}> 
						L
					</div>
					
				</div>
				{this.props.rankedArray.map(element => element)}
				
			</div>
		);
	}
}

