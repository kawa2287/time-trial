'use strict';

import React from 'react';
import AthletePreview from './AthletePreview';
import athletes from '../data/athletes';
import Flag from './Flag';
import countries from '../data/countries';
import Table from	'./FrontPageTable';


export default class IndexPage extends React.Component {
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
        
      </div>
    );
  }
}