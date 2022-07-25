import { useState, useEffect } from "react";
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
  IonToggle,
  IonButton,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import { getEnfermedad } from "../../../servicios/servicios";
import { useListado } from "../../../hook";
import { INITIALPERFIL, filterNombre } from "../../../helpers";

const PerfilEnfermedades = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [
    handleAddAll,
    handleAddItem,
    handleDeletItem,
    handleUpdateItem,
    listado,
  ] = useListado();
  const [perfil, setPerfil] = useState(INITIALPERFIL);
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });
  const [checked, setChecked] = useState(false);

  const handleFilter = (valor: string) => {
    getEnfermedad(valor)
      .then((rsp: any) => {
        const { data } = rsp;
        return data.data;
      })
      .catch((error) => {
        console.error("Error en peticion perfil" + error);
      });
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: any) => void
  ) => {
    setTimeout(() => {
      callback(handleFilter(inputValue));
    }, 1000);
  };
  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, "");
    console.log(inputValue);
    return inputValue;
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

            <span className="font-w500 fs-14 d-block">{perfil.nombre}</span>
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
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadOptions}
                    onInputChange={handleInputChange}
                  />
                  <IonItem>
                    <IonLabel>Activa: {checked ? "Si" : "No"}</IonLabel>
                    <IonToggle
                      checked={checked}
                      onIonChange={(e) => setChecked(e.detail.checked)}
                    />
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
                    Listado de alergias
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
