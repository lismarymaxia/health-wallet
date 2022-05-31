import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";

import { useHistory } from "react-router";
import {
  Home,
  Datos,
  EditDatos,
  Consultas,
  Imagenologia,
  ImagenologiaDtls,
  Laboratorio,
  Afiliados,
} from "../pages";
import { Nav } from "../components";
import { logout } from "../store/action/aut";
import { useDispatch, useSelector } from "react-redux";
setupIonicReact();

const RutasPrivadas: React.FC = () => {
  const isAuth: any = useSelector<any>((state) => state.reducerAuth.stdAuth);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isAuth) {
      history.replace("/");
    }
  }, [history, isAuth]);

  const handelLogout = (e: any) => {
    console.log("clic");
    dispatch(logout());
  };

  return (
    <>
      <Nav />
      <IonTabs>
        <IonRouterOutlet id="navApp">
          <Route exact path="/app/home">
            <Home />
          </Route>
          <Route exact path="/app/datos">
            <Datos />
          </Route>
          <Route exact path="/app/datos-editar">
            <EditDatos />
          </Route>
          <Route exact path="/app/consultas">
            <Consultas />
          </Route>
          <Route path="/app/imagenologia">
            <Imagenologia />
          </Route>
          <Route path="/app/imagenologia-detalle">
            <ImagenologiaDtls />
          </Route>
          <Route path="/app/laboratorio">
            <Laboratorio />
          </Route>
          <Route exact path="/app/afiliados">
            <Afiliados />
          </Route>
          <Route exact path="/app">
            <Redirect to="/app/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom"></IonTabBar>
      </IonTabs>
    </>
  );
};
export default RutasPrivadas;
/*
<IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/app/afiliados">
            <IonIcon icon={peopleSharp} />
            Afiliados
          </IonTabButton>

          <IonTabButton tab="tab3" onClick={handelLogout}>
            <IonIcon icon={logOutSharp} />
            Cerrar sesion
          </IonTabButton>
        </IonTabBar> */
