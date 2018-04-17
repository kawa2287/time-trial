'use strict';

import React from 'react';
import Konva from "konva";
import {Group, Rect, Text } from "react-konva";
import TileFlag from './TileFlag';
import Colors from '../static/Colors';

var tileColor = Colors.tileColor;
var byeColor = Colors.byeColor;
var hoverColor = Colors.hoverColor;
var seedColor = Colors.seedColor;
var timeColor = Colors.timeColor;
var eliminatedColor = Colors.eliminatedColor;
var loserColor = Colors.byeColor;
var emptyColor = Colors.gameNotReadyColor;

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
		} else if (name == this.props.loser && this.props.loserEliminated ){
			return eliminatedColor;
		} else if (name == this.props.loser) {
			return loserColor;
		} else if (name === '') {
			return (emptyColor);
		} else if (hover === true) {
			return hoverColor;
		} else {
			return tileColor;
		}
	}
	
	TextDecoration(name) {
		if( name == this.props.loser) {
			return 'line-through';
		} else {
			return '';
		}
	}
	
	
	nameDisplay(name,country,hover){
		if (hover === true){
			return country;
		} else {
			return name;
		}
	}
	
	timeDisplay(time,winChance,hover){
		if (hover === true){
			return winChance+'%';
		} else {
			return time;
		}
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
                		text = {this.nameDisplay(this.props.name,this.props.country,this.props.hover)}
                		x = {clipWidth + 48 + 10}
                		y = {(teamHeight-fontSize)/2}
                		fontSize = {fontSize}
                		fontVariant = 'small-caps'
                		fill = 'black'
                		width = {teamWidth - 2 * teamHeight}
                		align = 'left'
                		textDecoration = {this.TextDecoration(this.props.name)}
                	/>
                	<Text //player avg time
                		text = {this.timeDisplay(this.props.time,this.props.winChance,this.props.hover)}
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