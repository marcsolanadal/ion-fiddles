const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose } = Redux
const { Provider, connect } = ReactRedux
const { Router, Route, browserHistory, IndexRoute, Link } = ReactRouter
const { Field, reduxForm } = ReduxForm
const formReducer = ReduxForm.reducer

class App extends Component {
  constructor(props) {
    super(props)
    const state = {
      openInput: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }
  handleClick() {
    this.setState({ openInput: true })
    console.log('handle click')
  }
  handleBlur() {
    this.setState({ openInput: false })
    console.log('handle blur')
  }
  render() {
    return (
      <div className='container'>
        <input className='input' onBlur={this.handleBlur} />
        <div className='button' onClick={(e) => this.handleClick(e)}>Click Me!</div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
