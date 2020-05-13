import React from 'react'

import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({component: Component, authed, ...rest}) => {

  console.log("Protect Router :"+ authed);


  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default ProtectedRoute