
"use strict";

import React from 'react';
import DetermineWinChance from './vsBracketMethods/baseMethods/DetermineWinChance';

var loserStyle ={
	width:'40%',
	filter:'grayscale(100%) blur(2px)',
	transitionProperty: 'filter, width',
	transitionDuration: '0.5s',
	transitionTimingFunction: 'linear'
};

var winnerStyle={
	width:'100%',
	filter:'grayscale(0%) blur(0px)',
	transitionProperty: 'filter, width',
	transitionDuration: '0.5s',
	transitionTimingFunction: 'linear'
};

var winnerTextStyle={
	color: 'yellow',
	transition: "color 0.5s ease"
};

var loserTextStyle={
	color: 'lightslategrey',
	transition: "color 0.5s ease"
};

var submitFalseStyle = {
	background : 'bottom'
};

var seedStyle = {
	fontSize:'x-large',
	fontWeight:'bold'
};

var playerAwinChance;
var playerBwinChance;


export default class MobileMatchup extends React.Component {
	
	constructor(){
		super();
		this.state={
			winner:null,
			loser:null,
			submit:false
		};
	}
	
	handleCancel(){
		this.setState({
			winner:null,
			loser:null,
			submit:false
		}, function callBack(){
			this.props.HandleCancel();
		});
	}
	
	handleSubmit(){
		this.props.HandleSubmit(
			this.props.gameNumber,
			this.state.winner,
			this.state.loser,
			this.props.playerA.name=='BYE'||this.props.playerB.name=='BYE'?true:false
		);
		this.handleCancel();
	}
	
	handleWinnerClickA(){
		this.setState({
			winner:this.props.playerA,
			loser: this.props.playerB,
			submit:true
		});
	}
	
	handleWinnerClickB(){
		this.setState({
			winner:this.props.playerB,
			loser: this.props.playerA,
			submit:true
		});
	}
	
	DetermineSymbol(player){
		if (player == null){
			return null;
		} else {
			if(player.mascot =='Spades'){
				return '/img/divisions/Spades.svg';
			}else if(player.mascot =='Clubs'){
				return '/img/divisions/Clubs.svg';
			} else if(player.mascot =='Diamonds'){
				return '/img/divisions/Diamonds.svg';
			} else if(player.mascot =='Hearts'){
				return '/img/divisions/Hearts.svg';
			}else {
				return null;
			}
		}
	}

	render(){
		
		if(this.props.playerA==null || this.props.playerB==null){
			playerAwinChance = 0;
			playerBwinChance = 0;
		} else {
			playerAwinChance = DetermineWinChance(
				[this.props.playerA,this.props.playerB],
				[this.props.playerA.timeTrial,this.props.playerB.timeTrial],
				0,'VS'
			)+'%';
			playerBwinChance = DetermineWinChance(
				[this.props.playerA,this.props.playerB],
				[this.props.playerA.timeTrial,this.props.playerB.timeTrial],
				1,'VS'
			)+'%';
			
		}
		
		var pAwinChanceStyle = {
			width : playerAwinChance,
			minWidth : '10%',
			maxWidth : '90%',
			backgroundColor: 'cornflowerblue',
			float: 'left',
			paddingLeft: '5px'
		};
		var pBwinChanceStyle = {
			width : playerBwinChance,
			minWidth : '10%',
			maxWidth : '90%',
			backgroundColor: 'tomato',
			float: 'right',
		    textAlign: 'right',
	        paddingRight: '5px'
		};
		

		return(
			<div className="mmContainer">
				<div className="mmTitle">
					{this.props.gameTitle==null?null:this.props.gameTitle}
				</div>
				<div className="mmSubText">
					Tap Flag to Choose Match Winner
				</div>
				<div className="mmPlayerNameContainer">
					<div className="mmPlayerName" style={this.props.playerA==null?null:(this.state.loser==null?null:(this.props.playerA.name==this.state.winner.name?winnerTextStyle:(this.props.playerA.name==this.state.loser.name?loserTextStyle:null)))}>
						{this.props.playerA==null?null:this.props.playerA.name}
					</div>
					<div className="mmPlayerName" style={this.props.playerB==null?null:(this.state.loser==null?null:(this.props.playerB.name==this.state.winner.name?winnerTextStyle:(this.props.playerB.name==this.state.loser.name?loserTextStyle:null)))}>
						{this.props.playerB==null?null:this.props.playerB.name}
					</div>
				</div>
				<div className="mmPlayerNameContainer">
					<div className="mmCountryName" style={this.props.playerA==null?null:(this.state.loser==null?null:(this.props.playerA.name==this.state.winner.name?winnerTextStyle:(this.props.playerA.name==this.state.loser.name?loserTextStyle:null)))}>
						{this.props.playerA==null?null:this.props.playerA.country.name}
					</div>
					<div className="mmCountryName" style={this.props.playerB==null?null:(this.state.loser==null?null:(this.props.playerB.name==this.state.winner.name?winnerTextStyle:(this.props.playerB.name==this.state.loser.name?loserTextStyle:null)))}>
						{this.props.playerB==null?null:this.props.playerB.country.name}
					</div>
				</div>
				<div className="mmFlagContainer">
					<div className="mmFlag" onClick={this.props.playerA==null?null:(this.props.playerA.name=='BYE'?null:this.handleWinnerClickA.bind(this))}>
						<img 
							src={this.props.playerA==null?null:this.props.playerA.country.flagPathSVG}
							style={this.props.playerA==null?null:(this.state.loser==null?null:(this.props.playerA.name==this.state.loser.name?loserStyle:winnerStyle))}
						/>
					</div>
					<div className="mmFlag" onClick={this.props.playerB==null?null:(this.props.playerB.name=='BYE'?null:this.handleWinnerClickB.bind(this))}>
						<img  
							src={this.props.playerB==null?null:this.props.playerB.country.flagPathSVG}
							style={this.props.playerB==null?null:(this.state.loser==null?null:(this.props.playerB.name==this.state.loser.name?loserStyle:winnerStyle))}
						/>
					</div>
				</div>
				
			    <div className="mmWinChance" onClick={this.reTriggerAnimation}>
					<span id='pAspan' style={pAwinChanceStyle}><h1>{playerAwinChance}</h1></span>
					<span id='pBspan' style={pBwinChanceStyle}><h1>{playerBwinChance}</h1></span>
					
				</div>
				<div className="mmStatsContainer">
					<div className="mmPlayerContainer" style={this.props.playerA==null?null:(this.state.loser==null?null:(this.props.playerA.name==this.state.winner.name?winnerTextStyle:(this.props.playerA.name==this.state.loser.name?loserTextStyle:null)))}>
						<div className="mmTextStats" style={seedStyle} >
							{this.props.playerA==null?null:this.props.playerA.seed}
						</div>
						<div className="mmTextStats" >
							<img src={this.DetermineSymbol(this.props.playerA)} style={{maxHeight:'100%'}}/>
						</div>
						<div className="mmTextStats">
							{this.props.playerA==null?null:this.props.playerA.wins}
						</div>
						<div className="mmTextStats">
							{this.props.playerA==null?null:this.props.playerA.losses}
						</div>
						<div className="mmTextStats">
							{this.props.playerA==null?null:this.props.playerA.timeTrial}
						</div>
					</div>
					<div className="mmTextContainer">
						<div className="mmTextHeadlines">
							Seed
						</div>
						<div className="mmTextHeadlines">
							Division
						</div>
						<div className="mmTextHeadlines">
							Wins
						</div>
						<div className="mmTextHeadlines">
							Losses
						</div>
						<div className="mmTextHeadlines">
							Timetrial
						</div>
					</div>
					<div className="mmPlayerContainer" style={this.props.playerB==null?null:(this.state.loser==null?null:(this.props.playerB.name==this.state.winner.name?winnerTextStyle:(this.props.playerB.name==this.state.loser.name?loserTextStyle:null)))}>
						<div className="mmTextStats" style={seedStyle}>
							{this.props.playerB==null?null:this.props.playerB.seed}
						</div>
						<div className="mmTextStats" >
							<img src={this.DetermineSymbol(this.props.playerB)} style={{maxHeight:'100%'}}/>
						</div>
						<div className="mmTextStats">
							{this.props.playerB==null?null:this.props.playerB.wins}
						</div>
						<div className="mmTextStats">
							{this.props.playerB==null?null:this.props.playerB.losses}
						</div>
						<div className="mmTextStats">
							{this.props.playerB==null?null:this.props.playerB.timeTrial}
						</div>
					</div>
				</div>
				<div className="mmButtonContainer">
					<div className="mmButton" onClick={this.handleCancel.bind(this)}>
						Cancel
					</div>
					<div 
						className="mmButton" 
						onClick={this.state.submit==false?null:this.handleSubmit.bind(this)}
						style = {this.state.submit==false?submitFalseStyle:null}
					>
						Submit
					</div>
				</div>
			</div>
		);
	}
}
  
