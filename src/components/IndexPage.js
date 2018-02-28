'use strict';

import React from 'react';
import AthletePreview from './AthletePreview';
import athletes from '../data/athletes';



export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="athletes-selector">
          {athletes.map(buttonData => <AthletePreview key={buttonData.id} {...buttonData} />)}
        </div>
        <div className="athletes-selector">
          <table id="simple-board">
            <tbody>
              <tr id="row0">
                <td id="cell0-0">cell-1-1</td>
                <td id="cell0-1">cell-1-2</td>
                <td id="cell0-2">cell-1-3</td>
              </tr>
              <tr id="row1">
                <td id="cell1-0">cell-2-1</td>
                <td id="cell1-1">cell-2-2</td>
                <td id="cell1-2">cell-2-3</td>
              </tr>
              <tr id="row2">
                <td id="cell2-0">cell-3-1</td>
                <td id="cell2-1">cell-3-2</td>
                <td id="cell2-2">cell-3-3</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    );
  }
}