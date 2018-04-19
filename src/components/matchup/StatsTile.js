'use strict';

import Konva from "konva";
import { Rect, Text, Group } from "react-konva";
import React from 'react';

export default function StatsTile(Geo,player, dialogWidth){
    
    var width = dialogWidth - (Geo.margin*5 + Geo.flagWidth + Geo.tileHeight)
  
    return(
        <Group x = {Geo.margin*2 + Geo.flagWidth + Geo.positionWidth} >	
            <Rect 
				width={width}
    			height={Geo.tileHeight- Geo.margin*2.5}
                fill= {Geo.statTileColor}
				stroke= {Geo.borderColor}
				strokeWidth= {1}
				shadowBlur = {2}
            />
            <Text 
                y = {Geo.tileHeight- (Geo.nameSize*2+Geo.margin/2)/2 }
                text = {player.name}
    			align = 'left'
    			fill = 'white'
    			fontVariant = 'small-caps'
    			fontSize = {Geo.nameSize}
				shadowBlur = {2}
            />
        </Group>
    );
    
}