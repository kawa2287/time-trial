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
      nTeams:3
    };
    this.incrementer = null;
  }

  handleStartClick() {
    this.incrementer = setInterval( () =>
      this.setState({
        timeElapsed: this.state.timeElapsed + .01
      })
    , 10);
  }
  
  handleStopMainTimer(){
    
    this.setState((state) => {
      if(state.completions >= 3) return clearInterval(this.incrementer);
      else return (
        {completions: state.completions + 1}
      );
    });
  }

  render() {
    
    var timeTrialDialog = {
      backgroundColor: '#786B9C',
      color: '#ffffff',
      width: '70%',
      height: '600px',
      marginTop: '-300px',
      marginLeft: '-40%',
    };
    
    var templates = [];
    
    for (var i = 0; i < this.state.nTeams; i++){
      templates.push(<TimeTrialTemplate 
                    players={this.props.players} 
                    timeElapsed={this.state.timeElapsed}
                    finishHandle={this.handleStopMainTimer.bind(this)}
                    addTimeTrial={this.props.addTimeTrial}
                    position={i}
                    key={i}
      /> );
    }

    return (
      <div className="task-preview">
          <img src="./img/buttons/timeTrials.png" onClick={() => this.customDialog.show()}></img>
          <h2 className="name">Time Trials</h2>

          <SkyLight dialogStyles={timeTrialDialog} hideOnOverlayClicked ref={ref => this.customDialog = ref} >
            <div className ="ttWrap">
              <div className ="timeTrialTop">
                
                <p className="switch-title">Select Number of Time Trials</p>
  
          			<label for="switch_1">
                  <input type="radio" id="switch_1" name="nPlayerSelection"/>
                  <span>1</span>
                </label>
                
          			<label for="switch_1">
                  <input type="radio" id="switch_2" name="nPlayerSelection" />
                  <span>2</span>
          			</label>
          			
                <label for="switch_3">
            			<input type="radio" id="switch_3" name="nPlayerSelection" />
                  <span>3</span>
                </label>
          			
          			<label for="switch_4">
            			<input type="radio" id="switch_4" name="nPlayerSelection" />
                  <span>4</span>
                </label>
                
              </div>
              <div className ="timeTrialMid">
              
                    {templates}
                    
              </div>
              <div className="timeTrialTop">
                <button onClick={this.handleStartClick.bind(this)}>Start Timer</button>
              </div>
            </div>
            
          </SkyLight>
      </div>
    );
  }
}

TimeTrialPopUp.displayName = 'Time Trials';

export default TimeTrialPopUp;