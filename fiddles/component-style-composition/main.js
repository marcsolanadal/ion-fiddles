const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose } = Redux
const { Provider, connect } = ReactRedux
const { Router, Route, browserHistory, IndexRoute, Link } = ReactRouter
const { Field, reduxForm } = ReduxForm
const formReducer = ReduxForm.reducer

const addStyle = (style) => (element) => {
  return (props) => React.createElement(
    element,
    { ...props, style },
    props.children
  )
}

const sithStyle = addStyle({
  backgroundColor: 'tomato',
  color: 'black',
  padding: '10px 20px',
  margin: '10px',
  border: '2px solid black',
  borderRadius: '5px',
  width: '150px'
})

const jediStyle = addStyle({
  backgroundColor: 'lightblue',
  color: 'white',
  padding: '10px 20px',
  margin: '10px',
  border: '2px solid blue',
  borderRadius: '5px',
  width: '150px'
})

const handleClick = () => console.log('General click')
const handleSithClick = () => console.log('I\'m a sith')
const handleJediClick = () => console.log('I\'m a jedi')

const Button = (props) => (
  <div style={props.style} onClick={props.handleClick}>{props.children}</div>
)

// TODO: Handle clicks locally in the button
const SithButton = sithStyle(Button)
const JediButton = jediStyle(Button)

//const OtherButton = (props) => <SithButton onClick={handleSithClick}>{props.children}</SithButton>

class App extends Component {
  render() {
    return (
      <div>
        <h1>Force Users</h1>
        <SithButton>Darth Sidious</SithButton>
        <SithButton>Darth Moul</SithButton>
        <JediButton>Obi-wan kenobi</JediButton>
        <JediButton>Master Yoda</JediButton>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
