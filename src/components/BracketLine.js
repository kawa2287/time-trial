'use strict';

import React from 'react';
import Konva from "konva";
import { Line,Group } from "react-konva";

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
				arc1s : Math.PI,
				arc1e : 3/2 * Math.PI,
				arc2s : 3/2 * Math.PI,
				arc2e : 0
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
				arc1s : 0,
				arc1e : 1/2 * Math.PI,
				arc2s : 1/2 * Math.PI,
				arc2e : Math.PI
		};
	}
		
		var color = this.props.color;
		var stroke = this.props.stroke;
		var radius = this.props.radius;

		return(
			<Group>
				<Line
     				sceneFunc={function (ctx) {
			             ctx.beginPath();
			             ctx.moveTo(pts.sx, pts.sy);
			             ctx.lineTo(pts.x1a,pts.y1a);
			             ctx.arc(pts.x1b, pts.y1a, radius,pts.arc1s, pts.arc1e, false);
			             ctx.lineTo(pts.x2a,pts.y2a);
			             ctx.arc(pts.x2a, pts.y2b, radius,pts.arc2s,pts.arc2e, false);
			             ctx.lineTo(pts.x3,pts.y3);
			             ctx.setAttr('strokeStyle', 'black');
			             ctx.setAttr('lineWidth', stroke);
			             ctx.stroke();
	         		}}
	     		/>
	     		<Line
     				sceneFunc={function (ctx) {
			             ctx.beginPath();
			             ctx.moveTo(pts.sx, pts.sy);
			             ctx.lineTo(pts.x1a,pts.y1a);
			             ctx.arc(pts.x1b, pts.y1a, radius,pts.arc1s, pts.arc1e, false);
			             ctx.lineTo(pts.x2a,pts.y2a);
			             ctx.arc(pts.x2a, pts.y2b, radius,pts.arc2s,pts.arc2e, false);
			             ctx.lineTo(pts.x3,pts.y3);
			             ctx.setAttr('strokeStyle', color);
			             ctx.setAttr('lineWidth',stroke-2);
			             ctx.stroke();
	         		}}
	     		/>
			</Group>
		);
	}
}