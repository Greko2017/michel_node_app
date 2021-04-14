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
      {/* <div className='container mt-4'>
        <h4 className='display-4 text-center mb-4'>
          <i className='fab fa-react' /> Michel App
        </h4> */}
          <BaseRouter/>
        {/* <FileUpload /> */}
      {/* </div> */}
      </Layout>
      </Router>
    )
  }
}
