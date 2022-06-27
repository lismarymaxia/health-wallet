import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonIcon,
  IonImg,
  IonButton,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonList,
  useIonViewDidEnter,
  IonSlide,
  IonSlides,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
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
  const slideOpts = {
    initialSlide: 2,
    speed: 400,
    slidesPerView: 2,
    spaceBetween: 30,
  };
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
      {/*<Header title="Health Wallet" isbotton={false} isBuger={true} />*/}

      <IonContent fullscreen>
        <IonGrid className="bg-light">
          <IonRow className="bg-info-alt pt-3 pb-2 text-white">
            <IonCol size="8" className="px-3">
              Lunes, 13 de junio
            </IonCol>
            <IonCol size="4" className="pr-4 fs-20 text-right">
              <FontAwesomeIcon icon={faBell} className="mr-3" />
              <FontAwesomeIcon icon={faShareNodes} className="mr-0" />
            </IonCol>
            <IonCol size="12" className="px-3">
              <h3 className="text-white">¡Hola Usuario!</h3>
            </IonCol>
          </IonRow>

          <IonRow className="bg-info-alt">
            <IonCol size="12" className="px-3 mb-2">
              <IonCard className="m-0">
                <IonCardContent>
                  <IonImg src={"./images/auxiliar-enfermeria.png"} />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="mt-4">
            <IonCol size="12" className="px-3">
              <h5 className="font-w600 fs-16 text-dark">Próximos turnos</h5>
              <IonSlides pager={false} options={slideOpts}>
                <IonSlide>
                  <IonCard
                    className="m-0"
                    style={{ width: "12rem", height: "auto" }}
                  >
                    <IonCardContent>
                      <div className="fs-24 font-w800 d-inline text-info">
                        15 Jun
                      </div>
                      <div className="fs-14 float-right d-inline bg-light py-1 px-2 rounded-sm">
                        17:30
                      </div>
                      <div>
                        <p className="mb-0 fs-16 text-dark">Traumatología</p>
                        <p className="mb-0 text-dark">Dr. Juan Fernando</p>
                      </div>
                    </IonCardContent>
                  </IonCard>{" "}
                </IonSlide>
                <IonSlide>
                  <IonCard
                    className="m-0"
                    style={{ width: "12rem", height: "auto" }}
                  >
                    <IonCardContent>
                      <div className="fs-24 font-w800 d-inline text-info">
                        20 Jun
                      </div>
                      <div className="fs-14 float-right d-inline bg-light py-1 px-2 rounded-sm">
                        09:30
                      </div>
                      <div>
                        <p className="mb-0 fs-16 text-dark">Odontología</p>
                        <p className="mb-0 text-dark">Dra. Maria Camila</p>
                      </div>
                    </IonCardContent>
                  </IonCard>{" "}
                </IonSlide>
                <IonSlide>
                  <IonCard
                    className="m-0"
                    style={{ width: "12rem", height: "auto" }}
                  >
                    <IonCardContent>
                      <div className="fs-24 font-w800 d-inline text-info">
                        25 Jun
                      </div>
                      <div className="fs-14 float-right d-inline bg-light py-1 px-2 rounded-sm">
                        17:30
                      </div>
                      <div>
                        <p className="mb-0 fs-16 text-dark">Traumatología</p>
                        <p className="mb-0 text-dark">Dr. Juan Fernando</p>
                      </div>
                    </IonCardContent>
                  </IonCard>{" "}
                </IonSlide>
              </IonSlides>
            </IonCol>
          </IonRow>

          <IonRow className="mt-4">
            <IonCol size="12" className="px-3">
              <h5 className="font-w600 fs-16 text-dark">
                Mis afiliados favoritos
              </h5>

              <IonCard className="m-0" style={{ height: "auto" }}>
                <IonCardContent>
                  <div className="border-bottom pt-3 pb-4">
                    <IonImg
                      src={"./images/osdl.png"}
                      style={{ width: "60px" }}
                      className="float-left mr-2"
                    />
                    <div className="fs-16 text-info">
                      Centro médico OSDE
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="mr-0 float-right"
                      />
                    </div>
                    <div>
                      <p className="mb-0">Cll 13a #76-52 - Piso 1</p>
                    </div>
                  </div>

                  <div className="pt-3 pb-4">
                    <IonImg
                      src={"./images/osdl.png"}
                      style={{ width: "60px" }}
                      className="float-left mr-2"
                    />
                    <div className="fs-16 text-info">
                      Centro médico OSDE
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="mr-0 float-right"
                      />
                    </div>
                    <div>
                      <p className="mb-0">Cll 13a #76-52 - Piso 1</p>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

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
                    {tiposangre}
                  </div>
                </div>

                <section className="full-width d__flex justify__content__between">
                  <IonButton
                    fill="clear"
                    color="dark"
                    routerLink="/app/datos-editar"
                    className="button__capitalize botton__link"
                  >
                    Ver más
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
                  size="small"
                  style={{ color: "#ffff" }}
                />
                <IonLabel>Consultas</IonLabel>
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
                <IonLabel>Imagenología</IonLabel>
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
