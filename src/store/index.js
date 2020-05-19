import { createStore, applyMiddleware, compose, combineReducers } from "redux";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const configStore = (reducers, middlewares) =>
  createStore(
    combineReducers(reducers),
    {},
    composeEnhancers(applyMiddleware(...middlewares))
  );
