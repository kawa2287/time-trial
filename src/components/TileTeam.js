'use strict';

import React from 'react';
import Konva from "konva";
import { Stage, Layer, Rect, Image, Text } from "react-konva";

class FlagImage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			image:null
		};
	}

  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.img;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }
  

  render() {
  	var imgHt = 31;
  	var imgX = 30 + this.props.rectX;
  	var imgY = (this.props.height/2) - (imgHt/2);

  	
    return <Image 
    		image={this.state.image} 
    		x = {imgX}
    		y = {imgY}
    		shadowBlur={4}
    		
    	/>;
  }
}


export default class TileTeam extends React.Component {
	render(){
		var width = 250;
		var height = 48;
		var rectWidth = width * 0.9;
		var rectHeight = height * 0.9;
		var rectX = (width - rectWidth)*0.5;
		var rectY = (height - rectHeight)*0.5;
		var fontSize = 12;
		console.log(rectY);
		
		
		return(
			<Stage width={width} height={height}>
				<Layer>				
					<Rect 
						x={rectX} 
						y={rectY}
						width={rectWidth}
	        			height={rectHeight}
	                    fill= '#eef3f5'
						stroke= 'black'
						strokeWidth= {0.5}
						cornerRadius={5}
                    />
                </Layer>
                <Layer
                	clipX = {0}
                	clipY = {0}
		            clipWidth = {35}
		            clipHeight = {height}
            	>	
                    <Rect 
						x={rectX} 
						y={rectY}
						width={rectWidth}
	        			height={rectHeight}
	                    fill= 'red'
						stroke= 'black'
						strokeWidth= {0.5}
						cornerRadius={5}
                    />
                </Layer>
                <Layer>
                	<Text
                		text = {this.props.seed}
                		x = {5 + rectX}
                		y = {(height-fontSize)/2}
                		fontSize = {fontSize}
                		fill = 'white'
                		width = {14}
                		align = 'center'
                	/>
					<FlagImage 
						img = {this.props.img}
						rectHeight = {rectHeight}
						rectWidth = {rectWidth}
						rectX = {rectX}
						rectY = {rectY}
						height = {height}
					/>
				</Layer>
			</Stage>
		);
	}
}