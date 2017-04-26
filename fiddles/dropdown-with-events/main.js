const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose } = Redux
const { Provider, connect } = ReactRedux
const { Router, Route, browserHistory, IndexRoute, Link } = ReactRouter
const { Field, reduxForm } = ReduxForm
const formReducer = ReduxForm.reducer

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
      avoidBlur: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleClick(e) {
    if (this.state.focused) {
      this.setState({ focused: false, avoidBlur: true })
      console.log('close and submit')
    } else {
      this.setState({ focused: true, avoidBlur: true })
      setTimeout(() => { this.textInput.focus() }, 0)
    }
  }

  handleBlur() {
    if (!this.state.avoidBlur) {
      this.setState({ focused: false })
      console.log('onblur')
    }
  }

  handleFocus() {
    this.setState({ focused: true, avoidBlur: false })
    console.log('onfocus')
  }

  render() {
    const inputClass = (this.state.focused) ? 'input__opened' : 'input__closed'
    return (
      <div className='container'>
        <input className={inputClass}
          ref={(input) => { this.textInput = input; }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={inputClass}
        />
        <div className='button' onMouseDown={(e) => this.handleClick(e)}>
          Click Me!
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
