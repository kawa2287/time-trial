'use strict';

export default function ChartTitle(query){
    switch(query){
		case 'Seed' :
			return 'Seed';
		case 'Time Trial' :
			return 'Time Trial';
		case 'Best Times' :
			return 'Best Times';
		case 'Index' :
			return 'Index';
		case 'Avg Times' : 
			return 'Avg Times';
		case 'Cup Time' :
			return 'Avg Cup Time';
		case 'W & L' :
		    return 'Wins & Losses';
	    case 'Place' :
	        return 'Place';
        case '% Chance' :
            return '% Chance of Winning';
		default:
			return 'Time Trial';
	}
}
    
    
    
    

	

