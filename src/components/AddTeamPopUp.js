import React from 'react';
import SkyLight from 'react-skylight';
import TeamInputForm from './TeamInputForm';
import SubmitButton from './SubmitButton';

class PopUp extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    var myBigGreenDialog = {
      backgroundColor: '#00897B',
      color: '#ffffff',
      width: '70%',
      height: '400px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };




    return (
      <div className="athlete-preview">

        <section>
          <img src="./img/buttons/addUser.png" onClick={() => this.customDialog.show()}></img>
        </section>

        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.customDialog = ref} >
          <TeamInputForm/>
          <SubmitButton text="Submit"/>
        </SkyLight>
      </div>
    )
  }
}

PopUp.displayName = 'ExampleCustom';

export default PopUp;