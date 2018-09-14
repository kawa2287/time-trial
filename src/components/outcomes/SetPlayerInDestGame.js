'use strict';

export default function SetPlayerInDestGame(currentGameNum, destGame, topGame, botGame, player,beginConstruction){
	
	if(beginConstruction==true){
		if (currentGameNum == topGame){
			this.state.masterGameObject = {
				...this.state.masterGameObject,
				[destGame] : {
					...this.state.masterGameObject[destGame],
					playerA : {
						...this.state.masterGameObject[destGame].playerA,
						name : player
					}
				}
			};
		}
		if (currentGameNum == botGame) {
			this.state.masterGameObject = {
				...this.state.masterGameObject,
				[destGame] : {
					...this.state.masterGameObject[destGame],
					playerB : {
						...this.state.masterGameObject[destGame].playerB,
						name : player
					}
				}
			};
		}
	} else {
		
		if (currentGameNum == topGame){
			this.state.masterGameObject = {
	        		...this.state.masterGameObject,
	        		[destGame] : {
	        			...this.state.masterGameObject[destGame],
	        			playerA : player,
	        			spotsFilled : this.state.masterGameObject[destGame].spotsFilled + 1
	        		}
	        	};
	       
		} else if(currentGameNum == botGame) {
			this.state.masterGameObject = {
	        		...this.state.masterGameObject,
	        		[destGame] : {
	        			...this.state.masterGameObject[destGame],
	        			playerB : player,
	        			spotsFilled : this.state.masterGameObject[destGame].spotsFilled + 1
	        		}
	        	};
	        
		}
	}
}

