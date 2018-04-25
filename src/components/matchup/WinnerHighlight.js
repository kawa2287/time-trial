'use strict';

import Konva from "konva";
import { Rect, Group } from "react-konva";
import React from 'react';


export default function WinnerHighlight (Geo,player,dialogWidth, winner){
	
	var winnerName;
	var opacity = 0;
	
	if(winner ==  null){
		winnerName = '';
		opacity = 0;
	} else {
		winnerName = winner.name;
		if(winnerName == player.name){
			opacity = 1;
		} else {
			opacity = 0;
		}
	}
	
	return (
		<Group >	
			<Rect 
				x={-Geo.margin/2}
				width={1}
				height={Geo.tileHeight}
				stroke= {'yellow'}
				strokeWidth= {5}
				shadowBlur = {10}
				shadowOpacity= {0.1}
				opacity = {opacity}
			/>
		</Group>
	);
    
}
