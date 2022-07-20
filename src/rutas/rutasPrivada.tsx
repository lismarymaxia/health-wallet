import React, { useEffect } from "react";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faClipboardList,
  faDiagramProject,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Nav } from "../components";
import {
  Cuentas,
  Home,
  Datos,
  EditDatos,
  Consultas,
  Consulta,
  Imagenologia,
  Laboratorio,
  ExamenLab,
  Afiliados,
  Afiliado,
  Perfil,
  Perfiles,
  PerfilCrear,
  PerfilTratamientos,
  Notificaciones,
  ProximasCitas,
  DetalleCita,
  DetalleConsulta,
  Soporte,
} from "../pages";
import { logout } from "../store";
import { tabActive } from "../helpers";
import "../style/tema.css";

const RutasPrivadas: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const isAuth: any = useSelector<any>((state) => state.reducerAuth.stdAuth);

  const history = useHistory();

  useEffect(() => {
    if (!isAuth) {
      history.replace("/");
    }
  }, [history, isAuth]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Nav />
      <IonTabs>
        <IonRouterOutlet id="navApp">
          <Route exact path="/app/cuentas">
            <Cuentas />
          </Route>
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
          <Route path="/app/laboratorio">
            <Laboratorio />
          </Route>
          <Route path="/app/laboratorio-examen/:id">
            <ExamenLab />
          </Route>
          <Route exact path="/app/afiliados">
            <Afiliados />
          </Route>
          <Route exact path="/app/afiliado/:id">
            <Afiliado />
          </Route>
          <Route exact path="/app/perfil">
            <Perfil />
          </Route>
          <Route exact path="/app/perfiles">
            <Perfiles />
          </Route>
          <Route exact path="/app/perfil-crear">
            <PerfilCrear />
          </Route>
          <Route exact path="/app/perfil-alergias">
            <PerfilTratamientos />
          </Route>
          <Route exact path="/app/perfil-enfermedades">
            <PerfilTratamientos />
          </Route>
          <Route exact path="/app/perfil-tratamientos">
            <PerfilTratamientos />
          </Route>
          <Route exact path="/app/notificaciones">
            <Notificaciones />
          </Route>
          <Route exact path="/app/proximas-citas">
            <ProximasCitas />
          </Route>
          <Route exact path="/app/detalle-cita">
            <DetalleCita />
          </Route>
          <Route exact path="/app/detalle-consulta/:id">
            <DetalleConsulta />
          </Route>
          <Route exact path="/app/soporte">
            <Soporte />
          </Route>
          <Route exact path="/app">
            <Redirect to="/app/cuentas" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar
          slot="bottom"
          className={`bar-menu ${pathname === "/app/soporte" ? "d-none" : ""}`}
        >
          <IonTabButton tab="tab1" href="/app/home" className="text-info">
            <div className={`icon-menu  ${tabActive("/app/home", pathname)}`}>
              <FontAwesomeIcon icon={faHome} className="fs-18 w-100" />
              Inicio
            </div>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/app/consultas" className="text-info">
            <div
              className={`icon-menu  ${tabActive("/app/consultas", pathname)}`}
            >
              <FontAwesomeIcon icon={faClipboardList} className="fs-18 w-100" />
              Estudios
            </div>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/app/afiliados" className="text-info">
            <div
              className={`icon-menu  ${tabActive("/app/afiliados", pathname)}`}
            >
              <FontAwesomeIcon
                icon={faDiagramProject}
                className="fs-18 w-100"
              />
              Afiliados
            </div>
          </IonTabButton>
          <IonTabButton
            tab="tab5"
            href="/app/perfil-crear"
            className="text-info"
          >
            <div
              className={`icon-menu  ${tabActive(
                "/app/perfil-crear",
                pathname
              )}`}
            >
              <FontAwesomeIcon icon={faUser} className="fs-18 w-100" />
              Perfil
            </div>
          </IonTabButton>
          <IonTabButton tab="tab6" className="text-info">
            <div onClick={handleLogout}>
              <FontAwesomeIcon icon={faArrowRight} className="fs-18 w-100" />
              cerrar
            </div>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};
export default RutasPrivadas;
