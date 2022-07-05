import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faStethoscope,
  faClipboardList,
  faDiagramProject,
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
  Perfil,
  PerfilTratamientos,
  Notificaciones,
  ProximasCitas,
  DetalleCita,
  DetalleConsulta,
  Soporte,
} from "../pages";
import { Nav } from "../components";
import { useSelector } from "react-redux";
import "../style/tema.css";
setupIonicReact();

const RutasPrivadas: React.FC = () => {
  const isAuth: any = useSelector<any>((state) => state.reducerAuth.stdAuth);

  const history = useHistory();

  useEffect(() => {
    if (!isAuth) {
      history.replace("/");
    }
  }, [history, isAuth]);
  const location = useLocation();
  const { pathname } = location;

  const active = (ruta: string) => {
    if (ruta === pathname) {
      return "active";
    } else {
      return "";
    }
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
          <Route exact path="/app/perfil">
            <Perfil />
          </Route>
          <Route exact path="/app/perfiles">
            <Perfil />
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
            <Redirect to="/app/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className={`bar-menu ${pathname === "/app/soporte" ? "d-none" : ""}`}>
          <IonTabButton tab="tab1" href="/app/home" className="text-info">
            <div className={`icon-menu  ${active("/app/home")}`}>
              <FontAwesomeIcon icon={faHome} className="fs-18 w-100" />
              Inicio
            </div>
          </IonTabButton>

          <IonTabButton tab="tab2" href="/app/consultas" className="text-info">
            <div className={`icon-menu  ${active("/app/consultas")}`}>
              <FontAwesomeIcon icon={faStethoscope} className="fs-18 w-100" />
              Consultas
            </div>
          </IonTabButton>

          <IonTabButton tab="tab3" href="/app/estudios" className="text-info">
            <div className={`icon-menu  ${active("/app/estudios")}`}>
              <FontAwesomeIcon icon={faClipboardList} className="fs-18 w-100" />
              Estudios
            </div>
          </IonTabButton>

          <IonTabButton tab="tab4" href="/app/afiliados" className="text-info">
            <div className={`icon-menu  ${active("/app/afiliados")}`}>
              <FontAwesomeIcon icon={faDiagramProject} className="fs-18 w-100" />
              Afiliados
            </div>
          </IonTabButton>

          <IonTabButton tab="tab5" href="/app/perfil" className="text-info">
            <div className={`icon-menu  ${active("/app/perfil")}`}>
              <FontAwesomeIcon icon={faUser} className="fs-18 w-100" />
              Perfil
            </div>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};
export default RutasPrivadas;
