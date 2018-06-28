import React from 'react';
import SkyLight from 'react-skylight';
import TimeTrialTemplate from './TimeTrialTemplate';

class TimeTrialPopUp extends React.Component {
	constructor(props){
		super(props);
	
		this.state={
			timeElapsed: 0,
		    lastClearedIncrementer: null,
		    completions:0,
		    nTeams:0,
		    timeSwitch:0,
		    timerOn : false,
		    keyPress : null
		};
		this.incrementer = null;
    }

	// handle controls start time
    handleStartClick(event) {
    	this.setState({
    		keyPress : event.key
    	});
    		
		if(event.key == ' ' && this.state.timerOn == false){
    		this.incrementer = setInterval( () =>
		    	this.setState({
					timeElapsed: this.state.timeElapsed + .01,
					timerOn : true
		    	}, function afterClick() {
		    		this.setState({
		    			keyPress : null
		    		});
		    	}),10
	    	);
    	}
    }
    
    // handle button start time
    handleStartButton() {

		if(this.state.timerOn == false){
    		this.incrementer = setInterval( () =>
		    	this.setState({
					timeElapsed: this.state.timeElapsed + .01,
					timerOn : true
		    	}),10
	    	);
    	}
    }
  
    handleStopMainTimer(){
		if (this.state.completions >= Number(this.state.nTeams) - 1){
	    	clearInterval(this.incrementer);
	    	this.setState({timeSwitch:1});
		} else {
	    	this.setState({completions: this.state.completions + 1});
		}
    }
  
    handleReset(){
    	clearInterval(this.incrementer);
		this.setState({
	    	nTeams:0,
	    	timeElapsed:0,
	    	timeSwitch:0,
	    	completions:0,
	    	keyPress : null,
	    	timerOn : false
		}, function afterClick(){
			this.customDialog.hide();
		});
    }
    
    hideInput(){
    	this.setState({},function afterClick(){
    		this.customDialog.hide();
    	});
	}
	
	cancelGroup(){
		this.handleReset();
		this.hideInput();
	}



	render() {
	
	var timeTrialDialog = {
		    backgroundColor: '#303030',
		    color: 'white',
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
	
	var buttonText = {
		color : this.state.timeSwitch == 0 ? 'grey' : 'black'
	};
	
	var templates = [];
	
	for (var i = 0; i < this.state.nTeams; i++){
		templates.push(
			<TimeTrialTemplate 
				players={this.props.players} 
				timeElapsed={this.state.timeElapsed}
				finishHandle={this.handleStopMainTimer.bind(this)}
				addTimeTrial={this.props.addTimeTrial}
				position={Number(i) + 1}
				key={i}
				stopTime = {this.state.keyPress}
			/> 
		);
	}

	return (
		<div className="row" onClick={() => this.customDialog.show()}>
			<div className = "picture">
				<img src="./img/buttons/timeTrials.png" ></img>
			</div>
			<div className = "desc">
				Timetrial
			</div>
	
			<SkyLight 
				closeButtonStyle={closeButtonStyle}
				dialogStyles={timeTrialDialog} 
				hideOnOverlayClicked ref={ref => this.customDialog = ref} 
			>
				<div className ="ttWrap">
					<div className ="timeTrialTop">
						
						<p className="switch-title">Select Number of Time Trials</p>
		  
						<label for="switch_1">
							<input 
								type="radio" 
								id="switch_1" 
								name="nPlayerSelection"
								onChange={(e)=>{this.setState({nTeams:1})}} 
							/>
							<span>1</span>
						</label>
						
						<label for="switch_1">
							<input 
								type="radio"
								id="switch_2" 
								name="nPlayerSelection"
								onChange={(e)=>{this.setState({nTeams:2})}} 
							/>
							<span>2</span>
						</label>
							
						<label for="switch_3">
							<input 
								type="radio" 
								id="switch_3" 
								name="nPlayerSelection" 
								onChange={(e)=>{this.setState({nTeams:3})}} 
							/>
							<span>3</span>
						</label>
							
						<label for="switch_4">
							<input 
								type="radio" 
								id="switch_4" 
								name="nPlayerSelection" 
								onChange={(e)=>{this.setState({nTeams:4})}} 
							/>
							<span>4</span>
						</label>
						
					</div>
					<div className ="timeTrialMid">{templates}</div>
					<div className="timeTrialBot">
						<input
							className="ttControls"
							type="text"
							id="one" 
							placeholder="Controls Area"
							onKeyPress={this.handleStartClick.bind(this)}
							fontSize={'8px'}
							value = {this.state.keyPress}
						/>
						<button 
							className='ttButton' 
						    onClick={this.handleStartButton.bind(this)}
						>
						  Start Time
						</button>
						<button 
							className='ttButton' 
							style = {buttonText}
						    onClick={this.state.timeSwitch !== 0 ?  this.handleReset.bind(this) : null}
						>
						  Submit Times
						</button>
						<button 
							className='ttButton' 
							onClick={this.cancelGroup.bind(this)}
						>
						  Cancel
						</button>
						
					</div>
				</div>
			</SkyLight>
		</div>
	);
  }
}

TimeTrialPopUp.displayName = 'Time Trials';

export default TimeTrialPopUp;