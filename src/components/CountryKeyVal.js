'use strict';

import countries from '../data/countries';


var countryKeyVal = {};

function CountryInfo(name, iso2, flagPathSM, flagPathMD, flagPathLG, flagPathXL, flagPathSVG) {
      this.name = name;
      this.iso2 = iso2;
      this.flagPathSVG = flagPathSVG;
  }


for (var key in countries[0]){
  if (countries[0].hasOwnProperty(key)) {
    var x = new CountryInfo;
    x.name = countries[0][key].name;
    x.iso2 = key;
    x.flagPathSVG = "/img/flagsSVG/"+key+".svg";
    countryKeyVal[countries[0][key].name] = x;
    }
}


export default countryKeyVal;