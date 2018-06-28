import React from 'react';
import SkyLight from 'react-skylight';
import TeamInputForm from './TeamInputForm';

class AddTeamPopUp extends React.Component {
	constructor(props){
		super(props);
	}
	
	hideInput(){
		this.customDialog.hide();
	}

    render() {
    	
	
		var addTeamDialog = {
		    backgroundColor: '#303030',
		    color: '#494949',
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

		return (
		    <div className="row"  onClick={() => this.customDialog.show()}>
		    	<div className = "picture">
			    	<img src="./img/buttons/addUser.png" ></img>
		    	</div>
		    	<div className = "desc">
	    					Add Team
    					</div>
			    <SkyLight 
			    	closeButtonStyle={closeButtonStyle}
			    	dialogStyles={addTeamDialog} hideOnOverlayClicked 
			    	ref={ref => this.customDialog = ref} 
		    	>
				    <TeamInputForm 
				    	addTeamClick={this.props.addTeamClick}
				    	geo={addTeamDialog}
				    	hideInput={this.hideInput.bind(this)}
				    	name=""
				    	country={null}
				    	editPlayer={this.props.editPlayer}
				    	mode='add'
			    	/>
			    </SkyLight>
		    </div>
		);
    }
}

AddTeamPopUp.displayName = 'Add Team';

export default AddTeamPopUp;