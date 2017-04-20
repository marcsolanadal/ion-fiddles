const { Component } = React
const { createStore, applyMiddleware, combineReducers } = Redux
const { Provider, connect } = ReactRedux
const { Router, Route, browserHistory, IndexRoute, Link } = ReactRouter
const { Field, reduxForm, submitting } = ReduxForm

// Middleware
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

// RootReducer
const rootReducer = combineReducers({
  forceUsers: forceUsersReducer
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
const store = createStore(
  rootReducer,
  applyMiddleware(...[
    thunk,
    logger
  ])
)

// Other reducers

const forceUsersReducer = (state = [], action) => {
  return state;
}

const App = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Header}>
        <IndexRoute component={Dashboard} />
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

const Dashboard = () => (
  <ul>
    <li><Link to='/general'>Add User</Link></li>
  </ul>
)

// name, age
let GeneralForm = () => {
  return (
    <form>
      <div>
        <label>Name</label>
        <Field name="Name" component="input" type="text" placeholder="Name" />
      </div>
      <div>
        <label>Age</label>
        <Field name="Age" component="input" type="text" placeholder="Age" />
      </div>
      <Link to="/force">Next</Link>
    </form>
  )
}
GeneralForm = reduxForm({
  form: 'forceUserForm',
})(GeneralForm)

// alignment, rank
let ForceForm = () => {
  return (
    <form>
      <div>
        <label>Alignment</label>
        <Field name="Alignment" component="input" type="text" placeholder="Alignment" />
      </div>
      <div>
        <label>Rank</label>
        <Field name="Rank" component="input" type="text" placeholder="Rank" />
      </div>
      <Link to="apprentice">Next</Link>
    </form>
  )
}
ForceForm = reduxForm({
  form: 'forceUserForm',
})(ForceForm)

// selecting aprentice in case of being a master jedi or a sith lord
let ApprenticeForm = () => {
  return (
    <form>
      <div>
        <label>Apprentice</label>
        <Field name="Apprentice" component="input" type="text" placeholder="Apprentice" />
      </div>
      <Link to="submit">Next</Link>
    </form>
  )
}
ApprenticeForm = reduxForm({
  form: 'forceUserForm',
})(ApprenticeForm)

let Overview = () => {
  return (
    <div>
      <h2>Overview</h2>
      <p>May the force be with you...</p>
      <button type="submit" disabled={submitting}>Submit</button>
    </div>
  )
}
Overview = reduxForm({
  form: 'forceUserForm'
})(Overview)

const mapStateToProps = (state) => {
  return {

  }
}

const connectedDashboard = connect(mapStateToProps, undefined)(Dashboard);

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
