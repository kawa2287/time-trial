'use strict';

import React from 'react';
import Konva from "konva";
import { Line, Arrow, Group } from "react-konva";


export default class BezierCurvesMobile extends React.Component {

	render(){
		var xo = this.props.xo;
		var xf = this.props.xf;
		var y1 = this.props.y1;
		var y2 = this.props.y2;
		var y3 = this.props.y3;

		var color = this.props.color;
		var stroke = this.props.stroke;
		var dashEnabled = this.props.dashEnabled;
		var dash = [2,2];

		return(
			<Group>
	     		<Line
	     			points={[
	     				xo,y1,
	     				xf,y1,
	     				xo,y2,
	     				xf,y2
	     			]}
	     			stroke={color}
	     			fill = {color}
	     			strokeWidth={stroke}
	     			dashEnabled = {dashEnabled}
	     			dash ={dash}
	     			bezier
	     		/>
	     		<Line
	     			points={[
	     				xo,y3,
	     				xf,y3,
	     				xo,y2,
	     				xf,y2
	     			]}
	     			stroke={color}
	     			fill = {color}
	     			strokeWidth={stroke}
	     			dashEnabled = {dashEnabled}
	     			dash ={dash}
	     			bezier
	     		/>
     		</Group>
		);
	}
}
