import React from 'react';
import Icons from './icons/Icons';


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
					<Icons
						mascot = {this.props.player.mascot}
						colorA = {this.props.player.primaryColor}
						colorB = {this.props.player.secondaryColor}
					/>
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
					{this.props.player.timeTrial==null || this.props.player.timeTrial == "-"?"-":this.props.player.timeTrial.toFixed(2)}
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
  