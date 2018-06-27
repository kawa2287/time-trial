'use strict';

import React, { Component } from 'react';

export default class TimeTrialLine extends Component{
	
	clickHandle(){
		this.props.clickHandle(this.props.name,this.props.country,this.props.timeTrial);
	}
	
	render(){
	
		return(
		    <div 
		    	className="cTile" 
	    		onClick={this.clickHandle.bind(this)}
	    		onTap={this.clickHandle.bind(this)}
    		>
		    	<div className="cSeed">
		    		{this.props.seed}
		    	</div>
		    	<div className="cFlag">
		    		<img src={this.props.flagPath} />
		    	</div>
		    	<div className="cInfo">
		    		<div className="cName">
		    			{this.props.name}
		    		</div>
		    		<div className="cTimes">
		    			<div className="cTimeTrial">
		    				{this.props.timeTrial=='-'?'-':this.props.timeTrial.toFixed(2)}
		    			</div>
		    			<div className="cSplit">
		    				{this.props.splitTime==''?'':("+" + String(this.props.splitTime.toFixed(2)))}
		    			</div>
		    		</div>
		    	</div>
		    </div>
		);
	}
}