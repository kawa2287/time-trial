import React from 'react';
import SkyLight from 'react-skylight';
import TimeTrialTemplate from './TimeTrialTemplate';
import Flag from './Flag';

const formattedSeconds = (sec) =>
	Math.floor(sec) + '.' + 
	(sec < 1 ? Math.round(Math.floor(sec*10)) : Math.round(10*( (Math.floor(sec*10)/10) % (Math.floor(sec)))) ) +
	Math.floor((sec % 0.1)*100);

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
			keyPress : null,
			name: '',
			timerToggle: 0,
			stopTime: 0
		};
		this.incrementer = null;
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
			this.setState({timerToggle : 2});
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
	
	// handle stop time
    handleStopClick() {
		if(this.state.timerToggle == 1 ) {
	    	this.setState({ 
	    		stopTime : this.state.timeElapsed, 
	    		 }, 
	    		function afterClick () {
					this.handleSubmit(this.props.name, formattedSeconds(this.state.stopTime));
				}
			);
		} 
	}

	handleSubmit(name, time)
	{
		clearInterval(this.incrementer);
		this.setState({
			name : name,
			timeElapsed : time,
			timeSwitch : 1
		});
	}

	handleSubmitClick()
	{
		this.props.addTimeTrial(this.state.name,this.state.timeElapsed);
		this.cancelGroup();
	}
  
    handleReset(){
    	clearInterval(this.incrementer);
		this.setState({
	    	nTeams:0,
	    	timeElapsed:0,
	    	timeSwitch:0,
	    	completions:0,
	    	keyPress : null,
			timerOn : false,
			stopTime:0,
			timerToggle:0
		});
    }
    
    hideInput(){
    	this.setState({},function afterClick(){
    		this.customDialog.hide();
    	});
	}
	
	cancelGroup(){
		this.handleReset();
		this.props.hideInput();
	}



	render() {
	
	var timeTrialDialog = {
		    backgroundColor: '#303030',
		    color: 'white',
		    width: '50%',
		    height: '50%',
		    position: 'fixed',
		    top: '25%',
		    left: '25%',
		    marginTop: '0px',
		    marginLeft: '0px%',
		    padding: '0px'
		};
	
	var closeButtonStyle ={
		fontSize: '0em'
	};
	
	var buttonText = {
		color : this.state.timeSwitch == 0 ? 'grey' : 'white'
	};

	var buttonColor = {
		backgroundColor : this.state.timerToggle == 1 ? 'red' : null
	}

	var playerNames = [];
	var flagLoc = "";

	for (var x in this.props.players){
		if(this.props.players[x].name == this.props.name)
		{
			flagLoc = this.props.players[x].country.flagPathSVG;
		}
	}


	
	

	return (
		<div className ="ttWrap">
			
			<div className ="tt-top">

				<div className = "tt-tl-quad">
						<img className = "flagShadow" width={'75%'} src={flagLoc} />
				</div>

				<div className = "tt-tr-quad">
					<div className = "tt-pname">
						<p className = "ttText">{this.props.name}</p>
						
					</div>
					<div className = "tt-pctry">
						<p className = "ttText">{this.props.country}</p>
					</div>
				</div>
			</div>

			<div className = "tt-bottom">

				<div className = "tt-bl-quad">
					{this.state.timerToggle == 1 ? formattedSeconds(this.state.timeElapsed) : formattedSeconds(this.state.stopTime)}
				</div>

				<div className = "tt-br-quad">

					<div className = "tt-Timer-Button">
						<button 
						className="ttFinishButton" 
						style = {buttonColor}
						onClick={this.TimerButton.bind(this)}>
							{this.state.timerToggle == 0 ? 'Start' : 'Stop'}
						</button>
					</div>

					<div className="tt-BR-Buttons">
						<button 
							className='ttButton' 
							style = {buttonText}
							onClick={this.state.timerToggle == 2 ?  this.handleSubmitClick.bind(this) : null}
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
				</div>``
			</div>
		</div>
	);
  }
}

TimeTrialPopUp.displayName = 'Time Trials';

export default TimeTrialPopUp;