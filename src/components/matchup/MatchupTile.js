'use Strict'

import React from 'react';
import { Stage, Group, Layer, Text, Rect } from "react-konva";
import FlagCuts from './FlagCuts';
import PositionTile from './PositionTile';
import SeedShape from './SeedShape';
import FlagClipShadow from './FlagClipShadow';
import FlagClipBorder from './FlagClipBorder';
import WinnerHighlight from './WinnerHighlight';
import StatsTile from './StatsTile';




export default function MatchupTile(Geo,player,globalY,position,posColor,dialogWidth,dialogHeight,selectedPlayerClick,winTime,winner, selectedPlayer) {
	
	function click () {
		selectedPlayerClick(player);
	}
	
	var selectedDeco;
	if(selectedPlayer == null || selectedPlayer.name !== player.name){
		selectedDeco = {
			shadowBlur : 2,
			shadowOpacity : 0.5,
			shadowColor : 'black'
		};
	} else if(selectedPlayer.name == player.name) {
		selectedDeco = {
			shadowBlur : 10,
			shadowOpacity : 1,
			shadowColor : 'yellow'
		};
	}
	
	return(
		<Group 
			x={Geo.margin}
			y={Geo.topPad + globalY}
			onClick = {click}
		>
			{PositionTile(Geo,position,posColor,player, selectedDeco)}
			{FlagClipShadow(Geo,selectedDeco)}
			{FlagCuts(Geo,player)}
			{FlagClipBorder(Geo)}
			{SeedShape(Geo, player)}
			{StatsTile(Geo,player,dialogWidth,selectedDeco)}
			{WinnerHighlight(Geo,player,dialogWidth,winner)}
		</Group>
	);
}