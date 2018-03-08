'use strict';

import React from 'react';
import countries from '../data/countries';


var countryData = [];

function CountryInfo(name, iso2, flagPathSM, flagPathMD, flagPathLG, flagPathXL) {
      this.name = name;
      this.iso2 = iso2;
      this.flagPathSM = flagPathSM;
      this.flagPathMD = flagPathMD;
      this.flagPathLG = flagPathLG;
      this.flagPathXL = flagPathXL;
  }


for (var key in countries[0]){
  if (countries[0].hasOwnProperty(key)) {
    var x = new CountryInfo;
    x.name = countries[0][key].name;
    x.iso2 = key;
    x.flagPathSM = "/img/flagsSM/"+key+".png";
    x.flagPathMD = "/img/flagsMD/"+key+".png";
    x.flagPathLG = "/img/flagsLG/"+key+".png";
    x.flagPathXL = "/img/flagsXL/"+key+".png";
    countryData.push(x);
    }
};


export default countryData;