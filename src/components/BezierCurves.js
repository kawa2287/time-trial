'use strict';

import React from 'react';
import Konva from "konva";
import { Line } from "react-konva";


export default class BezierCurves extends React.Component {
	
	victoryLine (victory){
		if(victory === true) {
			return 4;
		}
	}

	render(){
		var sx;
		var sy;
		var x1;
		var y1;
		var x2;
		var y2;
		var x3;
		var y3;
		
		sx = this.props.xs;
		sy = this.props.ys;
		x1 = this.props.xe;
		y1 = this.props.ys;
		x2 = this.props.xs;
		y2 = this.props.ye;
		x3 = this.props.xe;
		y3 = this.props.ye;
		

		return(
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
		);
	}
}