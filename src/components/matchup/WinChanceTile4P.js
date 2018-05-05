'use strict';

import Konva from "konva";
import { Rect, Text, Group, Circle } from "react-konva";
import React from 'react';
import DetermineWinChance from '../vsBracketMethods/baseMethods/DetermineWinChance';
import DetermineAvgTime from '../vsBracketMethods/baseMethods/DetermineAvgTime';

const formattedSeconds = (sec) =>
	Math.floor(sec) + '.' + 
	(sec < 1 ? Math.round(Math.floor(sec*10)) : Math.round(10*( (Math.floor(sec*10)/10) % (Math.floor(sec)))) ) +
	Math.floor((sec % 0.1)*100);

export default function StatsTile(Geo,players, dialogWidth, dialogHeight, winTime, keySeq, timeElapsed){

    var percentFontSize = Geo.margin*1.5;
    var circleFill ;
    
    if (keySeq == 0){
        circleFill = 'white';  //set at 0
    } else if (keySeq == 1) {
        circleFill = 'green'; //running
    } else {
        circleFill = '#fdfd96'; //stopped
    }
    
    return(
        <Group x = {dialogWidth - (Geo.margin*2+Geo.timeCircleRadius4P)} y = {Geo.topPad+ 4*(Geo.margin+Geo.tileHeight)} >	
            <Circle //time circle
                radius= {Geo.timeCircleRadius4P}
                fill= {circleFill}
                stroke= {Geo.borderColor}
				strokeWidth= {5}
				shadowBlur = {2}
				shadowOpacity= {0.5}
            />
            <Text //winTime
                y = {-Math.round(1.5*percentFontSize/2)}
                x = {-Geo.timeCircleRadius}
                text = {formattedSeconds(timeElapsed) || winTime}
    			align = 'center'
    			fill = 'black'
    			width = {Geo.timeCircleRadius*2}
    			fontVariant = 'small-caps'
    			fontSize = {Math.round(1.5*percentFontSize)}
				shadowBlur = {4}
				shadowOpacity= {.5}
            />
        </Group>
    );
    
}