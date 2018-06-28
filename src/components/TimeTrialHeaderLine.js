'use strict';

import React, { Component } from 'react';

var divStyle = {
  color: 'black',
  fontStyle: 'normal',
  fontFamily: 'sans-serif',
  fontWeight: 'bolder'
};

export default class TimeTrialHeaderLine extends Component{
	
	render(){
	
		return(
		    <div className="cTile">
		    	<div className="cSeed" style={divStyle}>
		    		{'Seed'}
		    	</div>
		    	<div className="cFlag"/>
		    	<div className="cInfo">
		    		<div className="cName" style={divStyle}>
		    			{'Player Name'}
		    		</div>
		    		<div className="cTimes">
		    			<div className="cTimeTrial" style={divStyle}>
		    				{'Time'}
		    			</div>
		    			<div className="cSplit" style={divStyle}>
		    				{'Split'}
		    			</div>
		    		</div>
		    	</div>
		    	<div className="cDelete">
	    		</div>
		    </div>
		);
	}
}