import React, { Component } from 'react'
import './App.css';
import Layout from './Layout';
import { Router } from "react-router";
import BaseRouter from './routes';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();
export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Layout>
            <BaseRouter/>
        </Layout>
      </Router>
    )
  }
}
