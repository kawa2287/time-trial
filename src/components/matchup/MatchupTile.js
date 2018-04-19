'use Strict'

import React from 'react';
import { Stage, Group, Layer, Text, Rect } from "react-konva";
import FlagCuts from './FlagCuts';
import PositionTile from './PositionTile';
import SeedShape from './SeedShape';
import FlagClipShadow from './FlagClipShadow';
import FlagClipBorder from './FlagClipBorder';
import StatsTile from './StatsTile';



export default function MatchupTile(Geo,player,globalY,position,posColor,dialogWidth,winnerClick) {
	
	function click () {
		winnerClick(player);
	}
	
	return(
		<Group 
			x={Geo.margin}
			y={Geo.topPad + globalY}
			onClick = {click}
		>
			{PositionTile(Geo,position,posColor,player)}
			{FlagClipShadow(Geo)}
			{FlagCuts(Geo,player)}
			{FlagClipBorder(Geo)}
			{SeedShape(Geo, player)}
			{StatsTile(Geo, player, dialogWidth)}
		</Group>
	);
}