'use strict';

import React from 'react';
import Konva from "konva";
import { Shape, Group, Text } from "react-konva";

export default function SeedShape(Geo, player, mode)  {
	
	 var x;
    if(mode == 'VS'){
        x =Geo.margin + Geo.positionWidth;
    } else {
        x = Geo.margin + Geo.positionWidth +Geo.finishBox;
    }

	return(
		<Group 
			x={x}
		>
			<Shape
			fill={Geo.seedColor}
			stroke={Geo.borderColor}
			strokeWidth= {1} 
			shadowBlur = {2}
	 			drawFunc={function (ctx) {
		             ctx.beginPath();
		             ctx.moveTo(Geo.seedShape.xs, Geo.seedShape.ys);
		             ctx.lineTo(Geo.seedShape.x1, Geo.seedShape.y1);
		             ctx.lineTo(Geo.seedShape.x2, Geo.seedShape.y2);
		             ctx.closePath();
		             ctx.fillStrokeShape(this);
	     			}}
	 		/>
	 		<Text //seed number
        		text = {player.seed}
        		x = {Geo.seedPos.x - Geo.seedFontSize}
        		y = {Geo.seedPos.y - Geo.positionFontSize/2}
        		fontSize = {Geo.seedFontSize}
        		fontStyle = 'bold'
        		shadowBlur = {2}
        		fill = 'white'
        		width = {Geo.seedFontSize*2}
        		align = 'center'
        	/>
 		</Group>
	);
}