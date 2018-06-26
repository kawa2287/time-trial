'use strict';

export default function ChartTitle(query, medianTime){
    switch(query){
		case 'Seed' :
			return 'Seed';
		case 'Time Trial' :
			return 'Time Trial';
		case 'Best Times' :
			return 'Best Times';
		case 'Median Time Split' :
			return 'Median = '+ medianTime;
		case 'Avg Times' : 
			return 'Avg Times';
		case 'Cup Time' :
			return 'Avg Cup Time';
		case 'W & L' :
		    return 'Wins & Losses';
	    case 'Place' :
	        return 'Place';
        case 'Avg Place' :
            return 'Avg Place';
		default:
			return 'Time Trial';
	}
}
    
    
    
    

	

