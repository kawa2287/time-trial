'use strict';

export default function SetPlayerInDestGame4P(currentGameNum, destGame, topGame, botGame, p1,p2){
	
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

