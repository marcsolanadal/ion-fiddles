const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose } = Redux
const { Provider, connect } = ReactRedux
const { Router, Route, browserHistory, IndexRoute, Link } = ReactRouter
const { Field, reduxForm } = ReduxForm
const formReducer = ReduxForm.reducer

class App extends Component {
  render() {
    return <div>May the force be with you</div>
  }
}

const addStyle = (styles, component) => {
  return React.cloneElement(component, {
    styles: styles.join(';')
  })
}

const StyledApp = addStyle([
  'backgroundColor: red',
  'color: green'
], <App />)

console.log(StyledApp)

ReactDOM.render(
  <StyledApp />,
  document.getElementById('root')
)
