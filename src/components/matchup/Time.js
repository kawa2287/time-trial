'use strict';

import Konva from "konva";
import { Text, Group } from "react-konva";
import React from 'react';


export default function Time(Geo,dialogWidth, selectedDeco,time){
    
    var width = Geo.timeCircleRadius4P*2;
    var x = dialogWidth - (Geo.margin*4 + Geo.timeCircleRadius4P*2 );


    return(
        <Group x = {x} >	
            <Text //time
        		text = {time}
        		y = {Geo.margin}
        		fontSize = {Geo.timeFont}
        		fontStyle = 'bold'
        		fontFamily ={Geo.mainFontfamily}
        		shadowBlur = {5}
        		shadowOpacity= {0.8}
        		fill = {Geo.paleAmber}
        		width = {width}
        		align = 'center'
        	/>
        </Group>
    );
    
}