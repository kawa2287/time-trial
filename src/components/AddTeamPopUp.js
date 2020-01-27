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
		    width: '50%',
		    height: '50%',
		    position: 'fixed',
		    top: '25%',
		    left: '25%',
		    marginTop: '0px',
		    marginLeft: '0px',
			padding: '0px',
			display: 'flex'
		};
		
		var closeButtonStyle ={
			fontSize: '0em'
		};

		return (
		    <div className="row"  
		    	onClick={ () => this.customDialog.show() }
				style={this.props.style}
		    >
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