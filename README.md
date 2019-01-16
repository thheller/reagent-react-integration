## Integrating Reagent into JavaScript/React

_WARNING: This won't be easy, you are about to marry together two separate realms._

### What is it trying to achieve?

You want to start gradually using ClojureScript/Reagent in an existing JavaScript/React project.

### Problems

1. How to export ClojureScript into JavaScript
2. How to share common dependencies (React, etc.) between ClojureScript/Reagent and JavaScript/React code
3. How to enable hot-reloading for ClojureScript code

### Solving step by step

#### How to export ClojureScript into JavaScript

1. Bootstrap ClojureScript project and write your Reagent component
2. [Use `reagent.core/reactify-component` to adapt Reagent component for usage with JS/React](https://github.com/roman01la/reagent-react-integration/blob/master/cljs-src/app/core.cljs#L18)
3. [Use `^:export` meta on component's function to export it into a global scope (`window` object)](https://github.com/roman01la/reagent-react-integration/blob/master/cljs-src/app/core.cljs#L17)
4. [Put `<script>` tag referring ClojureScript output bundle into your HTML before JS project's script](https://github.com/roman01la/reagent-react-integration/blob/master/public/index.html#L12)
5. [Use Reagent components in your JS project](https://github.com/roman01la/reagent-react-integration/blob/master/src/index.js#L5)

#### How to share common dependencies

##### In JavaScript project

1. In your JS project [create a module that imports shared dependencies and exports them into global scope (`window` object)](https://github.com/roman01la/reagent-react-integration/blob/master/src/deps.js)
2. Configure two builds (here using Webpack)
   - With an [entry point with shared dependencies](https://github.com/roman01la/reagent-react-integration/blob/master/webpack.config.js#L4-L10)
   - With application entry point and [shared dependencies configured as externals](https://github.com/roman01la/reagent-react-integration/blob/master/webpack.config.js#L20-L23)
3. [Put `<script>` tag referring shared deps bundle into your HTML before ClojureScript project's script](https://github.com/roman01la/reagent-react-integration/blob/master/public/index.html#L11)

##### In ClojureScript project

1. [Exclude `cljsjs/react` and `cljsjs/react-dom` transitive dependencies from `reagent` dependency](https://github.com/roman01la/reagent-react-integration/blob/master/deps.edn#L4)
2. [Using `:foreign-libs` option alias `react` and `react-dom` with globally exported (from JS project) ones](https://github.com/roman01la/reagent-react-integration/blob/master/dev.cljs.edn#L9-L12)
   - `:file` is a required field in `:foreign-libs`, [provide a path](https://github.com/roman01la/reagent-react-integration/blob/master/dev.cljs.edn#L12) to an [empty stub file](https://github.com/roman01la/reagent-react-integration/blob/master/stub.js)
3. [Set `:infer-externs` to `true` so that compiler can infer external references to shared deps](https://github.com/roman01la/reagent-react-integration/blob/master/dev.cljs.edn#L6)

#### How to enable hot-reloading for ClojureScript code

On every change to ClojureScript source Figwheel will apply a patch to the code running in the browser. In order to reflect those changes on the screen you have to re-render the app so the new code will be executed.

##### In JavaScript project

- [Export rendering function into global scope (`window` object)](https://github.com/roman01la/reagent-react-integration/blob/master/src/index.js#L46)

##### In ClojureScript project

- Use [`^:figwheel-hooks` meta](https://github.com/roman01la/reagent-react-integration/blob/master/cljs-src/app/core.cljs#L1) to enable Figwheel hooks and [`^:after-load` meta on a function that calls rendering function exported from JS](https://github.com/roman01la/reagent-react-integration/blob/master/cljs-src/app/core.cljs#L38-L39)
