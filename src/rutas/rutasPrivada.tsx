import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faStethoscope,
  faClipboardList,
  faDiagramProject
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import {
  Home,
  Datos,
  EditDatos,
  Consultas,
  Consulta,
  Imagenologia,
  ImagenologiaDtls,
  Laboratorio,
  Afiliados,
} from "../pages";
import { Nav } from "../components";
import { logout } from "../store/action/aut";
import { useDispatch, useSelector } from "react-redux";
import "../style/tema.css";
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
          <Route exact path="/app/consulta/:idcnst/:idcntr">
            <Consulta />
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
        <IonTabBar slot="bottom" className="bar-menu">
          <IonTabButton tab="tab1" href="/app/home" className="text-info">
            <div className="icon-menu active">
              <FontAwesomeIcon icon={faHome} className="fs-18" />
              Inicio
            </div>
          </IonTabButton>

          <IonTabButton tab="tab1" href="/app/consultas" className="text-info">
            <div className="icon-menu">
              <FontAwesomeIcon icon={faStethoscope} className="fs-18" />
              Consultas
            </div>
          </IonTabButton>

          <IonTabButton tab="tab1" href="/app/estudios" className="text-info">
            <div className="icon-menu">
              <FontAwesomeIcon icon={faClipboardList} className="fs-18" />
              Estudios
            </div>
          </IonTabButton>

          <IonTabButton tab="tab1" href="/app/afiliados" className="text-info">
            <div className="icon-menu">
              <FontAwesomeIcon icon={faDiagramProject} className="fs-18" />
              Afiliados
            </div>
          </IonTabButton>

          <IonTabButton tab="tab1" href="/app/perfil" className="text-info">
            <div className="icon-menu">
              <FontAwesomeIcon icon={faUser} className="fs-18" />
              Perfil
            </div>
          </IonTabButton>

          {/*<IonTabButton tab="tab3" onClick={handelLogout}>
            <FontAwesomeIcon icon={faHeart} className="mr-0 float-right" />
            Cerrar sesión
          </IonTabButton>*/}
        </IonTabBar>
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
            Cerrar sesión
          </IonTabButton>
        </IonTabBar> */
