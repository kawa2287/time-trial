'use strict';

import React from 'react';
import Konva from "konva";
import {Group, Rect, Text } from "react-konva";
import TileFlag from './TileFlag';


export default class TileTeam extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name : null,
			seed : null,
			timeTrial : null,
			flag: null,
			filter: Konva.Filters.Enhance
		};
	}
	
	handleOnMouseOver (){
		this.setState(
			{
				filter: Konva.Filters.Grayscale
			},
			function afterClick(){
				this.mainGroup.cache();
			}
		);
	}
	
	handleOnMouseOut (){
		this.setState(
			{
				filter: Konva.Filters.Enhance
			},
			function afterClick(){
				this.mainGroup.cache();
				this.mainGroup.enhance(0.5);
			}
		);
	}
	
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
		var byeColor = '#0CC6BD';
		var seedColor = '#4A0D53';
		var timeColor = '#E68E38';
		var fontSize = 12;
		var seedFontSize = 16;
		
		
		return(
			<Group y={this.props.globalY}>
				<Group>
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
                </Group>
                <Group
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
	                    fill= {seedColor}
						stroke= 'black'
						strokeWidth= {0.5}
						cornerRadius={5}
                    />
                </Group>
                <Group
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
	                    fill= {timeColor}
						stroke= 'black'
						strokeWidth= {0.5}
						cornerRadius={5}
                    />
                </Group>
                <Group>
                	<Text
                		text = {this.props.seed}
                		x = {seedClipW/2 + rectX - 9}
                		y = {(stageHeight-seedFontSize)/2}
                		fontSize = {seedFontSize}
                		fontStyle = 'bold'
                		shadowBlur = {2}
                		fill = 'white'
                		width = {18}
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
					<TileFlag
						img = {this.props.img}
						rectHeight = {rectHeight}
						rectWidth = {rectWidth}
						rectX = {rectX + seedClipW}
						rectY = {rectY}
						stageHeight = {stageHeight}
					/>
				</Group>
			</Group>
		);
	}
}