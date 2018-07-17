import React from 'react';
import {Link} from 'react-router';

var linkPath;

export default class FirebaseGameTile extends React.Component {
	constructor(props){
		super(props);
		
		linkPath= {
			pathname:"/VsMobile", 
			state:{
				mode : this.props.mode, 
				seeding:this.props.seeding, 
				order:this.props.order,
				gameName:this.props.gameName,
				players: this.props.players,
				load:true
			}
		};
	}

    render() {
    	
    	console.log('linkPath',linkPath);

		return (
		    <Link 
		    	className="row"
		    	to={linkPath}
	    	>
		    	{this.props.gameName}
		    </Link>
		);
    }
}
