'use strict';

import Konva from "konva";
import { Rect, Text, Group, Circle } from "react-konva";
import React from 'react';


export default function StatsTile(Geo,players, dialogWidth, dialogHeight, winTime, keySeq, timeElapsed){

    var percentFontSize = Geo.margin*1.5;
    var circleFill ;
    var textSignal;
    
    if (keySeq == 0){
        circleFill = 'white';  //set at 0
        textSignal = 'Ready';
    } else if (keySeq == 1) {
        circleFill = 'green'; //running
        textSignal = 'GO!';
    } else {
        circleFill = '#fdfd96'; //stopped
        textSignal = 'Finish!';
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
            <Text 
                y = {-Math.round(percentFontSize/2)}
                x = {-Geo.timeCircleRadius}
                text = {textSignal}
    			align = 'center'
    			fill = 'black'
    			width = {Geo.timeCircleRadius*2}
    			fontVariant = 'small-caps'
    			fontSize = {Math.round(percentFontSize)}
				shadowBlur = {4}
				shadowOpacity= {.5}
            />
        </Group>
    );
    
}