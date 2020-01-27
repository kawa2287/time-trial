
'use strict';

import React, { Component } from 'react';
import TimeTrialLine from './TimeTrialLine';
import TimeTrialHeaderLine from './TimeTrialHeaderLine';
import TeamInputForm from './TeamInputForm';
import SkyLight from 'react-skylight';
import TimeTrialPopUp from './TimeTrialPopUp';


export default class Table extends Component {
	constructor(props){
		super(props);
		this.setSplitTimes = this.setSplitTimes.bind(this);
		this.state={
			name : "",
			country : null,
			time : "",
			toggle : ""
		};
	}
	
	setSplitTimes(playersArray){
		for (var n in playersArray){
		    playersArray[n].seed = Number(n) + 1;
		    if (playersArray[n].bestTime == '-'){
				playersArray[n].splitTime = '';
		    } else {
				playersArray[n].splitTime = Math.round((playersArray[n].bestTime - this.props.bestTime)*100)/100;
		    }
		}
	}
	
	clickHandle(name,country,time, toggle){
		this.setState({
			name : name,
			country : country,
			time : time,
			toggle : toggle
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
		    width: '50%',
		    height: '50%',
		    position: 'fixed',
		    top: '25%',
		    left: '25%',
		    marginTop: '0px',
		    marginLeft: '0px',
		    padding: '0px'
		};
		
		var closeButtonStyle ={
			fontSize: '0em'
		};

		function compare(a, b){
		    if(a.bestTime == '-'){
				return 1;
		    } else if (b.bestTime =='-'){
				return -1;
		    } else if( a.bestTime == b.bestTime){
				return Math.max(a.timeTrial,a.timeTrial2) - Math.max(b.timeTrial,b.timeTrial2);
		    }else{
				return a.bestTime - b.bestTime;
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
			chartLines.push(
				<TimeTrialLine
					seed={playersArray[i].seed}
					country={playersArray[i].country.name}
					flagPath={playersArray[i].country.flagPathSVG}
					name={playersArray[i].name}
					timeTrial={playersArray[i].timeTrial}
					timeTrial2={playersArray[i].timeTrial2}
					bestTime={playersArray[i].bestTime}
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
		    		<PopUpDecider 
				    	addTeamClick={this.props.addTeamClick}
				    	geo={dialogStyles}
				    	hideInput={this.hideInput.bind(this)}
				    	name={this.state.name}
				    	country={this.state.country}
				    	time={this.state.time}
				    	editPlayer={this.props.editPlayer}
						mode='edit'
						players={this.props.players}
						addTimeTrial={this.props.addTimeTrial}
						style={this.props.mainOptionButtons}
						toggle={this.state.toggle}
						hideInput={this.hideInput.bind(this)}
			    	/>
				    
			    </SkyLight>
		    </div>
		);
    }
}


class PopUpDecider extends Component
{
	render()
	{
		console.log(this.props.players);
		var thing = [];
		if(this.props.toggle == "edit")
		{
			thing.push(<TeamInputForm 
				addTeamClick={this.props.addTeamClick}
				geo={this.props.geo}
				hideInput={this.props.hideInput}
				name={this.props.name}
				country={this.props.country}
				time={this.props.time}
				editPlayer={this.props.editPlayer}
				mode='edit'
			/>);
		}
		else if (this.props.toggle == "timeTrial")
		{
			thing.push(<TimeTrialPopUp
				players={this.props.players}
				addTimeTrial={this.props.addTimeTrial}
				name={this.props.name}
				country={this.props.country}
				style={this.props.mainOptionButtons}
				hideInput={this.props.hideInput}
			/>);
		}
		return (
			<div className = "ttWrap">
				{thing.map(display => display)}
			</div>
		)
	}
}
