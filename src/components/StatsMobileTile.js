import React from 'react';

export default class StatsMobile extends React.Component {
	
	DetermineSymbol(mascot){
		if(mascot=='Spades'){
			return '/img/divisions/Spades.svg';
		}else if(mascot =='Clubs'){
			return '/img/divisions/Clubs.svg';
		} else if(mascot =='Diamonds'){
			return '/img/divisions/Diamonds.svg';
		} else if(mascot =='Hearts'){
			return '/img/divisions/Hearts.svg';
		}else {
			return null;
		}
	}
	
	BackgroundColor(losses){
		if(losses>=2){
			return{backgroundColor:'crimson'};
		} else {
			return null;
		}
	}

	render(){
		
		return(
			<div className="smTile" style={this.BackgroundColor(this.props.player.losses)}>
			
				<div className="smRank" >
					{this.props.rank}
				</div>
				<div className="smDivision">
					<img src={this.DetermineSymbol(this.props.player.mascot)} />
				</div>
				<div className="smSeed">
					{this.props.player.seed}
				</div>
				<div className="smFlag">
					<img src={this.props.player.country.flagPathSVG}/>
				</div>
				<div className="smName">
					{this.props.player.name}
				</div>
				<div className="smStat">
					{this.props.player.timeTrial.toFixed(2)}
				</div>
				<div className="smStat">
					{this.props.player.wins}
				</div>
				<div className="smStat">
					{this.props.player.losses}
				</div>
				
			</div>
		);
	}
}
  
