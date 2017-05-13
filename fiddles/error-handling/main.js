const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose, bindActionCreators } = Redux
const { Provider, connect } = ReactRedux


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


/*
// STATE SHAPE
{
  errors: {
    byId: {
      '1': {
        id: '1'
        type: 'TYPE1_ERROR',
        header: 'BOOM TYPE 1',
        body: 'This is an error of type 1'
      }
      '2': {
        id: '2'
        type: 'TYPE2_ERROR',
        header: 'BOOM TYPE 2',
        body: 'This is an error of type 2'
      },
      '3': {
        id: '3'
        type: 'TYPE1_ERROR',
        header: 'BOOM TYPE 1',
        body: 'This is an error of type 1'
      }
    },
    allIds: ['1', '2', '3'],
    byType: {
      'TYPE1_ERROR': ['1', '3'],
      'TYPE2_ERROR': ['2']
    },
    allTypes: ['TYPE1_ERROR', 'TYPE2_ERROR']
  }
}
*/

/*
// ACTION SHAPE
{
  type: 'ERROR_TYPE2',
  error: true,
  payload: {
    header: 'BOOM TYPE 2',
    body: 'This is an error of type 2'
  }
}
*/

// This slice reducer takes the error and adds it to the byId object.
// It takes the id of the error from the parent error reducer.
const errorById = (state = {}, action) => {
  const { type, payload } = action
  const { id, header, body } = payload
  return {
    ...state,
    [id]: {
      id,
      type,
      header,
      body
    }
  }
}

// This slice reducer takes the error and adds it to the byType object.
// It creates an array for every new type of action that triggers an error.
// The id comes from the parent error reducer.
// TODO: See how to avoid losing the ids of the previous errors for each type.
const errorByType = (state = {}, action) => {
  return {
    ...state,
    [action.type]: addId(state, action)
  }
}

const addId = (state = [], action) => {
  return [
    ...state[action.type] || [],
    action.payload.id
  ]
}

const allIds = (state = [], action) => {
  return [
    ...state,
    action.payload.id
  ]
}

const defaultState = {
  byIds: {},
  allIds: [],
  byType: []
}

const errorReducer = (state = defaultState, action) => {
  switch(action.error) {
    case true:
      return {
        byId: errorById(state.byId, action),
        allIds: allIds(state.allIds, action),
        byType: errorByType(state.byType, action)
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({
  errors: errorReducer
})

const selectAllErrors = (state) => {
  return state.errors.allIds.map(id => state.errors.byId[id])
}

// TODO: Find a better way to get the last item of the array
const selectLastFromType = (state, type) => {
  const errorsByType = state.errors.byType[type]
  const id = errorsByType[errorsByType.length - 1]
  return state.errors.byId[id]
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...[
      thunk
    ])
  )
)

// Closure to return next id
// TODO: Check how to generate immutable ids inside reducer
const nextId = ((id = 0) => {
  return () => id += 1
})()

const fireError = (num) => {
  return {
    type: `ERROR_TYPE${num}`,
    error: true,
    payload: {
      id: nextId().toString(),
      header: `BOOM TYPE ${num}`,
      body: `An error of type ${num} has occurred T-T`
    }
  }
}

// TODO: Error header

// TODO: Error description

class App extends Component {
  getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  handleClick = () => {
    this.props.actions.fireError(this.getRandomInt(0, 5))
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Fire error</button>
        <ul>
          {
            this.props.errors.map(error => (
              <li key={error.id}>
                <div>
                  <b>{error.header}</b>:
                  <p>{error.body}</p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    //errors: selectAllErrors(state),
    errors: selectLastFromType(state, 'ERROR_TYPE2')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      fireError
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
