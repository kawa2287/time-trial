'use strict';

import React from 'react';
import Flag from './Flag';
import CountryKeyVal from './CountryKeyVal';
import countries from '../data/countries';

var countryArr = [];

var textProps = {
	color : '#dfdfdf',
	textShadow : '0 0 3px #939393'
};

var inputStyle = {
	color : '#dfdfdf'
};

export default class TeamInputForm extends React.Component {
    constructor(props){
		super(props);
		
		this.state={
	    	name: '', 
	    	country: null,
	    	oldName:null,
	    	oldCountry:null
		};

		for (var item in countries[0]){
	  		countryArr.push(countries[0][item].name);
	  	}
    }
    
    
    componentWillReceiveProps(newProps) {
		if (newProps.name !== this.props.name){
		    this.setState({
		    	oldName : newProps.name
		    }, function updateName(){
		    	this.setState({
		    		name : newProps.name
		    	});
		    });
		}
		if (newProps.country !== this.props.country){
		    this.setState({
		    	oldCountry: newProps.country
		    }, function afterLoad(){
		    	this.setState({
		    		country : newProps.country
		    	}, function callBackTwo(){
		    		this.props.country = null;
		    	});
		    }, function lastCallback(){
		    	document.getElementById("country").value = newProps.country;
		    });
		}
	}
	
    
    randomIntFromInterval(min,max){
	    return Math.floor(Math.random()*(max-min+1)+min);
	}

    onSubmitClick(){
		

    	if((/\d/.test(this.state.name) || /[a-zA-Z]/.test(this.state.name)) && this.state.name !== null && this.state.country !== null && this.state.country !== 'Select Country'){
    		if(this.props.mode == 'add'){
				this.props.addTeamClick(
					this.state.name, 
					this.state.country
				);
			} else {
				this.props.editPlayer(
					this.state.oldName,
					this.state.name,
					this.state.oldCountry,
					this.state.country
				);
			}
			
			this.setState({
					name : null,
					country : null
			    }, function afterClick(){
			    	this.props.hideInput();
			    });
		    this.props.name = null;
		    this.props.country = null;
		    document.getElementById("country").value = null;
    	}
    }
    
    onCancelClick(){
    	this.setState({
				name : null,
				country : null
		    }, function afterClick(){
		    	this.props.hideInput();
		    });
	    this.props.name = null;
	    this.props.country = null;
	    document.getElementById("country").value = null;
    }
    
    randomCountry() {
    	var randCountry = countryArr[this.randomIntFromInterval(0,countryArr.length)];
    	document.getElementById("country").value = randCountry;
    	this.setState({
    		country : randCountry
    	});
    }
  
    render() {
    	
    	console.log('this.state.name=',this.state.name);
    	console.log('this.state.country=',this.state.country);
    	console.log('this.props.name=',this.props.name);
    	console.log('this.props.country=',this.props.country);
    	console.log('-----------------------------');
	
		var countryNames = [];
	
		for (var x in CountryKeyVal){
		  countryNames.push(CountryKeyVal[x].name);
		}
		
		var bgStyle = {
			height : this.props.geo.height,
			width : this.props.geo.width
		};
		
		return (
			<div className='input-wrapper' style = {bgStyle}>
				<div className='input-inner-wrapper' style={bgStyle}>
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
							<div className='TeamSectorInput'>
								<div className='enter-text'>
									<input 
										className='input-info'
										style={inputStyle}
										list="countryList"
										value={this.state.country} 
										onChange={(e)=>{this.setState({country: e.target.value})}} 
										type="text"
										id="country" 
									/>
									<datalist id="countryList">
									    {countryNames.map((name, i) => <option data-id={i} value={name}/>)}
									</datalist>
								
								</div>
							</div>
							<div className='TeamSectorText'>
								<div className='enter-text'>
									<h1 className='maintext' style={textProps}>Select Country</h1>
								</div>
							</div>
						</div>
					</div>
					<div className='halfportion2'>
						<div className='quad2'>
							<div className='TeamButtons'>
								<button 
									className='typical-button' 	
									onClick={this.randomCountry.bind(this)}
								>
									Randomize Country
								</button>
							</div>
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
						
						<div className='quad3'>
							<div className='flag-team-input'>
								<img src={(this.state.country==null || CountryKeyVal[this.state.country]== undefined)?null:CountryKeyVal[this.state.country].flagPathSVG}/>
							</div>
						</div>
					</div>	
				</div>
		    </div>
		);
    }
}

