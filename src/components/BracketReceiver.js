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
var gameHeight = 100;
var voidSpace;
var padHeight;
var secondaryPad;
var moduleHeight;

export default class BracketReceiver extends React.Component {
	constructor(props){
		super(props);
		this.state={
			render:[],
			value:this.props.startValue,
			delta:0,
			bracketLineWidth:0,
			swipe:'swipe'
		};
		
	}
	
	

	AddBracketTile(){
		this.state.render.push(<BracketTile count={this.state.count}/>);
		this.setState({
			count: this.state.count +1
		});
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
					value: this.state.value - 1
				});
			}
		} else if (deltaX > 0){
			if(Math.abs(deltaX)> 40){
				this.setState({
					value: this.state.value + 1
				});
			}
		}
	}


	render(){
		
		const { value } = this.state;
		
		if(this.props.masterGameObject !== null && this.props.masterGameObject !== undefined){
			
			
			
			bracketArray = [];
			var tempArray = [];
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
							
						/>
					);
				}
				renderArray.push(tempArray);
				tempArray=[];
			}
			
			boardHeight = {
				height: this.props.height + 'px'
			};
			
			bezArr = [];
			// fill bezArr up to start value
			for (k = 1; k <= this.props.startValue; k++){
				if (k%2 !== 0){
					//one liner to left
					for (i = 1; i<=renderArray[k+1].length/2; i++){
						tempArray.push(
							<svg 
								 x="0px" y="0px" 
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
					bezArr.push(tempArray);
					tempArray = [];
				} else {
					//bezcurve
					voidSpace = this.props.height - renderArray[k].length*gameHeight;
					padHeight = voidSpace/renderArray[k].length;
					secondaryPad = padHeight/2;
					moduleHeight = 2*gameHeight + padHeight;
					for (i = 1; i <= renderArray[k+(k==this.props.startValue?0:1)].length/2; i++){
						tempArray.push(
							<Stage
								width={this.state.bracketLineWidth} 
								height={moduleHeight}
							>
								<Layer>
									<BezierCurvesMobile
										xo = {this.state.bracketLineWidth}
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
					bezArr.push(tempArray);
					tempArray=[];
				}
			}
			// fill bezArr from start value
			for(k=this.props.startValue; k<(renderArray.length-3);k++){
				voidSpace = this.props.height - renderArray[k].length*gameHeight;
				padHeight = voidSpace/renderArray[k].length;
				secondaryPad = padHeight/2;
				moduleHeight = 2*gameHeight + padHeight;
				for (i = 1; i<=renderArray[k].length/2; i++){
					tempArray.push(
						<Stage
							width={this.state.bracketLineWidth} 
							height={moduleHeight}
						>
							<Layer>
								<BezierCurvesMobile
									xo = {0}
									xf = {this.state.bracketLineWidth}
									y1 = {gameHeight/2}
									y2 = {moduleHeight/2}
									y3 = {moduleHeight-gameHeight/2}
									color = 'black'
									stroke = {1}
									dashEnabled = {false}
								/>
							</Layer>
						</Stage>
					);
				}
				bezArr.push(tempArray);
				tempArray=[];
			}
			// fill bezArr for last two
			for(k=0;k<=1;k++){
				tempArray.push(
					<svg 
						x="0px" y="0px" 
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
				bezArr.push(tempArray);
				tempArray=[];
			}
		}
		
		
		return(
			<div className="brMain">
	        	<div className="brTitles">
		        	<div className='brValue'>
		        		<CSSTransitionGroup
				            transitionName={this.state.delta<=0?"moveBracketLeft":"moveBracketRight"}
				            transitionEnterTimeout={500}
				            transitionLeaveTimeout={300}>
			            	{this.props.roundNamesArray[value-1]}
				        </CSSTransitionGroup>
	        		</div>
		        	<div className='brValue'>
		        		<CSSTransitionGroup
				            transitionName={this.state.delta<=0?"moveBracketLeft":"moveBracketRight"}
				            transitionEnterTimeout={500}
				            transitionLeaveTimeout={300}>
			            	{this.props.roundNamesArray[value]}
				        </CSSTransitionGroup>
	        		</div>
	        		<div className='brValue'>
		        		<CSSTransitionGroup
				            transitionName={this.state.delta<=0?"moveBracketLeft":"moveBracketRight"}
				            transitionEnterTimeout={500}
				            transitionLeaveTimeout={300}>
			            	{this.props.roundNamesArray[value+1]}
				        </CSSTransitionGroup>
        			</div>
    			</div>
    			
    			<Swipeable 
    				className="brBracketArea"
    				onSwiped={this.swiped.bind(this)}
				>
    				<div className="brLineArea" style={boardHeight}/>
					<div className="brRoundArea" style={boardHeight}>
		            	{renderArray[this.state.value-1].map(element => element)}
			        </div>
			        <Measure
				        bounds
				        onResize={(contentRect) => {
				          this.setState({ bracketLineWidth: contentRect.bounds.width });
				        }}
			    	>
			    		{({ measureRef }) =>
					        <div 
								className="brLineArea" 
								style={boardHeight}
								ref={measureRef}
							>
								{bezArr[this.state.value-1]}
							</div>
				        }
					</Measure>
					<div className="brRoundArea" style={boardHeight}>
		            	{renderArray[this.state.value].map(element => element)}
			        </div>
    					<div 
							className="brLineArea" 
							style={boardHeight}
							ref={this.saveRef}
						>
							{bezArr[this.state.value]}
						</div>
					<div className="brRoundArea" style={boardHeight}>
		            	{renderArray[this.state.value+1].map(element => element)}
			        </div>
    				<div className="brLineArea" style={boardHeight}/>
    			</Swipeable>
    			
    			<div className="brSlider">
	    			<Slider
		        		min={1}
		        		max={this.props.roundNamesArray.length -2}
		        		value={value}
		        		onChangeStart={this.handleChangeStart}
		        		onChange={this.handleChange.bind(this)}
		        		onChangeComplete={this.handleChangeComplete}
		        	/>
	        	</div>
			</div>
		);
	}
}
  
