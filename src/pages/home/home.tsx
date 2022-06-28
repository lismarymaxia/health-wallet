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
import { Header, Boxfull } from "../../components";
import { useHistory } from "react-router";
import "./home.css";
import "../../style/tema.css";

const Home: React.FC = () => {
  const history = useHistory(); 
  const handelNotificaciones=()=>{
    history.push("/app/notificaciones");
  }
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);
  const slideOpts = {
    initialSlide: 0,
    speed: 200,
    slidesPerView: 1.7,
    spaceBetween: 20,
    //autoplay:true,
    //loop: true
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
            //setData(data.data);
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

      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light pb-4">
          <IonRow className="bg-info-alt pt-3 pb-2 text-white">
            <IonCol size="12" className="px-3 fs-13">
              Lunes, 13 de junio
              <FontAwesomeIcon icon={faBell} className="mr-0 float-right fs-18" onClick={handelNotificaciones}/>
            </IonCol>
            <IonCol size="12" className="px-3">
              <div className="fs-20 font-w600 text-white">¡Hola Usuario!</div>
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
                  <IonCard className="m-0 card-slide slide-mini">
                    <IonCardContent className="card-content-slide">
                      <div className="fs-23 font-w800 d-inline text-info">
                        15 Jun
                      </div>
                      <div className="float-right d-inline box-grey">
                        17:30
                      </div>
                      <div>
                        <p className="mb-0 fs-15 font-w400 text-dark">Traumatología</p>
                        <p className="mb-0 fs-12 text-dark">Dr. Juan Fernando</p>
                      </div>
                    </IonCardContent>
                  </IonCard>{" "}
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide slide-mini">
                    <IonCardContent className="card-content-slide">
                      <div className="fs-23 font-w800 d-inline text-info">
                        16 Jun
                      </div>
                      <div className="float-right d-inline box-grey">
                        09:30
                      </div>
                      <div>
                        <p className="mb-0 fs-16 font-w400 text-dark">Odontología</p>
                        <p className="mb-0 fs-12 text-dark">Dra. Maria Camila</p>
                      </div>
                    </IonCardContent>
                  </IonCard>{" "}
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide slide-mini">
                    <IonCardContent className="card-content-slide">
                      <div className="fs-23 font-w800 d-inline text-info">
                        17 Jun
                      </div>
                      <div className="float-right d-inline box-grey">
                        17:30
                      </div>
                      <div>
                        <p className="mb-0 fs-16 font-w400 text-dark">Traumatología</p>
                        <p className="mb-0 fs-12 text-dark">Dr. Juan Fernando</p>
                      </div>
                    </IonCardContent>
                  </IonCard>{" "}
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide slide-mini">
                    <IonCardContent className="card-content-slide">
                      <div className="fs-23 font-w800 d-inline text-info">
                        18 Jun
                      </div>
                      <div className="float-right d-inline box-grey">
                        16:30
                      </div>
                      <div>
                        <p className="mb-0 fs-16 font-w400 text-dark">Traumatología 2</p>
                        <p className="mb-0 fs-12 text-dark">Dr. Juan Fernando 2</p>
                      </div>
                    </IonCardContent>
                  </IonCard>{" "}
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide slide-mini">
                    <IonCardContent className="card-content-slide">
                      <div className="fs-23 font-w800 d-inline text-info">
                        19 Jun
                      </div>
                      <div className="float-right d-inline box-grey">
                        16:30
                      </div>
                      <div>
                        <p className="mb-0 fs-16 font-w400 text-dark">Traumatología 2</p>
                        <p className="mb-0 fs-12 text-dark">Dr. Juan Fernando 2</p>
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

              <IonCard className="m-0 card-slide" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                  <Boxfull title="Centro médico OSDE" imageTitle="./images/osdl.png" iconTop={faHeart} fechaTop="" horaTop="" yearTop="" iconTextoUno="" textoUno="Cll 13a #76-52 - Piso 1" />                  
                  <Boxfull title="Centro médico OSDE" imageTitle="./images/osdl.png" iconTop={faHeart} fechaTop="" horaTop="" yearTop="" iconTextoUno="" textoUno="Cll 13a #76-52 - Piso 2" />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/*<IonList
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
        </IonList>*/}
      </IonContent>
    </IonPage>
  );
};

export default Home;
