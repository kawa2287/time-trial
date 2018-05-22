'use strict';

import React from 'react';
import Konva from "konva";
import { Line, Arrow } from "react-konva";


export default class BezierCurves extends React.Component {

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
		
		var color = this.props.color;
		var stroke = this.props.stroke;
		var dashEnabled = this.props.dashEnabled;
		var dash = [10,10];

		return(
			
     		<Arrow
     			points={[
     				sx,sy,
     				x1,y1,
     				x2,y2,
     				x3,y3
     			]}
     			stroke={color}
     			fill = {color}
     			strokeWidth={stroke}
     			pointerWidth={20}
     			pointerLength={20}
     			shadowBlur = {2}
     			dashEnabled = {dashEnabled}
     			dash ={dash}
     			bezier
     		/>
		);
	}
}

