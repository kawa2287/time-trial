'use strict';

export default function DetermineAvgTime(timeTrial, totalTime, wins, losses, nLastPlace){
	if (wins == 0 && losses == 0){
		return timeTrial;
	} else {
		return  Math.round(100*(totalTime + (timeTrial=='-'?0:timeTrial))/((timeTrial=='-'?0:1) + wins + losses - nLastPlace))/100;
	}
}