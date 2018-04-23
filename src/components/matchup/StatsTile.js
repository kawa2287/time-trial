'use strict';

import Konva from "konva";
import { Rect, Text, Group } from "react-konva";
import React from 'react';
import DetermineAvgTime from '../vsBracketMethods/baseMethods/DetermineAvgTime';
import Settings from '../../static/Settings';

var width ;
var statHeight ;
var statSpace ;
var nStats = 6;
var statHzDist;

var avgTime;
var avgCupTime;
var index;


export default function StatsTile (Geo,player,dialogWidth, selectedDeco){

	
	width = dialogWidth - (Geo.margin*5 + Geo.flagWidth + Geo.positionWidth);
	statHeight = Geo.tileHeight- Geo.margin*2.5;
	statSpace = (statHeight-(Geo.nameSize + Geo.statLabelSize))/3;
	statHzDist = (width)/(nStats);
	
	
	avgTime = DetermineAvgTime(player.timeTrial, player.totalTime, player.wins, player.losses);
	avgCupTime = Math.round(100*avgTime/Settings.cupsPerPerson)/100;
	index = Math.round(100*player.timeTrial/avgTime)/100;
	
	var countryName = player.country == null ? '' : player.country.name;
	
	return (
		<Group x = {Geo.margin*2 + Geo.flagWidth + Geo.positionWidth} >	
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
				fill = 'white'
				fontVariant = 'small-caps'
				fontSize = {Geo.nameSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			
			<Text //country
				y = {Geo.tileHeight- (Geo.seedFontSize*2+Geo.margin/2)/2 }
				text = {countryName}
				align = 'right'
				width = {width}
				fill = {Geo.borderColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.seedFontSize}
				shadowBlur = {selectedDeco.shadowBlur}
				shadowOpacity= {selectedDeco.shadowOpacity}
				shadowColor={selectedDeco.shadowColor}
			/>
			
			<Text //wins
				x = {statHzDist * 0}
				y = {statSpace}
				text = {player.wins == 0 ? '0' : player.wins}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.statColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.nameSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			<Text //losses
				x = {statHzDist * 1}
				y = {statSpace}
				text = {player.losses == 0 ? '0' : player.losses}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.statColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.nameSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			<Text //avgCupTime
				x = {statHzDist * 2}
				y = {statSpace}
				text = {avgCupTime}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.statColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.nameSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			<Text //avgTime
				x = {statHzDist * 3 }
				y = {statSpace}
				text = {avgTime}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.statColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.nameSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			<Text //bestTime
				x = {statHzDist * 4}
				y = {statSpace}
				text = {player.bestTime}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.statColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.nameSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			<Text //index
				x = {statHzDist * 5}
				y = {statSpace}
				text = {index}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.statColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.nameSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			
			<Text //wins label
				x = {statHzDist * 0}
				y = {2*statSpace + Geo.nameSize}
				text = {'wins'}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.borderColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.statLabelSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			<Text //losseslabel
				x = {statHzDist * 1}
				y = {2*statSpace + Geo.nameSize}
				text = {'losses'}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.borderColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.statLabelSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			<Text //avgCupTime label
				x = {statHzDist * 2}
				y = {2*statSpace + Geo.nameSize}
				text = {'avg cup'}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.borderColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.statLabelSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			<Text //avgTime label
				x = {statHzDist * 3 }
				y = {2*statSpace + Geo.nameSize}
				text = {'avg time'}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.borderColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.statLabelSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			<Text //bestTime label
				x = {statHzDist * 4}
				y = {2*statSpace + Geo.nameSize}
				text = {'best time'}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.borderColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.statLabelSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			<Text //index label
				x = {statHzDist * 5}
				y = {2*statSpace + Geo.nameSize}
				text = {'index'}
				align = 'center'
				width = {statHzDist}
				fill = {Geo.borderColor}
				fontVariant = 'small-caps'
				fontSize = {Geo.statLabelSize}
				shadowBlur = {2}
				shadowOpacity= {0.5}
			/>
			
		</Group>
	);
    
}
