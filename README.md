## Integrating Reagent into JavaScript/React

_WARNING: This is easy._

### What is it trying to achieve?

You want to start gradually using ClojureScript/Reagent in an existing JavaScript/React project.

### Problems

None.

```
yarn
yarn start:cljs
# wait till first build complete message (otherwise webpack will complain)
# start webpack in a different terminal
yarn start:js
open http://localhost:3000
```