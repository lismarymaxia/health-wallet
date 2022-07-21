import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton,
  IonToast,
  IonLabel,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonList,
} from "@ionic/react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Header } from "../../components";
import { gruposSanguineos } from "../../helpers";
import "../../style/tema.css";
import "./perfil.css";

const PerfilCrear = () => {
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  return (
    <IonPage className="fondo">
      <Header title="Nuevo dependiente" isbotton={true} isBuger={false} />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-3 px-3">
            <IonCol size="12" className="pb-2">
              <h5 className="font-w600 fs-16 text-blue-dark">
                Creación de perfil
              </h5>
            </IonCol>
          </IonRow>

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
                  <IonItem>
                    <IonLabel position="stacked">
                      Nombre <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput value=""> </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      Apellido <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput value=""> </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      N° de documento <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput value=""> </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      Fecha de nacimiento <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput value=""> </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Edad</IonLabel>
                    <IonInput value=""> </IonInput>
                  </IonItem>
                  <IonList>
                    <IonItem>
                      <IonLabel position="stacked">
                        Grupo sanguíneo <span className="text-danger">*</span>
                      </IonLabel>
                      <IonSelect interface="action-sheet" placeholder="Tipo">
                        <IonSelectOption value="A+">A+</IonSelectOption>
                        <IonSelectOption value="A-">A-</IonSelectOption>
                        <IonSelectOption value="B+">B+</IonSelectOption>
                        <IonSelectOption value="B-">B-</IonSelectOption>
                        <IonSelectOption value="AB+">AB+</IonSelectOption>
                        <IonSelectOption value="AB-">AB-</IonSelectOption>
                        <IonSelectOption value="O+">O+</IonSelectOption>
                        <IonSelectOption value="O-">O-</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonList>
                  <IonList>
                    <IonItem>
                      <IonLabel position="stacked">Discapacidad</IonLabel>
                      <IonSelect
                        interface="action-sheet"
                        placeholder="Seleccionar"
                      >
                        <IonSelectOption value="Auditiva">
                          Auditiva
                        </IonSelectOption>
                        <IonSelectOption value="Intelectual">
                          Intelectual
                        </IonSelectOption>
                        <IonSelectOption value="Física">Física</IonSelectOption>
                        <IonSelectOption value="Mental">Mental</IonSelectOption>
                        <IonSelectOption value="Visual">Visual</IonSelectOption>
                        <IonSelectOption value="Visceral">
                          Visceral
                        </IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <span className="fs-12 text-underline text-light cursor-pointer">
                      Cargar carnet de SENADIS
                    </span>
                  </IonList>
                  <IonItem>
                    <IonLabel position="stacked">
                      Enfermedades crónicas
                    </IonLabel>
                    <IonInput value=""> </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Alergias</IonLabel>
                    <IonInput value=""> </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Tratamientos activos</IonLabel>
                    <IonInput value=""> </IonInput>
                  </IonItem>

                  <div className="pt-2 text-center">
                    <IonButton className="border-radius" fill="outline">
                      Guardar perfil
                    </IonButton>
                  </div>
                </IonCardContent>
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

export default PerfilCrear;
