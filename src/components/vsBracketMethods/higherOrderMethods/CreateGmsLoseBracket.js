'use strict';

import React from 'react';
import GameComponent from '../../GameComponent';
import GameComponentProps from '../baseMethods/GameComponentProps';
import BezierCurves from '../../BezierCurves';
import BracketLine from '../../BracketLine';

var k;
var i;
var moduleCCht;
var xLoc;
var yLoc;


export default function CreateGmsLoseBracket(gVars,gameCounter,masterGameObject ){
    
    // unwrap
    var gameWidth = gVars.gameWidth;
	var gameHeight = gVars.gameHeight;
	var boardHeight = gVars.boardHeight;
	var loserArr = gVars.loserArr;
	var winnerArr = gVars.winnerArr;
	var vizGeo = gVars.vizGeo;
	var bracketPower = gVars.bracketPower;
	var bracketSpots = gVars.bracketSpots;
	
	var loserBracket = [];
	var bezArr = [];
    
    for (k = 0; k < loserArr.length; k++){
		for( i = 0; i < loserArr[k]; i++){
			
			moduleCCht = (gameHeight+vizGeo.vertSpace)*Math.pow(2,k%2==0?(k/2)+1:(k+1)/2);
			xLoc = ((bracketPower-1)*2)*vizGeo.horizSpace + (((bracketPower-1)*2)-1)*gameWidth - k*(gameWidth+vizGeo.horizSpace);
			yLoc = boardHeight-(loserArr[k]-i)*(gameHeight+vizGeo.vertSpace)*(Math.pow(2,(k%2==0?(k/2)+1:(k+1)/2))) - vizGeo.vertSpace + ((gameHeight+vizGeo.vertSpace)*(Math.pow(2,(k%2==0?(k/2)+1:(k+1)/2)))-vizGeo.vertSpace)/2 - gameHeight/2;
			
					
			loserBracket.push(
				<GameComponent
					gProps = {
						GameComponentProps(
							gVars,
							gameCounter,
							masterGameObject,
							bracketSpots,
							vizGeo,
							xLoc,
							yLoc
						)
					}
				/>
			);
			
			var ye = i % 2 == 0 ? yLoc + (gameHeight + moduleCCht)/2 : yLoc + (gameHeight - moduleCCht)/2;
			
			if(k%2 ==0 ){
				ye = yLoc + gameHeight/2;
			}
			
			if (k==loserArr.length -1){
				var xEnd = xLoc + (loserArr.length + winnerArr.length + 1)*(gameWidth + vizGeo.horizSpace) - vizGeo.horizSpace - gameWidth/2;
				bezArr.push(
					<BracketLine
						xs = {xLoc + gameWidth/2}
						ys = {yLoc}
						x1 = {xLoc + gameWidth/2}
						y1 = {vizGeo.vertSpace/2}
						x2 = {xEnd}
						y2 = {vizGeo.vertSpace/2}
						x3 = {xEnd}
						y3 = {yLoc}
						radius = {vizGeo.radius}
						color = 'blue'
						stroke = {4}
						bracket = {masterGameObject[gameCounter].bracket + (k%2 == 0?'':2)}
						direction = 'counter-clockwise'
					/>
				); 
			} else {
				bezArr.push(
					<BezierCurves
						xs = {xLoc}
						ys = {yLoc + gameHeight/2}
						xe = {xLoc - vizGeo.horizSpace}
						ye = {ye}
						color = 'blue'
						stroke = {4}
						bracket = {masterGameObject[gameCounter].bracket + (k%2 == 0?'':2)}
					/>
				); 
			}
			gameCounter = gameCounter + 1;
		}
	}
	
	return  {
	    loserBracket : loserBracket,
	    bezArr : bezArr,
	    gameCounter : gameCounter
	};
	
}