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
    
    var width = dialogWidth - (Geo.margin*3 + Geo.timeCircleRadius);
    var pAavgTime = DetermineAvgTime(players[0].timeTrial, players[0].totalTime, players[0].wins, players[0].losses);
    var pBavgTime = DetermineAvgTime(players[1].timeTrial, players[1].totalTime, players[1].wins, players[1].losses);
    var pAwinChance = DetermineWinChance(players[0].name,players[1].name,pAavgTime, pBavgTime)/100;
    var pBwinChance = DetermineWinChance(players[1].name,players[0].name,pBavgTime, pAavgTime)/100;
    
    var percentFontSize = Geo.margin*1.5;
    var circleFill 
    
    if (keySeq == 0){
        circleFill = 'white';  //set at 0
    } else if (keySeq == 1) {
        circleFill = 'green'; //running
    } else {
        circleFill = '#fdfd96'; //stopped
    }
    
    return(
        <Group x = {Geo.margin + Geo.timeCircleRadius} y = {dialogHeight/2 - 2.5*Geo.margin} >	
            <Rect //player A
				width={width*pAwinChance}
    			height={Geo.margin*2}
                fill= {Geo.colorArr[0]}
				stroke= {Geo.borderColor}
				strokeWidth= {0.5}
				shadowBlur = {2}
				shadowOpacity= {0.5}
            />
            <Rect //player B
                y = {Geo.margin*3}
				width={width*pBwinChance}
    			height={Geo.margin*2}
                fill= {Geo.colorArr[1]}
				stroke= {Geo.borderColor}
				strokeWidth= {0.5}
				shadowBlur = {2}
				shadowOpacity= {0.5}
            />
            <Circle //player B
                y = {Geo.margin*2.5}
                radius= {Geo.timeCircleRadius}
                fill= {circleFill}
                stroke= {Geo.borderColor}
				strokeWidth= {5}
				shadowBlur = {2}
				shadowOpacity= {0.5}
            />
            <Text //player A
                y = {(Geo.margin*2 - percentFontSize)/2}
                x = {width*pAwinChance + Geo.margin}
                text = {Math.round(pAwinChance*100) + '%'}
    			align = 'left'
    			fill = 'white'
    			fontVariant = 'small-caps'
    			fontSize = {percentFontSize}
				shadowBlur = {4}
				shadowOpacity= {.5}
            />
            <Text //player B
                y = {Geo.margin * 3 + (Geo.margin*2 - percentFontSize)/2}
                x = {width*pBwinChance + Geo.margin}
                text = {Math.round(pBwinChance*100) + '%'}
    			align = 'left'
    			fill = 'white'
    			fontVariant = 'small-caps'
    			fontSize = {percentFontSize}
				shadowBlur = {4}
				shadowOpacity= {.5}
            />
            <Text //winTime
                y = {Geo.margin*2.5 - percentFontSize/2}
                x = {-Geo.timeCircleRadius}
                text = {formattedSeconds(timeElapsed) || winTime}
    			align = 'center'
    			fill = 'black'
    			width = {Geo.timeCircleRadius*2}
    			fontVariant = 'small-caps'
    			fontSize = {percentFontSize}
				shadowBlur = {4}
				shadowOpacity= {.5}
            />
        </Group>
    );
    
}