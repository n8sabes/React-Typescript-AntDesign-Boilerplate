import * as React from 'react';
import {DatePicker} from "antd";

export default class WidgetJSX extends React.Component {
	render() {
		return (
			<div>
				JSX Component
				<p>Start Date: <DatePicker /></p>
				<p>End Date: <DatePicker /></p>
			</div>
		);
	}
}
