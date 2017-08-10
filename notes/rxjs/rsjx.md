RSJX
----

Operators
=========

Operators are functions that subscribe to a stream does an operation using it
and creates another output stream.

```javascript
Rx.Observable.prototype.multiplyBy = function (mult) {
  const result$ = this.subscribe(
    (next) => { return Rx.Observable.create((next) => next * mult)},
    (err) => { console.log(err) },
    (complete) => { console.log(complete) }
  );
  return result$
}
```

map

```text
foo: ----1----2----3----4----5------>
            map(i => i + 1)
bar: ----2----3----4----5----6------>
```

mapTo

```text
foo: ----1----2----3----4----5------>
            mapTo(7)
bar: ----7----7----7----7----7------>
```

do

```text
foo: ----1----2----3----4----5------>
      do(x => console.log(x))
foo: ----1----2----3----4----5------>
            mapTo(7)
bar: ----7----7----7----7----7------>
      do(x => console.log(x))
bar: ----7----7----7----7----7------>
```

filter

```text
foo: ----1----2----3----4----5------>
        filter(i => i >= 3)
bar: --------------3----4----5------>
```

take

```text
foo: ----1----2----3----4----5------>
              take(3)
bar: ----1----2----3|
```

first

```text
foo: ----1----2----3----4----5------>
              first()
bar: ----1|
```

skip
takeLast
last
concat
startWith
merge
combineLatest
withLatestForm
