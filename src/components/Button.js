import React from 'react';

var background = '#786B9C';

export default class Button extends React.Component {
	constructor(){
		super();
		this.state={
			hover:false
		};
	}

	handleOnMouseOver(){
		this.setState({
			hover:true
		});
	}
	
	handleOnMouseOut (){
		this.setState({
			hover:false
		});
	}
	
	handleOnClick (){
		this.props.clickHandle(this.props.title);
	}

	render(){
		
		var buttonStyle = {
			margin: '5px',
			borderRadius: '5px',
			background: this.state.hover === true ? 'red' : background
		};

		return(
			<div
				className="inner-square"
				style = {buttonStyle}
				onMouseOver={this.handleOnMouseOver.bind(this)}
				onMouseOut={this.handleOnMouseOut.bind(this)}
				onClick={this.handleOnClick.bind(this)}
			>
				{this.props.title}
			</div>
		);
	}
}
  
