import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonIcon,
  IonButton,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonList,
  useIonViewDidEnter,
} from "@ionic/react";
import {
  personSharp,
  pulseSharp,
  alertCircleSharp,
  archiveSharp,
} from "ionicons/icons";
import { useSelector } from "react-redux";
import { servicesWh } from "../../servicios/servicios";
import { Header } from "../../components";
import "./home.css";

const Home: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>({
    cedula: "",
    nombre: "",
    telefono: "",
    celular: "",
    direccion: "",
    sexo: "",
    fechanacimiento: "",
    edad: "",
    tiposangre: "",
  });
  const { nombre, sexo, fechanacimiento, edad, tiposangre } = data;

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
    <IonPage className="fondo">
      <Header title="Health Wallet" isbotton={false} isBuger={true} />
      <IonContent fullscreen>
        <IonList
          className="acordion__fondo"
          inset={true}
          style={{ borderRadius: "10px" }}
        >
          <IonAccordionGroup value="colors">
            <IonAccordion value="colors">
              <IonItem slot="header" lines="none">
                <IonIcon
                  icon={personSharp}
                  className="ion-margin-end"
                  size="small"
                  style={{ color: "#ffff" }}
                />
                <IonLabel>Datos</IonLabel>
              </IonItem>

              <IonList slot="content" className="content__item_acordion">
                <div className="acordion__item__content">
                  <div className="acordion__item__label">Nombre:</div>
                  <div
                    className="acordion__item__note"
                    slot="end"
                    color="secondary"
                  >
                    {nombre}
                  </div>
                </div>
                <div className="acordion__item__content">
                  <div className="acordion__item__label">Cédula:</div>
                  <div
                    className="acordion__item__note"
                    slot="end"
                    color="secondary"
                  >
                    {cedula}
                  </div>
                </div>
                <div className="acordion__item__content">
                  <div className="acordion__item__label">Fecha nacimiento:</div>
                  <div
                    className="acordion__item__note"
                    slot="end"
                    color="secondary"
                  >
                    {fechanacimiento}
                  </div>
                </div>
                <div className="acordion__item__content">
                  <div className="acordion__item__label">Sexo:</div>
                  <div
                    className="acordion__item__note"
                    slot="end"
                    color="secondary"
                  >
                    {sexo}
                  </div>
                </div>
                <div className="acordion__item__content">
                  <div className="acordion__item__label">Edad:</div>
                  <div
                    className="acordion__item__note"
                    slot="end"
                    color="secondary"
                  >
                    {edad}
                  </div>
                </div>
                <div className="acordion__item__content">
                  <div className="acordion__item__label">Tipo de sangre:</div>
                  <div
                    className="acordion__item__note"
                    slot="end"
                    color="secondary"
                  >
                    <b>{tiposangre}</b>
                  </div>
                </div>

                <section className="full-width d__flex justify__content__between">
                  <IonButton
                    fill="clear"
                    color="dark"
                    routerLink="/app/datos-editar"
                    className="button__capitalize botton__link"
                  >
                    ver mas
                  </IonButton>

                  <IonButton
                    fill="clear"
                    color="dark"
                    routerLink="/app/datos-editar"
                    className="button__capitalize botton__link"
                  >
                    Editar
                  </IonButton>
                </section>
              </IonList>
            </IonAccordion>
            <IonAccordion value="shapes">
              <IonItem slot="header" lines="none">
                <IonIcon
                  icon={pulseSharp}
                  className="ion-margin-end"
                  size="outline"
                  style={{ color: "#ffff" }}
                />
                <IonLabel>Consulta</IonLabel>
              </IonItem>

              <IonList slot="content">
                <section className="full-width">
                  <IonButton
                    expand="full"
                    fill="clear"
                    color="dark"
                    routerLink="/app/consultas"
                    className="button__capitalize botton__link"
                  >
                    Ver más
                  </IonButton>
                </section>
              </IonList>
            </IonAccordion>
            <IonAccordion value="numbers">
              <IonItem slot="header" lines="none">
                <IonIcon
                  icon={alertCircleSharp}
                  className="ion-margin-end"
                  size="small"
                  style={{ color: "#ffff" }}
                />
                <IonLabel>Imagenologia</IonLabel>
              </IonItem>

              <IonList slot="content">
                <section className="full-width">
                  <IonButton
                    expand="full"
                    fill="clear"
                    color="dark"
                    routerLink="/app/imagenologia"
                    className="button__capitalize botton__link"
                  >
                    Ver más
                  </IonButton>
                </section>
              </IonList>
            </IonAccordion>
            <IonAccordion value="number">
              <IonItem slot="header" lines="none">
                <IonIcon
                  icon={archiveSharp}
                  className="ion-margin-end"
                  size="small"
                  style={{ color: "#ffff" }}
                />
                <IonLabel>Laboratorio</IonLabel>
              </IonItem>

              <IonList slot="content">
                <section className="full-width">
                  <IonButton
                    expand="full"
                    fill="clear"
                    color="dark"
                    routerLink="/app/laboratorio"
                    className="button__capitalize botton__link"
                  >
                    Ver más
                  </IonButton>
                </section>
              </IonList>
            </IonAccordion>
          </IonAccordionGroup>
        </IonList>
        {/*-- Open Accordion --*/}
      </IonContent>
    </IonPage>
  );
};

export default Home;
