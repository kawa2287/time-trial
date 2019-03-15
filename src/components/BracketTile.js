import React from 'react';
import Icons from './icons/Icons';

export default class BracketTile extends React.Component {
	
	
	
	BackgroundColor(status,playerA,playerB){
		if(status == 'COMPLETE'){
			return {backgroundColor:'#202020'};
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
	
	testPLayerProps(player){
		if(
			player.seed !== null &&
			player.seed !== "" &&
			player.name.slice(0,6) !== 'Winner' &&
			player.name.slice(0,5) !== 'Loser' 
		){
			return true;
		} else {
			return false;
		}
	}
	
	handleClick(){
		if(this.props.game.status == 'COMPLETE'){
			return null;
		} else {
			if(this.props.mode == 'VS'){
				if(this.props.game.playerA!==null && this.props.game.playerB!==null){
					if(
						this.testPLayerProps(this.props.game.playerA) &&
						this.testPLayerProps(this.props.game.playerB)
					){
						this.props.showMatchup(
							this.props.game.playerA,
							this.props.game.playerB,
							this.props.game.gameTitle,
							this.props.game.gameNumber,
							this.props.mode
						);
					}		
				}
			} else {
				if(this.props.game.playerA!==null && this.props.game.playerB!==null && this.props.game.playerC!==null && this.props.game.playerD!==null){
					
					var fillCount = 0;
					this.testPLayerProps(this.props.game.playerA) == true ? fillCount += 1 : null;
					this.testPLayerProps(this.props.game.playerB) == true ? fillCount += 1 : null;
					this.testPLayerProps(this.props.game.playerC) == true ? fillCount += 1 : null;
					this.testPLayerProps(this.props.game.playerD) == true ? fillCount += 1 : null;
					
					if(fillCount == 4)
					{
						this.props.showMatchup(
							this.props.game.playerA,
							this.props.game.playerB,
							this.props.game.gameTitle,
							this.props.game.gameNumber,
							this.props.mode,
							this.props.game.playerC,
							this.props.game.playerD
						);
					}
				}
			}
		}
		
	}
	
	ExtractPlayers(){
		var validPlayerArray = [];
		
		this.props.game.playerA != null ? validPlayerArray.push(this.TrimPlayer(this.props.game.playerA)):null;
		this.props.game.playerB != null ? validPlayerArray.push(this.TrimPlayer(this.props.game.playerB)):null;
		this.props.game.playerC != null ? validPlayerArray.push(this.TrimPlayer(this.props.game.playerC)):null;
		this.props.game.playerD != null ? validPlayerArray.push(this.TrimPlayer(this.props.game.playerD)):null;
		
		// SORT BASED ON SEED IF 4P MODE //
		if(this.props.mode == '4P'){
			validPlayerArray.sort(function(a, b) {
			    if (a.seed < b.seed) {
			    	return -1;
			    } else if (a.seed > b.seed) {
			        return 1;
			    }
	    	});
		}
		
		return validPlayerArray;
		
	}
	
	TrimPlayer(player){
		return {
			name : player.name,
			seed : player.seed,
			mascot : player.mascot,
			primaryColor : player.primaryColor,
			secondaryColor : player.secondaryColor,
			flag : player.country.flagPathSVG,
		};
	}
	
	RenderPlayerTiles(validPlayers){
		var playerTileArray = [];
	
		for(var i = 0; i <validPlayers.length; i++){
		
			playerTileArray.push(
				<PlayerTile 
					player = {validPlayers[i]}
					game = {this.props.game}
					mode = {this.props.mode}
				/>
			);
		}
		
		return playerTileArray.map(element => element);
	}
	


	render(){
		
		return(
			<div 
				className="btContainer"
				onClick={this.handleClick.bind(this)}
			>
				<div className="btGameTitle">
					{'Game ' + this.props.game.gameNumber}
				</div>
				
				{this.RenderPlayerTiles(this.ExtractPlayers())}
				
			</div>
		);
	}
}
  
class PlayerTile extends React.Component {
	
	FlagStyle(game,player, mode){
		if(mode == 'VS'){
			if(game.status == 'COMPLETE' && player == game.winner){
				return this.ByeFormat(player);
			} else if ( game.status =='COMPLETE' && player == game.loser && player == 'BYE') {
				return {
					filter:'grayscale(1)',
					opacity:'0.5',
					flex: '0',
	    			visibility: 'hidden'
				};
			} else if(game.status =='COMPLETE' && player == game.loser){
				return {
					filter:'grayscale(1)',
					opacity:'0.5',
				};
			}else {
				return this.ByeFormat(player);
			}
		} else {
			if(game.status == 'COMPLETE' && (player == game.winner1 || player == game.winner2)){
				return this.ByeFormat(player);
			} else if ( game.status =='COMPLETE' && (player == game.loser1 || player == game.loser2) && player == 'BYE') {
				return {
					filter:'grayscale(1)',
					opacity:'0.5',
					flex: '0',
	    			visibility: 'hidden'
				};
			} else if(game.status =='COMPLETE' && (player == game.loser1 || player == game.loser2)){
				return {
					filter:'grayscale(1)',
					opacity:'0.5',
				};
			}else {
				return this.ByeFormat(player);
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
	
	TextStyle(game,player, mode){

		if(mode == 'VS'){
			if(player == 'BYE'  || player.slice(0,6)=='Winner' || player.slice(0,5)=='Loser'){
				return {
				    fontSize:'x-small',
				    color:'#353535'
				};
			} else if(game.status == 'COMPLETE' && player == game.winner){
				return {
				    color: 'yellow',
				    fontWeight: 'bold'	
				};
			} else if ( game.status =='COMPLETE' && player == game.loser) {
				return {    
					color: '#b5b5b5',
				    textDecoration: 'line-through'
				};
			} else {
				 return null;	
			}
		} else {
			if(player == 'BYE'  || player.slice(0,6)=='Winner' || player.slice(0,5)=='Loser'){
				return {
				    fontSize:'x-small',
				    color:'#353535'
				};
			} else if(game.status == 'COMPLETE' && (player == game.winner1 || player == game.winner2)){
				return {
				    color: 'yellow',
				    fontWeight: 'bold'	
				};
				
			} else if ( game.status =='COMPLETE' && (player == game.loser1 || player == game.loser2)) {
				return {
				    color: '#b5b5b5',
				    textDecoration: 'line-through'
				};
			} else {
				return null;
			}
		}
		
	}
	
	
	render(){
		return(
			<div 
				className="btNameCountryCont"
			>
				<div 
					className="btSeed"
					style={
						this.TextStyle(
							this.props.game,
							this.props.player.name,
							this.props.mode
						)
					}
				>
					{this.props.player.seed}
				</div>
				
				<div 
					className="btFlag"
					style={this.FlagStyle(
							this.props.game,
							this.props.player.name,
							this.props.mode
						)
					}
				>
					<Icons
						mascot = {this.props.player==null?null:this.props.player.mascot}
						colorA = {this.props.player==null?null:this.props.player.primaryColor}
						colorB = {this.props.player==null?null:this.props.player.secondaryColor}
					/>
				</div>
				
				<div 
					className="btFlag"
					style={this.FlagStyle(
							this.props.game,
							this.props.player.name,
							this.props.mode
						)
					}
				>
					<img src={this.props.player.flag}/>
				</div>
				<div 
					className="btName"
					style={
						this.TextStyle(
							this.props.game,
							this.props.player.name,
							this.props.mode
						)
					}
				>
					{this.props.player.name}
				</div>
			</div>
		);
	}
}