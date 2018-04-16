import React from 'react';
import SkyLight from 'react-skylight';

class VsMatchup extends React.Component {

  render() {
    
    var timeTrialDialog = {
      backgroundColor: '#786B9C',
      color: '#ffffff',
      width: '70%',
      height: '600px',
      marginTop: '-300px',
      marginLeft: '-40%',
    };

    return (
        <SkyLight dialogStyles={timeTrialDialog} hideOnOverlayClicked ref={ref => this.customDialog = ref} >
        </SkyLight>
    );
  }
}


export default VsMatchup;