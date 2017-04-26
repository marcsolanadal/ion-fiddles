// -----------------------------------------------------------------------
// Server
// -----------------------------------------------------------------------

// Database
const accounts = [
  { id: 'asdf', items: [1, 2, 3, 4] },
  { id: 'rewq', items: [10, 22, 33, 40] },
  { id: 'jkld', items: [100, 222, 300, 444] }
]

// Emulation of the API endpoints

const API = ((delay) => {
  return Object.freeze({
    getItems: function(accountId) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve(accounts.find(a => a.id === accountId).items)
        }, delay)
      })
    },
    getAccountIds: function() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve(accounts.map(a => a.id))
        }, delay)
      })
    }
  })
})(1000)

// -----------------------------------------------------------------------
// Client
// -----------------------------------------------------------------------

const { Component } = React
const { Provider, connect } = ReactRedux
const { createStore, applyMiddleware, bindActionCreators, combineReducers } = Redux

// Middleware
// -----------------------------------------------------------------------

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)

// Reducers
// -----------------------------------------------------------------------

const accountReducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET_ACCOUNTS_SUCCESS':
    const { ids } = action
    return {
      ...state,
      ids
    }
    case 'ITEM_FOUND':
    const { item } = action
    return {
      ...state,
      item
    }
    default:
    return state
  }
}

const rootReducer = combineReducers({
  accounts: accountReducer
})

const initialState = {
  accounts: {
    ids: []
  }
}

const middleware = [ thunk, logger ]
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
)

// Action Creators
// -----------------------------------------------------------------------

const GET_ACCOUNTS_REQUEST = 'GET_ACCOUNTS_REQUEST'
const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS'
const GET_ACCOUNTS_ERROR = 'GET_ACCOUNTS_ERROR'

const ITEM_FOUND = 'ITEM_FOUND'
const ITEM_NOT_FOUND = 'ITEM_NOT_FOUND'

// Actions
// -----------------------------------------------------------------------

const getAccounts = () => (dispatch) => {
  dispatch({ type: GET_ACCOUNTS_REQUEST })
  return API.getAccountIds().then(
    ids => {
      dispatch({ type: GET_ACCOUNTS_SUCCESS, ids })
    }
  )
}

// Looking for the item we provide using a recursive thunk.
// Note that we are creating a new ids array to avoid parameter mutation.
const searchItem = (ids, itemToFind) => (dispatch) => {
  if (ids.length === 0) {
    dispatch({ type: ITEM_NOT_FOUND })
    return undefined
  }
  const nextIds = ids.filter((id, i, ids) => i !== ids.length - 1)
  const id = ids[ids.length - 1]
  return API.getItems(id).then(
    items => {
      //const item = items.find(i => i === itemToFind)
      const item = items.find(function findItem(i) {
        return i === itemToFind
      })
      if (item) {
        dispatch({ type: ITEM_FOUND, item })
      } else {
        dispatch(searchItem(nextIds, itemToFind))
      }
    }
  )
}

// Component
// -----------------------------------------------------------------------

class App extends Component {
  constructor(props) {
    super(props)
    console.log('fetching account ids')
    this.props.actions.getAccounts().then(() => {
      console.log('UI update while searching for accounts')
    })
  }
  componentDidUpdate() {
    const { actions, ids } = this.props
    const itemToFind = 4
    actions.searchItem(ids, itemToFind).then(() => {
      console.log('UI update while searching for item')
    })
  }
  render() {
    console.log('render')
    const listIds = this.props.ids.map(id => {
      return <li key={id}>{id}</li>
    })
    return (
      <div>
        <p>This is a list of accounts ID:</p>
        <ul>
          {listIds}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ids: state.accounts.ids
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getAccounts,
      searchItem
    }, dispatch)
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
)
