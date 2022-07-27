import { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonThumbnail,
  IonImg,
  IonItem,
  useIonViewDidEnter,
  IonBadge,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { chevronBackOutline } from "ionicons/icons";
import { INITIALPERFIL, fechaPerfil } from "../../helpers";
import { getFichaCompleta } from "../../servicios/servicios";
import "./perfil.css";

const FichaCompleta = () => {
  const [perfil, setPerfil] = useState(INITIALPERFIL);
  const [alergias, setAlergias] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);
  const [discapacidades, setDiscapacidades] = useState([]);
  const user = useSelector((state: any) => state.reducerAuth.user);
  useIonViewDidEnter(() => {
    getFichaCompleta(user.idpaciente)
      .then((rsp: any) => {
        const { data } = rsp;
        setPerfil(data.data);
        setDiscapacidades(data.discapacidades);
        setAlergias(data.alergias);
        setEnfermedades(data.enfermedades);
      })
      .catch((error) => {
        console.error("Error en get perfiles" + error);
      });
  });
  return (
    <IonPage className="fondo">
      <IonHeader>
        <div className="p-perfil-sub bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle
              className="fs-16 font-w700"
              style={{ paddingLeft: "12%" }}
            >
              Perfil
            </IonTitle>
            <IonButtons slot="start">
              <IonBackButton
                icon={chevronBackOutline}
                text=""
                className="custom-back text-white"
              />
            </IonButtons>
          </IonToolbar>
          <div className="mx-3 pb-4 text-white">
            <IonThumbnail slot="start" class="float-left mr-3">
              <IonImg src={`./images/${perfil?.imagen}`} />
            </IonThumbnail>

            <span className="font-w500 fs-14 d-block">{perfil.nombre}</span>
            <span className="fs-12">Cabeza de familia</span>
          </div>
        </div>
      </IonHeader>

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonRow>
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Ficha completa
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard
                className="m-0 card-slide shadow-full"
                style={{ height: "auto" }}
              >
                <IonCardContent className="card-content-slide">
                  <IonItem>
                    <div className="w-100 pb-1">
                      <div className="fs-12">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-info-dark mr-2 fs-6"
                        />
                        Fecha de nacimiento
                      </div>
                      <div className="fs-13 font-w500 pl-3">
                        {fechaPerfil(perfil.fechanacimiento)}
                      </div>
                    </div>
                  </IonItem>
                  <IonItem>
                    <div className="w-100 pt-3 pb-1">
                      <div className="fs-12">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-info-dark mr-2 fs-6"
                        />
                        Tipo de sangre
                      </div>
                      <div className="fs-13 font-w500 pl-3">
                        {perfil.gruposangre}
                      </div>
                    </div>
                  </IonItem>
                  <IonItem>
                    <div className="w-100 pt-3 pb-1">
                      <div className="fs-12">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-info-dark mr-2 fs-6"
                        />
                        Discapacidad
                      </div>
                      <div className="fs-13 font-w500 pl-3">
                        <ul>
                          {discapacidades.map((item: any, index: number) => (
                            <div key={index}>
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="text-info-dark mr-2 fs-6"
                              />
                              <span>{item.nombre}</span>
                            </div>
                          ))}
                        </ul>
                        <span className="text-light float-right">
                          Ver carnet de SENADIS
                        </span>
                      </div>
                    </div>
                  </IonItem>
                  <IonItem>
                    <div className="w-100 pt-3 pb-1">
                      <div className="fs-12">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-info-dark mr-2 fs-6"
                        />
                        Enfermedades
                      </div>
                      <div className="fs-13 font-w500 pl-3">
                        <ul>
                          {enfermedades.map((item: any, index: number) => (
                            <div key={index}>
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="text-info-dark mr-2 fs-6"
                              />
                              <span>{item.nombre}</span>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </IonItem>
                  <IonItem>
                    <div className="w-100 pt-3 pb-1">
                      <div className="fs-12">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-info-dark mr-2 fs-6"
                        />
                        Alergias
                      </div>
                      <div className="fs-13 font-w500 pl-3">
                        <ul>
                          {alergias.map((item: any, index: number) => (
                            <div key={index} className="mb-2">
                              <p>Grupo:{item.grupo}</p>
                              <p>Alergia:{item.alergia}</p>
                              <p>Estado:{item.estado}</p>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default FichaCompleta;
