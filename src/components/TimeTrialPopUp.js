import React from 'react';
import SkyLight from 'react-skylight';
import TimeTrialTemplate from './TimeTrialTemplate';

class TimeTrialPopUp extends React.Component {
  constructor(props){
    super(props);
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
                <TimeTrialTemplate players={this.props.players} position={"A"}/>
              </div>
              <div className="ttQuad">
                <TimeTrialTemplate players={this.props.players} position={"B"}/>
              </div>
              <div className="ttQuad">
                <TimeTrialTemplate players={this.props.players} position={"C"}/>
              </div>
              <div className="ttQuad">
                <TimeTrialTemplate players={this.props.players} position={"D"}/>
              </div>
            </div>
          </SkyLight>
      </div>
    );
  }
}

TimeTrialPopUp.displayName = 'Time Trials';

export default TimeTrialPopUp;