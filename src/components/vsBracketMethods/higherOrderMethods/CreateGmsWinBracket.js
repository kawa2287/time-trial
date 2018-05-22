'use strict';

//clear for VS & 4P Mode

import React from 'react';
import GameComponent from '../../GameComponent';
import GameComponentProps from '../baseMethods/GameComponentProps';
import BezierCurves from '../../BezierCurves';
import BracketLine from '../../BracketLine';
import Settings from '../../../static/Settings';


var k;
var i;
var moduleCCht;
var halfModuleHeight;
var xLoc;
var yLoc;
var colorInt = 0;

export default function CreateGmsWinBracket(gVars,gameCounter,masterGameObject,mode ){
    
    // unwrap
    var gameWidth = gVars.gameWidth;
	var gameHeight = gVars.gameHeight;
	var boardHeight = gVars.boardHeight;
	var winnerArr = gVars.winnerArr;
	var vizGeo = gVars.vizGeo;
	var bracketPower = gVars.bracketPower;
	var bracketSpots = gVars.bracketSpots;
	
	var winnerBracket = [];
	var bezArr = [];
	

    for (k = 0; k < winnerArr.length; k++){
		for(i = 0; i < winnerArr[k]; i++){
		    
		    
			
			moduleCCht = (gameHeight+vizGeo.vertSpace)*Math.pow(2,k);		
			halfModuleHeight = ((gameHeight+vizGeo.vertSpace)*(Math.pow(2,k))-vizGeo.vertSpace)/2;
			xLoc = (k+(bracketPower-(mode == 'VS' ? 0 : 1)-1)*2)*(gameWidth+vizGeo.horizSpace) + vizGeo.horizSpace;
			yLoc = boardHeight-(winnerArr[k]-i)*(gameHeight+vizGeo.vertSpace)*(Math.pow(2,k)) - vizGeo.vertSpace + halfModuleHeight - gameHeight/2;
			
			winnerBracket.push(
				<GameComponent
					gProps = {
						GameComponentProps(
							gVars,
							gameCounter,
							masterGameObject,
							bracketSpots,
							vizGeo,
							xLoc,
							yLoc,
							mode
						)
					}
				/>
			);
			
			var ye = i % 2 == 0 ? yLoc + (gameHeight + moduleCCht)/2 : yLoc + (gameHeight - moduleCCht)/2;
			
			if(k == winnerArr.length -1 && i == winnerArr[k]-1){
				ye = yLoc + gameHeight/2;
			}
			
			//push in loser side at same time for start round
			if(k==0){
				bezArr.push(
					<BezierCurves
						xs = {xLoc}
						ys = {yLoc + gameHeight/2}
						xe = {xLoc - vizGeo.horizSpace}
						ye = {ye}
						color = 'red'
						stroke = {4}
						dashEnabled = {true}
					/>
				);
			}
			
			//push in loser lines of winner bracket
			if(k!==0){
				
				var yStart;
				var y1;
				var y2;
				var y3;
				var direction;
				var arc1s;
				var arc1e;
				var arc2s;
				var arc2e;
				if(Settings.seedMode !== 'blind' || gameCounter == (bracketSpots/(mode=='VS'?1:2))-1){
					yStart = yLoc + gameHeight;
					y1 = yLoc + (gameHeight + moduleCCht)/2;
					y2 = yLoc + (gameHeight + moduleCCht)/2;
					y3 = yLoc + gameHeight;
					direction = 'clockwise';
					arc1s = 0;
					arc2s = 1/2 * Math.PI;
					
				} else {
					if(gameCounter % 2 == 0){
						yStart = yLoc;
						y1 = yLoc + gameHeight/2 - moduleCCht/2;
						y2 = yLoc + gameHeight/2 - moduleCCht/2;
						y3 = yLoc + (gameHeight - moduleCCht);
						direction = 'counter-clockwise';
						arc1s = 3/2*Math.PI;
						arc2s = 1/2 * Math.PI;
					} else {
						yStart = yLoc + gameHeight;
						y1 = yLoc + (gameHeight + moduleCCht)/2;
						y2 = yLoc + (gameHeight + moduleCCht)/2;
						y3 = yLoc + moduleCCht;
						direction = 'clockwise';
						arc1s = 2*Math.PI;
						arc2s = Math.PI;
					}
				}
				
				var xToLoser = xLoc - 3*k*(gameWidth+vizGeo.horizSpace) + gameWidth/2;
				bezArr.push(
					<BracketLine
						xs = {xLoc + gameWidth/2}
						ys = {yStart}
						x1 = {xLoc + gameWidth/2}
						y1 = {y1}
						x2 = {xToLoser}
						y2 = {y2}
						x3 = {xToLoser}
						y3 = {y3}
						radius = {vizGeo.radius}
						color = {vizGeo.lColAr[colorInt]}
						stroke = {8*k}
						direction = {direction}
						arc1s = {arc1s}
						arc1e = {arc1e}
						arc2s = {arc2s}
						arc2e = {arc2e}
						gameCounter = {gameCounter}
						bracketSpots = {bracketSpots}
						mode = {mode}
						class = 'non-final'
						dashEnabled = {true}
					/>
				); 
			}
			
			bezArr.push(
				<BezierCurves
					xs = {xLoc + gameWidth}
					ys = {yLoc + gameHeight/2}
					xe = {xLoc + gameWidth + vizGeo.horizSpace}
					ye = {ye}
					color = {'#121212'}
					stroke = {4}
					bracket = {masterGameObject[gameCounter].bracket}
					dashEnabled = {false}
				/>
			);
			gameCounter = gameCounter + 1;
			colorInt += 1;
		}
	}
	
	colorInt = 0;
	
	return  {
	    winnerBracket : winnerBracket,
	    bezArr : bezArr,
	    gameCounter : gameCounter
	};
	
}