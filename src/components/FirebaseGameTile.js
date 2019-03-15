import React from 'react';
import {Link} from 'react-router';

var linkPath;

export default class FirebaseGameTile extends React.Component {
	constructor(props){
		super(props);
		
		linkPath= {
			pathname: (this.props.timeTrialOpen == 'open' ? "/" : "/VsMobile"), 
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
	
	HandleClick(){
		this.props.LoadGameProps(this.props.gameName, this.props.players);
		this.props.hideInput();
	}
	
	LinkOrDiv(){
		if(this.props.timeTrialOpen == 'open'){
			return(
				<div
					onClick={this.HandleClick.bind(this)}
					className="row"
				>
					{this.props.gameName}
				</div>
			);
		} else {
			return(
				<Link 
			    	className="row"
			    	to={linkPath}
		    	>
			    	{this.props.gameName}
			    </Link>
			);
		}
	}

    render() {
    	
		return this.LinkOrDiv();
    }
}
