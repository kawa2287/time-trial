import React from 'react';
import { Stage, Group, Layer, Text, Rect } from "react-konva";
import MatchupTile from './matchup/MatchupTile';
import Colors from '../static/Colors';


var tileHeight = 128;
var flagHeight = 192;
var flagWidth = 192;


var Geo = {
	flagHeight : flagHeight,
	flagWidth : flagWidth,
	margin: 20,
	tileHeight: tileHeight,
	topPad: 86,
	positionFontSize: 30,
	positionWidth : 64,
	seedFontSize: 20,
	nameSize: 28,
	borderColor: Colors.matchupBorder,
	seedColor: Colors.seedColor,
	statTileColor: Colors.tileColor,
	flagClip : {
		xs : 0,
		ys : 80,
		x1 : 0,
		y1 : tileHeight,
		x2 : 92,
		y2 : tileHeight,
		x3 : flagWidth,
		y3 : 28,
		x4 : flagWidth,
		y4 : 0,
		x5 : 0,
		y5 : 0
	},
	seedShape : {
		xs : 106,
		ys : tileHeight,
		x1 : flagWidth,
		y1 : tileHeight,
		x2 : flagWidth,
		y2 : 42
	},
	seedPos : {
		x : 167,
		y : 105
	}
};

function initTiles(players,Geo, dialogHeight, dialogWidth, winnerClick){
	var arr = [];
	var alphaArr = ['A','B','C','D'];
	var colorArr = ['red','blue','black','yellow'];
	
	for(var i = 0; i < players.length; i++){
		arr.push(
			MatchupTile(
				Geo,
				players[i],
				dialogHeight - dialogHeight/(i+1),
				alphaArr[i], 
				colorArr[i], 
				dialogWidth,
				winnerClick
			)
		);
	}
	return arr;
}

class VsMatchup extends React.Component {
	constructor(props){
		super(props);
	}
	
	winnerClick(player) {
		var winner;
		var loser;
		
		if(Object.keys(this.props.players[0]).length !== 0 && this.props.players[0].constructor === Object ||Object.keys(this.props.players[1]).length !== 0 && this.props.players[1].constructor === Object ){
			//hackish
			console.log('winningPLayer, player');
			if(player.name == this.props.players[0].name){
				winner = this.props.players[0];
				loser = this.props.players[1];
			} else {
				winner = this.props.players[1];
				loser = this.props.players[0];
			}
			console.log('gameNumber', this.props.gameNumber);
			console.log('bracketSpots', this.props.bracketSpots);
			
			this.props.WinnerLoserHandler(
				this.props.gameNumber, 
				this.props.bracketSpots,
				winner, 
				loser,
				0, //need to fix win Time
				0, //need to fix lose Time
				false
			);
		}
		
	}

	
	

   render() {
		return (
			<Stage width={this.props.dialogWidth} height={this.props.dialogHeight}>
				<Layer>
					<Group>
						{initTiles(this.props.players,Geo,this.props.dialogHeight, this.props.dialogWidth,this.winnerClick.bind(this)).map(element => element)}
					</Group>
				</Layer>
			</Stage>
		);
    }
}


export default VsMatchup;