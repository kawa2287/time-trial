import React from 'react';
import SkyLight from 'react-skylight';
import Firebase from '../firebase';
import FirebaseGameTile from './FirebaseGameTile';

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

export default class LoadGamePopUp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			firebaseList : null
		};
		
		var tileArray = [];
		var ref = Firebase.database().ref();
		ref.once("value", (snapshot) => {
			for (var i in snapshot.val()){
				tileArray.push(
					<FirebaseGameTile
						gameName = {snapshot.val()[i].gameName}
						seeding = {snapshot.val()[i].seeding}
						order = {snapshot.val()[i].order}
						mode = {snapshot.val()[i].mode}
						players = {snapshot.val()[i].players}
						timeTrialOpen = {snapshot.val()[i].timeTrials}
						LoadGameProps = {this.props.LoadGameProps}
						hideInput = {this.hideInput.bind(this)}
					/>
				);
			}
			this.setState({
				firebaseList : tileArray
			});
		}, function (error) {
		    console.log("Error: " + error.code);
		});
	}
	
	hideInput(){
		console.log('made it here');
		this.customDialog.hide();
	}

    
    onCancelClick(){
    	this.setState({
				name : null
		    }, function afterClick(){
		    	this.hideInput();
		    }
	    );
    }

    render() {

		return (
		    <div 
		    	className="row"  
	    		onClick={this.props.trigger == null? () => this.customDialog.show() : null}
	    		style={this.props.style}
    		>
		    	<div className = "picture">
			    	<img src="./img/buttons/upload.svg" ></img>
		    	</div>
		    	<div className = "desc">
					Load Game
				</div>
			    <SkyLight 
			    	closeButtonStyle={closeButtonStyle}
			    	dialogStyles={addTeamDialog} hideOnOverlayClicked 
			    	ref={ref => this.customDialog = ref} 
		    	>
		    		<div className="lgMain">
		    			{this.state.firebaseList==null?null:this.state.firebaseList.map(element => element)}
		    		</div>
		    		
			    </SkyLight>
		    </div>
		);
    }
}
