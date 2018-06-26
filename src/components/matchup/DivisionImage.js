'use strict';

import React from 'react';
import Konva from "konva";
import { Image } from "react-konva";

export default class DivisionImage extends React.Component {
	constructor(){
		super();
		this.state = {
			image: null
		};
	}

    componentDidMount() {
    	const image = new window.Image();
        image.src = this.props.img;
        image.onload = () => {
        	this.setState({
        		image:image
        	});
        };
    }
  
	componentWillReceiveProps(newProps) {
		if (newProps.img !== this.props.img){
			const image = new window.Image();
	        image.src = newProps.img;
	        image.onload = () => {
	        	this.setState({
	        		image:image
	        	});
	        };
		}
	}

    render() {
  		var imgHeight = this.props.imgHeight;

    	return <Image 
    	    y={this.props.y}
    	    x={this.props.x}
    		image={this.state.image} 
    		height={imgHeight}
    		width={imgHeight}
    		opacity = {this.props.opacity}
    		ref={node => this.imageNode = node}
    		shadowBlur = {5}
			shadowOpacity = {0.8}
			shadowColor = 'black'
    	/>;
    }
}
