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
      submited: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleClick(e) {
    if (this.state.focused) {
      this.setState({ focused: false, submitted: true })
      console.log('close and submit')
    } else {
      //this.nameInput.focus()
      this.setState({ focused: true, submitted: false })
      console.log('open and focus')
    }
  }

  handleBlur() {
    if (!this.state.submitted) {
      this.setState({ focused: false })
      console.log('onblur')
    }
  }

  handleFocus() {
    this.setState({
      focused: true,
      submitted: false
    })
    console.log('onfocus')
  }

  render() {
    const inputClass = (this.state.focused) ? 'input__opened' : 'input__closed'
    return (
      <div className='container'>
        <input id='searchField' className={inputClass}
          ref={(input) => this.nameInput = input}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={inputClass}
        />
        <div id='button' className='button' onMouseDown={(e) => this.handleClick(e)}>
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
