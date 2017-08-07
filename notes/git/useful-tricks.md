Useful Git procedures
---------------------

### Switching to previous state in the project

```
git reset --hard {COMMIT_TAG}
git reset --hard origin/develop
```

We can check the current head with

```
git rev-parse HEAD
```
