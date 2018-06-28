
'use strict';

import React, { Component } from 'react';
import TimeTrialLine from './TimeTrialLine';
import TimeTrialHeaderLine from './TimeTrialHeaderLine';
import TeamInputForm from './TeamInputForm';
import SkyLight from 'react-skylight';


export default class Table extends Component {
	constructor(props){
		super(props);
		this.setSplitTimes = this.setSplitTimes.bind(this);
		this.state={
			name : "",
			country : null,
			time : ""
		};
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
		this.setState({
			name : name,
			country : country,
			time : time
		});
		this.customDialog.show();
	}
	
	hideInput(){
		this.customDialog.hide();
	}
	
	handleRemovePlayer(name){
		this.props.removePlayer(name);
	}

	render(){
		
		var dialogStyles = {
		    backgroundColor: '#303030',
		    color: '#494949',
		    width: '100%',
		    height: '100%',
		    position: 'fixed',
		    top: '0%',
		    left: '50%',
		    marginTop: '0px',
		    marginLeft: '-50%',
		    padding: '0px'
		};
		
		var closeButtonStyle ={
			fontSize: '0em'
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
			chartLines.push(<hr className="style14" width={'100%'}/>);
			chartLines.push(
				<TimeTrialLine
					seed={playersArray[i].seed}
					country={playersArray[i].country.name}
					flagPath={playersArray[i].country.flagPathSVG}
					name={playersArray[i].name}
					timeTrial={playersArray[i].timeTrial}
					splitTime={playersArray[i].splitTime}
					clickHandle={this.clickHandle.bind(this)}
					handleRemovePlayer={this.handleRemovePlayer.bind(this)}
				/>
			);
			
		}

		return(
		    <div className="country-chart">
				{chartLines.map(lineItem => lineItem)}
				<SkyLight 
			    	closeButtonStyle={closeButtonStyle}
			    	dialogStyles={dialogStyles} hideOnOverlayClicked 
			    	ref={ref => this.customDialog = ref} 
		    	>
		    		<TeamInputForm 
				    	addTeamClick={this.props.addTeamClick}
				    	geo={dialogStyles}
				    	hideInput={this.hideInput.bind(this)}
				    	name={this.state.name}
				    	country={this.state.country}
				    	time={this.state.time}
				    	editPlayer={this.props.editPlayer}
				    	mode='edit'
			    	/>
				    
			    </SkyLight>
		    </div>
		);
    }
}

