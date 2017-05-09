const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose } = Redux
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
    byType: {
      'TYPE1_ERROR': ['1', '3'],
      'TYPE2_ERROR': ['2']
    }
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

// Closure to return next id
// TODO: Check how to generate immutable ids inside reducer
const nextId = ((id = 0) => {
  return () => id += 1
})()

// This slice reducer takes the error and adds it to the byId object.
// It takes the id of the error from the parent error reducer.
const errorById = (state, action, id) => {
  switch(action.error) {
    case true:
      return {
        ...state.byId,
        [id]: {
          id,
          type: action.type,
          header: action.payload.header,
          body: action.payload.body
        }
      }
  }
}

// This slice reducer takes the error and adds it to the byType object.
// It creates an array for every new type of action that triggers an error.
// The id comes from the parent error reducer.
// TODO: See how to avoid losing the ids of the previous errors for each type.
const errorByType = (state, action, id) => {
  switch(action.error) {
    case true:
      return {
        ...state.byType,
        [action.type]: [
          id
        ]
      }
  }
}

const errorReducer = (state = {}, action) => {
  switch(action.error) {
    case true:
      const id = nextId().toString()
      return {
        byId: errorById(state, action, id),
        byType: errorByType(state, action, id)
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({
  errors: errorReducer
})

// TODO: Find a better way to get the last item of the array
const selectAllErrors = (state) => state.byId
const selectLastFromType = (type) => {
  const arrayCopy = state.byType[type]
  return arrayCopy.pop()
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...[
      thunk,
      logger
    ])
  )
)

const triggerErrorAction = (num) => {
  return {
    type: `ERROR_TYPE${num}`,
    error: true,
    payload: {
      header: `BOOM TYPE ${num}`,
      body: `An error of type ${num} has occurred T-T`
    }
  }
}

class App extends Component {
  componentDidMount() {
    store.dispatch(triggerErrorAction(1))
    store.dispatch(triggerErrorAction(2))
    store.dispatch(triggerErrorAction(2))
    store.dispatch(triggerErrorAction(1))
    store.dispatch(triggerErrorAction(3))
  }
  render() {
    return (
      <div>
        May the force be with you
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
