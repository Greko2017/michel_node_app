import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import importDataReducer from './redux/import_data/importDataReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//https://blog.logrocket.com/how-to-use-bootstrap-with-react-a354715d1121/

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    import_data: importDataReducer,
  });
  
const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider
    store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
