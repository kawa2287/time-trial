'use strict';

import DetermineRoundNumber from './DetermineRoundNumber';
import DetermineBracket from '../baseMethods/DetermineBracket';
import DetermineWinChance from '../baseMethods/DetermineWinChance';
import * as NgmsInRnd from '../baseMethods/NgamesInRound';
import Settings from '../../../static/Settings';

export default function SimPath(player,masterGameObject){
    
    var tempMGO = {};
    var tempFactorArray = [];
    tempMGO = cloneObject(masterGameObject);
    
    console.log('player',player.name);
    
    //loop through each game and push results
    for (var i in tempMGO){
        if(tempMGO[i].status !== 'COMPLETE'){
            SimWinLoseHandler(tempMGO,i,player);
        }
    }
    
    //console.log('tempMGO',tempMGO);
    
}

function cloneObject(obj) {
    var clone = {};
    for(var i in obj) {
        if(obj[i] != null &&  typeof(obj[i])=="object")
            clone[i] = cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}

function SimWinLoseHandler(tempMGO,i,player){
    
    var bracketSpots = Settings.bracketSpots;
    var currentBracket = DetermineBracket(tempMGO[i].gameNumber,bracketSpots,'VS');
    var currentGameNum = tempMGO[i].gameNumber;
    
    var roundNumber = DetermineRoundNumber(
        currentGameNum, 
        bracketSpots, 
        currentBracket
    );
    var playerA = tempMGO[i].playerA;
    var playerB = tempMGO[i].playerB;
    var pAwinChance;
    var pBwinChance;
    
    var winPlayer;
    var losePlayer;
    
    //determine winner and loser
    if(playerA.name == 'BYE' && playerB.name == 'BYE'){
        winPlayer = playerA;
        losePlayer = playerB;
    } else if (playerB.name == 'BYE'){
        winPlayer = playerA;
        losePlayer = playerB;
    } else if (playerB.name == 'BYE'){
        winPlayer = playerB;
        losePlayer = playerA;
    } else if (player.name == playerA.name){
        winPlayer = playerA;
        losePlayer = playerB;
    } else if (player.name == playerB.name){
        winPlayer = playerB;
        losePlayer = playerA;
    } else{
        pAwinChance = DetermineWinChance(
            [playerA,playerB],
            [playerA.timeTrial,playerB.timeTrial],
            0,'VS'
        );
        pBwinChance = DetermineWinChance(
            [playerA,playerB],
            [playerA.timeTrial,playerB.timeTrial],
            1,'VS'
        );
        
        if(pAwinChance >= pBwinChance){
            winPlayer = playerA;
            losePlayer = playerB;
        } else {
            winPlayer = playerB;
            losePlayer = playerA;
        }
    }
    
    // set game object with results
    tempMGO[currentGameNum].status = 'COMPLETE';
    tempMGO[currentGameNum].winner = winPlayer.name;
    tempMGO[currentGameNum].loser = losePlayer.name;
    
    /*
    tempMGO = {
		...tempMGO,
		[currentGameNum] : {
			...tempMGO[currentGameNum],
			status : 'COMPLETE',
    		winner : winPlayer.name,
    		loser : losePlayer.name
		}
	};
	*/
    
    console.log('game# = ',currentGameNum);
    console.log('winner = ',winPlayer);
    console.log('loser = ',losePlayer);
    
    // send player based on bracket Location
    var destGame; 
    var topGame;
    var botGame;
    
    if (currentBracket == "startBracket"){
        //winner bracket path
    	destGame = 0.5*((currentGameNum % 2 ==0 ? currentGameNum : currentGameNum+1)+bracketSpots);
    	topGame = (destGame * 2 - bracketSpots) - 1;
    	botGame = (destGame * 2 - bracketSpots);
    	SetPlayerInSimGame(tempMGO,currentGameNum,destGame,topGame,botGame,winPlayer);
    	
    	//loser bracket path
    	destGame = 0.5*(currentGameNum % 2 ==0 ? currentGameNum : currentGameNum+1)+bracketSpots;
	    topGame = 2 * (destGame - bracketSpots) - 1;
	    botGame = 2 * (destGame - bracketSpots);
	    SetPlayerInSimGame(tempMGO,currentGameNum,destGame,topGame,botGame,losePlayer);

	} else if (currentBracket == "winnerBracket"){
	    //winner path
	    destGame = 0.5*((currentGameNum % 2 ==0 ? currentGameNum : currentGameNum+1)+bracketSpots);
    	topGame = (destGame * 2 - bracketSpots) - 1;
    	botGame = (destGame * 2 - bracketSpots);
    	SetPlayerInSimGame(tempMGO,currentGameNum,destGame,topGame,botGame,winPlayer);
    	
    	//loser path
    	var coeff;
    	var destGameRnd = DetermineRoundNumber(destGame,bracketSpots,"loserBracket");
    	if(Settings.seedMode !== 'blind' || currentGameNum == bracketSpots - 1) {
    	 	coeff = 0;
    	 } else if (currentGameNum %2 == 0){
    	 	coeff = -1;
    	 } else{
    	 	coeff = 1;
    	 }
    	destGame = currentGameNum + bracketSpots - NgmsInRnd.winnerBracket(bracketSpots, roundNumber, 'VS') + coeff;
    	topGame;
    	botGame;
    	if (destGameRnd % 2 == 0){
    		topGame = destGame - NgmsInRnd.loserBracket(bracketSpots,destGameRnd, 'VS');
    		botGame = currentGameNum;
    	} else {
    		topGame = 2 * (destGame - bracketSpots + NgmsInRnd.loserBracket(bracketSpots,destGameRnd, 'VS')) - 1;
    		botGame = 2 * (destGame - bracketSpots + NgmsInRnd.loserBracket(bracketSpots,destGameRnd, 'VS'));
    	}
    	SetPlayerInSimGame(tempMGO,currentGameNum,destGame,topGame,botGame,losePlayer);
    	
	} else if (currentBracket == "specialBracket"){
		if(currentGameNum == bracketSpots){
		    //send winner and loser of championship
		    destGame = bracketSpots*2 - 1;
		    if(winPlayer.name == playerA.name){
		        tempMGO = {
        			...tempMGO,
        			[destGame] : {
        				...tempMGO[destGame],
        				playerA : winPlayer,
        				playerB : {
    	    				name : 'BYE',
    					    country : '',
    					    seed : '-',
    					    timeTrial : '-',
    					    wins : 0,
    					    losses : 0,
    					    totalTime : 0,
    					    avgTime : 0,
    					    splitTIme : 0
    	    			},
    	    			spotsFilled : 2,
	    			    status : 'COMPLETE'
        			}
        		};
		    } else if (winPlayer.name == playerB.name){
		        tempMGO = {
        			...tempMGO,
        			[destGame] : {
        				...tempMGO[destGame],
        				playerA : winPlayer,
        				playerB : losePlayer
        			}
        		};
		    }
    	   
		} else {
		    //send winner special loser bracket
	    	destGame = bracketSpots;
        	topGame = bracketSpots - 1;
        	botGame = bracketSpots * 2 - 2;
        	SetPlayerInSimGame(tempMGO,currentGameNum,destGame,topGame,botGame,winPlayer);
		}
	} else {
	    //send winner loser bracket
    	if (roundNumber % 2 == 0) {
    		destGame = (currentGameNum % 2 == 0 ? currentGameNum : currentGameNum + 1)*0.5 + bracketSpots - NgmsInRnd.loserBracket(bracketSpots,roundNumber,'VS')/2;
    	} else {
    		destGame = currentGameNum + NgmsInRnd.loserBracket(bracketSpots,roundNumber,'VS');
    	}
    	destGameRnd = DetermineRoundNumber(destGame,bracketSpots,"loserBracket");
    	if (destGameRnd % 2 == 0){
    		topGame = destGame - NgmsInRnd.loserBracket(bracketSpots,destGameRnd,'VS');
    		botGame = destGame + NgmsInRnd.loserBracket(bracketSpots,destGameRnd,'VS') - bracketSpots;
    	} else {
    		topGame = 2 * (destGame - bracketSpots + NgmsInRnd.loserBracket(bracketSpots,destGameRnd,'VS')) - 1;
    		botGame = 2 * (destGame - bracketSpots + NgmsInRnd.loserBracket(bracketSpots,destGameRnd,'VS'));
    	}
    	SetPlayerInSimGame(tempMGO,currentGameNum,destGame,topGame,botGame,winPlayer);
    	
	}
	
}

function SetPlayerInSimGame(tempMGO,currentGameNum,destGame,topGame,botGame,player){
    
    if (currentGameNum == topGame){
		tempMGO[destGame].playerA = player;
	}
	if (currentGameNum == botGame) {
		tempMGO[destGame].playerB = player;
	}
    
    /*
    if (currentGameNum == topGame){
		tempMGO = {
			...tempMGO,
			[destGame] : {
				...tempMGO[destGame],
				playerA : {
					...tempMGO[destGame].playerA,
					name : player
				}
			}
		};
	}
	if (currentGameNum == botGame) {
		tempMGO = {
			...tempMGO,
			[destGame] : {
				...tempMGO[destGame],
				playerB : {
					...tempMGO[destGame].playerB,
					name : player
				}
			}
		};
	}
	*/
	
}