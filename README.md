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
2. Use `reagent.core/reactify-component` to adapt Reagent component for usage with JS/React
3. Use `^:export` meta on component's function to export it into a global scope (`window` object)
4. Put `<script>` tag referring ClojureScript output bundle into your HTML before JS project's script
5. Use Reagent components in your JS project
   ```js
   const { Text } = window.app.core;
   <Text>Hi</Text>;
   ```

#### How to share common dependencies

##### In JavaScript project

1. In your JS project create a module that imports shared dependencies and exports them into global scope (`window` object)
2. Configure two builds (here using Webpack)
   - With an entry point with shared dependencies
   - With application entry point and shared dependencies configured as externals
3. Put `<script>` tag referring shared deps bundle into your HTML before ClojureScript project's script

##### In ClojureScript project

1. Exclude `cljsjs/react` and `cljsjs/react-dom` transitive dependencies from `reagent`
2. Using `:foreign-libs` option alias `react` and `react-dom` with globally exported (from JS project) ones
   - `:file` is a required field in `:foreign-libs`, provide a path to an empty stub file
3. Set `:infer-externs` to `true` so that compiler can infer external references to shared deps

#### How to enable hot-reloading for ClojureScript code

On every change to ClojureScript source Figwheel will apply a patch to the code running in the browser. In order to reflect those changes on the screen you have to re-render the app so the new code will be executed.

##### In JavaScript project

- Export rendering function into global scope (`window` object)

##### In ClojureScript project

- Use `^:figwheel-hooks` meta to enable Figwheel hooks and `^:after-load` meta on a function that calls rendering function exported from JS
