"use strict";

import React from 'react';
import DetermineWinChance from './vsBracketMethods/baseMethods/DetermineWinChance';
import Icons from './icons/Icons';


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
			winner2:null,
			loser:null,
			loser2:null,
			submit:false,
			reset: false,
			taps: 0
		};
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
	
	
	handleCancel(){
		this.setState({
			winner:null,
			winner2:null,
			loser:null,
			loser2:null,
			submit:false,
			reset:false,
			taps:0
		}, function callBack(){
			this.props.HandleCancel();
		});
	}
	
	handleSubmit(){
		if(this.props.mode == 'VS'){
			this.props.HandleSubmit(
				this.props.gameNumber,
				this.state.winner,
				this.state.loser,
				this.props.playerA.name=='BYE'||this.props.playerB.name=='BYE'?true:false
			);
		} else {
			var nByes = 0;
			this.props.playerA.name == 'BYE' ? (nByes+=1) : null;
			this.props.playerB.name == 'BYE' ? (nByes+=1) : null;
			this.props.playerC.name == 'BYE' ? (nByes+=1) : null;
			this.props.playerD.name == 'BYE' ? (nByes+=1) : null;
			
			this.props.HandleSubmit(
				this.props.gameNumber,
				this.state.winner,
				this.state.loser,
				nByes>=2 ? true : false,
				this.state.winner2,
				this.state.loser2
			);
		}
		
		this.handleCancel();
	}
	
	handleReset(){
		if (this.state.reset == true){
			this.setState({
				reset: false,
				winner : null,
				winner2 : null,
				loser : null,
				loser2 : null,
				taps:0
			});
		}
	}
	
	fourPclickHandler(player){
		if(this.state.taps >= 4){
			return null;
		} else if(this.state.taps == 3){
			// 4th place
			if(!(player.name in [,this.state.winner.name,this.state.winner2.name,this.state.loser.name])){
				this.setState({
					loser2 : player,
					taps : 4,
					submit : true
				});
			}
		} else if(this.state.taps == 2){
			// 3rd place
			if(!(player.name in [,this.state.winner.name,this.state.winner2.name])){
				this.setState({
					loser : player,
					taps : 3
				});
			}
		} else if (this.state.taps == 1){
			// 2nd place
			if(player.name != this.state.winner.name){
				this.setState({
					winner2 : player,
					taps : 2
				});
			}
		}else if (this.state.taps == 0){
			// 1st place
			this.setState({
				winner : player,
				taps : 1,
				reset : true
			});
		}
	}
	
	HandleLayout(mode){
		if (mode == 'VS'){
			return (
				<VsLayout
					gameTitle = {this.props.gameTitle}
					playerA = {this.props.playerA}
					playerB = {this.props.playerB}
					winner = {this.state.winner}
					loser = {this.state.loser}
					HandleSubmit={this.props.HandleSubmit}
	    			HandleCancel={this.props.HandleCancel}
	    			handleWinnerClickA = {this.handleWinnerClickA.bind(this)}
	    			handleWinnerClickB = {this.handleWinnerClickB.bind(this)}
				/>
			);
		} else {
			//4P Layout Module
			return (
				<FourPlayout
					gameTitle = {this.props.gameTitle}
					playerA = {this.props.playerA}
					playerB = {this.props.playerB}
					playerC = {this.props.playerC}
					playerD = {this.props.playerD}
					winner = {this.state.winner}
					winner2 = {this.state.winner2}
					loser = {this.state.loser}
					loser2 = {this.state.loser2}
					HandleSubmit={this.props.HandleSubmit}
	    			HandleCancel={this.props.HandleCancel}
	    			fourPclickHandler = {this.fourPclickHandler.bind(this)}
	    			
				/>
			);
		}
	}

	render(){
		return(
			<div className="mmContainer">
			
				{this.HandleLayout(this.props.mode)}
				
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
					<div 
						className="mmButton" 
						onClick={this.state.reset==false?null:this.handleReset.bind(this)}
						style = {this.state.reset==false?submitFalseStyle:null}
					>
						Reset
					</div>
				</div>
			</div>
		);
	}
}

class VsLayout extends React.Component {
	
	hClkA(){
		this.props.handleWinnerClickA();
	}
	
	hClkB(){
		this.props.handleWinnerClickB();
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
			);
			if (isNaN(playerAwinChance)){
				playerAwinChance = '50%';
			} else {
				playerAwinChance = playerAwinChance+'%';
			}
			playerBwinChance = DetermineWinChance(
				[this.props.playerA,this.props.playerB],
				[this.props.playerA.timeTrial,this.props.playerB.timeTrial],
				1,'VS'
			);
			if (isNaN(playerBwinChance)){
				playerBwinChance = '50%';
			} else {
				playerBwinChance = playerBwinChance+'%';
			}
			
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
			<div style={{display:'flex', flexDirection:'column',flex:10}}>
				<div className="mmTitle">
					{this.props.gameTitle==null?null:this.props.gameTitle}
				</div>
				<div className="mmSubText">
					Tap Flag to Choose Match Winner
				</div>
				<div className="mmPlayerNameContainer">
					<div className="mmPlayerName" style={this.props.playerA==null?null:(this.props.loser==null?null:(this.props.playerA.name==this.props.winner.name?winnerTextStyle:(this.props.playerA.name==this.props.loser.name?loserTextStyle:null)))}>
						{this.props.playerA==null?null:this.props.playerA.name}
					</div>
					<div className="mmPlayerName" style={this.props.playerB==null?null:(this.props.loser==null?null:(this.props.playerB.name==this.props.winner.name?winnerTextStyle:(this.props.playerB.name==this.props.loser.name?loserTextStyle:null)))}>
						{this.props.playerB==null?null:this.props.playerB.name}
					</div>
				</div>
				<div className="mmPlayerNameContainer">
					<div className="mmCountryName" style={this.props.playerA==null?null:(this.props.loser==null?null:(this.props.playerA.name==this.props.winner.name?winnerTextStyle:(this.props.playerA.name==this.props.loser.name?loserTextStyle:null)))}>
						{this.props.playerA==null?null:this.props.playerA.country.name}
					</div>
					<div className="mmCountryName" style={this.props.playerB==null?null:(this.props.loser==null?null:(this.props.playerB.name==this.props.winner.name?winnerTextStyle:(this.props.playerB.name==this.props.loser.name?loserTextStyle:null)))}>
						{this.props.playerB==null?null:this.props.playerB.country.name}
					</div>
				</div>
				<div className="mmFlagContainer">
					<div className="mmFlag" onClick={this.props.playerA==null?null:(this.props.playerA.name=='BYE'?null:this.hClkA.bind(this))}>
						<img 
							src={this.props.playerA==null?null:this.props.playerA.country.flagPathSVG}
							style={this.props.playerA==null?null:(this.props.loser==null?null:(this.props.playerA.name==this.props.loser.name?loserStyle:winnerStyle))}
						/>
					</div>
					<div className="mmFlag" onClick={this.props.playerB==null?null:(this.props.playerB.name=='BYE'?null:this.hClkB.bind(this))}>
						<img  
							src={this.props.playerB==null?null:this.props.playerB.country.flagPathSVG}
							style={this.props.playerB==null?null:(this.props.loser==null?null:(this.props.playerB.name==this.props.loser.name?loserStyle:winnerStyle))}
						/>
					</div>
				</div>
				
			    <div className="mmWinChance" onClick={this.reTriggerAnimation}>
					<span id='pAspan' style={pAwinChanceStyle}><span>{playerAwinChance}</span></span>
					<span id='pBspan' style={pBwinChanceStyle}><span>{playerBwinChance}</span></span>
					
				</div>
				<div className="mmStatsContainer">
					<div className="mmPlayerContainer" style={this.props.playerA==null?null:(this.props.loser==null?null:(this.props.playerA.name==this.props.winner.name?winnerTextStyle:(this.props.playerA.name==this.props.loser.name?loserTextStyle:null)))}>
						<div className="mmTextStats" style={seedStyle} >
							{this.props.playerA==null?null:this.props.playerA.seed}
						</div>
						<div className="mmTextStats" >
							<Icons
								mascot = {this.props.playerA==null?null:this.props.playerA.mascot}
								colorA = {this.props.playerA==null?null:this.props.playerA.primaryColor}
								colorB = {this.props.playerA==null?null:this.props.playerA.secondaryColor}
							/>
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
					<div className="mmPlayerContainer" style={this.props.playerB==null?null:(this.props.loser==null?null:(this.props.playerB.name==this.props.winner.name?winnerTextStyle:(this.props.playerB.name==this.props.loser.name?loserTextStyle:null)))}>
						<div className="mmTextStats" style={seedStyle}>
							{this.props.playerB==null?null:this.props.playerB.seed}
						</div>
						<div className="mmTextStats" >
							<Icons
								mascot = {this.props.playerB==null?null:this.props.playerB.mascot}
								colorA = {this.props.playerB==null?null:this.props.playerB.primaryColor}
								colorB = {this.props.playerB==null?null:this.props.playerB.secondaryColor}
							/>
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
			</div>
		);
	}
}


class FourPlayout extends React.Component {
	CheckPosition(player){
		var position = null;
		
		if( this.props.winner != null){
			if (player.name == this.props.winner.name){
				position = 1;
			}
		}
		if( this.props.winner2 != null){
			if (player.name == this.props.winner2.name){
				position = 2;
			}
		}
		if( this.props.loser != null){
			if (player.name == this.props.loser.name){
				position = 3;
			}
		}
		if( this.props.loser2 != null){
			if (player.name == this.props.loser2.name){
				position = 4;
			}
		}
		
		return position;
	}
	
	CreatePlayerColumns(){
		if(
			this.props.playerA != null &&
			this.props.playerB != null &&
			this.props.playerC != null &&
			this.props.playerD != null 
		){
			var playerArray = [
				this.props.playerA,
				this.props.playerB,
				this.props.playerC,
				this.props.playerD,
			];
			
			//Sort based on seed
			playerArray.sort(function(a, b) {
			    if (a.seed < b.seed) {
			    	return -1;
			    } else if (a.seed > b.seed) {
			        return 1;
			    }
	    	});
	    	
	    	var playerTimeArray = [];
	    	for (var k = 0; k <4 ; k++){
	    		playerTimeArray.push(playerArray[k].timeTrial);
	    	}
	    	
			var pColArray = [];
			
			for (var i = 0; i <4; i++){
				pColArray.push(
					<PlayerLayout
						player = {playerArray[i]}
						fourPclickHandler = {this.props.fourPclickHandler}
						position =  {this.CheckPosition(playerArray[i])}
						winChance ={DetermineWinChance(playerArray,playerTimeArray,i,'4P',false)}
					/>
				);
			}
			return pColArray.map(element => element);
		} else {
			return null;
		}
	}
	
	RenderWinChance(){
		if(this.props.playerA==null || this.props.playerB==null){
			playerAwinChance = 0;
			playerBwinChance = 0;
		} else {
			playerAwinChance = DetermineWinChance(
				[this.props.playerA,this.props.playerB],
				[this.props.playerA.timeTrial,this.props.playerB.timeTrial],
				0,'VS'
			);
			if (isNaN(playerAwinChance)){
				playerAwinChance = '50%';
			} else {
				playerAwinChance = playerAwinChance+'%';
			}
			playerBwinChance = DetermineWinChance(
				[this.props.playerA,this.props.playerB],
				[this.props.playerA.timeTrial,this.props.playerB.timeTrial],
				1,'VS'
			);
			if (isNaN(playerBwinChance)){
				playerBwinChance = '50%';
			} else {
				playerBwinChance = playerBwinChance+'%';
			}
			
		}
	}
	
	render(){
		return(
			<div style={{display:'flex', flexDirection:'column',flex:10}}>
				<div className="mmTitle" style={{flex:1}}>
					{this.props.gameTitle==null?null:this.props.gameTitle}
				</div>
				<div style={{display:'flex', flex:10}}>
					<DescriptionLayout/>
					{this.CreatePlayerColumns()}
				</div>
			</div>
		);
	}
}

class PlayerLayout extends React.Component {
	
	ClickHandler(player){
		this.props.fourPclickHandler(player);
	}
	
	tapSelectedHandler(){
		if(this.props.player == null){
			return {
				background : null
			};
		} else if (this.props.position > 0){
			return {
				background : '#383838'
			};
		}
	}
	
	render(){
		
		var selectionStyle;
		var selectionStyle2;
		
			if(this.props.player == null){
				selectionStyle = null;
				selectionStyle2 = null;
			} else if (this.props.position > 0){
				selectionStyle =  {
					background : '#959595'
				};
				selectionStyle2 =  {
					background : '#757575'
				};
			}
			
		return(
			<div 
				className="four-p-player-container" 
				onClick={this.ClickHandler.bind(this, this.props.player)}
				style = {selectionStyle}
			>
				<div 
					className="mmFlag" 
					style = {{flex:1}}
				>
					<img 
						src={this.props.player==null?null:this.props.player.country.flagPathSVG}
					/>
				</div>
				<div className="four-p-text-stat-b" style = {selectionStyle2}>
					{/*NAME*/}
					{this.props.player==null?null:this.props.player.name}
				</div>
				<div className="four-p-text-stat">
					{/*SEED*/}
					{this.props.player==null?null:this.props.player.seed}
				</div>
				<div className="four-p-text-stat-b" style = {selectionStyle2}>
					{/*DIV*/}
					<Icons
						mascot = {this.props.player==null?null:this.props.player.mascot}
						colorA = {this.props.player==null?null:this.props.player.primaryColor}
						colorB = {this.props.player==null?null:this.props.player.secondaryColor}
					/>
				</div>
				<div className="four-p-text-stat">
					{/*WINS*/}
					{this.props.player==null?null:this.props.player.wins + " W"}
				</div>
				<div className="four-p-text-stat-b" style = {selectionStyle2}>
					{/*LOSSES*/}
					{this.props.player==null?null:this.props.player.losses + " L"}
				</div>
				<div className="four-p-text-stat">
					{/*TT*/}
					{this.props.player==null?null:this.props.player.timeTrial + "s"}
				</div>
				<div className="four-p-text-stat-c" style={selectionStyle2}>
					{/*W%*/}
					{this.props.winChance + "%"}
				</div>
				<div className="four-p-text-stat">
					{/*POSITION%*/}
					{this.props.player==null?null:this.props.position}
				</div>
			</div>
		);
	}
}

class DescriptionLayout extends React.Component {
	render(){
		return(
			<div style={{display:'flex', flexDirection:'column',flex:1}}>
				<div className="four-p-text-header">
					Nation:
				</div>
				<div className="four-p-text-header">
					Name:
				</div>
				<div className="four-p-text-header">
					Seed:
				</div>
				<div className="four-p-text-header">
					Division:
				</div>
				<div className="four-p-text-header">
					Wins:
				</div>
				<div className="four-p-text-header">
					Losses:
				</div>
				<div className="four-p-text-header">
					Time Trial:
				</div>
				<div className="four-p-text-header">
					Advance Chance:
				</div>
				<div className="four-p-text-header">
					Finish Position:
				</div>
			</div>
		);
	}
}
