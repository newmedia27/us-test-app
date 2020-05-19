import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { reducers } from "./reducers";
import { configStore } from "./store";
import App from "./App";
import ErrorBoundary from "./components/error/ErrorBoundary";
import Spinner from "./components/spinner";
import createMiddlewares, { sagaWatch} from "./store/middlewares";
import * as serviceWorker from "./serviceWorker";

const store = configStore(reducers, createMiddlewares());
sagaWatch();

const app = (
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Suspense>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
