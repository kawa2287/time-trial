'use strict';

import React from 'react';
import Konva from "konva";
import { Stage, Layer, Line } from "react-konva";


export default class BezierCurves extends React.Component {

	render(){
		var stageWidth = this.props.width;
		var stageHeight = this.props.height;
		var sx = 0;
		var sy = stageHeight/4;
		var x1 = stageWidth;
		var y1 = stageHeight/4;
		var x2 = 0;
		var y2 = stageHeight/2;
		var x3 = stageWidth;
		var y3 = stageHeight/2;
		
		var syB = stageHeight*3/4;
		var y1B = stageHeight*3/4;

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