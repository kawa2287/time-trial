import React from 'react';

export default class Button extends React.Component {
	render(){

		return(
			<button type="button" className={"btn" + this.props.className} />
		);
	}
}
  
