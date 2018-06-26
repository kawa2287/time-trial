'use strict';

import Konva from "konva";
import { Rect, Text, Group } from "react-konva";
import React from 'react';
import DetermineAvgTime from '../vsBracketMethods/baseMethods/DetermineAvgTime';
import DetermineWinChance from '../vsBracketMethods/baseMethods/DetermineWinChance';
import Settings from '../../static/Settings';

var width ;
var statHeight ;
var statSpace ;
var statHzDist;

var avgTime;
var avgCupTime;
var avgSplit;


export default function StatsTile (Geo,player,dialogWidth, selectedDeco, mode,winner1,winner2,players,i,gameNumber, bracketSpots, allAvgTime){
	
    var x;
    var winChance;
    console.log('statTile player', allAvgTime);
    
    if(mode == 'VS'){
        x =Geo.margin*2 + Geo.flagWidth + Geo.positionWidth;
        width = dialogWidth - (Geo.margin*5 + Geo.flagWidth + Geo.positionWidth);
    } else {
        x = Geo.margin*2 + Geo.flagWidth + Geo.positionWidth + 1.5*Geo.finishBox;
        width = dialogWidth - (Geo.margin*7 + Geo.flagWidth + Geo.positionWidth + Geo.timeCircleRadius4P*2 + 1.5*Geo.finishBox);
        var playerAvgTmArr = [];
        for (var q=0; q <players.length;q++){
    		playerAvgTmArr.push(DetermineAvgTime(players[q].timeTrial,players[q].totalTime,players[q].wins,players[q].losses,players[q].nLastPlace));
        }
        winChance = DetermineWinChance(players,playerAvgTmArr,i,'4P',(gameNumber==(bracketSpots/2)));
        winChance == '-' ? '-' : winChance ;
    }

	statHeight = Geo.tileHeight- Geo.margin*2.5;
	statSpace = (statHeight-(Geo.nameSize + Geo.statLabelSize))/3;
	
	avgTime = player.avgTime; //DetermineAvgTime(player.timeTrial, player.totalTime, player.wins, player.losses, player.avgTime);
	avgCupTime = Math.round(100*avgTime/Settings.cupsPerPerson)/100;
	avgSplit = Math.round(100*(avgTime-allAvgTime))/100;
	if(isNaN(avgSplit)){
		avgSplit = 0;
	}
	
	var countryName = (player.country == null ? '' : player.country.name);
	var textArray = ['wins','losses','avg cup time','avg time', 'best time', 'group avg'];
	
	console.log('avgSplit',avgSplit);

	var labelArray = [];
	var statsArray = [];
	var valueArray = [
		player.wins == 0 ? '0' : player.wins,
		player.losses == 0 ? '0' : player.losses,
		avgCupTime,
		avgTime,
		player.bestTime,
		(avgSplit >= 0)?('+'+(avgSplit===0?'0.00':avgSplit)):avgSplit
		];
		
	if(mode != 'VS'){
		textArray.push('avg place');
		textArray.push(gameNumber==(bracketSpots/2)?'win chance':'chance to adv');
		valueArray.push(player.avgPlacement);
		valueArray.push(winChance+'%');
	}
		
	statHzDist = (width)/(textArray.length);
	
	for (var l = 0; l<textArray.length; l++){
		statsArray.push(
			<Text //wins
				x = {statHzDist * l}
				y = {statSpace}
				text = {valueArray[l]}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.statColor}
				fontSize = {Geo.nameSize}
				fontFamily = {Geo.mainFontfamily}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
		);
		labelArray.push(
			<Text
				x = {statHzDist * l}
				y = {2*statSpace + Geo.nameSize}
				text = {textArray[l]}
				fontFamily = {Geo.mainFontfamily}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.borderColor}
				fontSize = {Geo.statLabelSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
		);
	}
	
	
	return (
		<Group 
			x = {x} 
		>	
			<Rect 
				width={width}
				height={statHeight}
				fill= {Geo.statTileColor}
				stroke= {Geo.borderColor}
				strokeWidth= {0}
				shadowBlur = {selectedDeco.shadowBlur}
				shadowOpacity= {selectedDeco.shadowOpacity}
				shadowColor= {selectedDeco.shadowColor}
				opacity = {0.2}
				cornerRadius={10}
			/>
			<Text //name
				y = {Geo.tileHeight- (Geo.nameSize*2+Geo.margin/2)/2 }
				text = {player.name}
				align = 'left'
				fill = {Geo.paleAmber}
				fontSize = {Geo.nameSize}
				fontFamily = {Geo.mainFontfamily}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			
			<Text //country
				y = {Geo.tileHeight- (Geo.seedFontSize*2+Geo.margin/2)/2 }
				text = {countryName}
				align = 'right'
				width = {width}
				fill = {Geo.deSatOrng}
				fontSize = {Geo.seedFontSize}
				shadowBlur = {selectedDeco.shadowBlur}
				shadowOpacity= {selectedDeco.shadowOpacity}
				shadowColor={selectedDeco.shadowColor}
				fontFamily = {Geo.mainFontfamily}
				fontStyle = 'bold'
			/>
			
			{statsArray}
			
			{labelArray}
			
		</Group>
	);
    
}
