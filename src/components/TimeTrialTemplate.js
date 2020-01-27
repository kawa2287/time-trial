'use strict';

import React from 'react';
import Flag from './Flag';

const formattedSeconds = (sec) =>
	Math.floor(sec) + '.' + 
	(sec < 1 ? Math.round(Math.floor(sec*10)) : Math.round(10*( (Math.floor(sec*10)/10) % (Math.floor(sec)))) ) +
	Math.floor((sec % 0.1)*100);

export default class TimeTrialTemplate extends React.Component {
	constructor(props){
		super(props);
	
		this.state={
			name: '',
		    country:'Select Country',
		    players: this.props.players,
		    timeElapsed: 0,
		    stopSwitch: null,
		    stopTime: 0,
			finish: 0,
			timerToggle: 0
		};
		this.incrementer = null;
    }

	// handle controller support
    handleStopClick() {
		if(this.state.timerToggle == 1 ) {
	    	this.setState({ 
	    		stopTime : this.state.timeElapsed, 
	    		 }, 
	    		function afterClick () {
					this.props.handleSubmit(this.props.name, formattedSeconds(this.state.stopTime));
				}
			);
		} else {
			console.log("ALREADY INPUT");
		}
	}

	//TimerButton Controller
	TimerButton()
	{
		if(this.state.timerToggle == 0)
		{
			//start time
			this.handleStartButton();
			this.setState({timerToggle : 1});
		}
		else if(this.state.timerToggle == 1)
		{
			//Stop Time
			this.handleStopClick();
			this.setState({timerToggle : 0});
		}
	}
	
	
	// handle button start time
	handleStartButton() 
	{
		this.incrementer = setInterval( () =>
			this.setState({
				timeElapsed: this.state.timeElapsed + .01
			}),10
		);
    }
    
    
    componentWillReceiveProps(nextProps){
    	if(nextProps.stopTime !== this.props.stopTime){
    		this.handleStopClick();
    	}
    }
  
    render() {
	
		var playerNames = [];
		var flagLoc = "";

		for (var x in this.state.players){
		    playerNames.push({
				name : this.state.players[x].name,
				timeTrial : this.state.players[x].timeTrial
			});
			if(this.props.players[x].name == this.props.name)
			{
				flagLoc = this.props.players[x].country.flagPathSVG;
			}
		}

	
		return (
		    <div className ="ttQuad" background-color={this.state.finish == 0 ? '#584E72' : '#FFD700'}>
				
				<div className="ttInputName">
					<input  
						className="ttInputBoxStyle"
				    	list="playerList" 
				    	placeholder="Select Player" 
						value={this.props.name}
						onChange={(e)=>{this.setState({name: e.target.value})}} 
				    	type="text" id="name" 
					/>
					<datalist id="playerList">
					    {playerNames.map((element, i) => <option data-id={i} value={element.name} label={element.timeTrial}/>)}
					</datalist>
				</div>
				<div className="ttSector">
					<div className="ttZone">
						<div className="ttFlag">
							<img width={'50%'} src={flagLoc} />
						</div>
						<div className="ttTime">
							{this.state.timerToggle == 1 ? formattedSeconds(this.state.timeElapsed) : formattedSeconds(this.state.stopTime)}
						</div>
					</div>
			
			
					<div className="ttControlButton">
						<button className="ttFinishButton" onClick={this.TimerButton.bind(this)}>
							{this.state.timerToggle == 0 ? 'Start' : 'Stop'}
						</button>
					</div>
				</div>
		    </div>
		);
    }
}