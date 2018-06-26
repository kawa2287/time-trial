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
    constructor(){
		super();
		this.state={
	    	name: null, 
	    	country: 'Select Country'
		};

		for (var item in countries[0]){
	  		countryArr.push(countries[0][item].name);
	  	}
    }
    
    randomIntFromInterval(min,max){
	    return Math.floor(Math.random()*(max-min+1)+min);
	}

    onSubmitClick(){

    	if((/\d/.test(this.state.name) || /[a-zA-Z]/.test(this.state.name)) && this.state.name !== null && this.state.country !== null && this.state.country !== 'Select Country'){
    		this.props.addTeamClick(
				this.state.name, 
				this.state.country
			);
	
		    this.setState({
				name : "",
				country : 'Select Country'
		    }, function afterClick(){
		    	this.props.hideInput();
		    });
		    document.getElementById("country").value = "";
		    
    	}
    }
    
    onCancelClick(){
    	this.setState({
				name : "",
				country : 'Select Country'
		    }, function afterClick(){
		    	this.props.hideInput();
		    });
	    document.getElementById("country").value = "";
    }
    
    randomCountry() {
    	var randCountry = countryArr[this.randomIntFromInterval(0,countryArr.length)];
    	this.setState({
    		country : randCountry
    	});
    	document.getElementById("country").value = randCountry;
    }

  
    render() {
	
		var countryNames = [];
	
		for (var x in CountryKeyVal){
		  countryNames.push(CountryKeyVal[x].name);
		}
		
		var Background = CountryKeyVal[this.state.country].flagPathSVG;
		
		var bgStyle = {
			height : this.props.geo.height,
			width : this.props.geo.width
		};
		

	
		return (
			<div className='input-wrapper' style = {bgStyle}>
				<div className='input-inner-wrapper' style={bgStyle}>
					<div className='halfportion'>
					
						<div className='quad'>
							<div className='sector'>
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
							<div className='sector'>
								<div className='enter-text'>
									<h1 className='maintext' style={textProps}>Enter Name</h1>
								</div>
							</div>
						</div>
						
						<div className='quad'>
							<div className='sector'>
								<div className='enter-text'>
									<input 
										className='input-info'
										style={inputStyle}
										list="countryList"
										value={this.props.country}
										onChange={(e)=>{this.setState({country: e.target.value})}} 
										type="text"
										id="country" 
									/>
									<datalist id="countryList">
									    {countryNames.map((name, i) => <option data-id={i} value={name}/>)}
									</datalist>
								
								</div>
							</div>
							<div className='sector'>
								<div className='enter-text'>
									<h1 className='maintext' style={textProps}>Select Country</h1>
								</div>
							</div>
						</div>
					</div>
					<div className='halfportion2'>
						<div className='quad2'>
							<div className='buttons'>
								<button 
									className='typical-button' 	
									onClick={this.randomCountry.bind(this)}
								>
									Randomize Country
								</button>
							</div>
							<div className='buttons'>
								<button 
									className='typical-button'
									onClick={this.onSubmitClick.bind(this)}
								>
									Submit
								</button>
							</div>
							<div className='buttons'>
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
								<img src={CountryKeyVal[this.state.country].flagPathSVG}/>
							</div>
						</div>
						
					</div>	
				</div>
		    </div>
		);
    }
}

