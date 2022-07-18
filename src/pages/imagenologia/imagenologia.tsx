import {
  faXRay,
  faMicroscope,
  faStethoscope,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
  IonSearchbar,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { servicesWh, serviciosConsultas } from "../../servicios/servicios";
import { Card } from "./card";
import "./imagenologia.css";

const Imagenologia: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState<any>(1);
  const [isOpen, setIsOpen] = useState(false);
  const slideOpts = {
    initialSlide: 0,
    speed: 200,
    slidesPerView: 1.7,
    spaceBetween: 20,
  };

  useEffect(() => {
    servicesWh
      .get("/api/listado-imagenologia", {
        params: {
          op: "imagenologia",
          id: cedula,
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
            /*const filtrado = data.data.filter(
              (item: any) => item.unidad === institucion
            );*/
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
  }, [cedula, page]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setLoad(true);
    let formDa = new FormData();
    formDa.append("op", "buscador");
    formDa.append("busqueda", searchTerm);
    formDa.append("cedula", cedula);
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
      ev.target.complete();
      if (data.length === totalResults) {
        setInfiniteDisabled(true);
      } else {
        //fecth();
      }
    }, 500);
  };

  return (
    <IonPage className="fondo">
      <IonHeader>
        <div className="p-perfil bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle className="fs-16 font-w600 text-center">
              Imagenología
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
              <IonCard className="m-0 card-slide px-2 box-op active">
                <IonCardContent className="card-content-slide text-center fs-12 py-2 px-0">
                  <span>
                    <FontAwesomeIcon icon={faXRay} className="mr-0 fs-16" />
                  </span>

                  <span>
                    <Link
                      to="/app/imagenologia"
                      className="d-block"
                      style={{ color: "#3B72A2" }}
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
                <IonCard className="m-0 card-slide px-2 box-op">
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
                        style={{ color: "#fff" }}
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
      </IonContent>
    </IonPage>
  );
};

export default Imagenologia;
