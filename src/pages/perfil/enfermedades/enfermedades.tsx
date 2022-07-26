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
  IonToast,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import { getEnfermedad } from "../../../servicios/servicios";
import { useListado } from "../../../hook";
import { filterNombre } from "../../../helpers";

const PerfilEnfermedades = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [
    handleAddAll,
    handleAddItem,
    handleDeletItem,
    handleUpdateItem,
    listado,
  ] = useListado();
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });
  const [select, setSelect] = useState(null);

  const loadOptions = (input: string, callback: any) => {
    getEnfermedad(input)
      .then((rsp: any) => {
        const { data } = rsp;
        callback(data.data);
      })
      .catch((error) => {
        console.error("Error en peticion enfermedades" + error);
      });
  };

  return (
    <IonPage className="fondo">
      <IonHeader>
        <div className="p-perfil bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle
              className="fs-16 font-w700"
              style={{ paddingLeft: "12%" }}
            >
              Alergias activas
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
              <IonImg src={`./images/${user?.imagen}`} />
            </IonThumbnail>

            <span className="font-w500 fs-14 d-block">{user.nombre}</span>
            <span className="fs-12">Cabeza de familia</span>
          </div>
        </div>
      </IonHeader>

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow>
            <IonCol size="12" className="px-3">
              <IonCard className="m-0 mb-2 pb-2 card-slide">
                <IonCardContent>
                  <div className="text-center subir-perfil">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="cursor-pointer text-info fs-18"
                    />
                  </div>
                  <div className="pr-3">
                    <span className="text-dark">Enfermedad *</span>
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      value={select}
                      onChange={setSelect}
                      loadOptions={loadOptions}
                    />
                  </div>
                  <IonItem>
                    <IonLabel position="stacked">
                      Tratamiento <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput name="nombre"></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      Frecuencias <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput name="nombre"></IonInput>
                  </IonItem>
                  <div className="pt-2 text-center">
                    <IonButton className="border-radius" fill="outline">
                      agregar
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonRow>
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Listado de enfermedades
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard
                className="m-0 card-slide shadow-full"
                style={{ height: "auto" }}
              >
                <IonCardContent className="card-content-slide"></IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonToast
        isOpen={notificacion.estado}
        onDidDismiss={() => setNotificacion({ ...notificacion, estado: false })}
        message={notificacion.msg}
        duration={500}
      />
    </IonPage>
  );
};

export default PerfilEnfermedades;
