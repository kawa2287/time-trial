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




export default function MatchupTile(
	Geo,
	player,
	globalY,
	position,
	posColor,
	dialogWidth,
	dialogHeight,
	selectedPlayerClick,
	winTime,
	winner, 
	selectedPlayer, 
	keyPress, 
	stophandler, 
	keySeq, 
	mode,
	allAvgTime
	) {
	
	var winTrig = false;
	var selecPlayer;
	
	if (selectedPlayer == null){
		selecPlayer='';
	} else {
		selecPlayer = selectedPlayer.name;
	}
	
	function click () {
		selectedPlayerClick(player);
	}
	
	if(keyPress == position && keySeq == 1){
		stophandler(player);
		winTrig = true;
	}

	var selectedDeco;
	
	if(selecPlayer == player.name || winTrig == true) {
		selectedDeco = {
			shadowBlur : 10,
			shadowOpacity : 1,
			shadowColor : 'yellow'
		};
	
	} else {
		selectedDeco = {
			shadowBlur : 2,
			shadowOpacity : 0.5,
			shadowColor : 'black'
		};
	}
	
	return(
		<Group 
			x={Geo.margin}
			y={Geo.topPad + globalY}
			onClick = {click}
			onTap = {click}
		>
			{PositionTile(Geo,position,posColor,player, selectedDeco,mode)}
			{FlagClipShadow(Geo,selectedDeco,mode)}
			{FlagCuts(Geo,player,mode)}
			{FlagClipBorder(Geo,mode)}
			{SeedShape(Geo, player,mode)}
			{StatsTile(Geo,player,dialogWidth,selectedDeco,mode,null,null,null,null,null,null,allAvgTime)}
			{WinnerHighlight(Geo,player,dialogWidth,winner)}
		</Group>
	);
}