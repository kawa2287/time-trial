'use strict';

import React from 'react';
import Table from	'./FrontPageTable';
import AddTeamPopUp from './AddTeamPopUp';

export default class IndexPage extends React.Component {
  constructor(props){
    super(props);
    this.props.players = {"Name": "Country"};
  }
  
  
  
  checkPlayers(){
    for (var k in this.props.players){
      console.log(this.props.players[k]);
    }
  }
  
  render() {
  	var nPlayers = 8;

    return (
      <div className="home">
      
        <div className="buttons-selector">
          <AddTeamPopUp players={this.props.players}/>
        </div>
        
        <div className="buttons-selector">
          <Table nRows={nPlayers}></Table>
        </div>
        
        <button onClick={this.checkPlayers.bind(this)}>Check PLayers</button>
        
      </div>
    );
  }
}