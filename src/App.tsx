import * as React from 'react';

import { LocaleProvider, Button } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import WidgetJSX from './WidgetJSX';
import WidgetTSX from './WidgetTSX';
import './App.css';

class App extends React.Component {
	render() {
		return (
			<LocaleProvider locale={enUS}>
				<div className="App">
					<Button type="primary">Button</Button>
					<WidgetTSX/>
					<WidgetJSX/>
				</div>
			</LocaleProvider>
		);
	}
}

export default App;