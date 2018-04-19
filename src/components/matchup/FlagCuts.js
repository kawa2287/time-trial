'use strict';

import Konva from "konva";
import { Group } from "react-konva";
import React from 'react';
import FlagImage from './FlagImage';



export default function PositionTile(Geo,player){
    

    function FindFlagPath(player){
        if(Object.keys(player).length === 0 && player.constructor === Object){
            return "/img/flagsSVG/XX.svg";
        } else {
            return player.country.flagPathSVG;
        }
    }
    
    return(
        <Group 
            x={Geo.margin + Geo.positionWidth}
            
            clipFunc= {function (ctx) {
	             ctx.beginPath();
	             ctx.moveTo(Geo.flagClip.xs, Geo.flagClip.ys);
	             ctx.lineTo(Geo.flagClip.x1, Geo.flagClip.y1);
	             ctx.lineTo(Geo.flagClip.x2, Geo.flagClip.y2);
	             ctx.lineTo(Geo.flagClip.x3, Geo.flagClip.y3);
	             ctx.lineTo(Geo.flagClip.x4, Geo.flagClip.y4);
	             ctx.lineTo(Geo.flagClip.x5, Geo.flagClip.y5);
	             ctx.closePath();
            }}
        >	
            <FlagImage
				img = {FindFlagPath(player)}
				flagHeight = {Geo.flagHeight}
				flagWidth = {Geo.flagWidth}
			/>
        </Group>
    );
    
}