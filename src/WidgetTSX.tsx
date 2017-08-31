import * as React from 'react';
import { DatePicker } from 'antd';

export default class WidgetTSX extends React.Component {
  render() {
    return (
      <div>
        TSX Component
        <p>Start Date: <DatePicker /></p>
        <p>End Date: <DatePicker /></p>
      </div>
    );
  }
}
