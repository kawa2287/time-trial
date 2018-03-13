import React from 'react';
import SkyLight from 'react-skylight';
import TimeTrialTemplate from './TimeTrialTemplate';

class TimeTrialPopUp extends React.Component {
  constructor(props){
    super(props);
    this.state={
      timeElapsed: 0,
      lastClearedIncrementer: null,
      completions:0
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
  
  handleStopMainTimer(x){
    this.setState((state) => {
      if(state.completions >= 3) return clearInterval(this.incrementer);
      else return (
        {completions: state.completions + 1}
      );
    });
    console.log(this.state.timeElapsed);
    console.log(this.state.completions);
  }

  render() {
    
    var timeTrialDialog = {
      backgroundColor: '#786B9C',
      color: '#ffffff',
      width: '80%',
      height: '600px',
      marginTop: '-300px',
      marginLeft: '-40%',
    };

    return (
      <div className="task-preview">
          <img src="./img/buttons/timeTrials.png" onClick={() => this.customDialog.show()}></img>
          <h2 className="name">Time Trials</h2>

          <SkyLight dialogStyles={timeTrialDialog} hideOnOverlayClicked ref={ref => this.customDialog = ref} >
            <div className ="ttWrap">
                <div className="ttQuad">
                    <TimeTrialTemplate 
                    players={this.props.players} 
                    timeElapsed={this.state.timeElapsed}
                    finishHandle={this.handleStopMainTimer.bind(this)}
                    position={"A"}
                    />
                </div>
                <div className="ttQuad">
                    <TimeTrialTemplate 
                    players={this.props.players}
                    timeElapsed={this.state.timeElapsed}
                    finishHandle={this.handleStopMainTimer.bind(this)}
                    position={"B"}
                    />
                </div>
                <div className="ttQuad">
                    <TimeTrialTemplate 
                    players={this.props.players} 
                    timeElapsed={this.state.timeElapsed}
                    finishHandle={this.handleStopMainTimer.bind(this)}
                    position={"C"}
                    />
                </div>
                <div className="ttQuad">
                    <TimeTrialTemplate 
                    players={this.props.players} 
                    finishHandle={this.handleStopMainTimer.bind(this)}
                    position={"D"}
                    timeElapsed={this.state.timeElapsed}
                    />
                </div>
            </div>
            <button onClick={this.handleStartClick.bind(this)}>Start Timer</button>
          </SkyLight>
      </div>
    );
  }
}

TimeTrialPopUp.displayName = 'Time Trials';

export default TimeTrialPopUp;