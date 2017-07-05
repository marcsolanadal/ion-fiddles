One-way data binding
--------------------

The main advantage of *one-way data binding* over *two-way data binding* is that
you can avoid strange interactions between controllers and their respective
views. It allows you to thing about the flow of your application and to debug
much more easily.

One example of one-way architecture is Flux/Redux.

```
UI -> Dispatch(action) -> Reducers -> update(Store) -> updates(UI)
```

*Two-way data binding* means that when you change anything in the model the view
gets updated and when changing anything on the view the model gets updated.


```
UI -> updates -> model
model -> updated -> UI
```

### Common mistakes


In React and Redux when using thunks is a common mistake to call the thunk action
and use the returned promise to get the data and do some operation.

```javascript
# LoginActions.js
const fetchingUsers = () => (dispatch) => {
    return API.getUsers().then((users) => { // (1)
      return users
    })
  }
}

# LoginComponent.js
fetchingUsers().then((res) => {
  console.log('doing something with data coming from the wrong direction!', res)
})
```

Using the return in **(1)** should be always avoided at all costs.
