import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import "dotenv/config";

function createArrayOfRoles(obj) {
  var newArray = [];

  for (let eachVar in obj) {
    if (typeof obj[eachVar] === "boolean" && obj[eachVar] === true) {
      newArray.push(eachVar);
    }
  }
  return newArray;
}
export const PrivateRoute = ({
  component: Component,
  role,
  token,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const userRole = jwt.verify(token, process.env.REACT_APP_JWTSECRET);

      let arrayOfRoles = createArrayOfRoles(userRole.role);

      // check if route is restricted by role
      if (role && !arrayOfRoles.includes(role)) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/403" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
