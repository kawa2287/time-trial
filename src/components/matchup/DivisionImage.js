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
  		var imgHeight = this.props.Geo.tileHeight;

    	return <Image 
    	    y={-imgHeight/6}
    	    x={ this.props.dialogWidth - (this.props.Geo.margin*4 + this.props.Geo.timeCircleRadius4P*2 )}
    		image={this.state.image} 
    		height={imgHeight}
    		width={imgHeight}
    		opacity = {0.2}
    		ref={node => this.imageNode = node}
    	/>;
    }
}
