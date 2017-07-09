Functional programming
----------------------

*"Code you canno't trust is code you don't understand"* - Joe Hetfield

### Functions

The values passed to the function are called **arguments**. This values are
stored in the **parameters** of the function.

```javascript
function test (x, y, z) {
  return x + y + z
}

const result = test(1, 2, 3)
```

In our example the arguments would be ``1, 2, 3`` and the parameters would be
``x, y, z``

In JS there's no requirement when we call a function with a number of arguments
for the number of parameters to match.

The number of parameters in the function declaration is called **arity**.

The function ``fn.length`` is read only and returns the arity of the function.
It can have strange behaviors if we use ES6 parameter forms like:

```javascript
(x, y = 6) => {}    // length 1
(x, ...rest) => {}  // length 1
({ x, y }) => {}    // length 1
```

A **function signature** defines input and outputs of a function.
A function signature that accepts and undetermined amount of arguments is referred
to as a **varidic function**.

**Declarative code** focus more on what the outcome of the piece of code should be.
**Imperative code** focus on how to get the outcome with different steps.

*Declarative code often communicates more cleanly than imperative code.*
