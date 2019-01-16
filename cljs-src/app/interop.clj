(ns app.interop)

(defmacro defexported
  "Convenieve macro that provides nicer syntax to adapt and export Reagent components"
  [name args & body]
  `(def ~(vary-meta name assoc :export true)
     (register-component
      (fn ~args ~@body))))
