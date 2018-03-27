'use strict';

import React from 'react';
import TileTeam from './TileTeam';
import BezierCurves from './BezierCurves';


export default class VsTournament extends React.Component {
	constructor(){
		super();
	}
	
	DetermineBracketPower (nTeams) {
		var bracketPower = 0;
		for (var i = 0; i < 10; i++){
			if (Number(nTeams) <= Math.pow(2,i)){
				bracketPower = i;
				return bracketPower;
			}
		}
		return bracketPower;
	}
	
	GetRootVal (arr){
		if (Array.isArray(arr)){
			return this.GetRootVal(arr[0]);
		} else {
			return arr;
		}
	}
	
	PropogateSeedsArr(nTeams, mastArr){
		var baseArr = [];
		var nextOrderArr = [];
		var bracketPower = this.DetermineBracketPower(nTeams);

		for (var order = 1; order <= bracketPower; order++){
			var eq = Math.pow(2,bracketPower-order+1)+1;
			for (var i = 1; i <= Math.pow(2,bracketPower)/Math.pow(2,order); i++){
				if (order == 1){
					baseArr.push([i,eq - i]);
					nextOrderArr = baseArr;
				} else {
					for (var item in baseArr){
						if(eq - this.GetRootVal(baseArr[i-1]) == this.GetRootVal(baseArr[item])) {
							nextOrderArr.push([baseArr[i-1],baseArr[item]]);
						}
					}
				}
			}
			if(order == bracketPower){
				return this.PopMastArr(nextOrderArr, mastArr, nTeams);
			} else {
				baseArr = nextOrderArr;
				nextOrderArr = [];
			}
		}
	}
	
	PopMastArr(arr, mastArr, nTeams){
		mastArr = mastArr || [];
		for (var item in arr){
			if(Array.isArray(arr[item])){
				this.PopMastArr(arr[item], mastArr, nTeams);
			} else {
				mastArr.push(arr[item]);
			}
		}
		return mastArr;
	}
	
	render() {
		//this.props.location.state.'GIVEN NAME' to access props thru Link
		
		var teams = Object.keys(this.props.location.state.players).length;
		var mastArr = [];
		var tiles = [];
		var toggle = 0;
		var nextRoundArr = [];
		var nextBezArr = [];
		var winnersRndArr = [];
		var baseStageHeight = 60;
		var baseStageWidth = 300;
		var overallWidth = baseStageWidth*(this.DetermineBracketPower(teams)+1);
		
		//populate seeded array
		this.PropogateSeedsArr(teams,mastArr);
		
		//add props to seeded array
		for (var item in mastArr) {
			for (var x in this.props.location.state.players){
				if(mastArr[item] == this.props.location.state.players[x].seed){
					tiles.push(<TileTeam
						seed = {mastArr[item]}
						name = {this.props.location.state.players[x].name}
						time = {this.props.location.state.players[x].timeTrial}
						img = {this.props.location.state.players[x].country.flagPathMD}
						height = {baseStageHeight}
						width = {baseStageWidth}
					/>);
					toggle = 1;
				} 
			}
			if (toggle == 0){
				tiles.push(<TileTeam
					seed = {mastArr[item]}
					name = {'BYE'}
					time = {'-'}
					height = {baseStageHeight}
					width = {baseStageWidth}
				/>);
			}
			toggle = 0;
		}
		
		//temp array creator for testing
		for (var n = 0; n < this.DetermineBracketPower(teams); n++){
			for (var k = 0; k < mastArr.length/Math.pow(2,n+1); k++){
				nextRoundArr.push(<TileTeam
							seed = ''
							name = ''
							time = ''
							img = ''
							height = {baseStageHeight*Math.pow(2,n+1)}
							width = {baseStageWidth}
						/>);
				nextBezArr.push(<BezierCurves
					height = {baseStageHeight*Math.pow(2,n+1)}
					width = {40}
					/>);
			}
			winnersRndArr.push(<div className = "round-test">{nextBezArr}</div>);
			winnersRndArr.push(<div className = "round-test">{nextRoundArr}</div>);
			nextRoundArr=[];
			nextBezArr=[];
		}
		
		
		//create dispatcher to push into separate games

		return (
			<div className= "outside-container">
				<div className = "tourny-lay" style={{"width" : {overallWidth}}}>
					<div>
						{tiles}
					</div>
					{winnersRndArr}
				</div>
			</div>
		);
	}
}