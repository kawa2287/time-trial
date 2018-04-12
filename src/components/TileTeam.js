'use strict';

import React from 'react';
import Konva from "konva";
import {Group, Rect, Text } from "react-konva";
import TileFlag from './TileFlag';

var tileColor = '#eef3f5';
var byeColor = '#0CC6BD';
var hoverColor = '#FCBFB8';
var seedColor = '#4A0D53';
var timeColor = '#E68E38';

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
	
	BackgroundColor(name, hover){
		if (name === 'BYE'){
			return byeColor;
		} else if (hover === true) {
			return hoverColor;
		} else {
			return tileColor;
		}
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
		var teamWidth = this.props.width;
		var teamHeight = this.props.height;
		var clipWidth = teamHeight;
		var fontSize = 12;
		var seedFontSize = 16;
		
		
		return(
			<Group x={this.props.globalX} y={this.props.globalY}>
				<Group>
					<Rect 
						width={teamWidth}
	        			height={teamHeight}
	                    fill= {this.BackgroundColor(this.props.name,this.props.hover)}
						stroke= 'black'
						strokeWidth= {0.5}
						cornerRadius={5}
                    />
                </Group>
                <Group
                	clipX = {0}
                	clipY = {0}
		            clipWidth = {clipWidth}
		            clipHeight = {teamHeight}
            	>	
                    <Rect 
						width={teamWidth}
	        			height={teamHeight}
	                    fill= {seedColor}
						stroke= 'black'
						strokeWidth= {0.5}
						cornerRadius={5}
                    />
                </Group>
                <Group
                	clipX = {teamWidth - clipWidth}
                	clipY = {0}
		            clipWidth = {clipWidth}
		            clipHeight = {teamHeight}
            	>	
                    <Rect 
						width={teamWidth}
	        			height={teamHeight}
	                    fill= {timeColor}
						stroke= 'black'
						strokeWidth= {0.5}
						cornerRadius={5}
                    />
                </Group>
                <Group>
                	<Text //seed number
                		text = {this.props.seed}
                		x = {clipWidth/2 - 9}
                		y = {(teamHeight-seedFontSize)/2}
                		fontSize = {seedFontSize}
                		fontStyle = 'bold'
                		shadowBlur = {2}
                		fill = 'white'
                		width = {18}
                		align = 'center'
                	/>
                	<Text //player name
                		text = {this.props.name}
                		x = {clipWidth + 48 + 10}
                		y = {(teamHeight-fontSize)/2}
                		fontSize = {fontSize}
                		fontVariant = 'small-caps'
                		fill = 'black'
                		width = {teamWidth - 2 * teamHeight}
                		align = 'left'
                	/>
                	<Text //player avg time
                		text = {this.props.time}
                		x = {teamWidth - clipWidth}
                		y = {(teamHeight-fontSize)/2}
                		fontSize = {fontSize}
                		fill = 'white'
                		width = {clipWidth}
                		align = 'center'
                		shadowBlur = {2}
                	/>
					<TileFlag
						img = {this.props.img}
						rectHeight = {teamHeight}
						rectWidth = {teamWidth}
						rectX = {clipWidth}
						stageHeight = {teamHeight}
					/>
				</Group>
			</Group>
		);
	}
}