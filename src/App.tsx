import * as React from 'react';

import { LocaleProvider } from 'antd';
import en_US from 'antd/lib/locale-provider/en_US';

import WidgetJSX from './WidgetJSX';
import WidgetTSX from './WidgetTSX';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <LocaleProvider locale={en_US}>
        <div className="App">
          <WidgetTSX/>
          <br/>
          <WidgetJSX/>
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
