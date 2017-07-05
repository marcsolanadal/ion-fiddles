const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose } = Redux
const { Provider, connect } = ReactRedux
const { Router, Route, browserHistory, IndexRoute, Link } = ReactRouter
const { Field, reduxForm } = ReduxForm
const formReducer = ReduxForm.reducer

const addStyle = (style) => (element) => (elementProps) => {
  return (props) => React.createElement(
    element,
    { ...elementProps, ...props, style },
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

const handleSithClick = () => console.log('I\'m a sith')
const handleJediClick = () => console.log('I\'m a jedi')
const handleNoForceClick = () => console.log('I don\'t feel the force...')

const Button = (props) => (
  <div style={props.style} onClick={props.onClick}>{props.children}</div>
)

const SithButton = sithStyle(Button)({ onClick: handleSithClick })
const GrayJediButton = sithStyle(Button)({ onClick: handleJediClick })
const JediButton = jediStyle(Button)({ onClick: handleJediClick })
const NoForceUser = jediStyle(Button)()

class App extends Component {
  render() {
    return (
      <div>
        <h1>Force Users</h1>
        <SithButton>Darth Sidious</SithButton>
        <GrayJediButton>Kuai'gon gin</GrayJediButton>
        <JediButton>Obi-wan kenobi</JediButton>
        <JediButton onClick={handleSithClick}>Anakin</JediButton>
        <NoForceUser onClick={handleNoForceClick}>Han Solo</NoForceUser>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
