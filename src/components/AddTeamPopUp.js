import React from 'react';
import SkyLight from 'react-skylight';
import TeamInputForm from './TeamInputForm';

class AddTeamPopUp extends React.Component {
	constructor(props){
		super(props);
	}

    render() {
    	
	
		var addTeamDialog = {
		    backgroundColor: '#303030',
		    color: '#494949',
		    width: '860',
		    height: '560',
		    position: 'fixed',
		    top: '50%',
		    left: '50%',
		    marginTop: '-300',
		    marginLeft: '-500'
		};

		return (
		    <div className="task-preview">
			    <img src="./img/buttons/addUser.png" onClick={() => this.customDialog.show()}></img>
			    <h2 className="name">Add Team</h2>
			    <SkyLight dialogStyles={addTeamDialog} hideOnOverlayClicked ref={ref => this.customDialog = ref} >
				    <TeamInputForm 
				    	addTeamClick={this.props.addTeamClick}
				    	geo={addTeamDialog}
			    	/>
			    </SkyLight>
		    </div>
		);
    }
}

AddTeamPopUp.displayName = 'Add Team';

export default AddTeamPopUp;