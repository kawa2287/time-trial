import React from 'react';

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
			return {backgroundColor:'#303030'};
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
			return {
			    color: 'yellow',
			    fontWeight: 'bold'	
			};
		} else if ( status =='COMPLETE' && player == loser) {
			return {    
				color: 'palevioletred',
			    textDecoration: 'line-through'
			};
		} else {
			return null;
		}
	}
	
	ByeFormat(player){
		console.log(player);
		if(player == 'BYE'){
			return {
			    flex: '0',
    			visibility: 'hidden'
			};
		}
	}


	render(){
		
		var playerA = {
				name : this.props.game.playerA == null ? null : this.props.game.playerA.name,
				seed : this.props.game.playerA == null ? '-' : this.props.game.playerA.seed,
				mascot : this.props.game.playerA.mascot == null ? null : '/img/divisions/'+this.props.game.playerA.mascot+'.svg',
				flag : this.props.game.playerA == null ? null : this.props.game.playerA.country.flagPathSVG
		};
		
		var playerB = {
				name : this.props.game.playerB == null ? null : this.props.game.playerB.name,
				seed : this.props.game.playerB == null ? '-' : this.props.game.playerB.seed,
				mascot : this.props.game.playerB.mascot == null ? null : '/img/divisions/'+this.props.game.playerB.mascot+'.svg',
				flag : this.props.game.playerB == null ? null : this.props.game.playerB.country.flagPathSVG
		};
		
		return(
			<div 
				className="btContainer"
				style={this.BackgroundColor(this.props.game.status,playerA,playerB)}
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
								<img src={playerA.mascot}/>
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
								<img src={playerB.mascot}/>
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
  
