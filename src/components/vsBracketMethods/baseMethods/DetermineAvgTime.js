'use strict';

export default function DetermineAvgTime(timeTrial, totalTime, wins, losses){
	if (wins == 0 && losses == 0){
		return timeTrial;
	} else {
		return  Math.round(100*(totalTime + timeTrial)/(1 + wins + losses))/100;
	}
}