import React from 'react';
import BracketTile from './BracketTile';
import BezierCurvesMobile from './BezierCurvesMobile';
import Slider from 'react-rangeslider';
import { CSSTransitionGroup } from 'react-transition-group';
import Measure from 'react-measure';
import { Stage, Group, Layer } from "react-konva";
import Swipeable from 'react-swipeable';


var bracketArray;
var renderArray;
var bezArr;
var boardHeight;

var minTileHeight = 20;
var spaceBetweenGamesFirstRound = 20;
var voidSpace;
var padHeight;
var secondaryPad;
var moduleHeight;

var gameHeight;
var height;

export default class BracketReceiver extends React.Component {
	constructor(props){
		super(props);
		this.state={
			render:[],
			value:this.props.startValue+1,
			delta:0,
			bracketLineWidth:0,
			swipe:'swipe',
			frameWidth:0
		};
		gameHeight = (this.props.mode =='VS'?3:5)*minTileHeight;
		height = gameHeight*this.props.bracketSpots/(this.props.mode == 'VS' ? 2 :4)+(this.props.bracketSpots/(this.props.mode == 'VS' ? 2 :4)+1)*spaceBetweenGamesFirstRound;
	}
	
	handleChangeStart () {
    	console.log('Change event started');
	}

    handleChange (value){
    	var delta = this.state.value- value;
	    this.setState({
	        value: value,
	        delta: delta
	    });
	}

    handleChangeComplete () {
		console.log('Change event completed');
	}
	
	swiped(e, deltaX, deltaY, isFlick, velocity) {
		if(deltaX < 0){
			if(Math.abs(deltaX)> 40){
				this.setState({
					value: this.state.value - (this.state.value==1?0:1)
				});
			}
		} else if (deltaX > 0){
			if(Math.abs(deltaX)> 40){
				this.setState({
					value: this.state.value + (this.state.value==this.props.roundNamesArray.length-1?0:1)
				});
			}
		}
	}


	render(){
		
		// SET # OF ROUNDS TO SEE ON SCREEN AT ONCE //
		var gamesViewPerFrame = 2;
		var gameViewPercentage = 0.9;
		
		const { value } = this.state;
		var gameWidth = this.state.frameWidth*gameViewPercentage/gamesViewPerFrame;
		var lineWidth = this.state.frameWidth*(1-gameViewPercentage)/(gamesViewPerFrame+1);
		
		
		if(this.props.masterGameObject !== null && this.props.masterGameObject !== undefined){
			
			bracketArray = [];
			var tempArray = [];
			console.log('this.props.cleanRoundNamesArray',this.props.cleanRoundNamesArray);
			for (var k = 0; k < this.props.cleanRoundNamesArray.length; k++){
				for (var i in this.props.masterGameObject){
					if( this.props.masterGameObject[i].gameTitle == this.props.cleanRoundNamesArray[k]){
						tempArray.push(this.props.masterGameObject[i]);
					}
				}
				bracketArray.push(tempArray);
				tempArray = [];
			}
			
			renderArray = [];
			for (k = 0; k < bracketArray.length; k++){
				for (i = 0; i< bracketArray[k].length; i++){
					tempArray.push(
						<BracketTile
							game = {bracketArray[k][i]}
							showMatchup ={this.props.showMatchup}
							mode = {this.props.mode}
						/>
					);
				}
				
				var deltaX = ((k+1)-this.state.value)*gameWidth+(((k+1)-this.state.value)+1)*lineWidth;
				var tileStyle = {
					height: height + 'px',
					width: gameWidth + 'px',
					transform: `translate(${deltaX}px)` 
				};
				
				renderArray.push(
					<div 
						className="brRoundArea" 
						style={tileStyle}
					>
		            	{tempArray.map(element => element)}
			        </div>
				);
				tempArray=[];
			}
			
			boardHeight = {
				height: height + 'px',
			};
			
			bezArr = [];
			var counter = 0;
			var lineStyle = {
				height: height + 'px',
				width: lineWidth + 'px',
				transform: `translate(${((counter+1)-this.state.value)*gameWidth+((counter+1)-this.state.value)*lineWidth}px)` 
			};
			//push first blank
			bezArr.push(
				<div 
					className="brLineArea" 
					style={lineStyle}
				/>
			);
			counter += 1;
			
			// fill bezArr up to start value
			for (k = 1; k <= this.props.startValue; k++){
				
				lineStyle = {
					height: height + 'px',
					width: lineWidth + 'px',
					transform: `translate(${((counter+1)-this.state.value)*gameWidth+((counter+1)-this.state.value)*lineWidth}px)` 
				};
				
				if (k%2 !== 0){
					//one liner to left
					for (i = 1; i<=renderArray[k+1].props.children.length/2; i++){
						tempArray.push(
							<svg 
								x="0px" y="0px" 
								fill="white"
								viewBox="0 0 100 125" 
								enable-background="new 0 0 100 100"
								style={{
									height:moduleHeight,
									width:'50%',
									alignSelf:'center',
									display:'flex',
								}}
							>
								<polygon points="32.64,35.044 67.363,0.321 82.47,15.425 47.745,50.15 82.468,84.872 67.363,99.979 17.53,50.15 "/>
							</svg>
						);
					}
					bezArr.push(
						<div 
							className="brLineArea" 
							style={lineStyle}
						>
							{tempArray.map(element => element)}
						</div>
					);
					tempArray = [];
				} else {
					//bezcurve
					voidSpace = height - renderArray[k].props.children.length*gameHeight;
					padHeight = voidSpace/renderArray[k].props.children.length;
					secondaryPad = padHeight/2;
					moduleHeight = 2*gameHeight + padHeight;
					for (i = 1; i <= renderArray[k+(k==this.props.startValue?0:1)].props.children.length/2; i++){
						tempArray.push(
							<Stage
								width={lineWidth} 
								height={moduleHeight}
							>
								<Layer>
									<BezierCurvesMobile
										xo = {lineWidth}
										xf = {0}
										y1 = {gameHeight/2}
										y2 = {moduleHeight/2}
										y3 = {moduleHeight-gameHeight/2}
										color = 'red'
										stroke = {1}
										dashEnabled = {true}
									/>
								</Layer>
							</Stage>
						);
					}
					bezArr.push(
						<div 
							className="brLineArea" 
							style={lineStyle}
						>
							{tempArray.map(element => element)}
						</div>
					);
					tempArray=[];
				}
				counter += 1;
			}
			// fill bezArr from start value
			for(k=this.props.startValue; k<(renderArray.length-3);k++){
				lineStyle = {
					height: height + 'px',
					width: lineWidth + 'px',
					transform: `translate(${((counter+1)-this.state.value)*gameWidth+((counter+1)-this.state.value)*lineWidth}px)` 
				};
				voidSpace = height - renderArray[k].props.children.length*gameHeight;
				padHeight = voidSpace/renderArray[k].props.children.length;
				secondaryPad = padHeight/2;
				moduleHeight = 2*gameHeight + padHeight;
				for (i = 1; i<=renderArray[k].props.children.length/2; i++){
					tempArray.push(
						<Stage
							width={lineWidth} 
							height={moduleHeight}
						>
							<Layer>
								<BezierCurvesMobile
									xo = {0}
									xf = {lineWidth}
									y1 = {gameHeight/2}
									y2 = {moduleHeight/2}
									y3 = {moduleHeight-gameHeight/2}
									color = '#828282'
									stroke = {1}
									dashEnabled = {false}
								/>
							</Layer>
						</Stage>
					);
				}
				bezArr.push(
					<div 
						className="brLineArea" 
						style={lineStyle}
					>
						{tempArray.map(element => element)}
					</div>
				);
				tempArray=[];
				counter += 1;
			}
			// fill bezArr for last two
			for(k=0;k<=1;k++){
				lineStyle = {
					height: height + 'px',
					width: lineWidth + 'px',
					transform: `translate(${((counter+1)-this.state.value)*gameWidth+((counter+1)-this.state.value)*lineWidth}px)` 
				};
				tempArray.push(
					<svg 
						x="0px" y="0px" 
						fill="white"
						viewBox="0 0 100 125" 
						enable-background="new 0 0 100 100"
						style={{
							height:moduleHeight,
							width:'50%',
							alignSelf:'center',
							display:'flex',
						}}
					>
						<polygon transform="scale(-1, 1) translate(-100, 0)"  points="32.64,35.044 67.363,0.321 82.47,15.425 47.745,50.15 82.468,84.872 67.363,99.979 17.53,50.15 "/>
					</svg>
				);
				bezArr.push(
					<div 
						className="brLineArea" 
						style={lineStyle}
					>
						{tempArray.map(element => element)}
					</div>
				);
				tempArray=[];
				counter += 1;
			}
			
			//push last blank
			lineStyle = {
					height: height + 'px',
					width: lineWidth + 'px',
					transform: `translate(${((counter+1)-this.state.value)*gameWidth+((counter+1)-this.state.value)*lineWidth}px)` 
				};
			bezArr.push(
				<div 
					className="brLineArea" 
					style={tileStyle}
				/>
			);
		}
		
		
		
		return(
			<Measure
    				bounds
    				onResize={(contentRect) => {
    					this.setState({frameWidth: contentRect.bounds.width});
    				}}
				>
					{({ measureRef }) =>
					<div className="brMain" ref={measureRef}>
			        	<div className="brTitles">
				        	<div className='brValue'>
				        		<CSSTransitionGroup
						            transitionName="navbar"
				        			transitionEnterTimeout={1000}
				        			transitionLeaveTimeout={1}>
					            	{this.props.roundNamesArray[value-1]}
						        </CSSTransitionGroup>
			        		</div>
				        	<div className='brValue'>
				        		<CSSTransitionGroup
						            transitionName="navbar"
					    			transitionEnterTimeout={1000}
					    			transitionLeaveTimeout={1}>
					            	{this.props.roundNamesArray[value]}
						        </CSSTransitionGroup>
			        		</div>
		    			</div>
		    			
		    			<Swipeable 
		    				className="brBracketFrame"
		    				style={boardHeight}
		    				onSwiped={this.swiped.bind(this)}
						>
							<div className="brBracketArea">
			    				{renderArray.map(element => element)}
			    				{bezArr.map(element => element)}
		    				</div>
		    			</Swipeable>
					</div>
				}
			</Measure>
		);
	}
}
