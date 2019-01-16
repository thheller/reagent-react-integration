;; Enable Figwheels hooks in this namespace
(ns ^:figwheel-hooks app.interop
  (:require [reagent.core :as r]))

;; Helper component that converts Reagent components and adds them into global registry
(defn register-component [f]
  (r/reactify-component
   (fn []
     (let [this (r/current-component)]
       (f this)))))

(defn ^:after-load render-app []
  (js/renderApp))
