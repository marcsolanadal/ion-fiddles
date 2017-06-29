const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose } = Redux
const { Provider, connect } = ReactRedux
const { Router, Route, browserHistory, IndexRoute, Link } = ReactRouter
const { Field, reduxForm } = ReduxForm
const formReducer = ReduxForm.reducer

class CustomLink extends Component {
  render() {
    return <a href={this.props.to}>{this.props.text}</a>
  }
}

const str = 'Hello %1 this %2 %3 and is so %4!!!'
const arr = [
  'Frodo',
  <CustomLink to='/rocks' text='link' />,
  'Rocks!',
  <CustomLink to='/simple' text='simple'/>
]

const format = (str, arr) => {
  return str
    .split(/\%[0-9]+/)
    .filter(i => i !== '')
    .map((item, i) => [item, arr[i]])
}

class App extends Component {
  render() {
    return <div>{format(str, arr)}</div>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
