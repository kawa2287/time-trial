import React from 'react';
import { Stage, Group, Layer, Text, Rect } from "react-konva";
import MatchupTile from './matchup/MatchupTile';
import Colors from '../static/Colors';
import WinChanceTile from './matchup/WinChanceTile';


var tileHeight = 128;
var flagHeight = 192;
var flagWidth = 192;
var simulateButtonWidth = 200;
var simulateButtonHeight = 30;



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
	statColor: Colors.smokeGray,
	statLabelSize:16,
	timeCircleRadius: 64,
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
	},
	alphaArr : ['A','B','C','D'],
	colorArr : [
		'#ff6961',
		'#61f7ff',
		'#61ff69',
		'#ff61f7'
	]
};

function initTiles(players,Geo, dialogHeight, dialogWidth, winnerClick, winTime, winner, selectedPlayer){
	var arr = [];
	
	for(var i = 0; i < players.length; i++){
		arr.push(
			MatchupTile(
				Geo,
				players[i],
				dialogHeight - dialogHeight/(i+1),
				Geo.alphaArr[i], 
				Geo.colorArr[i], 
				dialogWidth,
				dialogHeight,
				winnerClick,
				winTime,
				winner,
				selectedPlayer
			)
		);
	}
	return arr;
}



class VsMatchup extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			simHover : false,
			subHover : false,
			winner : null,
			loser : null,
			winTime : 0,
			loseTime : 0,
			selectedPlayer : null
		};
	}
	
	//for testing/////////////////////////////////////////
	randomIntFromInterval(min,max)
	{
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	handleOnMouseOverSim(){
		this.setState({
			simHover : true
		});
	}
	
	handleOnMouseOutSim (){
		this.setState({
			simHover : false
		});
	}

	handleOnMouseOverSub(){
		this.setState({
			subHover : true
		});
	}
	
	handleOnMouseOutSub (){
		this.setState({
			subHover : false
		});
	}
	
	simulateClick(){
		var pAtime = Math.round(100*(this.props.players[0].timeTrial + (this.randomIntFromInterval(-5,5))))/100;
		var pBtime = Math.round(100*(this.props.players[1].timeTrial + (this.randomIntFromInterval(-5,5))))/100;
		
		// decide winner or loser
		if (pAtime <= pBtime){
			this.setState({
				selectedPlayer : this.props.players[0],
				winner : this.props.players[0],
				loser : this.props.players[1],
				winTime : pAtime,
				loseTime : pBtime
			});
			
		} else if (pAtime > pBtime) {
			this.setState({
				selectedPlayer : this.props.players[1],
				winner : this.props.players[1],
				loser : this.props.players[0],
				winTime : pBtime,
				loseTime : pAtime
			});
		}
	}
	//////////////////////////////////////////////////////
	
	handleSubmitClick(){
		if (this.state.winner !== null){
			this.winnerClick(this.state.winner, this.state.winTime);
			this.setState({
				winTime : 0,
				winner : null,
				selectedPlayer : null
			});
			this.props.hideMatchup();
			this.props.updateChart();
		}
	}
	
	handlePlayerSelect(player){
		this.setState({
			selectedPlayer : player,
			winner : player
		});
	}
	
	winnerClick(player, winningTime) {
		var winner;
		var loser;
		var winTime;
		var loseTime;
		
		if(Object.keys(this.props.players[0]).length !== 0 && this.props.players[0].constructor === Object ||Object.keys(this.props.players[1]).length !== 0 && this.props.players[1].constructor === Object ){
			//hackish
			if(player.name == this.props.players[0].name){
				winner = this.props.players[0];
				loser = this.props.players[1];
			} else {
				winner = this.props.players[1];
				loser = this.props.players[0];
			}
			
			winTime = winningTime;
			loseTime = loser.timeTrial;
			
			this.props.WinnerLoserHandler(
				this.props.gameNumber, 
				this.props.bracketSpots,
				winner, 
				loser,
				winTime, //need to fix win Time
				loseTime, //need to fix lose Time
				false
			);
		}
		
	}

   render() {
   	
		return (
			<Stage width={this.props.dialogWidth} height={this.props.dialogHeight}>
				<Layer>
					<Group>
						{initTiles(this.props.players,Geo,this.props.dialogHeight, this.props.dialogWidth,this.handlePlayerSelect.bind(this),this.state.winTime, this.state.winner, this.state.selectedPlayer).map(element => element)}
						{WinChanceTile(Geo, this.props.players, this.props.dialogWidth, this.props.dialogHeight,this.state.winTime)}
						<Group
							onClick={this.simulateClick.bind(this)}
							onmouseover={this.handleOnMouseOverSim.bind(this)}
							onmouseout={this.handleOnMouseOutSim.bind(this)}
						>
							<Rect
								x={this.props.dialogWidth/4 - simulateButtonWidth/2}
								y={this.props.dialogHeight - 2*Geo.margin - simulateButtonHeight}
								width={simulateButtonWidth}
								height={simulateButtonHeight}
								fill= {this.state.simHover === true ? Colors.hoverColor : 'white'}
								stroke= {Geo.borderColor}
								strokeWidth= {0}
								shadowBlur = {10}
								shadowOpacity= {0.1}
								cornerRadius={5}
							/>
							<Text 
								x={this.props.dialogWidth/4 - simulateButtonWidth/2}
								y={this.props.dialogHeight - 2*Geo.margin - simulateButtonHeight/2 - Geo.seedFontSize/2}
								width={simulateButtonWidth}
								text = {'simulate'}
								align = 'center'
								fill = 'black'
								fontVariant = 'small-caps'
								fontSize = {Geo.seedFontSize}
								shadowBlur = {2}
								shadowOpacity= {0.5}
							/>
							<Text 
								x={this.props.dialogWidth*3/4 - simulateButtonWidth/2}
								y={this.props.dialogHeight - 2*Geo.margin - simulateButtonHeight/2 - Geo.seedFontSize/2}
								width={simulateButtonWidth}
								text = {'submit'}
								align = 'center'
								fill = 'black'
								fontVariant = 'small-caps'
								fontSize = {Geo.seedFontSize}
								shadowBlur = {2}
								shadowOpacity= {0.5}
							/>
						</Group>
						<Group
							onClick={this.handleSubmitClick.bind(this)}
							onmouseover={this.handleOnMouseOverSub.bind(this)}
							onmouseout={this.handleOnMouseOutSub.bind(this)}
						>
							<Rect
								x={this.props.dialogWidth*3/4 - simulateButtonWidth/2}
								y={this.props.dialogHeight - 2*Geo.margin - simulateButtonHeight}
								width={simulateButtonWidth}
								height={simulateButtonHeight}
								fill= {this.state.subHover === true ? Colors.hoverColor : 'white'}
								stroke= {Geo.borderColor}
								strokeWidth= {0}
								shadowBlur = {10}
								shadowOpacity= {0.1}
								cornerRadius={5}
							/>
							<Text 
								x={this.props.dialogWidth*3/4 - simulateButtonWidth/2}
								y={this.props.dialogHeight - 2*Geo.margin - simulateButtonHeight/2 - Geo.seedFontSize/2}
								width={simulateButtonWidth}
								text = {'submit'}
								align = 'center'
								fill = 'black'
								fontVariant = 'small-caps'
								fontSize = {Geo.seedFontSize}
								shadowBlur = {2}
								shadowOpacity= {0.5}
							/>
						</Group>
					</Group>
				</Layer>
			</Stage>
		);
    }
}


export default VsMatchup;