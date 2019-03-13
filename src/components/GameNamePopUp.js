import React from 'react';
import SkyLight from 'react-skylight';

var textProps = {
	color : '#dfdfdf',
	textShadow : '0 0 3px #939393'
};

var inputStyle = {
	color : '#dfdfdf'
};

var mainWrapper = {
	display: 'flex',
	height:'100%',
	width:'100%',
	alignItems:'center',
	justifyContent:'center'
};

var inputWrapper = {
    display: 'flex',
    flex: '1',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
};

export default class GameNamePopUp extends React.Component {
	constructor(props){
		super(props);
		this.state={
			name : null
		};
	}
	
	hideInput(){
		this.customDialog.hide();
	}
	
	 onSubmitClick(){
		
    	if((/\d/.test(this.state.name) || /[a-zA-Z]/.test(this.state.name)) && this.state.name !== null){
    		this.props.SetGameName(this.state.name);
			
			this.setState({
					name : null
			    }, function afterClick(){
			    	this.hideInput();
			    }
		    );
    	}
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
			    	<img src="./img/buttons/game.png" ></img>
		    	</div>
		    	<div className = "desc">
	    					Create Game
    					</div>
			    <SkyLight 
			    	closeButtonStyle={closeButtonStyle}
			    	dialogStyles={addTeamDialog} hideOnOverlayClicked 
			    	ref={ref => this.customDialog = ref} 
		    	>
		    		<div style={mainWrapper}>
			    		<div className='input-wrapper' style={inputWrapper} >
							<div className='input-inner-wrapper'>
								<div className='halfportion'>
								
									<div className='quad'>
										<div className='TeamSectorInput'>
											<div className='enter-text'>
												<input 
													className='input-info'
													style={inputStyle}
													value={this.state.name} 
													type="text" 
													id="name" 
													onChange={(e)=>{this.setState({name: e.target.value})}}
												/>
											</div>
										</div>
										<div className='TeamSectorText'>
											<div className='enter-text'>
												<h1 className='maintext' style={textProps}>Enter Name</h1>
											</div>
										</div>
									</div>
									
									<div className='quad'>
									</div>
								</div>
								<div className='halfportion2'>
									<div className='TeamButtons'>
										<button 
											className='typical-button'
											onClick={this.onSubmitClick.bind(this)}
										>
											Submit
										</button>
									</div>
									<div className='TeamButtons'>
										<button 
											className='typical-button'
											onClick={this.onCancelClick.bind(this)}
										>
											Cancel
										</button>
									</div>
								</div>	
							</div>
					    </div>
				    </div>
			    </SkyLight>
		    </div>
		);
    }
}
