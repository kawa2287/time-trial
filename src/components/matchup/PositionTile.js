'use strict';

import Konva from "konva";
import { Rect, Text, Group } from "react-konva";
import React from 'react';


export default function PositionTile(Geo,position,posColor, selectedDeco,mode){

    return(
        <Group>	
            <Rect 
				width={Geo.positionWidth}
    			height={Geo.tileHeight}
                fill= {posColor}
				stroke= {Geo.borderColor}
				strokeWidth= {1}
				shadowBlur = {selectedDeco.shadowBlur}
				shadowOpacity= {selectedDeco.shadowOpacity}
				shadowColor= {selectedDeco.shadowColor}
            />
            <Text //seed number
        		text = {position}
        		x = {(Geo.positionWidth-Geo.positionFontSize)/2}
        		y = {(Geo.tileHeight-Geo.positionFontSize)/2}
        		fontSize = {Geo.positionFontSize}
        		fontStyle = 'bold'
        		shadowBlur = {5}
        		shadowOpacity= {0.8}
        		fill = 'white'
        		width = {Geo.positionFontSize}
        		align = 'center'
        	/>
        </Group>
    );
    
}