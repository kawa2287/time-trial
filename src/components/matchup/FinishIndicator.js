'use strict';

import Konva from "konva";
import { Rect, Text, Group } from "react-konva";
import React from 'react';


export default function FinishIndicator(
    Geo,
    position, 
    selectedDeco, 
    handlePlacementSelect, 
    player,
    winner1,
    winner2,
    loser1
    ){

    function click (place, player){
        handlePlacementSelect(place,player);
    }
    
    var pos = 0;
    var opacity1 = 0;
    var opacity2 = 0;
    var opacity3 = 0;
    var textColor1= Geo.borderColor;
    var textColor2= Geo.borderColor;
    var textColor3= Geo.borderColor;
    
    
    switch (player) {
        case winner1:
            opacity1 = 1;
            opacity2 = 0;
            opacity3 = 0;
            textColor1 = 'black';
            textColor2 = Geo.borderColor;
            textColor3 = Geo.borderColor;
            break;
        case winner2:
            opacity1 = 0;
            opacity2 = 1;
            opacity3 = 0;
            textColor1 = Geo.borderColor;
            textColor2 = 'black';
            textColor3 = Geo.borderColor;
            break;
        case loser1:
            opacity1 = 0;
            opacity2 = 0;
            opacity3 = 1;
            textColor1 = Geo.borderColor;
            textColor2 = Geo.borderColor;
            textColor3 = 'black';
            break;
        default:
            opacity1 = 0;
            opacity2 = 0;
            opacity3 = 0;
            textColor1 = Geo.borderColor;
            textColor2 = Geo.borderColor;
            textColor3 = Geo.borderColor;
    }
    
    

    return(
        <Group x = {Geo.positionWidth + Geo.margin/2}>	
            <Rect //1st
                y = {0}
				width={Geo.finishBox}
    			height={Geo.finishBox}
                fill= {Geo.gold}
				stroke= {Geo.borderColor}
				strokeWidth= {1}
				shadowBlur = {selectedDeco.shadowBlur}
				shadowOpacity= {selectedDeco.shadowOpacity}
				shadowColor= {selectedDeco.shadowColor}
				opacity = {opacity1}
            />
            <Text //1st
                onClick = {() => click('1',player)}
        		text = {'1'}
        		y = {(Geo.finishBox-Geo.finishFontSize)/2}
        		fontSize = {Geo.finishFontSize}
        		fontStyle = 'bold'
        		shadowBlur = {1}
        		shadowOpacity= {0.8}
        		fill = {textColor1}
        		width = {Geo.finishBox}
        		align = 'center'
        	/>
        	<Rect //2nd
                y = {Geo.finishBox+Geo.margin/2}
				width={Geo.finishBox}
    			height={Geo.finishBox}
                fill= {Geo.silver}
				stroke= {Geo.borderColor}
				strokeWidth= {1}
				shadowBlur = {selectedDeco.shadowBlur}
				shadowOpacity= {selectedDeco.shadowOpacity}
				shadowColor= {selectedDeco.shadowColor}
				opacity = {opacity2}
            />
            <Text //2nd
                onClick = {() => click('2',player)}
        		text = {'2'}
        		y = {(Geo.finishBox+Geo.margin/2)+(Geo.finishBox-Geo.finishFontSize)/2}
        		fontSize = {Geo.finishFontSize}
        		fontStyle = 'bold'
        		shadowBlur = {1}
        		shadowOpacity= {0.8}
        		fill = {textColor2}
        		width = {Geo.finishBox}
        		align = 'center'
        	/>
        	<Rect //3rd
                y = {2*(Geo.finishBox+Geo.margin/2)}
				width={Geo.finishBox}
    			height={Geo.finishBox}
                fill= {Geo.bronze}
				stroke= {Geo.borderColor}
				strokeWidth= {1}
				shadowBlur = {selectedDeco.shadowBlur}
				shadowOpacity= {selectedDeco.shadowOpacity}
				shadowColor= {selectedDeco.shadowColor}
				opacity = {opacity3}
            />
            <Text //3rd
                onClick = {() => click('3',player)}
        		text = {'3'}
        		y = {2*(Geo.finishBox+Geo.margin/2)+(Geo.finishBox-Geo.finishFontSize)/2}
        		fontSize = {Geo.finishFontSize}
        		fontStyle = 'bold'
        		shadowBlur = {1}
        		shadowOpacity= {0.8}
        		fill = {textColor3}
        		width = {Geo.finishBox}
        		align = 'center'
        	/>
        </Group>
    );
    
}