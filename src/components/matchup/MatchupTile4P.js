'use Strict'

import React from 'react';
import { Stage, Group, Layer, Text, Rect } from "react-konva";
import FlagCuts from './FlagCuts';
import PositionTile from './PositionTile';
import SeedShape from './SeedShape';
import FlagClipShadow from './FlagClipShadow';
import FlagClipBorder from './FlagClipBorder';
import WinnerHighlight4P from './WinnerHighlight4P';
import FinishIndicator from './FinishIndicator';
import StatsTile from './StatsTile';




export default function MatchupTile4P(
	Geo,
	player,
	globalY,
	position,
	posColor,
	dialogWidth,
	dialogHeight,
	winner1, 
	winner2, 
	loser1,
	loser2,
	keyPress, 
	stophandler, 
	keySeq, 
	mode,
	handlePlacementSelect
	) {
	
	var winTrig = false;
	var winner1Name;
	var winner2Name;
	winner1Name = winner1 ==  null ? '' : winner1.name;
	winner2Name = winner2 ==  null ? '' : winner2.name;

	var selectedDeco;
	
	if(winner1Name == player.name || winner2Name ==player.name || winTrig == true) {
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
	
	if(keyPress == position && keySeq == 1){
		stophandler(player);
	}
	
	return(
		<Group 
			x={Geo.margin}
			y={globalY}
		>
			{PositionTile(Geo,position,posColor,player, selectedDeco,'4P')}
			{FinishIndicator(Geo,position, selectedDeco, handlePlacementSelect, player, winner1, winner2, loser1)}
			{player.name == 'BYE'?null:FlagClipShadow(Geo,selectedDeco,'4P')}
			{player.name == 'BYE'?null:FlagCuts(Geo,player,'4P')}
			{player.name == 'BYE'?null:FlagClipBorder(Geo,'4P')}
			{SeedShape(Geo, player,'4P')}
			{StatsTile(Geo,player,dialogWidth,selectedDeco,'4P',winner1,winner2)}
			{WinnerHighlight4P(Geo,player,winner1,winner2,selectedDeco)}
		</Group>
	);
}