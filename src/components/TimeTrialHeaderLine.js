'use strict';

import React, { Component } from 'react';

var divStyle = {
  color: 'gray',
  fontStyle: 'normal',
  fontFamily: 'Bebas Neue',
  fontWeight: 'bolder',
  fontSize: 'large',
  backgroundColor: 'black'
};



export default class TimeTrialHeaderLine extends Component{
	
	render(){
	
		return(
		    <div className="cTileHeader">
		    	<div className="cSeed" style={divStyle}>
		    		{'Rank'}
		    	</div>
		    	<div className="cFlag"/>
		    	<div className="cInfo">
		    		<div className="cName" style={divStyle}>
		    			{'Player Name'}
		    		</div>
		    		<div className="cTimes">
		    			<div className="cTimeTrial" style={divStyle}>
		    				{'TT1'}
		    			</div>
						<div className="cTimeTrial" style={divStyle}>
		    				{'TT2'}
		    			</div>
						<div className="cTimeTrial" style={divStyle}>
		    				{'Best'}
		    			</div>
		    			<div className="cSplit" style={divStyle}>
		    				{'Split'}
		    			</div>
		    		</div>
		    	</div>
		    	<div className="cDelete">
	    		</div>
				<div className="cDelete">
	    		</div>
		    </div>
		);
	}
}