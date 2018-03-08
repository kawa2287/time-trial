'use strict';

import React from 'react';
import Table from	'./FrontPageTable';
import AddTeamPopUp from './AddTeamPopUp';

export default class IndexPage extends React.Component {
  constructor(props){
    super(props);
    this.props.players = {};
    this.state = {
    	nRows : 0,
    	players : {}
    }
  }
  
  checkPlayers(){
  	this.setState({
  		nRows : this.state.nRows +1
  	});
	console.log(this.state.nRows);
  }
  
  render() {

    return (
      <div className="home">
      
        <div className="buttons-selector">
          <AddTeamPopUp players={this.props.players}/>
        </div>
        
        <div className="buttons-selector">
		      <Table 
		      nRows={this.state.nRows}
		      players={this.props.players}
		      clickHandle={this.checkPlayers.bind(this)}
		      />
        </div>        
      </div>
    );
  }
}