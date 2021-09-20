import React from "react";
import { Redirect, Route } from "react-router-dom";
import SimpleBottomNavigation from '../components/SimpleBottomNavigation';

function ProtectedRoute({ component: Component,setNavState, navState, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("user");

  return (
    <>
      <div className="container">
        <Route
        {...restOfProps}
        render={props =>
          !isAuthenticated ? (
            <Redirect to="/signIn" />
          ) : (
            <Component setNavState = {setNavState} {...props} />
          )
        }
        />
      </ div>
  <SimpleBottomNavigation setNavState = {setNavState} navState = {navState}/>
  </>);
}

export default ProtectedRoute;
