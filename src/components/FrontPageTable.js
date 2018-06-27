
'use strict';

import React, { Component } from 'react';
import TimeTrialLine from './TimeTrialLine';
import TimeTrialHeaderLine from './TimeTrialHeaderLine';
import TeamAdjustForm from './TeamInputForm';


export default class Table extends Component {
	constructor(props){
		super(props);
		this.setSplitTimes = this.setSplitTimes.bind(this);
	}
	
	setSplitTimes(playersArray){
		for (var n in playersArray){
		    playersArray[n].seed = Number(n) + 1;
		    if (playersArray[n].timeTrial == '-'){
				playersArray[n].splitTime = '';
		    } else {
				playersArray[n].splitTime = Math.round((playersArray[n].timeTrial - this.props.bestTime)*100)/100;
		    }
		}
	}
	
	clickHandle(name,country,time){
		console.log('name',name);
		console.log('country',country);
		console.log('time',time);
	}

	render(){
		
		var adjTeamDialog = {
		    backgroundColor: '#303030',
		    color: '#494949',
		    width: '90%',
		    height: '90%',
		    position: 'fixed',
		    top: '0%',
		    left: '50%',
		    marginTop: '25px',
		    marginLeft: '-45%'
		};

		function compare(a, b){
		    if(a.timeTrial == '-'){
				return 1;
		    } else if (b.timeTrial =='-'){
				return -1;
		    } else {
				return a.timeTrial - b.timeTrial;
		    }
		}

		var playersArray = [];

		for (var n in this.props.players){
		    playersArray.push(this.props.players[n]);
		}

		playersArray.sort(compare);

		//set players seed and split times
		this.setSplitTimes(playersArray);
		
		var chartLines = [];
		
		chartLines.push(<TimeTrialHeaderLine/>);
		
		for (var i in playersArray){
			chartLines.push(<hr width={'100%'}/>);
			chartLines.push(
				<TimeTrialLine
					seed={playersArray[i].seed}
					country={playersArray[i].country.name}
					flagPath={playersArray[i].country.flagPathSVG}
					name={playersArray[i].name}
					timeTrial={playersArray[i].timeTrial}
					splitTime={playersArray[i].splitTime}
					clickHandle={this.clickHandle.bind(this)}
				/>
			);
			
		}

		return(
		    <div className="country-chart">
				{chartLines.map(lineItem => lineItem)}
		    </div>
		);
    }
}

