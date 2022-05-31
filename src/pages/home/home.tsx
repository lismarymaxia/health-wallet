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
  });
  const { nombre, sexo, fechanacimiento, edad } = data;

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
                <section className="full-width">
                  <IonButton
                    expand="full"
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
/*
<div className="fondo">
          <div className="slider">
            <div
              className="item__card item__card_opacity__6"
              style={{ top: 40 }}
            >
              <IonButton
                fill="clear"
                style={{ background: "#48c9b0", color: "#ffff" }}
                routerLink="/app/datos"
              >
                <IonIcon
                  icon={personSharp}
                  className="ion-margin-end"
                  size="small"
                />
                Datos
              </IonButton>
            </div>
            <div
              className="item__card item__card_opacity__5"
              style={{ top: 80 }}
            >
              <IonButton
                fill="clear"
                style={{ background: "#1abc9c", color: "#ffff" }}
                routerLink="/app/consultas"
              >
                <IonIcon
                  icon={pulseSharp}
                  className="ion-margin-end"
                  size="outline"
                  style={{ color: "dark" }}
                />
                Consulta
              </IonButton>
            </div>
            <div
              className="item__card item__card_opacity__4"
              style={{ top: 120 }}
            >
              <IonButton
                fill="clear"
                style={{ background: "#17a589", color: "#ffff" }}
                routerLink="/app/imagenologia"
              >
                <IonIcon
                  icon={alertCircleSharp}
                  className="ion-margin-end"
                  size="small"
                />
                Imagenología
              </IonButton>
            </div>
            <div
              className="item__card item__card_opacity__3"
              style={{ top: 160 }}
            >
              <IonButton
                fill="clear"
                style={{ background: "#148f77", color: "#ffff" }}
                routerLink="/app/laboratorio"
              >
                <IonIcon
                  icon={archiveSharp}
                  className="ion-margin-end"
                  size="small"
                />
                Laboratorio
              </IonButton>
            </div>
          </div>
        </div>

*/
/*<div className="item__card item__card_opacity__2"
              style={{ top: 200 }}>
      <IonButton
                fill="clear"
                style={{ background: "#117864", color: "#ffff" }}>
        <IonIcon
                  icon={heartSharp}
                  className="ion-margin-end"
                  size="small"
                />
                Registro de Vacunación
              </IonButton>
            </div>
            <div
              className="item__card item__card_opacity__1"
              style={{ top: 240 }}
            >
              <IonButton
                fill="clear"
                style={{ background: "#0e6251", color: "#ffff" }}
                routerLink="/app/post"
              >
                <IonIcon icon={receiptSharp} className="ion-margin-end" />
                Medicamentos por Tratatamientos
              </IonButton>
            </div>
            <div
              className="item__card item__card_opacity__2"
              style={{ top: 280 }}
            >
              <IonButton
                fill="clear"
                style={{ background: "#17a589", color: "black" }}
              >
                {" "}
                <IonIcon
                  icon={bagAddSharp}
                  className="ion-margin-end"
                  size="small"
                />
                Medicamentos
              </IonButton>
            </div>
            <div
              className="item__card item__card_opacity__1"
              style={{ top: 320 }}
            >
              <IonButton
                fill="clear"
                style={{ background: "#16a085", color: "black" }}
              >
                <IonIcon
                  icon={calendarSharp}
                  className="ion-margin-end"
                  size="small"
                />
                Citas
              </IonButton>
  </div>*/
