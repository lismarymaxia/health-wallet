import {
  IonContent,
  IonPage,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonFooter,
  IonToast,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Action, CustomField } from "../../components";
import { StoreLocal } from "../../store/action/aut";
import { authentication } from "../../servicios/servicios";
import "./login.css";
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state: any) => state.reducerAuth.stdAuth);
  const [usuario, setUsuario] = useState<string>("esilda.mendoza@gmail.com");
  const [clave, setClave] = useState<string>("maxia");
  const [toast, setToast] = useState(false);
  const [notificacion, setNotificacion] = useState(false);

  useEffect(() => {
    if (auth) {
      history.push("/app");
    }
    return () => {};
  }, [auth, history]);

  const handleLogin = (event: any) => {
    event.preventDefault();
    if (usuario !== "" && clave !== "") {
      let formDa = new FormData();
      formDa.append("op", "dologin");
      formDa.append("correo", usuario);
      formDa.append("clave", clave);
      authentication(formDa)
        .then(function (response) {
          const { data, status } = response;
          if (status === 200) {
            if (data.rsp === 1) {
              dispatch(StoreLocal(data.data));
              setUsuario("");
              setClave("");
            } else {
              setToast(true);
              setUsuario("");
              setClave("");
            }
          }
        })
        .catch(function (err) {
          console.warn("Error:" + err);
        });
    } else {
      setNotificacion(true);
    }
  };

  return (
    <IonPage className="loginPage">
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol
              size="12"
              className="headingText ion-text-start"
              style={{
                color: "#293f76",
                fontSize: "22px",
              }}
            >
              <h2>Health Wallet</h2>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <form>
                <CustomField
                  label="Correo"
                  name={usuario}
                  setName={setUsuario}
                  placeholder="correo@gmail.com"
                  tipo="text"
                />
                <CustomField
                  label="Clave"
                  name={clave}
                  setName={setClave}
                  placeholder="********"
                  tipo="password"
                />
              </form>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12">
              <IonButton
                className="custom-button"
                expand="block"
                type="submit"
                onClick={handleLogin}
              >
                Iniciar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding">
          <Action
            message="No tienes una cuenta?"
            text=" Regístrate"
            link="/registro"
          />
        </IonGrid>
      </IonFooter>
      <IonToast
        isOpen={toast}
        onDidDismiss={() => setToast(false)}
        message="Usuario o clave incorrecta"
        duration={200}
      />
      <IonToast
        isOpen={notificacion}
        onDidDismiss={() => setNotificacion(false)}
        message="Por favor ingrese los valores usuario o clave"
        duration={200}
      />
    </IonPage>
  );
};

export default Login;
