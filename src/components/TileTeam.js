'use strict';

import React from 'react';

export default class TileTeam extends React.Component {
	render(){
		return(
			<div className="team" data-team="somethingForNow">
                <span class="team-seed">{this.props.seed}</span>
                <span class="team-name">{this.props.name}</span>
                <span class="team-score">{this.props.time}</span>
            </div>
		);
	}
}
