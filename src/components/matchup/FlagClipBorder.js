'use strict';

import React from 'react';
import Konva from "konva";
import { Line } from "react-konva";

export default function FlagClipBorder(Geo, mode)  {

    var x;
    if(mode == 'VS'){
        x =Geo.margin + Geo.positionWidth;
    } else {
        x = Geo.margin + Geo.positionWidth + Geo.finishBox;
    }
	
	return(
		<Line
			x={x}
 			sceneFunc={function (ctx) {
	             ctx.beginPath();
	             ctx.moveTo(Geo.flagClip.xs, Geo.flagClip.ys);
	             ctx.lineTo(Geo.flagClip.x1, Geo.flagClip.y1);
	             ctx.lineTo(Geo.flagClip.x2, Geo.flagClip.y2);
	             ctx.lineTo(Geo.flagClip.x3, Geo.flagClip.y3);
	             ctx.lineTo(Geo.flagClip.x4, Geo.flagClip.y4);
	             ctx.lineTo(Geo.flagClip.x5, Geo.flagClip.y5);
	             ctx.closePath();
	             ctx.setAttr('strokeStyle', Geo.borderColor);
	             ctx.setAttr('lineWidth', 1);
	             ctx.stroke();
     		}}
 		/>
	);
}