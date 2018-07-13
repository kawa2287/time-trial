import React from 'react';
import GameList from './GameList';

export default class GameListReceiver extends React.Component {


	render(){
		
		var gameListArray = [];
		
	
		for (var k in this.props.masterGameObject){
			gameListArray.push(
				<GameList
					gameNumber = {this.props.masterGameObject[k].gameNumber}
					gameTitle = {this.props.masterGameObject[k].gameTitle}
					playerA = {this.props.masterGameObject[k].playerA}
					playerB = {this.props.masterGameObject[k].playerB}
					gameStatus = {this.props.masterGameObject[k].status}
					winner = {this.props.masterGameObject[k].winner}
					loser = {this.props.masterGameObject[k].loser}
					spotsFilled = {this.props.masterGameObject[k].spotsFilled}
					showMatchup ={this.props.ShowMatchup}
					
				/>
			);
		}
		
		return(
			<div>
				{gameListArray.map(element => element)}
			</div>
		);
	}
}
  
