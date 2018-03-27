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
  	var imgX = 5 + this.props.rectX;
  	var imgY = (this.props.stageHeight/2) - (imgHt/2);

  	
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
		var stageWidth = this.props.width;
		var stageHeight = this.props.height;
		var rectWidth = stageWidth;
		var rectHeight = 48;
		var rectX = (stageWidth - rectWidth)*0.5;
		var rectY = (stageHeight - rectHeight)*0.5;
		var timeTrialClipW = 40;
		var seedClipW = 40;
		var tileColor = '#eef3f5';
		var byeColor = '#8caacf';
		
		var fontSize = 12;
		console.log(rectY);
		
		
		return(
			<Stage width={stageWidth} height={stageHeight}>
				<Layer>				
					<Rect 
						x={rectX} 
						y={rectY}
						width={rectWidth}
	        			height={rectHeight}
	                    fill= {this.props.name == 'BYE' ? byeColor : tileColor}
						stroke= 'black'
						strokeWidth= {0.5}
						cornerRadius={5}
                    />
                </Layer>
                <Layer
                	clipX = {0}
                	clipY = {0}
		            clipWidth = {seedClipW}
		            clipHeight = {stageHeight}
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
                <Layer
                	clipX = {stageWidth - timeTrialClipW }
                	clipY = {0}
		            clipWidth = {timeTrialClipW}
		            clipHeight = {stageHeight}
            	>	
                    <Rect 
						x={rectX} 
						y={rectY}
						width={rectWidth}
	        			height={rectHeight}
	                    fill= '#5e5e5e'
						stroke= 'black'
						strokeWidth= {0.5}
						cornerRadius={5}
                    />
                </Layer>
                <Layer>
                	<Text
                		text = {this.props.seed}
                		x = {seedClipW/2 + rectX - 5}
                		y = {(stageHeight-fontSize)/2}
                		fontSize = {fontSize}
                		fill = 'white'
                		width = {14}
                		align = 'center'
                	/>
                	<Text
                		text = {this.props.name}
                		x = {seedClipW + rectX + 48 + 10}
                		y = {(stageHeight-fontSize)/2}
                		fontSize = {fontSize}
                		fontVariant = 'small-caps'
                		fill = 'black'
                		width = {rectWidth-seedClipW-timeTrialClipW}
                		align = 'left'
                	/>
                	<Text
                		text = {this.props.time}
                		x = { stageWidth - timeTrialClipW}
                		y = {(stageHeight-fontSize)/2}
                		fontSize = {fontSize}
                		fill = 'white'
                		width = {timeTrialClipW}
                		align = 'center'
                		shadowBlur = {2}
                	/>
					<FlagImage 
						img = {this.props.img}
						rectHeight = {rectHeight}
						rectWidth = {rectWidth}
						rectX = {rectX + seedClipW}
						rectY = {rectY}
						stageHeight = {stageHeight}
					/>
				</Layer>
			</Stage>
		);
	}
}