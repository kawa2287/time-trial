import React from 'react';
import { Stage, Group, Layer, Text, Rect } from "react-konva";
import MatchupTile from './matchup/MatchupTile';
import MatchupTile4P from './matchup/MatchupTile4P';
import Colors from '../static/Colors';
import WinChanceTile from './matchup/WinChanceTile';
import WinChanceTile4P from './matchup/WinChanceTile4P';


const formattedSeconds = (sec) =>
	Math.floor(sec) + '.' + 
	(sec < 1 ? Math.round(Math.floor(sec*10)) : Math.round(10*( (Math.floor(sec*10)/10) % (Math.floor(sec)))) ) +
	Math.floor((sec % 0.1)*100);
	
	
var tileHeight = 128;
var flagHeight = 192;
var flagWidth = 192;
var simulateButtonWidth = 200;
var simulateButtonHeight = 30;
var timeElapsed = 0;


var Geo = {
	mainFontfamily: 'Open Sans',
	flagHeight : flagHeight,
	flagWidth : flagWidth,
	margin4P: 16,
	margin: 20,
	tileHeight: tileHeight,
	tileHeight4P: tileHeight*0.75,
	topPad: 86,
	positionFontSize: 30,
	positionWidth : 64,
	seedFontSize: 20,
	nameSize: 28,
	finishFontSize : 16,
	paleAmber: Colors.paleAmber,
	deSatOrng: Colors.deSatOrng,
	borderColor: Colors.matchupBorder,
	seedColor: Colors.seedColor,
	statTileColor: Colors.tileColor,
	statColor: Colors.smokeGray,
	gold: Colors.gold,
	silver: Colors.silver,
	bronze: Colors.bronze,
	statLabelSize:16,
	timeCircleRadius: 64,
	timeCircleRadius4P: 64,
	timeFont : 36,
	finishBox : 36,
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
	var i;
	
	if( initVarsObj.mode == 'VS'){
		for(i = 0; i < initVarsObj.players.length; i++){
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
					initVarsObj.winTime1,
					initVarsObj.winner1,
					initVarsObj.selectedPlayer,
					initVarsObj.keyPress,
					initVarsObj.stopHandler,
					initVarsObj.keySeq,
					initVarsObj.mode
				)
			);
		}
	} else {
		for(i = 0; i < initVarsObj.players.length; i++){
			arr.push(
				MatchupTile4P(
					initVarsObj.Geo,
					initVarsObj.players[i],
					initVarsObj.Geo.topPad + i*(Geo.margin+Geo.tileHeight),
					initVarsObj.Geo.alphaArr[i], 
					initVarsObj.Geo.colorArr[i], 
					initVarsObj.dialogWidth,
					initVarsObj.dialogHeight,
					initVarsObj.winner1,
					initVarsObj.winner2,
					initVarsObj.loser1,
					initVarsObj.loser2,
					initVarsObj.keyPress,
					initVarsObj.stopHandler4P,
					initVarsObj.keySeq,
					initVarsObj.mode,
					initVarsObj.handlePlacementSelect,
					initVarsObj.players,
					i,
					initVarsObj.winTime1,
					initVarsObj.winTime2,
					initVarsObj.loseTime1,
					initVarsObj.loseTime2
				)
			);
		}
	}
	
	
	return arr;
}



class VsMatchup extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			simHover : false,
			subHover : false,
			winner1 : null,
			winner2 : null,
			loser1 : null,
			loser2 : null,
			winTime1 : 0,
			winTime2 : 0,
			loseTime1 : 0,
			loseTime2 : 0,
			selectedPlayer : null,
			keyPress : null,
			timeElapsed: 0,
			keySeq : 0,
			stopCount: 0
		};
	}
	
	componentWillReceiveProps(newProps) {
		if ({...newProps} !== {...this.props}){
		    this.props = newProps;
		}
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
    		this.incrementer = setInterval( () => {
	    			timeElapsed = timeElapsed + 0.01;
    			}, 10);
    			
			this.setState({
				keySeq : 1
	    	}, function afterClick() {
	    		this.setState({
	    			keyPress : null
	    		});
	    	});
    	} else if (event.key == ' ' && this.state.keySeq == 1){
    		console.log('timeElapsed',timeElapsed);
    		this.setState({
    			keySeq : 2,
    			keyPress : null
    		}, function  afterClick() {
    			clearInterval(this.incrementer);
    		});
    		
    	} else if (event.key == ' ' && this.state.keySeq == 2){
    		timeElapsed = 0;
    		this.setState({
    			keySeq : 0,
    			keyPress : null,
    			winTime1: 0,
    			winTime2: 0,
    			loseTime1: 0,
    			loseTime2: 0,
    			winner1: null,
    			winner2: null,
    			loser1: null,
    			loser2: null,
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
    		winner1: player,
    		selectedPlayer: player,
    		loser1: loser,
    		winTime:Number(formattedSeconds(timeElapsed)),
    		keySeq:2,
    		keyPress: null
    	});
    }
    
    handleStopTimer4P(player){
		if (this.state.stopCount == 0){
    		this.setState({
    			winner1 : player,
    			winTime1 : formattedSeconds(timeElapsed),
    			stopCount : 1,
    			keyPress: null
    		});
    		return;
    	} else if ( this.state.stopCount == 1 && player.name !== this.state.winner1.name){
    		this.setState({
    			winner2 : player,
    			winTime2 : formattedSeconds(timeElapsed),
    			stopCount : 2,
    			keyPress: null
    		});
    		return;
    	} else if (this.state.stopCount == 2&& (player.name !== this.state.winner1.name && player.name !== this.state.winner2.name)){
    		clearInterval(this.incrementer);
    		this.setState({
    			loser1 : player,
    			loseTime1 : formattedSeconds(timeElapsed),
    			keySeq:2,
    			keyPress:null,
    			stopCount : 0
    		},() => this.callBackSetLast());
    		
    		return;
    	}
    }

	
	simulateClick(){
		var pAtime = Math.round(100*(this.props.players[0].timeTrial + (this.randomIntFromInterval(-5,5))))/100;
		var pBtime = Math.round(100*(this.props.players[1].timeTrial + (this.randomIntFromInterval(-5,5))))/100;
		
		if (this.props.mode == 'VS'){
			// decide winner or loser
			if (pAtime <= pBtime){
				this.setState({
					selectedPlayer : this.props.players[0],
					winner1 : this.props.players[0],
					loser1 : this.props.players[1],
					winTime1 : pAtime,
					loseTime1 : pBtime
				});
				
			} else if (pAtime > pBtime) {
				this.setState({
					selectedPlayer : this.props.players[1],
					winner1 : this.props.players[1],
					loser1 : this.props.players[0],
					winTime1 : pBtime,
					loseTime1 : pAtime
				});
			}
		}else {
			var arr = [];
			var pA = {};
			var pB = {};
			var pC = {};
			var pD = {};
			var pCtime = Math.round(100*(this.props.players[2].timeTrial + (this.randomIntFromInterval(-5,5))))/100;
			var pDtime = Math.round(100*(this.props.players[3].timeTrial + (this.randomIntFromInterval(-5,5))))/100;
			
			pA = {player: this.props.players[0], time : this.props.players[0].name =='BYE'?'-':pAtime};
			pB = {player: this.props.players[1], time : this.props.players[1].name =='BYE'?'-':pBtime};
			pC = {player: this.props.players[2], time : this.props.players[2].name =='BYE'?'-':pCtime};
			pD = {player: this.props.players[3], time : this.props.players[3].name =='BYE'?'-':pDtime};
			arr = [pA,pB,pC,pD];
			
			//sort the array
			arr.sort(function(a, b) {
			    
			    //sort by time
			    if (a.time == '-'){
			    	return 1;
			    }
			    else if (a.time < b.time) {
			    	return -1;
			    }
			    else if (a.time  > b.time) {
			        return 1;
			    }
			    return 0;
			});
			this.setState({
				winner1 : arr[0].player,
				winner2 : arr[1].player,
				loser1 : arr[2].player,
				loser2 : arr[3].player,
				winTime1 : arr[0].time,
				winTime2 : arr[1].time,
				loseTime1 : arr[2].time,
				loseTime2 : arr[3].time,
			});
		}
	}
	//////////////////////////////////////////////////////
	
	handleSubmitClick(){

		if (this.state.winner1 !== null){
			
			this.winnerClick(
				this.state.winner1, 
				this.state.winner2, 
				this.state.loser1, 
				this.state.loser2,
				this.state.winTime1,
				this.state.winTime2,
				this.state.loseTime1,
				this.state.loseTime2
				);
			timeElapsed = 0;
			this.setState({
				winTime1 : 0,
				winTime2 : 0,
				loseTime1 : 0,
				loseTime2 : 0,
				winner1 : null,
				winner2 : null,
				loser1 : null,
				loser2 : null,
				selectedPlayer : null,
				keySeq : 0,
    			keyPress : null
			},function afterClick(){
				this.props.hideMatchup();
			});
		}
	}
	
	handlePlayerSelect(player){
		var loser;
		loser = this.props.players[0].name == player.name ? this.props.players[1] : this.props.players[0]; 
		this.setState({
			selectedPlayer : player,
			winner1 : player,
			loser1 : loser
		});
	}
	
	handlePlacementSelect(place,player){
		//check if name is already set
		var remove = 0;
		var checkArray = [];
		this.state.winner1 !== null ? checkArray.push(this.state.winner1) : checkArray.push({name:'pass'});
		this.state.winner2 !== null ? checkArray.push(this.state.winner2) : checkArray.push({name:'pass'});
		this.state.loser1 !== null ? checkArray.push(this.state.loser1) : checkArray.push({name:'pass'});
		this.state.loser2 !== null ? checkArray.push(this.state.loser2) : checkArray.push({name:'pass'});
		
		for (var n = 1; n <= checkArray.length; n++){
			if (checkArray[n-1].name == player.name){
				remove = n;
			}
		}
		
		if (remove >= 1){
			switch (remove) {
				case 1:
					this.setState({winner1 : null },
					function afterClick(){
						this.handlePlacementSelect(place,player);
					});
					break;
				case 2:
					this.setState({winner2 : null },
					function afterClick(){
						this.handlePlacementSelect(place,player);
					});
					break;
				case 3:
					this.setState({loser1 : null},
					function afterClick(){
						this.handlePlacementSelect(place,player);
					});
					break;
				default:
					this.setState({loser2 : null});
			}
		} else {
			//set name if not set
			switch (place) {
				case '1':
					this.setState({winner1 : player },() => this.callBackSetLast());
					break;
				case '2':
					this.setState({winner2 : player },() => this.callBackSetLast());
					break;
				case '3':
					this.setState({loser1 : player},() => this.callBackSetLast());
					break;
				default:
					this.setState({loser2 : player}, () => this.callBackSetLast());
			}
		}
		
		
		
	}
	
	callBackSetLast (){
		var CallBackArray = [];
		this.state.winner1 !== null ? CallBackArray.push(this.state.winner1) : CallBackArray.push({name:'pass'});
		this.state.winner2 !== null ? CallBackArray.push(this.state.winner2) : CallBackArray.push({name:'pass'});
		this.state.loser1 !== null ? CallBackArray.push(this.state.loser1) : CallBackArray.push({name:'pass'});
		this.state.loser2 !== null ? CallBackArray.push(this.state.loser2) : CallBackArray.push({name:'pass'});
		var addLast = 0;
		for (var x = 0; x <CallBackArray.length; x++){
			if(CallBackArray[x].name == 'pass'){
				addLast = addLast+1;
			}
		}
		if (addLast == 1){
			for (var x = 0; x <this.props.players.length; x++){
				if(this.props.players[x].name !== this.state.winner1.name &&
				this.props.players[x].name !== this.state.winner2.name &&
				this.props.players[x].name !== this.state.loser1.name){
					this.setState({loser2:this.props.players[x]});
				}
			}
		}
	}
	
	winnerClick(w1,w2,l1,l2,w1t,w2t,l1t,l2t) {
		
		var winLosePackage = {
			gameNumber : this.props.gameNumber,
			bracketSpots : this.props.bracketSpots,
			byeRound : false
		};
		
		var resultTimePackage = {};
		
		if (this.props.mode =='VS'){
			winLosePackage['mode'] = 'VS';
		
			winLosePackage['winner1'] = w1;
			winLosePackage['loser1'] = l1;
				
			resultTimePackage['winner1time'] = w1t;
			resultTimePackage['loser1time'] = l1t || winLosePackage.loser1.timeTrial;
		
		} else {
			winLosePackage['mode'] = '4P';
			
			winLosePackage['winner1'] = w1;
			winLosePackage['winner2'] = w2;
			winLosePackage['loser1'] = l1;
			winLosePackage['loser2'] = l2;
				
			resultTimePackage['winner1time'] = (w1t == 0 || w1t == null || w1t == '-') ? winLosePackage.winner1.timeTrial : w1t;
			resultTimePackage['winner2time'] = (w2t == 0 || w2t == null || w2t == '-') ? winLosePackage.winner2.timeTrial : w2t;
			resultTimePackage['loser1time'] = (l1t == 0 || l1t == null || l1t == '-') ? winLosePackage.loser1.timeTrial : l1t;
			resultTimePackage['loser2time'] = (l2t == 0 || l2t == null || l2t == '-') ? winLosePackage.loser2.timeTrial : l2t;
			
			
			var pTmArr= ['playerAtime','playerBtime','playerCtime','playerDtime'];
			
			for (var n = 0; n<pTmArr.length; n++){
					
				if(this.props.players[n].name ==w1.name){
					winLosePackage[pTmArr[n]]= w1t;
				} else if(this.props.players[n].name == w2.name){
					winLosePackage[pTmArr[n]]= w2t;
				}else if(this.props.players[n].name == l1.name){
					winLosePackage[pTmArr[n]]= l1t;
				} else if(this.props.players[n].name == l2.name){
					winLosePackage[pTmArr[n]]=l2t;
				} else {
					winLosePackage[pTmArr[n]]='-';
				}
			}
		}
		this.props.WinnerLoserHandler(winLosePackage, resultTimePackage);
	}

   render() {
   	
   		var initVars = {
   			players : this.props.players,
			Geo: Geo,
			dialogHeight : this.props.dialogHeight,
			dialogWidth: this.props.dialogWidth,
			winnerClick: this.handlePlayerSelect.bind(this),
			winTime1:this.state.winTime1, 
			winTime2:this.state.winTime2, 
			loseTime1:this.state.loseTime1, 
			loseTime2:this.state.loseTime2, 
			winner1: this.state.winner1,
			winner2: this.state.winner2,
			loser1: this.state.loser1,
			loser2: this.state.loser2,
			selectedPlayer: this.state.selectedPlayer,
			keyPress: this.state.keyPress,
			stopHandler: this.handleStopMainTimer.bind(this),
			keySeq: this.state.keySeq,
			mode : this.props.mode,
			handlePlacementSelect : this.handlePlacementSelect.bind(this),
			stopHandler4P : this.handleStopTimer4P.bind(this)
   		};
   		
   		var winChTl = null;
   		
   		if(this.props.mode=='VS'){
   			winChTl = WinChanceTile(
   				Geo, 
   				this.props.players, 
   				this.props.dialogWidth, 
   				this.props.dialogHeight,
   				this.state.winTime,
   				this.state.keySeq, 
   				this.state.keySeq, 
   				this.props.mode
   			);
   		} else {
   			winChTl = WinChanceTile4P(
   				Geo, 
   				this.props.players, 
   				this.props.dialogWidth, 
   				this.props.dialogHeight,
   				this.state.winTime,
   				this.state.keySeq, 
   				this.state.keySeq, 
   				this.props.mode
   			);
   		}
  
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
							{winChTl}
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