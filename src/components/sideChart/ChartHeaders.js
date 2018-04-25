'use strict';

import React from 'react';

var packagedArray = [];

export default class ChartHeaders extends React.Component {
    render(){
        var query = this.props.query;
        
        if (query == 'Place'){
            packagedArray = [
                <div className={"rank"}>Place</div>,
            	<div className={"flag"}></div>,
            	<div className={"time"}>Name</div>,
            	<div className={"time"}>W</div>,
            	<div className={"time"}>L</div>
            ];
        } else if (query == '% Chance'){
            packagedArray = [
                <div className={"rank"}>Chance</div>,
            	<div className={"flag"}></div>,
            	<div className={"player-name"}>Name</div>,
            	<div className={"time"}>Seed</div>
            ];
        } else if (query == 'Index'){
            packagedArray = [
                <div className={"rank"}>Rank</div>,
            	<div className={"flag"}></div>,
            	<div className={"player-name"}>Name</div>,
            	<div className={"time"}>Index</div>
            ];
        } else if (query == 'Seed'){
            packagedArray = [
                <div className={"rank"}>Seed</div>,
            	<div className={"flag"}></div>,
            	<div className={"player-name"}>Name</div>,
            	<div className={"time"}></div>
            ];
        } else {
            packagedArray = [
                <div className={"rank"}>Rank</div>,
            	<div className={"flag"}></div>,
            	<div className={"player-name"}>Name</div>,
            	<div className={"time"}>Time</div>
            ];
        }
        return (
    	    <div className={"chart-header"}>
            	{packagedArray.map(element => element)}
            </div>
        );
    }
}
    
    
    
    

	

