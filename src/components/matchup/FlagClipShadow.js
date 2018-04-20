'use strict';

import React from 'react';
import Konva from "konva";
import { Shape } from "react-konva";

export default function FlagClipBorder(Geo,selectedDeco)  {
	
	return(
		<Shape
			x={Geo.margin + Geo.positionWidth}
			shadowBlur = {selectedDeco.shadowBlur}
			shadowOpacity= {selectedDeco.shadowOpacity}
			shadowColor= {selectedDeco.shadowColor}
 			sceneFunc={function (ctx) {
	             ctx.beginPath();
	             ctx.moveTo(Geo.flagClip.xs, Geo.flagClip.ys);
	             ctx.lineTo(Geo.flagClip.x1, Geo.flagClip.y1);
	             ctx.lineTo(Geo.flagClip.x2, Geo.flagClip.y2);
	             ctx.lineTo(Geo.flagClip.x3, Geo.flagClip.y3);
	             ctx.lineTo(Geo.flagClip.x4, Geo.flagClip.y4);
	             ctx.lineTo(Geo.flagClip.x5, Geo.flagClip.y5);
	             ctx.closePath();
	             ctx.stroke();
     		}}
 		/>
	);
}