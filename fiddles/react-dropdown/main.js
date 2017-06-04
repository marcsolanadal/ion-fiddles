const { Component, PropTypes } = React
const { createStore, applyMiddleware, combineReducers, compose } = Redux
const { Provider, connect } = ReactRedux
const { Router, Route, browserHistory, IndexRoute, Link } = ReactRouter
const { Field, reduxForm } = ReduxForm
const formReducer = ReduxForm.reducer

class App extends Component {
  render() {
    const usersSample = [ 'Obi-wan', 'Anakin', 'Palpatine', 'Grevious']
    const usersSample2 = [
      <ForceUser name='Obi-wan' alignment='Jedi' />,
      <ForceUser name='Anakin' alignment='Jedi' />,
      <ForceUser name='Darth Sidious' alignment='Sith' />,
      <ForceUser name='Darth Moul' alignment='Sith' />,
      <ForceUser name='Asoka' alignment='Neutral' />,
      <ForceUser name='Yoda' alignment='Jedi' />,
      <ForceUser name='Darth Vader' alignment='Sith' />,
    ]
    return (
      <div className='form'>
        <Dropdown customClick={(params) => { console.log('custom click!', params) }} items={usersSample} />
        <Dropdown placeholder='default' defaultIndex={1} items={usersSample2} />
        <Dropdown placeholder='force users' items={usersSample2} />
        <Dropdown placeholder='force users' label='label' items={usersSample2} />
      </div>
    )
  }
}

const ForceUser = ({ name, alignment }) => {
  return (
    <div className={alignment}>
      <span>{name}</span>
    </div>
  )
}

class Dropdown extends Component {

  static propTypes = {
    defaultIndex: PropTypes.number,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ])
    ).isRequired,
    customClick: PropTypes.func
  }

  constructor(props) {
    super(props)
    const { defaultIndex, items } = this.props
    const index = (defaultIndex < items.length && defaultIndex >= 0) ? defaultIndex : 0
    this.state = {
      selected: index,
      opened: false
    }
  }

  handleItemClick = (index) => {
    this.setState({
      selected: index,
      opened: false
    })
  }

  handleOpen = () => this.setState({ opened: true })
  handleClose = () => this.setState({ opened: false })

  render() {
    const { items, placeholder, label, customClick } = this.props
    const { opened, selected } = this.state
    const arrowClass = classNames({
      'icon-caret-down': !opened,
      'icon-caret-up': opened
    })
    const listClass = classNames('list', {
      'list__opened': opened,
      'list__closed': !opened
    })
    return (
      <div
        className='dropdown'
        tabIndex='0'
        onFocus={this.handleOpen}
        onBlur={this.handleClose }
      >
        {label && <div className='label'>{label}</div>}
        <div>

          <div className='selected' onClick={this.handleOpen}>
            <div className='container'>
              {placeholder && <div className='placeholder'>{placeholder}</div>}
              <div className='current'>{items[selected]}</div>
            </div>
            <div className={arrowClass} />
          </div>

          {<ul className={listClass}>
            {items.map((item, i) => {
              if (i !== selected) {
                return <DropdownItem
                  key={i}
                  index={i}
                  item={item}
                  onClick={this.handleItemClick}
                  customClick={customClick}
                />
              }
            })}
          </ul>}

        </div>
      </div>

    )
  }
}

const DropdownItem = (props) => {
  const { index, item, onClick, customClick } = props
  const handleClick = () => {
    if (customClick) { customClick(props) }
    onClick(index)
  }
  return (
    <li className='item' onClick={handleClick}>
      {item}
    </li>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
