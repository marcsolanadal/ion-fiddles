const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose } = Redux
const { Provider, connect } = ReactRedux
const { Router, Route, browserHistory, IndexRoute, Link } = ReactRouter
const { Field, reduxForm } = ReduxForm
const formReducer = ReduxForm.reducer

class Document extends Component {
  handleClick = () => {
    if (this.props.onClick) {
        this.props.onClick(this.props.url)
    }
  }
  render() {
    const { url, onClick, name } = this.props
    return <li className='button' onClick={this.handleClick}>{name}</li>
  }
}

class Document2 extends Component {
  render() {
    const { name, url, onClick } = this.props
    return <li className='button2' data-url={url} onClick={onClick}>{name}</li>
  }
}

class App extends Component {

  openUrl = (event) => {
    console.log(event)
  }

  openUrl2 = (event) => {
    const result = event.target.getAttribute('data-url')
    console.log(result)
  }

  render() {
    const documents = [
      { name: 'gft', url: 'https://gft.com' },
      { name: 'db', url: 'https://db.com' },
      { name: 'google', url: 'https://google.com' }
    ]

    return (
      <div>

        <div className='firstSolution'>
          <h2>This urls doesn't open a window</h2>
          <ul>
            {
              documents.map((doc, i) => {
                return <Document key={i} url={doc.url} name={doc.name} />
              })
            }
          </ul>

          <h2>This urls open a window</h2>
          <ul>
            {
              documents.map((doc, i) => {
                return <Document key={i} url={doc.url} name={doc.name} onClick={this.openUrl} />
              })
            }
          </ul>
        </div>

        <div className='secondSolution'>
          <h2>This urls doesn't open a window</h2>
          <ul>
            {
              documents.map((doc, i) => {
                return <Document2 key={i} url={doc.url} name={doc.name} />
              })
            }
          </ul>

          <h2>This urls open a window</h2>
          <ul>
            {
              documents.map((doc, i) => {
                return <Document2 key={i} url={doc.url} name={doc.name} onClick={this.openUrl2} />
              })
            }
          </ul>
        </div>

      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
