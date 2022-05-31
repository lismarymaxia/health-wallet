import React from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router";
import { Login, Registro } from "../pages";
import RutasPrivadas from "./rutasPrivada";
import { Autenticadas } from "./HOC";
const RootRutas: React.FC = (props) => {
  let sesion = true;
  return (
    <IonApp>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/registro" component={Registro} />
        <Autenticadas path="/app" Auth={sesion} component={RutasPrivadas} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonApp>
  );
};

export default RootRutas;
