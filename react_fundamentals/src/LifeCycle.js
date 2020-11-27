import React from 'react';

class LifeCycle extends React.Component {
	PREFIX = this.constructor.name;
	log(func, line = '') {
		console.log(this.PREFIX + '::' + func + '|' + line);
	}

	/***
	 * Class Properties
	 *
	 * CustomButton.defaultProps = {
	 *    color: 'blue'
	 * };
	 * If props.color is not provided, it will be set by default to 'blue':
	 *
	 * render() {
	 *    return <CustomButton /> ; // props.color will be set to blue
	 * }
	 * If props.color is set to null, it will remain null:
	 *
	 * render() {
	 *    return <CustomButton color={null} /> ; // props.color will remain null
	 * }
	 */

	static defaultProps = {
		color: 'blue',
	};

	constructor(props) {
		/* 
		 The constructor for a React component is called before it is mounted.
		 When implementing the constructor for a React.Component subclass, 
		 you should call super(props) before any other statement. 
		 
		 Otherwise, this.props will be undefined in the constructor, which can lead to bugs.
		*/

		super(props);

		this.log('constructor');

		this.state = { hasError: false };

		// You should not call setState() in the constructor().
		this.state = { counter: 0 };
		this.handleClick = this.handleClick.bind(this);

		this.listRef = React.createRef();
	}

	static getDerivedStateFromProps(props, state) {
		console.log('getDerivedStateFromProps');
	}
	static getDerivedStateFromError(error) {
		console.log('getDerivedStateFromError');

		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		/*
		 getSnapshotBeforeUpdate() is invoked right before the most recently rendered output is committed to e.g. the DOM.
		 It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed.
		 
		 Any value returned by this lifecycle will be passed as a parameter to componentDidUpdate().
		*/
		this.log('getSnapshotBeforeUpdate');

		// Are we adding new items to the list?
		// Capture the scroll position so we can adjust scroll later.
		if (prevProps.list.length < this.props.list.length) {
			const list = this.listRef.current;
			return list.scrollHeight - list.scrollTop;
		}
		return null;
	}

	componentDidMount() {
		this.log('componentDidMount');
	}

	componentDidCatch(error, info) {
		this.log('componentDidCatch');
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.log('componentDidUpdate');

		// Typical usage (don't forget to compare props):
		// if (this.props.userID !== prevProps.userID) {
		//	this.fetchData(this.props.userID);
		// }

		// If we have a snapshot value, we've just added new items.
		// Adjust scroll so these new items don't push the old ones out of view.
		// (snapshot here is the value returned from getSnapshotBeforeUpdate)
		if (snapshot !== null) {
			const list = this.listRef.current;
			list.scrollTop = list.scrollHeight - snapshot;
		}
	}

	componentWillUnmount() {
		// @ERROR: These methods are considered legacy and you should avoid them in new code:
		this.log('componentWillUnmount');
	}

	componentWillUpdate() {
		// @ERROR: These methods are considered legacy and you should avoid them in new code:
		this.log('componentWillUpdate');
	}

	/**/
	componentWillReceiveProps() {
		// @ERROR: These methods are considered legacy and you should avoid them in new code:
		this.log('componentWillReceiveProps');
	}

	shouldComponentUpdate(nextProps, nextState) {
		this.log(
			'shouldComponentUpdate',
			`nextProps=${nextProps}, , nextState=${nextState}`
		);

		return true;
	}

	handleClick(event) {
		// Sampe for setState: (state, props) => stateChange
		this.setState((state, props) => {
			return { counter: state.counter + props.step };
		});
	}

	render() {
		this.log('render');

		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}

		return (
			<>
				<div ref={this.listRef}>{/* ...contents... */}</div>
				<div>{this.props.children}</div>
			</>
		);
	}
}

export default LifeCycle;

/*Mounting
These methods are called in the following order when an instance of a component is being created and inserted into the DOM:

constructor()
static getDerivedStateFromProps()
render()
componentDidMount()
Note:

These methods are considered legacy and you should avoid them in new code:

UNSAFE_componentWillMount()
Updating
An update can be caused by changes to props or state. These methods are called in the following order when a component is being re-rendered:

static getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()
Note:

These methods are considered legacy and you should avoid them in new code:

UNSAFE_componentWillUpdate()
UNSAFE_componentWillReceiveProps()
Unmounting
This method is called when a component is being removed from the DOM:

componentWillUnmount()
Error Handling
These methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.

static getDerivedStateFromError()
componentDidCatch()
Other APIs
Each component also provides some other APIs:

setState()
forceUpdate()
Class Properties
defaultProps
displayName
Instance Properties
props
state
*/
