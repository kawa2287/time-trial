'use strict';

import React from 'react';
import Konva from "konva";
import { Image } from "react-konva";

export default class TileFlag extends React.Component {
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
			console.log('received new flag');
			console.log(newProps.img);
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
  		var imgHt = 30;
  		var imgX = 5 + this.props.rectX;
  		var imgY = (this.props.stageHeight/2) - (imgHt/2);
  		console.log('rendering...');

    	return <Image 
    		image={this.state.image} 
    		ref={node => this.imageNode = node} 
    		x = {imgX}
    		y = {imgY}
    		shadowBlur={3}
    	/>;
    }
}
