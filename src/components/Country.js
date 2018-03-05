'use strict';

import React from 'react';
import countries from '../data/countries';


var countryData = [];

function CountryInfo(name, iso2, flagPath) {
      this.name = name;
      this.iso2 = iso2;
      this.flagPath = flagPath;
  }


for (var key in countries[0]){
  if (countries[0].hasOwnProperty(key)) {
    var x = new CountryInfo;
    x.name = countries[0][key].name;
    x.iso2 = key;
    x.flagPath = "/img/flags/"+key+".png";
    countryData.push(x);
    }
};


export default countryData;