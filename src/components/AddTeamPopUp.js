import React from 'react';
import SkyLight from 'react-skylight';
import TeamInputForm from './TeamInputForm';

class AddTeamPopUp extends React.Component {
  constructor(props){
	super(props);
  }

  render() {
	
	var addTeamDialog = {
	  backgroundColor: '#00897B',
	  color: '#ffffff',
	  width: '40%',
	  height: '400px',
	  marginTop: '-300px',
	  marginLeft: '-20%',
	};

	return (
	  <div className="task-preview">
		  <img src="./img/buttons/addUser.png" onClick={() => this.customDialog.show()}></img>
		  <h2 className="name">Add Team</h2>
		  <SkyLight dialogStyles={addTeamDialog} hideOnOverlayClicked ref={ref => this.customDialog = ref} >
			  <TeamInputForm addTeamClick={this.props.addTeamClick}/>
		  </SkyLight>
	  </div>
	);
  }
}

AddTeamPopUp.displayName = 'Add Team';

export default AddTeamPopUp;