import React from 'react';
import SkyLight from 'react-skylight';
import countryData from './Country';
import TeamInputForm from './TeamInputForm';

class PopUp extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    var myBigGreenDialog = {
      backgroundColor: '#00897B',
      color: '#ffffff',
      width: '70%',
      height: '600px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };

    var countryNames = [];

    for (var x in countryData){
      countryNames.push(countryData[x].name);
    }


    return (
      <div className="athlete-preview">

        <section>
          <img src="./img/buttons/addUser.png" onClick={() => this.customDialog.show()}></img>
        </section>

        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.customDialog = ref} title="A Custom Modal">

          <label>
            Choose a Country:
            <input list="countryList" name="myCountry" />  
          </label>   

          <datalist id="countryList">
              {countryNames.map((name, i) => <option data-id={i} value={name}/>)}
          </datalist>

          <TeamInputForm country={"Canada"}/>

        </SkyLight>
      </div>
    )
  }
}

PopUp.displayName = 'ExampleCustom';

export default PopUp;