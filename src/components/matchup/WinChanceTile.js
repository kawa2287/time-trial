'use strict';

import Konva from "konva";
import { Rect, Text, Group, Circle } from "react-konva";
import React from 'react';
import DetermineWinChance from '../vsBracketMethods/baseMethods/DetermineWinChance';

const formattedSeconds = (sec) =>
	Math.floor(sec) + '.' + 
	(sec < 1 ? Math.round(Math.floor(sec*10)) : Math.round(10*( (Math.floor(sec*10)/10) % (Math.floor(sec)))) ) +
	Math.floor((sec % 0.1)*100);

export default function WinChanceTile(Geo,players, dialogWidth, dialogHeight, winTime, keySeq, timeElapsed){

    var playerAvgTmArr = [];
    console.log('playersNull', players[0]===null);
    for (var p = 0;p < players.length; p++){
        playerAvgTmArr.push(players[p].avgTime);
    }
    
    var width = dialogWidth - (Geo.margin*3 + Geo.timeCircleRadius);
    var pAwinChance = DetermineWinChance(players,playerAvgTmArr, 0,'VS');
    var pBwinChance = DetermineWinChance(players,playerAvgTmArr, 1,'VS');
    
    
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
        textSignal = winTime;
    }
    
    return(
        <Group x = {Geo.margin + Geo.timeCircleRadius} y = {dialogHeight/2 - 2.5*Geo.margin} >	
            <Rect //player A
				width={width*pAwinChance/100}
    			height={Geo.margin*2}
                fill= {Geo.colorArr[0]}
				stroke= {Geo.borderColor}
				strokeWidth= {0.5}
				shadowBlur = {2}
				shadowOpacity= {0.5}
            />
            <Rect //player B
                y = {Geo.margin*3}
				width={width*pBwinChance/100}
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
                x = {width*pAwinChance/100 + Geo.margin}
                text = {pAwinChance + '%'}
    			align = 'left'
    			fill = 'white'
    			fontVariant = 'small-caps'
    			fontSize = {percentFontSize}
				shadowBlur = {4}
				shadowOpacity= {.5}
            />
            <Text //player B
                y = {Geo.margin * 3 + (Geo.margin*2 - percentFontSize)/2}
                x = {width*pBwinChance/100 + Geo.margin}
                text = {pBwinChance + '%'}
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
                text = {textSignal}
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