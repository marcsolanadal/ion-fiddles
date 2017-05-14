const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose, bindActionCreators } = Redux
const { Provider, connect } = ReactRedux

const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)

// STATE SHAPE
/*
{
  session: {
    user: 'mario',
    token: '12342asfefs29494395jsdfjksjkfejk'
  },
  songs: {
    byId: {
      '1234': {
        id: '1234',
        name: 'misty mountains cold',
        duration: 3.2,
        playable: true
      },
      '4321': {
        id: '4321',
        name: 'the place I will return someday',
        duration: 3.2,
        playable: false
      }
    },
    allIds: ['1234', '4321']
  },
  posts: {
    byId: {
      '1234': {
        id: '1234',
        title: 'WOW',
        body: 'such wow...'
      },
      '4321': {
        id: '4321',
        title: 'Out of imagination',
        body: 'I do not know what to write'
      }
    },
    allIds: ['1234', '4321'],
  }
}
*/

const SET_USER_SESSION_REQUEST = 'SET_USER_SESSION_REQUEST'
const SET_USER_SESSION_SUCCESS = 'SET_USER_SESSION_SUCCESS'
const GET_USER_SONGS_REQUEST = 'GET_USER_SONGS_REQUEST'
const GET_USER_SONGS_SUCCESS = 'GET_USER_SONGS_SUCCESS'
const GET_USER_POSTS_REQUEST = 'GET_USER_POSTS_REQUEST'
const GET_USER_POSTS_SUCCESS = 'GET_USER_POSTS_SUCCESS'

const session = (state = {}, action) => {
  switch(action.type) {
    case SET_USER_SESSION_SUCCESS:
      return action.session
    default:
      return state
  }
}

const songs = (state = { byId: {}, allIds: [] }, action) => {
  switch(action.type) {
    case GET_USER_SONGS_SUCCESS:
      return {
        byId: songsById(state.byId, action),
        allIds: allSongIds(state.allIds, action)
      }
    default:
      return state
  }
}

const songsById = (state = {}, action) => {
  let newState = { ...state }
  action.songs.map(song => {
    newState = {
      ...newState,
      [song.id]: song
    }
  })
  return newState
}

const allSongIds = (state = [], action) => {
  return action.songs.map(song => song.id)
}

const rootReducer = combineReducers({
  session,
  songs
})

const selectPlayableSongs = (state) => {
  const visibleIds = state.songs.allIds.filter(id => {
    return state.songs.byId[id].playable
  })
  return visibleIds.map(id => state.songs.byId[id])
}

// FIXME: Find the best way to pass session data
const getToken = (user, password) => {
  return (dispatch) => {
    dispatch({ type: SET_USER_SESSION_REQUEST })
    return fetch('http://localhost:4000/token',{
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        //'content-type': 'application/json'
      },
      body: `user=${user}&password=${password}`
      //body: JSON.stringify({ user, password })
    })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: SET_USER_SESSION_SUCCESS,
        session: {
          user,
          token: data.token
        }
      })
    },
    (err) => {
      console.error(err)
    })
  }
}

const getSongs = () => {
  return (dispatch, getState) => {
    dispatch({ type: GET_USER_SONGS_REQUEST })
    return fetch('http://localhost:4000/songs', {
      method: 'GET',
      headers: {
        'Session': JSON.stringify(getState().session)
      }
    })
    .then(res => res.json())
    .then(songs => {
      dispatch({
        type: GET_USER_SONGS_SUCCESS,
        songs
      })
    },
    (err) => {
      console.error(err)
    })
  }
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

class App extends Component {
  componentDidMount() {
    // FIXME: Need to do this action when the app connects
    this.props.actions.getToken('mario', 'qwerty').then(res => {
      this.props.actions.getSongs()
    })
  }
  render() {
    return(
      <div>
        <h3>May the force be with you...</h3>
        <ul>
          {
            this.props.songs.map(song => {
              return (
                <li key={song.id}>{song.title}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
    songs: selectPlayableSongs(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getToken,
      getSongs
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
