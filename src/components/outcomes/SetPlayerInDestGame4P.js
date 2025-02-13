'use strict';

export default function SetPlayerInDestGame4P(currentGameNum, destGame, topGame, botGame, p1,p2,beginConstruction, decision){
	
	console.log("currentGameNum",currentGameNum);
	console.log("destGame",destGame);
	console.log("topGame",topGame);
	console.log("botGame",botGame);
	console.log("p1",p1);
	console.log("p2",p2);
	console.log("beginConstruction",beginConstruction);
	console.log("decision",decision);
	
	if(beginConstruction==true){
		if (currentGameNum == topGame){
			this.state.masterGameObject = {
				...this.state.masterGameObject,
				[destGame] : {
					...this.state.masterGameObject[destGame],
					playerA : {
						...this.state.masterGameObject[destGame].playerA,
						name : p1
					},
					playerB : {
						...this.state.masterGameObject[destGame].playerB,
						name : p2
					}
				}
			};
		}
		if (currentGameNum == botGame) {
			this.state.masterGameObject = {
				...this.state.masterGameObject,
				[destGame] : {
					...this.state.masterGameObject[destGame],
					playerC : {
						...this.state.masterGameObject[destGame].playerC,
						name : p1
					},
					playerD : {
						...this.state.masterGameObject[destGame].playerD,
						name : p2
					}
				}
			};
		}
		
		//set property of loser destination in MasterGameObject
		if(decision == 'loss'){
			console.log("here is a loss");
			this.state.masterGameObject = {
				...this.state.masterGameObject,
				[currentGameNum] : {
					...this.state.masterGameObject[currentGameNum],
					loserDestionationGame : destGame
				}
			};
		} 
			
		if(decision == 'win'){
			console.log("here is a win");
			this.state.masterGameObject = {
				...this.state.masterGameObject,
				[currentGameNum] : {
					...this.state.masterGameObject[currentGameNum],
					winnerDestinationGame : destGame
				}
			};	
		}
	} else{
		
		if (currentGameNum == topGame){
			this.state.masterGameObject = {
        		...this.state.masterGameObject,
        		[destGame] : {
        			...this.state.masterGameObject[destGame],
        			playerA : p1,
        			playerB : p2,
        			spotsFilled : this.state.masterGameObject[destGame].spotsFilled + 2
        		}
        	};
	        
		} else if(currentGameNum == botGame) {
			this.state.masterGameObject = {
        		...this.state.masterGameObject,
        		[destGame] : {
        			...this.state.masterGameObject[destGame],
        			playerC : p1,
        			playerD : p2,
        			spotsFilled : this.state.masterGameObject[destGame].spotsFilled + 2
        		}
        	};
        }
	}
}

