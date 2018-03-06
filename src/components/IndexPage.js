'use strict';

import React from 'react';
import AthletePreview from './AthletePreview';
import athletes from '../data/athletes';
import Flag from './Flag';
import countries from '../data/countries';
import Table from	'./FrontPageTable';
import PopUp from './AddTeamPopUp';




export default class IndexPage extends React.Component {
  
  clickDamnit(){
    console.log("clicked");
  }
  
  render() {
  	var nPlayers = 8;

    return (
      <div className="home">

        <div className="athletes-selector">
          {athletes.map(buttonData => <AthletePreview key={buttonData.id} {...buttonData} />)}
        </div>

        <div className="athletes-selector">
        	<Table nRows={nPlayers}></Table>
        </div>
        
        <PopUp data={countries}></PopUp>
        
      </div>
    );
  }
}