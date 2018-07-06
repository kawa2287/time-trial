'use strict';

import React from "react";
import Icons from "../../../static/img/divisions/icons.svg"; // Path to your icons.svg


export default class Icon extends React.Component{
	render(){
		
		const Icon = ({ name, color, size }) => (
			<svg className={`icon icon-${name}`} fill={color} width={size} height={size}>
				<use xlinkHref={`${Icons}#icon-${name}`} />
			</svg>
		);

		return (
			{Icon}
		);
	}
}


Icon.propTypes = {
	name: React.PropTypes.string.isRequired,
	color: React.PropTypes.string,
	size: React.PropTypes.number
};