import React, { useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonToolbar,
  IonTitle,
  useIonViewDidEnter,
  IonToast,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useSelector } from "react-redux";
import { servicesWh, serviciosPaciente } from "../../servicios/servicios";
import { CustomFieldOnblur } from "../../components";
import { Alergias, Enfermedades } from "./listados";
import "./datos.css";
const EditDatos: React.FC = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const { id } = user;

  const [sangre, setSangre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [idRegistro, setIdRegistro] = useState("");

  const [listadoA, setListadoA] = useState<Array<string>>([]);
  const [listadoB, setListadoB] = useState<Array<string>>([]);

  const [notificacion, setNotificacion] = useState({ msg: "", estado: false });
  const { estado, msg } = notificacion;

  useIonViewDidEnter(() => {
    servicesWh
      .get("/controller/pacienteback.php", {
        params: {
          op: "getPacienteId",
          id: id,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data.rsp === 1) {
            setSangre(data.sangre);
            setIdRegistro(data.id);
            setListadoA(data.alergias);
            setListadoB(data.enfermedades);
            setTelefono(data.numeroemergencia);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  });

  const handleSubmitTipoSangre = () => {
    let formDa = new FormData();
    if (sangre === "") {
      setNotificacion({
        msg: "Por favor ingrese el tipo de sangre",
        estado: true,
      });
    } else {
      formDa.append("op", "editPaciente");
      formDa.append("id", idRegistro);
      formDa.append("tiposangre", sangre);
      formDa.append("telefono", telefono);
      serviciosPaciente(formDa)
        .then(function (response) {
          const { data, status } = response;
          if (status === 200) {
            if (data.rsp === 1) {
              setNotificacion({
                msg: data.msg,
                estado: true,
              });
            } else {
              setNotificacion({
                msg: data.msg,
                estado: true,
              });
            }
          }
        })
        .catch(function (err) {
          console.warn("Error:" + err);
        });
    }
  };

  return (
    <IonPage className="page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle
            style={{
              color: "#293f76",
              fontSize: "22px",
            }}
          >
            Información General
          </IonTitle>
          <IonButton
            slot="start"
            routerLink="/app/home"
            color="light"
            fill="clear"
          >
            <IonIcon icon={arrowBackOutline} style={{ color: "black" }} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <CustomFieldOnblur
                label="Tipo de sangre"
                name={sangre}
                setName={setSangre}
                placeholder=""
                tipo="text"
                handleSave={handleSubmitTipoSangre}
              />
            </IonCol>
            <IonCol size="12">
              <CustomFieldOnblur
                label="Teléfono"
                name={telefono}
                setName={setTelefono}
                placeholder=""
                tipo="text"
                handleSave={handleSubmitTipoSangre}
              />
            </IonCol>
            <Enfermedades listado={listadoB} setListado={setListadoB} />
            <Alergias listado={listadoA} setListado={setListadoA} />
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonToast
        isOpen={estado}
        onDidDismiss={() => setNotificacion({ ...notificacion, estado: false })}
        message={msg}
        duration={500}
      />
    </IonPage>
  );
};
export default EditDatos;

/*
ismary no sabes si el aumento del 10% se realizara para esta quincena,porque sabes ayer bogdan me escribio para avisarme sobre el depostio de mi quincena donde me explico que no tenia usdt pero que habia cuadrado para realizarme deposito, pero el cuando me dio el ejemplo de cuanto seria me lo explico con el monto de 240$ y con el aumento seria otro monto,
*/
