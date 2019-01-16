(ns ^:figwheel-hooks app.core
  (:require [reagent.core :as r]))

;; Generic Reagent components
(defn link [{:keys [href]} child]
  [:a.App-link {:href href} child])

(defn image [attrs]
  [:img attrs])

(defn text [attrs & children]
  [:p attrs children])

;; Adapt Reagent component for consumption in React/JS
;; Transform from React's props to Reagent's arguments signatures
;; Export into global scope (will be accessible at `window.app.core.Link`)
(def ^:export Link
  (r/reactify-component
   (fn []
     (let [this (r/current-component)]
       (into [link (r/props this)]
             (r/children this))))))

(def ^:export Image
  (r/reactify-component
   (fn []
     (let [this (r/current-component)]
       [image (r/props this)]))))

(def ^:export Text
  (r/reactify-component
   (fn []
     (let [this (r/current-component)]
       (into [text (r/props this)]
             (r/children this))))))

;; Will be called by Figwheel everytime cljs source files change
(defn ^:after-load render-app []
  (js/renderApp))