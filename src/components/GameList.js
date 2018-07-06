import React from 'react';


var winnerStyle ={
    color: 'yellow',
    fontWeight: 'bold'	
};

var loserStyle = {    
	color: 'palevioletred',
    textDecoration: 'line-through'
};


var gameWaiting={
	backgroundColor:'darkslategrey',
	color:'darkgrey'
};

var gameReadySeed={
	backgroundColor:'darksalmon'
};

export default class GameList extends React.Component {
	
	BackgroundColor(status){
		if(status == 'COMPLETE'){
			return {backgroundColor:'#303030'};
		} else {
			if (this.props.playerA == null || this.props.playerB==null){
				return gameWaiting;
			}
			if (this.props.playerA.seed>=1 && this.props.playerB.seed >=1) {
				return null;
			} else {
				return gameWaiting;
			}
		}
	}
	
	BackgroundSeedColor(status){
		if(status == 'COMPLETE'){
			return {backgroundColor:'#303030'};
		} else {
			if (this.props.playerA == null || this.props.playerB==null){
				return null;
			}
			if (this.props.playerA.seed>=1 && this.props.playerB.seed >=1) {
				return gameReadySeed;
			} else {
				return null;
			}
		}
	}
	
	BackgroundTitleColor(){
		if(this.props.gameStatus=='COMPLETE'){
			return {backgroundColor:'#303030'};
		} else if(this.props.gameTitle.slice(0,4)=='Elim'){
			return {backgroundColor:'crimson'};
		} else {
			return null;
		}
	}
	
	
	TextStyle(status,player,winner,loser){
		
		if(status == 'COMPLETE' && player == winner){
			return winnerStyle;
		} else if ( status =='COMPLETE' && player == loser) {
			return loserStyle;
		} else {
			return null;
		}
	}
	
	FlagStyle(status,player,winner,loser){
		
		if(status == 'COMPLETE' && player == winner){
			return null;
		} else if ( status =='COMPLETE' && player == loser) {
			return {grayscale:'1',opacity:'0.4'};
		} else {
			return null;
		}
	}
	
	DetermineSymbol(){
		if (this.props.gameTitle.slice(0,4)== 'Roun' || this.props.gameTitle.slice(0,4) == 'Divi'){

			if((this.props.playerA.mascot || this.props.playerB.mascot)=='Spades' ){
				return '/img/divisions/Spades.svg';
			}else if((this.props.playerA.mascot|| this.props.playerB.mascot)=='Clubs'){
				return '/img/divisions/Clubs.svg';
			} else if((this.props.playerA.mascot|| this.props.playerB.mascot)=='Diamonds'){
				return '/img/divisions/Diamonds.svg';
			} else if((this.props.playerA.mascot|| this.props.playerB.mascot)=='Hearts'){
				return '/img/divisions/Hearts.svg';
			}else {
				return null;
			}
			
		} else {
			return null;
		}
	}
	

	
	handleClick(){
		
		this.props.showMatchup(
			this.props.playerA,
			this.props.playerB,
			this.props.gameTitle,
			this.props.gameNumber
		);
	}

	render(){
		
		return(
			<div 
				className="gLTile"
				onClick={this.handleClick.bind(this)}
			>
				<div 
					className="gLgameNum"
					style={this.BackgroundSeedColor(this.props.gameStatus)}
				>
					{this.props.gameNumber}
				</div>
				<div className="gLinfo">
					<div 
						className='gLtitleContainer'
						style={this.BackgroundTitleColor()}
					>
						<div className="gLsymbol">
							<img src={this.DetermineSymbol()}/>
						</div>
						
						<h1 className="gLTitle">
							{this.props.gameTitle}
						</h1>
						<div className="gLsymbol">
							<img src={this.DetermineSymbol()}/>
						</div>
					</div>
					<div 
						className="gLmatchup"
						style={this.BackgroundColor(this.props.gameStatus)}
					>
						<div className="gLplayer">
							<div 
								className="gLname" 
								style={
									this.TextStyle(
										this.props.gameStatus,
										this.props.playerA==null?null:this.props.playerA.name,
										this.props.winner,
										this.props.loser
									)
								}
							>
								{this.props.playerA==null?null:this.props.playerA.name}
							</div>
							<div 
								className="gLflag"
								style={
									this.FlagStyle(
										this.props.gameStatus,
										this.props.playerA==null?null:this.props.playerA.name,
										this.props.winner,
										this.props.loser
									)
								}
							>
								<img src={this.props.playerA==null?null:this.props.playerA.country.flagPathSVG}/>
							</div>
							<div className="gLseed"							>
								{this.props.playerA==null?null:this.props.playerA.seed}
							</div>
						</div>
						<div className="gLvs">
							VS
						</div>
						<div className="gLplayer">
							<div className="gLseed">
								{this.props.playerB==null?null:this.props.playerB.seed}
							</div>
							<div 
								className="gLflag"
								style={
									this.FlagStyle(
										this.props.gameStatus,
										this.props.playerB==null?null:this.props.playerB.name,
										this.props.winner,
										this.props.loser
									)
								}
							>
								<img src={this.props.playerB==null?null:this.props.playerB.country.flagPathSVG}/>
							</div>
							<div 
								className="gLname" 
								style={
									this.TextStyle(
										this.props.gameStatus,
										this.props.playerB==null?null:this.props.playerB.name,
										this.props.winner,
										this.props.loser
									)
								}
							>
								{this.props.playerB==null?null:this.props.playerB.name}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
  
