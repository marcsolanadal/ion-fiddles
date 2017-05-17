const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose, bindActionCreators } = Redux
const { Provider, connect } = ReactRedux

const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)

const responses = [
  {
    songs: [
      { id: '111', name: 'Song of storms' },
      { id: '222', name: 'The place I will return someday' },
      { id: '333', name: 'Throught the valley' },
      { id: '444', name: 'The bluest blues' },
      { id: '555', name: 'Misty mountains cold' },
    ]
  },
  {
    songs: [
      { id: '333', name: 'Song of storms', duration: 5.00 },
      { id: '444', name: 'The bluest blues' },
      { id: '555', name: 'Misty mountains cold', duration: 3.20 },
    ]
  },
  {
    songs: [
      { id: '333', name: 'Song of storms', duration: 5.00 },
      { id: '444', name: 'The bluest blues' },
      { id: '666', name: 'OWWW BABYYY', duration: 999 },
    ]
  }
]
//const responses = []

const GET_SONGS_SUCCESS = 'GET_SONGS_SUCCESS'

const normalizeParamById = (responses, param) => {
  return responses
    .map(res => res[param])
    .reduce((acc, array) => acc.concat(array), [])
    .reduce((acc, item) => {
      acc[item.id] = { ...item }
      return acc
    }, {})
}

const songs = (state = {}, action) => {
  switch(action.type) {

    case GET_SONGS_SUCCESS:
      const ids = normalizeParamById(action.responses, 'songs');
      return {
        byId: ids,
        allIds: Object.keys(ids)
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({ songs })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...[
      thunk
    ])
  )
)

store.dispatch({
  type: GET_SONGS_SUCCESS,
  responses
})
