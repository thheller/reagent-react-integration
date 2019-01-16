(ns app.core
  (:require [reagent.core :as r]
            [app.interop :refer-macros [defexported]]))

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
(defexported Link [this]
  (into [link (r/props this)]
        (r/children this)))

(defexported Image [this]
  [image (r/props this)])

(defexported Text [this]
  (into [text (r/props this)]
        (r/children this)))
