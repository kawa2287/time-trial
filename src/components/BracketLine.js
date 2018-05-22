'use strict';

import React from 'react';
import Konva from "konva";
import { Line,Group,Arrow,Arc } from "react-konva";
import Settings from '../static/Settings';

/*         (b)                (a)
    (1) o   x------------------x   o  (2)
          /                      \
    (a) x                          x  (b)
        |                          |
        |                          |
        |                          |
        |                          |
		x start					   x (3)
		
*/

export default class BracketLine extends React.Component {
	
	constructor(props){
		super(props);
		
	}

	render(){
		var pts = {};
		if (this.props.class == 'final'){
			console.log('gameCounter',this.props.gameCounter);
			pts = {
				sx : this.props.xs,
					sy : this.props.ys,
					x1 : this.props.x1,
					x1a : this.props.x1,
					x1b : this.props.x1 + this.props.radius,
					y1 : this.props.y1,
					y1a : this.props.y1 + this.props.radius,
					y1b : this.props.y1,
					x2 : this.props.x2,
					x2a : this.props.x2 - this.props.radius,
					x2b : this.props.x2,
					y2 : this.props.y2,
					y2a : this.props.y2,
					y2b : this.props.y2 + this.props.radius,
					x3 : this.props.x3,
					y3 : this.props.y3,
					arc1s : this.props.arc1s,
					arc1e : this.props.arc1e,
					arc2s : this.props.arc2s,
					arc2e : this.props.arc2e,
					clockwise : false,
					clockwise : false
			};
		} else if (Settings.seedMode !=='blind' || this.props.gameCounter == (this.props.bracketSpots/(this.props.mode=='VS'?1:2))-1 )  {
			if(this.props.direction === 'counter-clockwise'){
				pts = {
					sx : this.props.xs,
					sy : this.props.ys,
					x1 : this.props.x1,
					x1a : this.props.x1,
					x1b : this.props.x1 + this.props.radius,
					y1 : this.props.y1,
					y1a : this.props.y1 + this.props.radius,
					y1b : this.props.y1,
					x2 : this.props.x2,
					x2a : this.props.x2 - this.props.radius,
					x2b : this.props.x2,
					y2 : this.props.y2,
					y2a : this.props.y2,
					y2b : this.props.y2 + this.props.radius,
					x3 : this.props.x3,
					y3 : this.props.y3,
					arc1s : this.props.arc1s,
					arc1e : this.props.arc1e,
					arc2s : this.props.arc2s,
					arc2e : this.props.arc2e,
					clockwise : true,
					clockwise : true
				};
			} else {
				pts = {
					sx : this.props.xs,
					sy : this.props.ys,
					x1 : this.props.x1,
					x1a : this.props.x1,
					x1b : this.props.x1 - this.props.radius,
					y1 : this.props.y1,
					y1a : this.props.y1 - this.props.radius,
					y1b : this.props.y1,
					x2 : this.props.x2,
					x2a : this.props.x2 + this.props.radius,
					x2b : this.props.x2,
					y2 : this.props.y2,
					y2a : this.props.y2,
					y2b : this.props.y2 - this.props.radius,
					x3 : this.props.x3,
					y3 : this.props.y3,
					arc1s : this.props.arc1s,
					arc1e : this.props.arc1e,
					arc2s : this.props.arc2s,
					arc2e : this.props.arc2e,
					clockwise : false,
					clockwise : false
				};
			}
		} else {
			if(this.props.direction === 'counter-clockwise'){
				pts = {
					sx : this.props.xs,
					sy : this.props.ys,
					x1 : this.props.x1,
					x1a : this.props.x1,
					x1b : this.props.x1 - this.props.radius,
					y1 : this.props.y1,
					y1a : this.props.y1 + this.props.radius,
					y1b : this.props.y1,
					x2 : this.props.x2,
					x2a : this.props.x2 + this.props.radius,
					x2b : this.props.x2,
					y2 : this.props.y2,
					y2a : this.props.y2,
					y2b : this.props.y2 - this.props.radius,
					x3 : this.props.x3,
					y3 : this.props.y3,
					arc1s : this.props.arc1s,
					arc1e : this.props.arc1e,
					arc2s : this.props.arc2s,
					arc2e : this.props.arc2e,
					clockwise : false,
					clockwise : true
				};
			} else {
				pts = {
					sx : this.props.xs,
					sy : this.props.ys,
					x1 : this.props.x1,
					x1a : this.props.x1,
					x1b : this.props.x1 - this.props.radius,
					y1 : this.props.y1,
					y1a : this.props.y1 - this.props.radius,
					y1b : this.props.y1,
					x2 : this.props.x2,
					x2a : this.props.x2 + this.props.radius,
					x2b : this.props.x2,
					y2 : this.props.y2,
					y2a : this.props.y2,
					y2b : this.props.y2 + this.props.radius,
					x3 : this.props.x3,
					y3 : this.props.y3,
					arc1s : this.props.arc1s,
					arc1e : this.props.arc1e,
					arc2s : this.props.arc2s,
					arc2e : this.props.arc2e,
					clockwise : true,
					clockwise : false
				};
			}
		}
		
		
		var color = this.props.color;
		var stroke = 4;
		var radius = this.props.radius;
		var dash =[10,10];
		var dashEnabled = this.props.dashEnabled;

		return(
			<Group>
				
	     		<Arrow
	     			points={[
	     				pts.sx,pts.sy,
	     				pts.x1a,pts.y1a
	     			]}
	     			stroke={color}
	     			fill={color}
	     			strokeWidth={stroke}
	     			dash={dash}
	     			pointerWidth={20}
	     			pointerLength={20}
	     			shadowBlur = {2}
	     			dashEnabled = {dashEnabled}
	     		/>
	     		<Arc
	     			x={pts.x1b}
	     			y={pts.y1a}
	     			innerRadius={radius}
	     			outerRadius={radius}
	     			rotation={pts.arc1s*180/Math.PI}
	     			angle={90}
	     			clockwise={pts.counterClockwise1}
	     			stroke={color}
	     			strokeWidth={stroke}
	     			dash={dash}
	     			shadowBlur = {2}
	     			dashEnabled = {dashEnabled}
	     		/>
	     		<Line
	     			points={[
	     				pts.x1b,pts.y1b,
	     				pts.x2a,pts.y2a
	     			]}
	     			stroke={color}
	     			strokeWidth={stroke}
	     			dash={dash}
	     			shadowBlur = {2}
	     			dashEnabled = {dashEnabled}
	     		/>
	     		<Arc
	     			x={pts.x2a}
	     			y={pts.y2b}
	     			innerRadius={radius}
	     			outerRadius={radius}
	     			rotation={pts.arc2s*180/Math.PI}
	     			angle={90}
	     			clockwise={pts.counterClockwise1}
	     			stroke={color}
	     			strokeWidth={stroke}
	     			dash={dash}
	     			shadowBlur = {2}
	     			dashEnabled = {dashEnabled}
	     		/>
	     		<Arrow
	     			points={[
	     				pts.x2b,pts.y2b,
	     				pts.x3,pts.y3
	     			]}
	     			stroke={color}
	     			fill={color}
	     			strokeWidth={stroke}
	     			dash={dash}
	     			pointerWidth={20}
	     			pointerLength={20}
	     			shadowBlur = {2}
	     			dashEnabled = {dashEnabled}
	     		/>
			</Group>
		);
	}
}
