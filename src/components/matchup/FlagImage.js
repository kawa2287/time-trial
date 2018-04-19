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
  		var flagHeight = this.props.flagHeight;
  		var flagWidth =this.props.flagWidth;

    	return <Image 
    	    y={-flagHeight/6}
    		image={this.state.image} 
    		height={flagHeight}
    		width={flagWidth}
    		ref={node => this.imageNode = node}
    	/>;
    }
}
