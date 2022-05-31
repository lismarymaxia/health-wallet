import React from "react";
import { Redirect, Route } from "react-router";
import PropTypes from "prop-types";

export const Autenticadas = ({ Auth, component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) =>
        Auth === true ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
Autenticadas.protoTypes = {
  Auth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
