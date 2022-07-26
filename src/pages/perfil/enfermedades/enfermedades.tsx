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
import { HeaderPerfil } from "../../../components";

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

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? '#3B72A2' : 'gray',
      fontWeight: '500',
      padding: '8px',
      backgroundColor: state.isFocused  ? '#eaecf0' : 'white',
    }),
    menu: () => ({      
      border: '1px solid #ccc',
      borderRadius: '0 0 0.4rem 0.4rem'
    }),
  }

  const noOptionsMessage = 'No hay'

  return (
    <IonPage className="fondo">
      <HeaderPerfil title='Enfermedades' />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow>
            <IonCol size="12" className="px-3">
              <IonCard className="m-0 mb-2 mt-4 pb-2 card-slide">
                <IonCardContent>
                  <div className="pr-3">
                    <span className="text-dark">Enfermedad *</span>
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      value={select}
                      onChange={setSelect}
                      loadOptions={loadOptions}
                      placeholder={'Seleccionar'}
                      noOptionsMessage={() => "Escriba la enfermedad"}
                      styles={customStyles}                      
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
function chroma(color: any) {
  throw new Error("Function not implemented.");
}

