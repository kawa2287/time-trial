'use strict';

import React from 'react';

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
	
	PropogateSeeds(seed, nTeams){
		var bracketPower = this.DetermineBracketPower(nTeams);
		var places = Math.pow(2,bracketPower);
		var opponent = (places + 1) - seed;
		if(opponent > nTeams){
			return seed + " gets a bye";
		} else {
			return seed + " vs " + opponent;
		}
	}
	
	getRootVal (arr){
		if (Array.isArray(arr)){
			return this.getRootVal(arr[0]);
		} else {
			return arr;
		}
	}
	
	PropogateSeedsArrV2(nTeams, mastArr){
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
						if(eq - this.getRootVal(baseArr[i-1]) == this.getRootVal(baseArr[item])) {
							nextOrderArr.push([baseArr[i-1],baseArr[item]]);
						}
					}
				}
			}
			if(order == bracketPower){
				return this.popMastArr(nextOrderArr, mastArr, nTeams);
			} else {
				baseArr = nextOrderArr;
				nextOrderArr = [];
			}
		}
	}
	
	popMastArr(arr, mastArr, nTeams){
		mastArr = mastArr || [];
		for (var item in arr){
			if(Array.isArray(arr[item])){
				this.popMastArr(arr[item], mastArr, nTeams);
			} else {
				if(arr[item]>nTeams){
					mastArr.push('BYE');
				} else {
					mastArr.push(arr[item]);
				}
			}
		}
		return mastArr;
	}
	
	render() {
		var teams = 13;
		var mastArr = [];

		console.log(this.PropogateSeedsArrV2(teams,mastArr));

		return (
			<div>
				<p>{this.PropogateSeeds(1,teams)}</p>
				<p>{this.PropogateSeeds(2,teams)}</p>
				<hr/>
				<p>{this.PropogateSeeds(3,teams)}</p>
				<p>{this.PropogateSeeds(4,teams)}</p>
				<hr/>
				<p>{this.PropogateSeeds(5,teams)}</p>
				<p>{this.PropogateSeeds(6,teams)}</p>
				<hr/>
				<p>{this.PropogateSeeds(7,teams)}</p>
				<p>{this.PropogateSeeds(8,teams)}</p>
			</div>
		);
	}
}