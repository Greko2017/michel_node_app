import React, { Component } from 'react'
// import { Link,NavLink } from "react-router-dom";

class Layout extends Component {

    render() {
        return (
            <div>
                          
              <header>
              
              <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a className="navbar-brand" style={{color:'#fff'}} href="/">MNA</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/twelves_months">12 Months</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/difference_month">Month</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/variance_quater">Quater</a>
                    </li>
                  </ul>
                  <form className="form-inline mt-2 mt-md-0">
                    {/* <input className="form-control mr-sm-2 disable" type="text" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0 disabled" type="submit">Search</button> */}
                  </form>
                </div>
              </nav>
            </header>

             
            <main role="main" className="container">
              <h1 className="mb-5">Import your CVS File</h1>
              <p className="lead">Using Excel select UTF-8 Encoding to have the ";" as separator</p>
           {React.cloneElement(this.props.children)}  
            </main>

            <footer className="footer">
              <div className="container">
                <span className="text-muted">Place sticky footer content here.</span>
              </div>
            </footer> 
            </div>
        )
    }
}

export default  Layout