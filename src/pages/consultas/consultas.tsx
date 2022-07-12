import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonSearchbar,
  IonProgressBar,
  useIonViewDidEnter,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSlides,
  IonSlide,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicroscope, faSliders, faStethoscope, faXRay } from "@fortawesome/free-solid-svg-icons";
import { Header } from "../../components";
import { servicesWh } from "../../servicios/servicios";
import { Card } from "./Card";
import { Link } from "react-router-dom";
import "../../style/tema.css";
import { chevronBackOutline } from "ionicons/icons";

const Consultas: React.FC = () => {
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
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useIonViewDidEnter(() => {
    setLoad(true);
    servicesWh
      .get("/api/listado-consultas.php", {
        params: {
          op: "consultas",
          cedula: cedula,
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
            setData([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  });

  const pacsearch = useCallback((searc: any) => {
    return function name(params: any) {
      return params?.medico?.toUpperCase().includes(searc.toUpperCase());
    };
  }, []);

  if (load) {
    return (
      <IonPage className="fondo">
        <Header title="Consultas" isbotton={true} isBuger={false} />
        <IonContent fullscreen>
          <IonProgressBar type="indeterminate" color="success"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="fondo">
      <IonHeader>
        <div className="p-perfil bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle className="fs-16 font-w600 text-center" >
              Estudios
            </IonTitle>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} text="" className="custom-back text-white" />
            </IonButtons>
          </IonToolbar>
          <IonRow className="mt-4 pb-3">
            <IonCol size="12" className="px-3">
              <IonSlides pager={false} options={slideOpts}>
                <IonSlide>
                  <IonCard className="m-0 card-slide px-2 box-op">
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span><FontAwesomeIcon icon={faXRay} className="mr-0 fs-16" /></span>
                      <span className="d-block">Imágenes</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide px-2 box-op">
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span><FontAwesomeIcon icon={faMicroscope} className="mr-0 fs-16" /></span>
                      <span className="d-block">Laboratorios</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide px-2 box-op active">
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span><FontAwesomeIcon icon={faStethoscope} className="mr-0 fs-16" /></span>
                      <span className="d-block">Consultas</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
              </IonSlides>
            </IonCol>
          </IonRow>
        </div>
      </IonHeader>
      {/*<Header title="Consultas" isbotton={true} isBuger={false} />*/}

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-1 px-3">
            <IonCol size="12" className="pb-3">
              <div
                className="searchContainer mt-1 mb-3 d-inline-block"
                style={{ width: "86%" }}
              >
                <IonSearchbar
                  value={searchTerm}
                  onIonChange={(e) => setSearchTerm(e.detail.value!)}
                  placeholder="Buscar..."
                  slot="end"
                  class="px-0"
                />
              </div>
              <div
                className="d-inline-block text-right"
                style={{ width: "14%" }}
              >
                <Link
                  to="proximas-citas"
                  className="bg-info-alt d-inline-block btn-filter fs-16 btn-shadow"
                >
                  <FontAwesomeIcon
                    icon={faSliders}
                    className="mr-0 float-right text-white"
                  />
                </Link>
              </div>

              <h5 className="font-w700 fs-15 text-info-dark mb-2">
                Histórico
              </h5>
              {data
                .filter(pacsearch(searchTerm))
                .map((item: any, index: any) => (
                  <Card item={item} key={index} />
                ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Consultas;
