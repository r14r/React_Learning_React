import logo from './img/logo.svg';
import LifeCycle from './LifeCycle';

import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>

			<LifeCycle />
		</div>
	);
}

export default App;
