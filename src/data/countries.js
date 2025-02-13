"use strict";

const countries = [
  {
    "AF": {
      "name": "Afghanistan",
      "iso2": "AF",
      "code": "93"
    },
    "AL": {
      "name": "Albania",
      "iso2": "AL",
      "code": "355"
    },
    "DZ": {
      "name": "Algeria",
      "iso2": "DZ",
      "code": "213"
    },
    "AS": {
      "name": "American Samoa",
      "iso2": "AS",
      "code": "1 684"
    },
    "AD": {
      "name": "Andorra",
      "iso2": "AD",
      "code": "376"
    },
    "AO": {
      "name": "Angola",
      "iso2": "AO",
      "code": "244"
    },
    "AI": {
      "name": "Anguilla",
      "iso2": "AI",
      "code": "1 264"
    },
    "AG": {
      "name": "Antigua And Barbuda",
      "iso2": "AG",
      "code": "1 268"
    },
    "AR": {
      "name": "Argentina",
      "iso2": "AR",
      "code": "54"
    },
    "AM": {
      "name": "Armenia",
      "iso2": "AM",
      "code": "374"
    },
    "AW": {
      "name": "Aruba",
      "iso2": "AW",
      "code": "297"
    },
    "AU": {
      "name": "Australia",
      "iso2": "AU",
      "code": "61"
    },
    "AT": {
      "name": "Austria",
      "iso2": "AT",
      "code": "43"
    },
    "AZ": {
      "name": "Azerbaijan",
      "iso2": "AZ",
      "code": "994"
    },
    "BS": {
      "name": "Bahamas",
      "iso2": "BS",
      "code": "1 242"
    },
    "BH": {
      "name": "Bahrain",
      "iso2": "BH",
      "code": "973"
    },
    "BD": {
      "name": "Bangladesh",
      "iso2": "BD",
      "code": "880"
    },
    "BB": {
      "name": "Barbados",
      "iso2": "BB",
      "code": "1 246"
    },
    "BY": {
      "name": "Belarus",
      "iso2": "BY",
      "code": "375"
    },
    "BE": {
      "name": "Belgium",
      "iso2": "BE",
      "code": "32"
    },
    "BZ": {
      "name": "Belize",
      "iso2": "BZ",
      "code": "501"
    },
    "BJ": {
      "name": "Benin",
      "iso2": "BJ",
      "code": "229"
    },
    "BM": {
      "name": "Bermuda",
      "iso2": "BM",
      "code": "1 441"
    },
    "BT": {
      "name": "Bhutan",
      "iso2": "BT",
      "code": "975"
    },
    "BO": {
      "name": "Bolivia",
      "iso2": "BO",
      "code": "591"
    },
    "BQ": {
      "name": "Bonaire",
      "iso2": "BQ",
      "code": "599"
    },
    "BA": {
      "name": "Bosnia & Herzegovina",
      "iso2": "BA",
      "code": "387"
    },
    "BW": {
      "name": "Botswana",
      "iso2": "BW",
      "code": "267"
    },
    "BR": {
      "name": "Brazil",
      "iso2": "BR",
      "code": "55"
    },
    "IO": {
      "name": "British Indian Ocean Territory",
      "iso2": "IO",
      "code": "246"
    },
    "BN": {
      "name": "Brunei Darussalam",
      "iso2": "BN",
      "code": "673"
    },
    "BG": {
      "name": "Bulgaria",
      "iso2": "BG",
      "code": "359"
    },
    "BF": {
      "name": "Burkina Faso",
      "iso2": "BF",
      "code": "226"
    },
    "BI": {
      "name": "Burundi",
      "iso2": "BI",
      "code": "257"
    },
    "KH": {
      "name": "Cambodia",
      "iso2": "KH",
      "code": "855"
    },
    "CM": {
      "name": "Cameroon",
      "iso2": "CM",
      "code": "237"
    },
    "CA": {
      "name": "Canada",
      "iso2": "CA",
      "code": "1"
    },
    "CT": {
      "name": "Scotland",
      "iso2": "CT",
      "code": "1"
    },
    "IC": {
      "name": "Canary Islands",
      "iso2": "IC",
      "code": ""
    },
    "CV": {
      "name": "Cape Verde",
      "iso2": "CV",
      "code": "238"
    },
    "KY": {
      "name": "Cayman Islands",
      "iso2": "KY",
      "code": "1 345"
    },
    "CF": {
      "name": "Central African Republic",
      "iso2": "CF",
      "code": "236"
    },
    "EA": {
      "name": "Ceuta",
      "iso2": "EA",
      "code": ""
    },
    "TD": {
      "name": "Chad",
      "iso2": "TD",
      "code": "235"
    },
    "CL": {
      "name": "Chile",
      "iso2": "CL",
      "code": "56"
    },
    "CN": {
      "name": "China",
      "iso2": "CN",
      "code": "86"
    },
    "CX": {
      "name": "Christmas Island",
      "iso2": "CX",
      "code": "61"
    },
    "CC": {
      "name": "Cocos Islands",
      "iso2": "CC",
      "code": "61"
    },
    "CO": {
      "name": "Colombia",
      "iso2": "CO",
      "code": "57"
    },
    "KM": {
      "name": "Comoros",
      "iso2": "KM",
      "code": "269"
    },
    "CK": {
      "name": "Cook Islands",
      "iso2": "CK",
      "code": "682"
    },
    "CR": {
      "name": "Costa Rica",
      "iso2": "CR",
      "code": "506"
    },
    "CI": {
      "name": "Cote d'Ivoire",
      "iso2": "CI",
      "code": "225"
    },
    "HR": {
      "name": "Croatia",
      "iso2": "HR",
      "code": "385"
    },
    "CU": {
      "name": "Cuba",
      "iso2": "CU",
      "code": "53"
    },
    "CW": {
      "name": "Curacao",
      "iso2": "CW",
      "code": "599"
    },
    "CZ": {
      "name": "Czech Republic",
      "iso2": "CZ",
      "code": "420"
    },
    "CD": {
      "name": "Democratic Republic Of Congo",
      "iso2": "CD",
      "code": "243"
    },
    "DK": {
      "name": "Denmark",
      "iso2": "DK",
      "code": "45"
    },
    "DJ": {
      "name": "Djibouti",
      "iso2": "DJ",
      "code": "253"
    },
    "DM": {
      "name": "Dominica",
      "iso2": "DM",
      "code": "1 767"
    },
    "DO": {
      "name": "Dominican Republic",
      "iso2": "DO",
      "code": "1 809"
    },
    "TL": {
      "name": "East Timor",
      "iso2": "TL",
      "code": "670"
    },
    "EC": {
      "name": "Ecuador",
      "iso2": "EC",
      "code": "593"
    },
    "EG": {
      "name": "Egypt",
      "iso2": "EG",
      "code": "20"
    },
    "SV": {
      "name": "El Salvador",
      "iso2": "SV",
      "code": "503"
    },
    "GQ": {
      "name": "Equatorial Guinea",
      "iso2": "GQ",
      "code": "240"
    },
    "ER": {
      "name": "Eritrea",
      "iso2": "ER",
      "code": "291"
    },
    "EE": {
      "name": "Estonia",
      "iso2": "EE",
      "code": "372"
    },
    "ET": {
      "name": "Ethiopia",
      "iso2": "ET",
      "code": "251"
    },
    "EU": {
      "name": "European Union",
      "iso2": "EU",
      "code": "388"
    },
    "FK": {
      "name": "Falkland Islands",
      "iso2": "FK",
      "code": "500"
    },
    "FJ": {
      "name": "Fiji",
      "iso2": "FJ",
      "code": "679"
    },
    "FI": {
      "name": "Finland",
      "iso2": "FI",
      "code": "358"
    },
    "FR": {
      "name": "France",
      "iso2": "FR",
      "code": "33"
    },
    "EN": {
      "name": "England",
      "iso2": "EN",
      "code": ""
    },
    "PF": {
      "name": "French Polynesia",
      "iso2": "PF",
      "code": "689"
    },
    "GA": {
      "name": "Gabon",
      "iso2": "GA",
      "code": "44"
    },
    "GM": {
      "name": "Gambia",
      "iso2": "GM",
      "code": "220"
    },
    "GE": {
      "name": "Georgia",
      "iso2": "GE",
      "code": "594"
    },
    "DE": {
      "name": "Germany",
      "iso2": "DE",
      "code": "49"
    },
    "GH": {
      "name": "Ghana",
      "iso2": "GH",
      "code": "233"
    },
    "GI": {
      "name": "Gibraltar",
      "iso2": "GI",
      "code": "350"
    },
    "GR": {
      "name": "Greece",
      "iso2": "GR",
      "code": "30"
    },
    "GL": {
      "name": "Greenland",
      "iso2": "GL",
      "code": "299"
    },
    "GD": {
      "name": "Grenada",
      "iso2": "GD",
      "code": "995"
    },
    "GU": {
      "name": "Guam",
      "iso2": "GU",
      "code": "1 671"
    },
    "GT": {
      "name": "Guatemala",
      "iso2": "GT",
      "code": "502"
    },
    "GG": {
      "name": "Guernsey",
      "iso2": "GG",
      "code": ""
    },
    "GN": {
      "name": "Guinea",
      "iso2": "GN",
      "code": "224"
    },
    "GW": {
      "name": "Guinea-Bissau",
      "iso2": "GW",
      "code": "245"
    },
    "HT": {
      "name": "Haiti",
      "iso2": "HT",
      "code": "509"
    },
    "HN": {
      "name": "Honduras",
      "iso2": "HN",
      "code": "504"
    },
    "HK": {
      "name": "Hong Kong",
      "iso2": "HK",
      "code": "852"
    },
    "HU": {
      "name": "Hungary",
      "iso2": "HU",
      "code": "36"
    },
    "IS": {
      "name": "Iceland",
      "iso2": "IS",
      "code": "354"
    },
    "IN": {
      "name": "India",
      "iso2": "IN",
      "code": "91"
    },
    "ID": {
      "name": "Indonesia",
      "iso2": "ID",
      "code": "62"
    },
    "IR": {
      "name": "Iran",
      "iso2": "IR",
      "code": "98"
    },
    "IQ": {
      "name": "Iraq",
      "iso2": "IQ",
      "code": "964"
    },
    "IE": {
      "name": "Ireland",
      "iso2": "IE",
      "code": "353"
    },
    "IM": {
      "name": "Isle Of Man",
      "iso2": "IM",
      "code": "44"
    },
    "IL": {
      "name": "Israel",
      "iso2": "IL",
      "code": "972"
    },
    "IT": {
      "name": "Italy",
      "iso2": "IT",
      "code": "39"
    },
    "JM": {
      "name": "Jamaica",
      "iso2": "JM",
      "code": "1 876"
    },
    "JP": {
      "name": "Japan",
      "iso2": "JP",
      "code": "81"
    },
    "JE": {
      "name": "Jersey",
      "iso2": "JE",
      "code": "44"
    },
    "JO": {
      "name": "Jordan",
      "iso2": "JO",
      "code": "962"
    },
    "KZ": {
      "name": "Kazakhstan",
      "iso2": "KZ",
      "code": "7"
    },
    "KE": {
      "name": "Kenya",
      "iso2": "KE",
      "code": "254"
    },
    "KI": {
      "name": "Kiribati",
      "iso2": "KI",
      "code": "686"
    },
    "KP": {
      "name": "South Korea",
      "iso2": "KP",
      "code": "850"
    },
    "KR": {
      "name": "North Korea",
      "iso2": "KR",
      "code": "82"
    },
    "KW": {
      "name": "Kuwait",
      "iso2": "KW",
      "code": "965"
    },
    "KG": {
      "name": "Kyrgyzstan",
      "iso2": "KG",
      "code": "996"
    },
    "LA": {
      "name": "Laos",
      "iso2": "LA",
      "code": "856"
    },
    "LV": {
      "name": "Latvia",
      "iso2": "LV",
      "code": "371"
    },
    "LB": {
      "name": "Lebanon",
      "iso2": "LB",
      "code": "961"
    },
    "LS": {
      "name": "Lesotho",
      "iso2": "LS",
      "code": "266"
    },
    "LR": {
      "name": "Liberia",
      "iso2": "LR",
      "code": "231"
    },
    "LY": {
      "name": "Libya",
      "iso2": "LY",
      "code": "218"
    },
    "LI": {
      "name": "Liechtenstein",
      "iso2": "LI",
      "code": "423"
    },
    "LT": {
      "name": "Lithuania",
      "iso2": "LT",
      "code": "370"
    },
    "LU": {
      "name": "Luxembourg",
      "iso2": "LU",
      "code": "352"
    },
    "MO": {
      "name": "Macao",
      "iso2": "MO",
      "code": "853"
    },
    "MK": {
      "name": "Macedonia",
      "iso2": "MK",
      "code": "389"
    },
    "MG": {
      "name": "Madagascar",
      "iso2": "MG",
      "code": "261"
    },
    "MW": {
      "name": "Malawi",
      "iso2": "MW",
      "code": "265"
    },
    "MY": {
      "name": "Malaysia",
      "iso2": "MY",
      "code": "60"
    },
    "MV": {
      "name": "Maldives",
      "iso2": "MV",
      "code": "960"
    },
    "ML": {
      "name": "Mali",
      "iso2": "ML",
      "code": "223"
    },
    "MT": {
      "name": "Malta",
      "iso2": "MT",
      "code": "356"
    },
    "MH": {
      "name": "Marshall Islands",
      "iso2": "MH",
      "code": "692"
    },
    "MQ": {
      "name": "Martinique",
      "iso2": "MQ",
      "code": "596"
    },
    "MR": {
      "name": "Mauritania",
      "iso2": "MR",
      "code": "222"
    },
    "MU": {
      "name": "Mauritius",
      "iso2": "MU",
      "code": "230"
    },
    "MX": {
      "name": "Mexico",
      "iso2": "MX",
      "code": "52"
    },
    "FM": {
      "name": "Micronesia",
      "iso2": "FM",
      "code": "691"
    },
    "MD": {
      "name": "Moldova",
      "iso2": "MD",
      "code": "373"
    },
    "MC": {
      "name": "Monaco",
      "iso2": "MC",
      "code": "377"
    },
    "MN": {
      "name": "Mongolia",
      "iso2": "MN",
      "code": "976"
    },
    "ME": {
      "name": "Montenegro",
      "iso2": "ME",
      "code": "382"
    },
    "MS": {
      "name": "Montserrat",
      "iso2": "MS",
      "code": "1 664"
    },
    "MA": {
      "name": "Morocco",
      "iso2": "MA",
      "code": "212"
    },
    "MZ": {
      "name": "Mozambique",
      "iso2": "MZ",
      "code": "258"
    },
    "MM": {
      "name": "Myanmar",
      "iso2": "MM",
      "code": "95"
    },
    "NA": {
      "name": "Namibia",
      "iso2": "NA",
      "code": "264"
    },
    "NR": {
      "name": "Nauru",
      "iso2": "NR",
      "code": "674"
    },
    "NP": {
      "name": "Nepal",
      "iso2": "NP",
      "code": "977"
    },
    "NL": {
      "name": "Netherlands",
      "iso2": "NL",
      "code": "31"
    },
    "NZ": {
      "name": "New Zealand",
      "iso2": "NZ",
      "code": "64"
    },
    "NI": {
      "name": "Nicaragua",
      "iso2": "NI",
      "code": "505"
    },
    "NE": {
      "name": "Niger",
      "iso2": "NE",
      "code": "227"
    },
    "NG": {
      "name": "Nigeria",
      "iso2": "NG",
      "code": "234"
    },
    "NU": {
      "name": "Niue",
      "iso2": "NU",
      "code": "683"
    },
    "NF": {
      "name": "Norfolk Island",
      "iso2": "NF",
      "code": "672"
    },
    "MP": {
      "name": "Northern Mariana Islands",
      "iso2": "MP",
      "code": "1 670"
    },
    "NO": {
      "name": "Norway",
      "iso2": "NO",
      "code": "47"
    },
    "OM": {
      "name": "Oman",
      "iso2": "OM",
      "code": "968"
    },
    "PK": {
      "name": "Pakistan",
      "iso2": "PK",
      "code": "92"
    },
    "PW": {
      "name": "Palau",
      "iso2": "PW",
      "code": "680"
    },
    "PS": {
      "name": "Palestine",
      "iso2": "PS",
      "code": "970"
    },
    "PA": {
      "name": "Panama",
      "iso2": "PA",
      "code": "507"
    },
    "PG": {
      "name": "Papua New Guinea",
      "iso2": "PG",
      "code": "675"
    },
    "PY": {
      "name": "Paraguay",
      "iso2": "PY",
      "code": "595"
    },
    "PE": {
      "name": "Peru",
      "iso2": "PE",
      "code": "51"
    },
    "PH": {
      "name": "Philippines",
      "iso2": "PH",
      "code": "63"
    },
    "PN": {
      "name": "Pitcairn",
      "iso2": "PN",
      "code": ""
    },
    "PL": {
      "name": "Poland",
      "iso2": "PL",
      "code": "48"
    },
    "PT": {
      "name": "Portugal",
      "iso2": "PT",
      "code": "351"
    },
    "PR": {
      "name": "Puerto Rico",
      "iso2": "PR",
      "code": "1 787"
    },
    "QA": {
      "name": "Qatar",
      "iso2": "QA",
      "code": "974"
    },
    "CG": {
      "name": "Republic Of Congo",
      "iso2": "CG",
      "code": "242"
    },
    "RO": {
      "name": "Romania",
      "iso2": "RO",
      "code": "40"
    },
    "RU": {
      "name": "Russia",
      "iso2": "RU",
      "code": "7"
    },
    "RW": {
      "name": "Rwanda",
      "iso2": "RW",
      "code": "250"
    },
    "KN": {
      "name": "Saint Kitts And Nevis",
      "iso2": "KN",
      "code": "1 869"
    },
    "LC": {
      "name": "Saint Lucia",
      "iso2": "LC",
      "code": "1 758"
    },
    "VC": {
      "name": "Saint Vincent And The Grenadines",
      "iso2": "VC",
      "code": "1 784"
    },
    "WS": {
      "name": "Samoa",
      "iso2": "WS",
      "code": "685"
    },
    "SM": {
      "name": "San Marino",
      "iso2": "SM",
      "code": "378"
    },
    "ST": {
      "name": "Sao Tome And Principe",
      "iso2": "ST",
      "code": "239"
    },
    "SA": {
      "name": "Saudi Arabia",
      "iso2": "SA",
      "code": "966"
    },
    "SN": {
      "name": "Senegal",
      "iso2": "SN",
      "code": "221"
    },
    "RS": {
      "name": "Serbia",
      "iso2": "RS",
      "code": "381"
    },
    "SC": {
      "name": "Seychelles",
      "iso2": "SC",
      "code": "248"
    },
    "SL": {
      "name": "Sierra Leone",
      "iso2": "SL",
      "code": "232"
    },
    "SG": {
      "name": "Singapore",
      "iso2": "SG",
      "code": "65"
    },
    "SX": {
      "name": "Sint Maarten",
      "iso2": "SX",
      "code": "1 721"
    },
    "SK": {
      "name": "Slovakia",
      "iso2": "SK",
      "code": "421"
    },
    "SI": {
      "name": "Slovenia",
      "iso2": "SI",
      "code": "386"
    },
    "SB": {
      "name": "Solomon Islands",
      "iso2": "SB",
      "code": "677"
    },
    "SO": {
      "name": "Somalia",
      "iso2": "SO",
      "code": "252"
    },
    "ZA": {
      "name": "South Africa",
      "iso2": "ZA",
      "code": "27"
    },
    "ES": {
      "name": "Spain",
      "iso2": "ES",
      "code": "34"
    },
    "LK": {
      "name": "Sri Lanka",
      "iso2": "LK",
      "code": "94"
    },
    "SD": {
      "name": "Sudan",
      "iso2": "SD",
      "code": "249"
    },
    "SR": {
      "name": "Suriname",
      "iso2": "SR",
      "code": "597"
    },
    "SZ": {
      "name": "Swaziland",
      "iso2": "SZ",
      "code": "268"
    },
    "SE": {
      "name": "Sweden",
      "iso2": "SE",
      "code": "46"
    },
    "CH": {
      "name": "Switzerland",
      "iso2": "CH",
      "code": "41"
    },
    "SY": {
      "name": "Syria",
      "iso2": "SY",
      "code": "963"
    },
    "TW": {
      "name": "Taiwan",
      "iso2": "TW",
      "code": "886"
    },
    "TJ": {
      "name": "Tajikistan",
      "iso2": "TJ",
      "code": "992"
    },
    "TZ": {
      "name": "Tanzania, United Republic Of",
      "iso2": "TZ",
      "code": "255"
    },
    "TH": {
      "name": "Thailand",
      "iso2": "TH",
      "code": "66"
    },
    "TG": {
      "name": "Togo",
      "iso2": "TG",
      "code": "228"
    },
    "TK": {
      "name": "Tokelau",
      "iso2": "TK",
      "code": "690"
    },
    "TO": {
      "name": "Tonga",
      "iso2": "TO",
      "code": "676"
    },
    "TT": {
      "name": "Trinidad And Tobago",
      "iso2": "TT",
      "code": "1 868"
    },
    "TN": {
      "name": "Tunisia",
      "iso2": "TN",
      "code": "216"
    },
    "TR": {
      "name": "Turkey",
      "iso2": "TR",
      "code": "90"
    },
    "TM": {
      "name": "Turkmenistan",
      "iso2": "TM",
      "code": "993"
    },
    "TC": {
      "name": "Turks And Caicos Islands",
      "iso2": "TC",
      "code": "1 649"
    },
    "TV": {
      "name": "Tuvalu",
      "iso2": "TV",
      "code": "688"
    },
    "UG": {
      "name": "Uganda",
      "iso2": "UG",
      "code": "256"
    },
    "UA": {
      "name": "Ukraine",
      "iso2": "UA",
      "code": "380"
    },
    "AE": {
      "name": "United Arab Emirates",
      "iso2": "AE",
      "code": "971"
    },
    "UK": {
      "name": "United Kingdom",
      "iso2": "UK",
      "code": ""
    },
    "US": {
      "name": "United States",
      "iso2": "US",
      "code": "1"
    },
    "UN": {
      "name": "United Nations",
      "iso2": "UN",
      "code": ""
    },
    "UY": {
      "name": "Uruguay",
      "iso2": "UY",
      "code": "598"
    },
    "UZ": {
      "name": "Uzbekistan",
      "iso2": "UZ",
      "code": "998"
    },
    "VU": {
      "name": "Vanuatu",
      "iso2": "VU",
      "code": "678"
    },
    "VA": {
      "name": "Vatican City State",
      "iso2": "VA",
      "code": "379"
    },
    "VE": {
      "name": "Venezuela",
      "iso2": "VE",
      "code": "58"
    },
    "VN": {
      "name": "Vietnam",
      "iso2": "VN",
      "code": "84"
    },
    "VG": {
      "name": "Virgin Islands (British)",
      "iso2": "VG",
      "code": "1 284"
    },
    "VI": {
      "name": "Virgin Islands (US)",
      "iso2": "VI",
      "code": "1 340"
    },
    "WA": {
      "name": "Wales",
      "iso2": "WA",
      "code": "681"
    },
    "YE": {
      "name": "Yemen",
      "iso2": "YE",
      "code": "967"
    },
    "ZM": {
      "name": "Zambia",
      "iso2": "ZM",
      "code": "260"
    },
    "XX": {
      "name": "Select Country",
      "iso2": "XX",
      "code": "000"
    },
    "ZW": {
      "name": "Zimbabwe",
      "iso2": "ZW",
      "code": "263"
    }
  }
];

export default countries;