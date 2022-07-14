import {
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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
  IonModal,
  IonDatetime,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonGrid,
} from "@ionic/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicroscope,
  faSliders,
  faStethoscope,
  faXRay,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { chevronBackOutline } from "ionicons/icons";
import { Header } from "../../components";
import { servicesWh, serviciosConsultas } from "../../servicios/servicios";
import { Card } from "./Card";
import { formtFechaCorta } from "../../helpers";
import "../../style/tema.css";

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
  const [afiliados, setAfiliados] = useState<any>([]);
  const [afiliado, setAfiliado] = useState<any>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadSearch, setLoadSearch] = useState<Boolean>(false);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState<any>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [transitionU, setTransitionU] = useState(false);
  const [transitionD, setTransitionD] = useState(false);

  const fecth = () => {
    servicesWh
      .get("/api/listado-consultas.php", {
        params: {
          op: "consultas",
          cedula: cedula,
          busqueda: searchTerm,
          page: page,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            setData((prev: any) => [...prev, ...data.data]);
            setPage(page + 1);
            setTotalResults(data.totalResults);
          } else {
            setLoad(false);
            setData([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const getafiliados = () => {
    servicesWh
      .get("/controller/afiliados.php", {
        params: {
          op: "getCombo",
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setAfiliados(data.data);
          } else {
            setAfiliados([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  useIonViewDidEnter(() => {
    fecth();
    getafiliados();
  });

  const handleSearch = (e: any) => {
    e.preventDefault();
    setLoadSearch(true);
    let formDa = new FormData();
    formDa.append("op", "buscador");
    formDa.append("busqueda", searchTerm);
    formDa.append("cedula", cedula);
    if (desde !== "") {
      let d = formtFechaCorta(desde) || "";
      formDa.append("desde", d);
    }
    if (hasta !== "") {
      let h = formtFechaCorta(hasta) || "";
      formDa.append("hasta", h);
    }
    serviciosConsultas(formDa)
      .then(function (response) {
        const { data, status } = response;
        if (status === 200) {
          if (data.rsp === 1) {
            setData(data.data);
            setLoadSearch(false);
          } else {
            setData([]);
            setLoadSearch(false);
          }
        }
      })
      .catch(function (err) {
        console.warn("Error:" + err);
      });
  };

  const loadData = (ev: any) => {
    setTimeout(() => {
      console.log("Loaded data");
      ev.target.complete();
      if (data.length === totalResults) {
        setInfiniteDisabled(true);
      } else {
        fecth();
      }
    }, 500);
  };

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

  console.log({ desde, hasta });
  return (
    <IonPage className="fondo">
      <IonHeader>
        <div className="p-perfil bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle className="fs-16 font-w600 text-center">
              Estudios
            </IonTitle>
            <IonButtons slot="start">
              <IonBackButton
                icon={chevronBackOutline}
                text=""
                className="custom-back text-white"
              />
            </IonButtons>
          </IonToolbar>
          <IonRow className="mt-4 pb-3">
            <IonCol size="12" className="px-3">
              <IonSlides pager={false} options={slideOpts}>
                <IonSlide>
                  <IonCard className="m-0 card-slide px-2 box-op">
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span>
                        <FontAwesomeIcon icon={faXRay} className="mr-0 fs-16" />
                      </span>
                      <span className="d-block">Imágenes</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide px-2 box-op">
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span>
                        <FontAwesomeIcon
                          icon={faMicroscope}
                          className="mr-0 fs-16"
                        />
                      </span>
                      <span className="d-block">Laboratorios</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide px-2 box-op active">
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span>
                        <FontAwesomeIcon
                          icon={faStethoscope}
                          className="mr-0 fs-16"
                        />
                      </span>
                      <span className="d-block">Consultas</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
              </IonSlides>
            </IonCol>
          </IonRow>
        </div>
      </IonHeader>
      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-1 px-3">
            <IonCol size="12" className="pb-3">
              <div
                className="searchContainer mt-1 mb-3 d-inline-block"
                style={{ width: "86%" }}
              >
                <form action="" onSubmit={handleSearch}>
                  <IonSearchbar
                    value={searchTerm}
                    onIonChange={(e) => setSearchTerm(e.detail.value!)}
                    placeholder="Buscar..."
                    slot="end"
                    class="px-0"
                  />

                  <input type="submit" style={{ display: "none" }} />
                </form>
              </div>
              <div
                className="d-inline-block text-right"
                style={{ width: "14%" }}
              >
                <Link
                  onClick={() => setIsOpen(true)}
                  to="#"
                  className="bg-info-alt d-inline-block btn-filter fs-16 btn-shadow"
                >
                  <FontAwesomeIcon
                    icon={faSliders}
                    className="mr-0 float-right text-white"
                  />
                </Link>
              </div>

              <h5 className="font-w700 fs-15 text-info-dark mb-2">Histórico</h5>

              {loadSearch
                ? "buscando"
                : data.map((item: any, index: any) => (
                    <Card item={item} key={index} />
                  ))}
              <IonInfiniteScroll
                onIonInfinite={loadData}
                threshold="100px"
                disabled={isInfiniteDisabled}
              >
                <IonInfiniteScrollContent
                  loadingSpinner="bubbles"
                  loadingText="Cargando..."
                ></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar className="ion-padding">
              <IonTitle>Filtrar</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonGrid>
              <IonRow className="ion-justify-content-start">
                <IonCol sizeSm="12" sizeMd="6" sizeLg="12">
                  <IonItem>
                    <IonButton
                      color="primary"
                      onClick={() => setTransitionU(true)}
                    >
                      Desde
                    </IonButton>
                  </IonItem>
                  {transitionU && (
                    <IonDatetime
                      presentation="date"
                      doneText="ok"
                      cancelText="Cancelar"
                      value={desde}
                      onIonChange={(e) => {
                        setDesde(e.detail.value!);
                        setTransitionU(false);
                      }}
                    ></IonDatetime>
                  )}
                </IonCol>
                <IonCol sizeSm="12" sizeMd="6" sizeLg="12">
                  <IonItem>
                    <IonButton
                      color="primary"
                      onClick={() => setTransitionD(true)}
                    >
                      Hasta
                    </IonButton>
                  </IonItem>
                  {transitionD && (
                    <IonDatetime
                      presentation="date"
                      doneText="ok"
                      cancelText="Cancelar"
                      value={hasta}
                      onIonChange={(e) => {
                        setHasta(e.detail.value!);
                        setTransitionD(false);
                      }}
                    ></IonDatetime>
                  )}
                </IonCol>
                <IonCol sizeSm="12" sizeMd="6" sizeLg="12">
                  {" "}
                  <IonItem>
                    <IonSelect
                      value={afiliado}
                      interface="popover"
                      placeholder="Selecione un afiliado"
                      onIonChange={(e) => setAfiliado(e.detail.value)}
                    >
                      {afiliados.map((item: any) => (
                        <IonSelectOption value={item.id} key={item.id}>
                          {item.nombre}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                  <IonItem>
                    <IonButton
                      color="primary"
                      onClick={(e) => {
                        handleSearch(e);
                      }}
                    >
                      filtrar
                    </IonButton>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Consultas;
