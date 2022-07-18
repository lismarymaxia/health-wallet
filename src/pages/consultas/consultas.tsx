import {
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonSearchbar,
  useIonViewDidEnter,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
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
//import { Header } from "../../components";
import { servicesWh, serviciosConsultas } from "../../servicios/servicios";
import { Card } from "./Card";
import { formtFechaCorta, fechaFrontend } from "../../helpers";
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
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState<any>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [transitionU, setTransitionU] = useState(false);
  const [transitionD, setTransitionD] = useState(false);

  const fecth = () => {
    let d = desde !== "" ? formtFechaCorta(desde) : "";
    let h = hasta !== "" ? formtFechaCorta(hasta) : "";
    servicesWh
      .get("/api/listado-consultas.php", {
        params: {
          op: "consultas",
          cedula: cedula,
          busqueda: searchTerm,
          page: page,
          desde: d,
          hasta: h,
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
    setLoad(true);
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
          setData(data.data);
          setLoad(false);
          setPage(data.current_page + 1);
          setTotalResults(data.totalResults);
        } else {
          setData([]);
          setLoad(false);
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

  const handleClear = () => {
    setSearchTerm("");
    setDesde("");
    setHasta("");
    servicesWh
      .get("/api/listado-consultas.php", {
        params: {
          op: "consultas",
          cedula: cedula,
          page: 1,
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
            setPage(2);
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
  /*if (load) {
    return (
      <IonPage className="fondo">
        <Header title="Consultas" isbotton={true} isBuger={false} />
        <IonContent fullscreen>
          <IonProgressBar type="indeterminate" color="success"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }*/

  return (
    <IonPage className="fondo">
      <IonHeader>
        <div className="p-perfil bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle className="fs-16 font-w600 text-center">
              Estudios
            </IonTitle>
            {/*<IonButtons slot="start">
              <IonBackButton
                icon={chevronBackOutline}
                text=""
                className="custom-back text-white"
              />
  </IonButtons>*/}
          </IonToolbar>
          <IonRow className="mt-4 pb-3">
            <IonCol size="4" className="pl-2 pr-1">
              <IonCard className="m-0 card-slide px-2 box-op">
                <IonCardContent className="card-content-slide text-center fs-12 py-2 px-0">
                  <span>
                    <FontAwesomeIcon icon={faXRay} className="mr-0 fs-16" />
                  </span>

                  <span>
                    <Link
                      to="/app/imagenologia"
                      className="d-block"
                      style={{ color: "#ffffff" }}
                    >
                      Imagenología
                    </Link>
                  </span>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4" className="px-2">
              <IonCard className="m-0 card-slide px-2 box-op">
                <IonCardContent className="card-content-slide text-center fs-12 py-2 px-0">
                  <span>
                    <FontAwesomeIcon
                      icon={faMicroscope}
                      className="mr-0 fs-16"
                    />
                  </span>
                  <span>
                    <Link
                      to="/app/laboratorio"
                      className="d-block"
                      style={{ color: "#fff" }}
                    >
                      Laboratorios
                    </Link>
                  </span>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="4" className="pl-1 pr-2">
                <IonCard className="m-0 card-slide px-2 box-op active">
                  <IonCardContent className="card-content-slide text-center fs-12 py-2 px-0">
                    <span>
                      <FontAwesomeIcon
                        icon={faStethoscope}
                        className="mr-0 fs-16"
                      />
                    </span>
                    <span>
                      <Link
                        to="/app/consultas"
                        className="d-block"
                        style={{ color: "#3B72A2" }}
                      >
                        Consultas
                      </Link>
                    </span>
                  </IonCardContent>
                </IonCard>
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
                    onIonClear={() => {
                      handleClear();
                    }}
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

              {load
                ? "Cargando..."
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
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonButton
                      color="dark"
                      fill="clear"
                      onClick={() => setTransitionU(!transitionU)}
                    >
                      Desde
                    </IonButton>
                    {fechaFrontend(desde)}
                  </IonItem>
                </IonCol>
                <IonCol size="12">
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
                <IonCol size="12">
                  <IonItem>
                    <IonButton
                      color="dark"
                      fill="clear"
                      onClick={() => setTransitionD(!transitionD)}
                    >
                      Hasta
                    </IonButton>
                    {fechaFrontend(hasta)}
                  </IonItem>
                </IonCol>
                <IonCol size="12">
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
                <IonCol size="12">
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
                </IonCol>
                <IonCol size="12">
                  <IonButton
                    color="dark"
                    onClick={(e) => {
                      handleSearch(e);
                    }}
                    fill="clear"
                  >
                    filtrar
                  </IonButton>
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
