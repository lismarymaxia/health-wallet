import React, { useState, useEffect } from "react";
import {
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonSearchbar,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
  IonModal,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { HeaderEstudios } from "../../components";
import { Card } from "./Card";
import {
  servicesWh,
  getComboAfiliados,
  serviciosConsultas,
  getConsultas,
  getConsultasSinTokenCancel,
} from "../../servicios/servicios";
import { formtFechaCorta } from "../../helpers";

const Consultas: React.FC = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState<any>(1);
  const [afiliados, setAfiliados] = useState<any>([]);
  const [afiliado, setAfiliado] = useState<any>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const fecthInitial = (cancelToken: any = null) => {
    getConsultas("", user.cedula, "", "", "", 1, cancelToken)
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            setData(data.data);
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

  const fecth = () => {
    let d = desde !== "" ? formtFechaCorta(desde) : "";
    let h = hasta !== "" ? formtFechaCorta(hasta) : "";
    getConsultasSinTokenCancel("", user.cedula, searchTerm, d, h, page)
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
    getComboAfiliados()
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

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    fecthInitial(source);
    getafiliados();
    return () => {
      source.cancel("Canceled");
    };
  }, [user]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setLoad(true);
    let formDa = new FormData();
    formDa.append("op", "buscador");
    formDa.append("busqueda", searchTerm);
    formDa.append("cedula", user.cedula);
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
    getConsultasSinTokenCancel("", user.cedula, "", "", "", 1)
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
      <HeaderEstudios title="Estudios" />
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
              <IonTitle className="text-center">Filtrar</IonTitle>
              <span
                onClick={() => setIsOpen(false)}
                className="p-2 mt-2 mr-2 float-right cursor-pointer position-absolute right-0 top-0"
              >
                <FontAwesomeIcon icon={faXmark} className="fs-16" />
              </span>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonCol size="12" className="p-3">
                  <IonItem>
                    <IonLabel position="stacked">
                      Desde <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      type="date"
                      value={desde}
                      onIonChange={(e) => {
                        setDesde(e.detail.value!);
                      }}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      Hasta <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      type="date"
                      value={hasta}
                      onIonChange={(e) => {
                        setHasta(e.detail.value!);
                      }}
                    ></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">
                      Afiliado <span className="text-danger">*</span>
                    </IonLabel>
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

                <IonCol size="12" className="text-center">
                  <IonButton
                    className="border-radius"
                    onClick={(e) => {
                      handleSearch(e);
                    }}
                    fill="outline"
                  >
                    Filtrar
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
