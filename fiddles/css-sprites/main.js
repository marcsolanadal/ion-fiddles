const { Component } = React
const { createStore, applyMiddleware, combineReducers, compose } = Redux
const { Provider, connect } = ReactRedux
const { Router, Route, browserHistory, IndexRoute, Link } = ReactRouter
const { Field, reduxForm } = ReduxForm
const formReducer = ReduxForm.reducer

class CageContainer extends Component {
  static defaultProps = {
    empty: true,
    dead: false,

  }
  componentWillReceiveProps(nextProps) {
    // All the logic for the object should be here
  }
  render () {
    const wheelState = 'running'
    const chimsterState = 'running'
    return (
      <Wheel animState={wheelState}>
        <Chimster animState={chimsterState} />
      </Wheel>
    )
  }
}

// -----------------------------------------------------------------------------
// Wheel.js
// -----------------------------------------------------------------------------

const Wheel = styled.div`

`;

class Wheel extends PureComponent {
  render() {
    return (this.props.running) ? <Spinning /> : <Stopped />
  }
}


// -----------------------------------------------------------------------------
// Chimster.js
// -----------------------------------------------------------------------------

const run = keyframes`
  from { background-position: 0 0; }
  to { background-position: -1530px 0; }
`

const dead = keyframes`
  from { background-position: 0 0; }
  to { background-position: -1530px 0; }
`

// TODO: Try to avoid using this object and instead link the animations directly
const animations = {
  'run': run,
  'dead': dead
}

const Chimster = styled.div`
  width: 102px;
  height: 75px;
  background-image: url(sprites/runner-sprite-no-padding.png);
  background-repeat: no-repeat;
  animation-name: ${props => animations[props.animState]}
  animation-duration: 0.5s steps(15);
  animation-iteration-count: infinite;
`;

class ChimsterContainer extends PureComponent {
  static defaultProps = {

  }
  componentWillReceiveProps(nextProps) {
    // All the logic for the object should be here
  }
  render() {
    return (
      <div ondrop={handleDrop}>
        <Wheel />
        <LeftIndicator type='poop' />
        <Chimster animState='running' />
        <RightIndicator type='food' />
      </div>
    )
  }
}

class World extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

ReactDOM.render(
  <World />,
  document.getElementById('root')
)
