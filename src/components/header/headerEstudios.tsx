import {
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicroscope,
  faStethoscope,
  faXRay,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router";

const HeaderEstudios: React.FC<{
  title: string;
}> = ({ title }) => {
  const path = useLocation();
  const history = useHistory();
  const handleLink = (ruta: string) => {
    history.push(ruta);
  };

  return (
    <IonHeader>
      <div className="p-perfil bg-info-alt border-radius-bottom">
        <IonToolbar>
          <IonTitle className="fs-16 font-w600 text-center">{title}</IonTitle>
          {/*<IonButtons slot="start">
              <IonBackButton
                icon={chevronBackOutline}
                text=""
                className="custom-back text-white"
              />
  </IonButtons>*/}
        </IonToolbar>
        <IonRow className="mt-4 pb-3">
          <IonCol
            size="4"
            className="pl-2 pr-1"
            onClick={() => {
              handleLink("/app/imagenologia");
            }}
          >
            <IonCard
              className={`m-0 card-slide px-2 box-op ${
                path.pathname === "/app/imagenologia" ? "active" : ""
              }`}
            >
              <IonCardContent className="card-content-slide text-center fs-12 py-2 px-0">
                <span>
                  <FontAwesomeIcon icon={faXRay} className="mr-0 fs-16" />
                </span>
                <span className="d-block">Imagenología</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="4" className="px-2">
            <IonCard
              className={`m-0 card-slide px-2 box-op ${
                path.pathname === "/app/laboratorio" ? "active" : ""
              }`}
              onClick={() => {
                handleLink("/app/laboratorio");
              }}
            >
              <IonCardContent className="card-content-slide text-center fs-12 py-2 px-0">
                <span>
                  <FontAwesomeIcon icon={faMicroscope} className="mr-0 fs-16" />
                </span>
                <span className="d-block">Laboratorios</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol
            size="4"
            className="pl-1 pr-2"
            onClick={() => {
              handleLink("/app/consultas");
            }}
          >
            <IonCard
              className={`m-0 card-slide px-2 box-op ${
                path.pathname === "/app/consultas" ? "active" : ""
              }`}
            >
              <IonCardContent className="card-content-slide text-center fs-12 py-2 px-0">
                <span>
                  <FontAwesomeIcon
                    icon={faStethoscope}
                    className="mr-0 fs-16"
                  />
                </span>
                <span className="d-block">Consultas</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </div>
    </IonHeader>
  );
};

export default HeaderEstudios;
