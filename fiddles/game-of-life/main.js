const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose } = Redux
const { Provider, connect } = ReactRedux
const { Router, Route, browserHistory, IndexRoute, Link } = ReactRouter
const { Field, reduxForm } = ReduxForm
const formReducer = ReduxForm.reducer

//------------------------------------------------------------------------------
// REDUX
//------------------------------------------------------------------------------


// Middleware
//------------------------------------------------------------------------------

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const thunk = store => next => action =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action)


// Reducers
//------------------------------------------------------------------------------


const forceUsersReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_FORCE_USER':
      return [
        ...state,
        action.user
      ];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  users: forceUsersReducer,
  form: formReducer
})

// State shape
/*
  forceUsers: [
    {
      id: 1234,
      name: 'Obi-wan',
      rank: 'Master',
      alignment: 'jedi',
      age: 42,
      apprentice: 4321,
    },
  ]
}
*/

// Store
//------------------------------------------------------------------------------

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


// Actions
//------------------------------------------------------------------------------

const addForceUser = (userData) => {
  return {
    type: 'ADD_FORCE_USER',
    user: {
      id: uuid.v4(),
      ...userData
    }
  }
};


// REACT
//------------------------------------------------------------------------------

const App = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Header}>
        <IndexRoute component={ConnectedDashboard} />
        <Route path='/general' component={GeneralForm} />
        <Route path='/force' component={ForceForm} />
        <Route path='/apprentice' component={ApprenticeForm} />
        <Route path='/submit' component={Overview} />
      </Route>
    </Router>
  </Provider>
);

const Header = ({ children }) => (
  <div>
    <h1>Multi-page form</h1>
    {children}
  </div>
)

let Dashboard = ({ users }) => {
  const userList = users.map((user) =>
    <li key={user.id}>{user.name}</li>
  );
  return (
    <div>
      <p>Menu:</p>
      <ul>
        <li><Link to='/general'>Add User</Link></li>
      </ul>
      <p>List of Force users:</p>
      <ul>
        {userList}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}
const ConnectedDashboard = connect(mapStateToProps, undefined)(Dashboard);

// name, age
let GeneralForm = () => {
  return (
    <form>
      <div>
        <label>Name</label>
        <Field name="name" component="input" type="text" placeholder="Name" />
      </div>
      <div>
        <label>Age</label>
        <Field name="age" component="input" type="text" placeholder="Age" />
      </div>
      <Link to="/force">Next</Link>
    </form>
  )
}
GeneralForm = reduxForm({
  form: 'forceUserForm',
  destroyOnUnmount: false,
})(GeneralForm)

// alignment, rank
let ForceForm = () => {
  return (
    <form>
      <div>
        <label>Alignment</label>
        <Field name="alignment" component="input" type="text" placeholder="Alignment" />
      </div>
      <div>
        <label>Rank</label>
        <Field name="rank" component="input" type="text" placeholder="Rank" />
      </div>
      <Link to="apprentice">Next</Link>
    </form>
  )
}
ForceForm = reduxForm({
  form: 'forceUserForm',
  destroyOnUnmount: false,
})(ForceForm)

// selecting aprentice in case of being a master jedi or a sith lord
let ApprenticeForm = () => {
  return (
    <form>
      <div>
        <label>Apprentice</label>
        <Field name="apprentice" component="input" type="text" placeholder="Apprentice" />
      </div>
      <Link to="submit">Next</Link>
    </form>
  )
}
ApprenticeForm = reduxForm({
  form: 'forceUserForm',
  destroyOnUnmount: false,
})(ApprenticeForm)

const submit = (userData) => {
  const user = Object.assign({}, userData, {
    id: uuid.v4()
  });
  store.dispatch(addForceUser(user))
  browserHistory.push('/')
};

let Overview = ({ handleSubmit, submitting, values }) => {
  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>Overview</h2>
      <p>May the force be with you...</p>
      <div>rank: {values.rank}</div>
      <div>name: {values.name}</div>
      <div>age: {values.age}</div>
      <div>apprentice: {values.apprentice}</div>
      <button type="submit" disabled={submitting}>Submit</button>
    </form>
  )
}

const mapStateToPropsOverview = (state) => {
  return {
    values: state.form.forceUserForm.values
  }
}

Overview = connect(mapStateToPropsOverview, undefined)(Overview)
Overview = reduxForm({
  form: 'forceUserForm'
})(Overview)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
