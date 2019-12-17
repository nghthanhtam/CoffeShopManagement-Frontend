import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class NoPermissionPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>403 Forbidden or No Permission to Access</h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard" /> Home
                </a>
              </li>
              <li>
                <a href="#">Examples</a>
              </li>
              <li className="active">403 error</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            <div className="error-page">
              <h2 className="headline text-red">403</h2>
              <div className="error-content">
                <h3>
                  <i className="fa fa-warning text-red" /> Oops! Your client
                  does not have permission to access this URL on this server
                </h3>
                <p>
                  Contact to your admin to get the permision or
                  <Link to="/home"> return to home page</Link>
                </p>
              </div>
            </div>
            {/* /.error-page */}
          </section>
          {/* /.content */}
        </div>
      </React.Fragment>
    );
  }
}
