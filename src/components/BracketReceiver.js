import React from 'react';
import BracketTile from './BracketTile';
import Slider from 'react-rangeslider';
import { CSSTransitionGroup } from 'react-transition-group';

var bracketArray;
var renderArray;
var height;


export default class BracketReceiver extends React.Component {
	constructor(props){
		super(props);
		this.state={
			render:[],
			value:this.props.startValue,
			delta:0
		};
		
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
		
		height = {
			height: this.props.height + 'px'
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


	render(){
		
		const { value } = this.state;
		
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
    			
    			<div className="brBracketArea">
    				<div className="brLineArea" style={height}/>
					<div className="brRoundArea" style={height}>
		            	{renderArray[this.state.value-1].map(element => element)}
			        </div>
					<div className="brLineArea" style={height}/>
					<div className="brRoundArea" style={height}>
		            	{renderArray[this.state.value].map(element => element)}
			        </div>
    				<div className="brLineArea" style={height}/>
					<div className="brRoundArea" style={height}>
		            	{renderArray[this.state.value+1].map(element => element)}
			        </div>
    				<div className="brLineArea" style={height}/>
    			</div>
    			
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
  
