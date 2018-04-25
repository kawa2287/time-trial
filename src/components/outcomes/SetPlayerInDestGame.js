'use strict';

export default function SetPlayerInDestGame(currentGameNum, destGame, topGame, botGame, player){
	
	if (currentGameNum == topGame){
		this.setState({
    	masterGameObject : {
        		...this.state.masterGameObject,
        		[destGame] : {
        			...this.state.masterGameObject[destGame],
        			playerA : player,
        			spotsFilled : this.state.masterGameObject[destGame].spotsFilled + 1
        		}
        	}
        });
	} else if(currentGameNum == botGame) {
		this.setState({
    	masterGameObject : {
        		...this.state.masterGameObject,
        		[destGame] : {
        			...this.state.masterGameObject[destGame],
        			playerB : player,
        			spotsFilled : this.state.masterGameObject[destGame].spotsFilled + 1
        		}
        	}
        });
	}
}

