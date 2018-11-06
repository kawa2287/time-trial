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
		    timeElapsed: this.props.timeElapsed,
		    stopSwitch: null,
		    stopTime: null,
		    finish: 0
		};
    }

	// handle controller support
    handleStopClick() {
		if(this.state.finish != 1 && this.props.position == this.props.stopTime) {
	    	this.setState({ 
	    		stopSwitch : 1, 
	    		stopTime : this.props.timeElapsed, 
	    		finish:1 }, 
	    		function afterClick () {
					this.props.addTimeTrial(this.state.name, formattedSeconds(this.state.stopTime));
					this.props.finishHandle();
				}
			);
		} else {
			console.log("ALREADY INPUT");
		}
    }
    
    // handle tap support
    handleStopTap() {
		if(this.state.finish != 1 ) {
	    	this.setState({ 
	    		stopSwitch : 1, 
	    		stopTime : this.props.timeElapsed, 
	    		finish:1 }, 
	    		function afterClick () {
					this.props.addTimeTrial(this.state.name, formattedSeconds(this.state.stopTime));
					this.props.finishHandle();
				}
			);
		} else {
			console.log("ALREADY INPUT");
		}
    }
    
    componentWillReceiveProps(nextProps){
    	if(nextProps.stopTime !== this.props.stopTime){
    		this.handleStopClick();
    	}
    }
  
    render() {
	
		var playerNames = [];

		for (var x in this.state.players){
		    playerNames.push({
				name : this.state.players[x].name,
				timeTrial : this.state.players[x].timeTrial
			});
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
							<img width={'50%'} src={typeof(this.state.players[this.state.name]) != "undefined" ? this.state.players[this.state.name].country.flagPathSVG :"/img/flagsSVG/XX.svg"} />
						</div>
						<div className="ttTime">
							{this.state.stopSwitch == null ? formattedSeconds(this.props.timeElapsed) : formattedSeconds(this.state.stopTime)}
						</div>
					</div>
			
			
					<div className="ttControlButton">
						<button className="ttFinishButton" onClick={this.handleStopTap.bind(this)}>
							Finish
						</button>
					</div>
				</div>
		    </div>
		);
    }
}