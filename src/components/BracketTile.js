import React from 'react';
import Icons from './icons/Icons';

export default class BracketTile extends React.Component {
	
	FlagStyle(status,player,winner,loser){
		
		if(status == 'COMPLETE' && player == winner){
			return this.ByeFormat(player);
		} else if ( status =='COMPLETE' && player == loser && player == 'BYE') {
			return {
				filter:'grayscale(1)',
				opacity:'0.5',
				flex: '0',
    			visibility: 'hidden'
			};
		} else if(status =='COMPLETE' && player == loser){
			return {
				filter:'grayscale(1)',
				opacity:'0.5',
			};
		}else {
			return this.ByeFormat(player);
		}
	}
	
	BackgroundColor(status,playerA,playerB){
		if(status == 'COMPLETE'){
			return {backgroundColor:'black'};
		} else {
			if (playerA == null || playerB==null){
				return null;
			}
			if (playerA.seed>=1 && playerB.seed >=1) {
				return null;
			} else {
				return {
					backgroundColor:'darkslategrey',
					color:'darkgrey'
				};
			}
		}
	}
	
	TextStyle(status,player,winner,loser){

		if(status == 'COMPLETE' && player == winner){
			if(player == 'BYE'  || player.slice(0,6)=='Winner' || player.slice(0,5)=='Loser'){
				return {
				    color: 'yellow',
				    fontWeight: 'bold',
				    fontSize:'smaller'
				};
			} else {
				return {
				    color: 'yellow',
				    fontWeight: 'bold'	
				};
			}
			
		} else if ( status =='COMPLETE' && player == loser) {
			if(player == 'BYE'  || player.slice(0,6)=='Winner' || player.slice(0,5)=='Loser'){
				return {
				    color: 'palevioletred',
				    textDecoration: 'line-through',
				    fontSize:'smaller'
				};
			} else {
				return {    
					color: 'palevioletred',
				    textDecoration: 'line-through'
				};
			}
			
		} else {
			if(player == 'BYE'  || player.slice(0,6)=='Winner' || player.slice(0,5)=='Loser'){
				return {
				    fontSize:'x-small'
				};
			} else {
				return null;			
			}
		}
	}
	
	ByeFormat(player){
		if(player == 'BYE'  || player.slice(0,6)=='Winner' || player.slice(0,5)=='Loser'){
			return {
			    flex: '0',
    			visibility: 'hidden'
			};
		}
	}
	
	TextSize(player){
		if(player == 'BYE'  || player.slice(0,6)=='Winner' || player.slice(0,5)=='Loser'){
			return {
			    fontSize: 'small'
			};
		}
	}
	
	handleClick(){
		if(this.props.game.playerA!==null && this.props.game.playerB!==null){
			if(
				
				this.props.game.playerA.seed !== null && 
				this.props.game.playerA.seed !== null &&
				this.props.game.playerA.seed !== "" && 
				this.props.game.playerA.seed !== ""
			){
				this.props.showMatchup(
					this.props.game.playerA,
					this.props.game.playerB,
					this.props.game.gameTitle,
					this.props.game.gameNumber
				);
			}
		}
	}


	render(){
		
		var playerA = {
				name : this.props.game.playerA == null ? null : this.props.game.playerA.name,
				seed : this.props.game.playerA == null ? '-' : this.props.game.playerA.seed,
				mascot : this.props.game.playerA.mascot == null ? null : this.props.game.playerA.mascot,
				primaryColor : this.props.game.playerA.primaryColor == null ? null : this.props.game.playerA.primaryColor,
				secondaryColor : this.props.game.playerA.secondaryColor == null ? null : this.props.game.playerA.secondaryColor,
				flag : this.props.game.playerA == null ? null : this.props.game.playerA.country.flagPathSVG,
				
		};
		
		var playerB = {
				name : this.props.game.playerB == null ? null : this.props.game.playerB.name,
				seed : this.props.game.playerB == null ? '-' : this.props.game.playerB.seed,
				mascot : this.props.game.playerB.mascot == null ? null : this.props.game.playerB.mascot,
				primaryColor : this.props.game.playerB.primaryColor == null ? null : this.props.game.playerB.primaryColor,
				secondaryColor : this.props.game.playerB.secondaryColor == null ? null : this.props.game.playerB.secondaryColor,
				flag : this.props.game.playerB == null ? null : this.props.game.playerB.country.flagPathSVG
		};
		
		return(
			<div 
				className="btContainer"
				style={this.BackgroundColor(this.props.game.status,playerA,playerB)}
				onClick={this.handleClick.bind(this)}
			>
				<h1 className="btGameTitle">
					{'Game ' + this.props.game.gameNumber}
				</h1>
				<div className="btTeamsMatchup">
					<div className="btTeam">
						<div 
							className="btNameCountryCont"
							style={
								this.FlagStyle(
									this.props.game.status,
									playerA.name,
									this.props.game.winner,
									this.props.game.loser
								)
							}
						>
							<h1 
								className="btSeed"
								style={this.TextStyle(this.props.game.status,playerA.name,this.props.game.winner,this.props.game.loser)}
							>
								{playerA.seed}
							</h1>
							<div className="btFlag">
								<img src={playerA.flag}/>
							</div>
							<div className="btMiscContainer">
								<Icons
									mascot = {playerA.mascot}
									colorA = {playerA.primaryColor}
									colorB = {playerA.secondaryColor}
								/>
							</div>
						</div>
						<h1 
							className="btName"
							style={this.TextStyle(this.props.game.status,playerA.name,this.props.game.winner,this.props.game.loser)}
						>
							{playerA.name}
						</h1>
					</div>
					<div className="btVs">
						VS
					</div>
					<div className="btTeam">
						<div 
							className="btNameCountryCont"
							style={
								this.FlagStyle(
									this.props.game.status,
									playerB.name,
									this.props.game.winner,
									this.props.game.loser
								)
							}
						>
							<h1 
								className="btSeed"
								style={this.TextStyle(this.props.game.status,playerB.name,this.props.game.winner,this.props.game.loser)}
							>
								{playerB.seed}
							</h1>
							<div className="btFlag">
								<img src={playerB.flag}/>
							</div>
							<div className="btMiscContainer">
								<Icons
									mascot = {playerB.mascot}
									colorA = {playerB.primaryColor}
									colorB = {playerB.secondaryColor}
								/>
							</div>
						</div>
						<h1 
							className="btName"
							style={this.TextStyle(this.props.game.status,playerB.name,this.props.game.winner,this.props.game.loser)}
						>
							{playerB.name}
						</h1>
					</div>
				</div>
			</div>
		);
	}
}
  
