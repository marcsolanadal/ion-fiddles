const { Component, PropTypes } = React
const { createStore, applyMiddleware, combineReducers, compose } = Redux
const { Provider, connect } = ReactRedux

const { string, func } = PropTypes
const { t } = i18next

i18next
  .use(i18nextXHRBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    ns: ['jedi', 'sith'],
    defaultNS: 'jedi',
    initImmediate: true,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      crossDomain: false
    },
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  }, () => {
    i18next.t('i18n', { lng: 'en' })
  })

class App extends Component {
  static propTypes = {
    name: string.isRequired,
    t: func.isRequired
  }
  handleChangeLang = (event) => {
    i18next.changeLanguage(event.target.dataset.lang)
    this.forceUpdate()
  }
  render() {
    const { name, t } = this.props
    return (
      <div>
        <nav className='nav'>
          <span onClick={this.handleChangeLang} data-lang='en'>EN</span>
          <span onClick={this.handleChangeLang} data-lang='cat'>CAT</span>
        </nav>
        <div className='info'>
          <div>{i18next.t('phrase')}</div>
          <div>{i18next.t('greeting', { name: name })}</div>
        </div>
      </div>
    )
  }
}

// FIXME: Passing t via props is not working :/
ReactDOM.render(
  <App name='Marc' t={i18next.t} />,
  document.getElementById('root')
)
