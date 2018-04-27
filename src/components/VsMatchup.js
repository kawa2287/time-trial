import React from 'react';
import { Stage, Group, Layer, Text, Rect } from "react-konva";
import MatchupTile from './matchup/MatchupTile';
import Colors from '../static/Colors';
import WinChanceTile from './matchup/WinChanceTile';


const formattedSeconds = (sec) =>
	Math.floor(sec) + '.' + 
	(sec < 1 ? Math.round(Math.floor(sec*10)) : Math.round(10*( (Math.floor(sec*10)/10) % (Math.floor(sec)))) ) +
	Math.floor((sec % 0.1)*100);
	
	
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
	alphaArr : [1,2,3,4],
	colorArr : [
		'#ff6961',
		'#61f7ff',
		'#61ff69',
		'#ff61f7'
	]
};

function initTiles(initVarsObj){
		
	var arr = [];
	
	for(var i = 0; i < initVarsObj.players.length; i++){
		arr.push(
			MatchupTile(
				initVarsObj.Geo,
				initVarsObj.players[i],
				initVarsObj.dialogHeight - initVarsObj.dialogHeight/(i+1),
				initVarsObj.Geo.alphaArr[i], 
				initVarsObj.Geo.colorArr[i], 
				initVarsObj.dialogWidth,
				initVarsObj.dialogHeight,
				initVarsObj.winnerClick,
				initVarsObj.winTime,
				initVarsObj.winner,
				initVarsObj.selectedPlayer,
				initVarsObj.keyPress,
				initVarsObj.stopHandler,
				initVarsObj.keySeq
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
			selectedPlayer : null,
			keyPress : null,
			timeElapsed: 0,
			keySeq : 0
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
	
	handleStartClick(event) {
		
    	this.setState({
    		keyPress : event.key
    	});
    		
		if(event.key == ' ' && this.state.keySeq == 0){
    		this.incrementer = setInterval( () =>
		    	this.setState({
					timeElapsed: this.state.timeElapsed + .01,
					keySeq : 1
		    	}, function afterClick() {
		    		this.setState({
		    			keyPress : null
		    		});
		    	}),10
	    	);
    	} else if (event.key == ' ' && this.state.keySeq == 1){
    		this.setState({
    			keySeq : 2,
    			keyPress : null
    		}, function  afterClick() {
    			clearInterval(this.incrementer);
    		});
    		
    	} else if (event.key == ' ' && this.state.keySeq == 2){
    		this.setState({
    			keySeq : 0,
    			keyPress : null,
    			timeElapsed : 0,
    			winTime: 0,
    			winner: null,
    			selectedPlayer: null
    		});
    	}
    }
    
    handleStopMainTimer(player){
    	clearInterval(this.incrementer);
    	
    	var loser;
    	
    	if(player.name == this.props.players[0].name){
    		loser = this.props.players[1];
    	}else {
    		loser = this.props.players[0];
    	}
    	
    	this.setState({
    		winner: player,
    		selectedPlayer: player,
    		loser: loser,
    		winTime:Number(formattedSeconds(this.state.timeElapsed)),
    		keySeq:2,
    		keyPress: null
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
				loser : null,
				selectedPlayer : null,
				keySeq : 0,
    			keyPress : null,
    			timeElapsed : 0
				
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
				winTime,
				loseTime, 
				false
			);
		}
		
	}

   render() {
   	
   		var initVars = {
   			players : this.props.players,
			Geo: Geo,
			dialogHeight : this.props.dialogHeight,
			dialogWidth: this.props.dialogWidth,
			winnerClick: this.handlePlayerSelect.bind(this),
			winTime:this.state.winTime, 
			winner: this.state.winner,
			selectedPlayer: this.state.selectedPlayer,
			keyPress: this.state.keyPress,
			stopHandler: this.handleStopMainTimer.bind(this),
			keySeq: this.state.keySeq
   		};
  
		return (
			<div>
				<input 
					className="controls"
					type="text" 
					id="one" 
					placeholder="Controls Area"
					onKeyPress={this.handleStartClick.bind(this)}
					value = {this.state.keyPress}
				/>
				<Stage width={this.props.dialogWidth} height={this.props.dialogHeight}>
					<Layer>
						<Group>
							{initTiles(initVars).map(element => element)}
							{WinChanceTile(Geo, this.props.players, this.props.dialogWidth, this.props.dialogHeight,this.state.winTime,this.state.keySeq, this.state.timeElapsed)}
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
			</div>
		);
    }
}


export default VsMatchup;