'use strict';

import countries from '../data/countries';


var countryKeyVal = {};

function CountryInfo(name, iso2, flagPath, flagPathMD, flagPathLG, flagPathXL) {
      this.name = name;
      this.iso2 = iso2;
      this.flagPath = flagPath;
      this.flagPathLg = flagPathMD;
      this.flagPathLg = flagPathLG;
      this.flagPathLg = flagPathXL;
  }


for (var key in countries[0]){
  if (countries[0].hasOwnProperty(key)) {
    var x = new CountryInfo;
    x.name = countries[0][key].name;
    x.iso2 = key;
    x.flagPath = "/img/flags/"+key+".png";
    x.flagPathMD = "/img/flagsMD/"+key+".png";
    x.flagPathLG = "/img/flagsLG/"+key+".png";
    x.flagPathXL = "/img/flagsXL/"+key+".png";
    countryKeyVal[countries[0][key].name] = x;
    }
}


export default countryKeyVal;