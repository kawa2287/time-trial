'use strict';

import React, { Component } from 'react';

export default class TimeTrialLine extends Component{
	
	clickHandle()
	{
		this.props.clickHandle(this.props.name,this.props.country,this.props.timeTrial,"edit");
	}

	clickHandleTimeTrial()
	{
		this.props.clickHandle(this.props.name,this.props.country,this.props.timeTrial,"timeTrial");
	}
	
	removePlayerHandle(){
		var answer = window.confirm('Are you sure you wish to delete this item?');
	
		if (answer== true){
			this.props.handleRemovePlayer(this.props.name);
		}
		
	}
	
	render(){
	
		return(
		    <div className="cTile" >
    			<div 
    				className="cMain"
	    			onClick={this.clickHandleTimeTrial.bind(this)}
	    		>
			    	<div className="cSeed">
			    		{this.props.seed}
			    	</div>
			    	<div className="cFlag">
			    		<img className = "flagShadow" src={this.props.flagPath} />
			    	</div>
			    	<div className="cInfo">
			    		<div className="cName">
			    			{this.props.name}
			    		</div>
			    		<div className="cTimes">
							<div className="cTimeTrial">
			    				{this.props.timeTrial=='-'?'-':this.props.timeTrial.toFixed(2)}
			    			</div>
							<div className="cTimeTrial">
			    				{this.props.timeTrial2=='-'?'-':this.props.timeTrial2.toFixed(2)}
			    			</div>
			    			<div className="cBestTime">
			    				{this.props.bestTime=='-'?'-':this.props.bestTime.toFixed(2)}
			    			</div>
			    			<div className="cSplit">
			    				{this.props.splitTime==''?'':("+" + String(this.props.splitTime.toFixed(2)))}
			    			</div>
			    		</div>
			    	</div>
		    	</div>
		    	<div 
		    		className="cDelete"
		    		onClick={this.removePlayerHandle.bind(this)}
	    		>
		    		<img src={"/img/buttons/trash.svg"} />
		    	</div>
				<div 
		    		className="cDelete"
		    		onClick={this.clickHandle.bind(this)}
	    		>
		    		<img src={"/img/buttons/gear.svg"} />
		    	</div>
		    </div>
		);
	}
}