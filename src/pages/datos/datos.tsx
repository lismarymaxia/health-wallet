import React, { useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonCardSubtitle,
  IonCardTitle,
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
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSkeletonText,
} from "@ionic/react";

import "./datos.css";
import {
  arrowBackOutline,
  personCircleSharp,
  createOutline,
} from "ionicons/icons";
import { useSelector } from "react-redux";
import { servicesWh } from "../../servicios/servicios";
const Datos: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>({
    idconsulta: "",
    ultimavisita: "",
    correo: "",
    cedula: "",
    nombre: "",
    telefono: "",
    celular: "",
    nombremedico: "",
    nombreespecialista: "",
    direccion: "",
    daten: "",
    servicio: "",
    frecuencia: "",
    sexo: "",
    diagnostico: "",
    fechanacimiento: "",
    edad: "",
  });
  const { nombre, telefono, celular, direccion, sexo, fechanacimiento, edad } =
    data;

  useIonViewDidEnter(() => {
    servicesWh
      .get("/controller/api.php", {
        params: {
          op: "registro",
          id: cedula,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            setData(data.data);
          } else {
            setLoad(false);
            setData({});
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  });

  return (
    <IonPage className="page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle
            style={{
              color: "#0e6251",
              fontSize: "18px",
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
              <IonCard className="color__card__datos">
                <IonItem>
                  <IonTitle
                    style={{
                      color: "#0e6251",
                    }}
                  >
                    Paciente
                  </IonTitle>
                </IonItem>
                <IonCardContent className="custom__card">
                  <div className="avatar__content">
                    <IonAvatar className="avatar">
                      {/*<img src={user} alt="" />*/}
                      <IonIcon
                        icon={personCircleSharp}
                        style={{ color: "#ffffff" }}
                      />
                    </IonAvatar>
                  </div>
                  <div className="info__datos">
                    {load ? (
                      <div className="ion-padding custom-skeleton">
                        <IonSkeletonText
                          animated
                          style={{ width: "60%" }}
                          slot="center"
                        />
                        <IonSkeletonText animated />
                        <IonSkeletonText animated style={{ width: "88%" }} />
                        <IonSkeletonText animated style={{ width: "70%" }} />
                        <IonSkeletonText animated style={{ width: "60%" }} />
                        <IonSkeletonText animated style={{ width: "70%" }} />
                        <IonSkeletonText animated style={{ width: "80%" }} />
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </div>
                    ) : (
                      <>
                        <IonCardTitle className="ion-text-center">
                          <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
                            {nombre}
                          </h2>
                          <p>Cédula: {cedula}</p>
                        </IonCardTitle>
                        <IonCardSubtitle className="ion-text-center">
                          <p>
                            <IonLabel color="light">Sexo: {sexo}</IonLabel>
                          </p>
                          <p>
                            <IonLabel color="light">
                              {" "}
                              Fecha de nacimiento: {fechanacimiento}
                            </IonLabel>
                          </p>
                          <p>
                            <IonLabel color="light">Edad: {edad}</IonLabel>
                          </p>
                          <p>
                            <IonLabel color="light">
                              Teléfono: {telefono}
                            </IonLabel>
                          </p>
                          <p>
                            <IonLabel color="light">
                              Celular: {celular}
                            </IonLabel>
                          </p>
                          <p>
                            <IonLabel color="light">
                              Dirección: {direccion}
                            </IonLabel>
                          </p>
                        </IonCardSubtitle>
                      </>
                    )}
                    <br />
                  </div>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <IonButton
                      slot="start"
                      routerLink="/app/datos-editar"
                      color="light"
                      fill="clear"
                    >
                      Editar perfil
                      <IonIcon
                        icon={createOutline}
                        style={{
                          fontSize: "1.5rem",
                          color: "#ffffff",
                          marginLeft: "10px",
                        }}
                      />
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Datos;
