'use strict';

import Konva from "konva";
import { Rect, Group } from "react-konva";
import React from 'react';


export default function WinnerHighlight4P (Geo,player, winner1,winner2,selectedDeco){
	
	var winner1Name;
	var winner2Name;
	var opacity = 0;
	
	winner1Name = winner1 ==  null ? '' : winner1.name;
	winner2Name = winner2 ==  null ? '' : winner2.name;
	
	if(player.name  == winner1Name || player.name == winner2Name){
		opacity = 1;
	}
	
	
	return (
		<Group >	
			<Rect 
				x={-Geo.margin/2}
				width={1}
				height={Geo.tileHeight}
				stroke= {'yellow'}
				strokeWidth= {5}
				shadowBlur = {selectedDeco.shadowBlur}
				shadowOpacity= {selectedDeco.shadowOpacity}
				shadowColor={selectedDeco.shadowColor}
				opacity = {opacity}
			/>
		</Group>
	);
    
}
