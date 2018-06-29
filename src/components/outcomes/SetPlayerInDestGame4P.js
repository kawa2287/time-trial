'use strict';

export default function SetPlayerInDestGame4P(currentGameNum, destGame, topGame, botGame, p1,p2,beginConstruction){
	
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
	} else{
		
		if (currentGameNum == topGame){
			this.setState({
	    	masterGameObject : {
	        		...this.state.masterGameObject,
	        		[destGame] : {
	        			...this.state.masterGameObject[destGame],
	        			playerA : p1,
	        			playerB : p2,
	        			spotsFilled : this.state.masterGameObject[destGame].spotsFilled + 2
	        		}
	        	}
	        });
		} else if(currentGameNum == botGame) {
			this.setState({
	    	masterGameObject : {
	        		...this.state.masterGameObject,
	        		[destGame] : {
	        			...this.state.masterGameObject[destGame],
	        			playerC : p1,
	        			playerD : p2,
	        			spotsFilled : this.state.masterGameObject[destGame].spotsFilled + 2
	        		}
	        	}
	        });
		}
	}
}

