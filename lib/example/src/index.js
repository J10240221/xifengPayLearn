import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component{
	render() {
		return (<div>
			Hello, React!
		</div>)
	}
}

let ndRoot = document.getElementById('root');

ReactDOM.render(<App />, ndRoot);