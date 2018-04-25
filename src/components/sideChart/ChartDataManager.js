'use strict';

import React from 'react';
import StackChartData from './StackChartData';
import PlaceChart from './PlaceChart';
import IndexChart from './IndexChart';
import SeedChart from './SeedChart';

var panelStats = [];


export default class ChartDataManager extends React.Component {
	constructor(props){
		super(props);
		
		this.StackChartData = StackChartData.bind(this);
		this.PlaceChart = PlaceChart.bind(this);
		this.IndexChart = IndexChart.bind(this);
		this.SeedChart = SeedChart.bind(this);
	}
	
	ScrapeStats(seededArray,query){
	    var packagedArray = [];
		
		if (query == 'Place'){
		    // send to PlaceChart
    		packagedArray = this.PlaceChart(this.props.seededArray);
    		
        } else if (query == '% Chance'){
            
            // send to PctChanceChart
            
        } else if (query == 'Index'){
           
           // send to IndexChart
           packagedArray = this.IndexChart(this.props.seededArray);
           
        } else if (query == 'Seed'){
            // send to SeedChart
            packagedArray = this.SeedChart(this.props.seededArray);
            
        } else {
            // send to StackChartData
            packagedArray = this.StackChartData(this.props.seededArray, this.props.query);
        }
        
        return packagedArray;
		
	}
	
	componentWillReceiveProps(newProps){
	    if ({...newProps} !== {...this.props}){
	        this.ScrapeStats(newProps.seededArray, newProps.query);
	    }
	}

	render(){
	    
	    panelStats = this.ScrapeStats(this.props.seededArray, this.props.query);
	    

		return(
			<div className="chart-main">
				{panelStats.map(element => element)}
			</div>
		);
	}
}
  
