import React, { useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonPage,
  IonRow,
  IonLabel,
  IonItem,
  IonCheckbox,
  IonToast,
} from "@ionic/react";
import { Action, CustomField } from "../../components";
import "./registro.css";
import { registroUsuario } from "../../servicios";
const Registro = () => {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [condicion, setCondicion] = useState(false);
  const [clave, setClave] = useState("");
  const [toast, setToast] = useState(false);

  const [notificacion, setNotificacion] = useState<any>({
    estado: false,
    msg: "",
  });
  const { estado, msg } = notificacion;

  const reset = () => {
    setCedula("");
    setNombre("");
    setApellido("");
    setCorreo("");
    setCondicion(false);
    setClave("");
  };
  const createAccount = () => {
    if (condicion === true) {
      let formDa = new FormData();
      formDa.append("op", "addUsuario");
      formDa.append("cedula", cedula);
      formDa.append("nombre", nombre);
      formDa.append("apellido", apellido);
      formDa.append("correo", correo);
      formDa.append("clave", clave);
      registroUsuario(formDa)
        .then(function (response) {
          const { data, status } = response;
          if (status === 200) {
            if (data.rsp === 1) {
              setNotificacion({ estado: true, msg: data.msg });
              reset();
            } else {
              setNotificacion({ estado: true, msg: data.msg });
            }
          }
        })
        .catch(function (err) {
          console.warn("Error:" + err);
        });
    } else {
      setToast(true);
    }
  };

  return (
    <IonPage className="signupPage">
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="12" className="headingText ion-text-center">
              <h2>Registro</h2>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <form>
                <CustomField
                  label="Nombre"
                  name={nombre}
                  setName={setNombre}
                  placeholder=""
                  tipo="text"
                />
                <CustomField
                  label="Apellido"
                  name={apellido}
                  setName={setApellido}
                  placeholder=""
                  tipo="text"
                />
                <CustomField
                  label="Correo"
                  name={correo}
                  setName={setCorreo}
                  placeholder=""
                  tipo="text"
                />
                <CustomField
                  label="Cédula"
                  name={cedula}
                  setName={setCedula}
                  placeholder=""
                  tipo="text"
                />
                <CustomField
                  label="Clave"
                  name={clave}
                  setName={setClave}
                  placeholder=""
                  tipo="password"
                />

                <IonItem>
                  <IonLabel>Acepto la condiciones</IonLabel>
                  <IonCheckbox
                    checked={condicion}
                    onIonChange={(e) => setCondicion(e.detail.checked)}
                  />
                </IonItem>
              </form>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12">
              <IonButton
                className="custom-button"
                expand="block"
                onClick={createAccount}
              >
                Crear cuenta
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding">
          <Action
            message="¿Ya tienes una cuenta?"
            text="Iniciar sesión"
            link="/login"
          />
        </IonGrid>
      </IonFooter>
      <IonToast
        isOpen={toast}
        onDidDismiss={() => setToast(false)}
        message="Por favor acepte las condiciones"
        duration={200}
      />
      <IonToast
        isOpen={estado}
        onDidDismiss={() => setNotificacion({ ...notificacion, estado: false })}
        message={msg}
        duration={200}
      />
    </IonPage>
  );
};

export default Registro;
