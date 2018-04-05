'use strict';

import React from 'react';
import Konva from "konva";
import { Stage, Layer, Line } from "react-konva";




export default class BezierCurves extends React.Component {
	
	victoryLine (victory){
		if(victory === true) {
			return 4;
		}
	}

	render(){
		var stageWidth = this.props.width;
		var stageHeight = this.props.height;
		var sx;
		var sy;
		var x1;
		var y1;
		var x2;
		var y2;
		var x3;
		var y3;
		var syB;
		var y1B;
		
		if (this.props.bracket == 'loserBracket'){
			sx = stageWidth;
			sy = stageHeight*1/4;
			x1 = 0;
			y1 = stageHeight*1/4;
			x2 = stageWidth;
			y2 = stageHeight/2;
			x3 = 0;
			y3 = stageHeight/2;
			
			syB = stageHeight*3/4;
			y1B = stageHeight*3/4;
		} else {
			sx = 0;
			sy = stageHeight/4;
			x1 = stageWidth;
			y1 = stageHeight/4;
			x2 = 0;
			y2 = stageHeight/2;
			x3 = stageWidth;
			y3 = stageHeight/2;
			
			syB = stageHeight*3/4;
			y1B = stageHeight*3/4;
		}

		return(
			<Stage width={stageWidth} height={stageHeight}>
				<Layer>
					<Line
		         sceneFunc={function (ctx) {
		             ctx.beginPath();
		             ctx.moveTo(sx, sy);
		             ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3);
		             ctx.setAttr('strokeStyle', 'black');
		             ctx.setAttr('lineWidth', 1);
		             ctx.stroke();
		         }}
		     />
				<Line
		         sceneFunc={function (ctx) {
		             ctx.beginPath();
		             ctx.moveTo(sx, syB);
		             ctx.bezierCurveTo(x1,y1B,x2,y2,x3,y3);
		             ctx.setAttr('strokeStyle', 'black');
		             ctx.setAttr('lineWidth', 1);
		             ctx.stroke();
		         }}
		     />
				</Layer>
			</Stage>
		);
	}
}