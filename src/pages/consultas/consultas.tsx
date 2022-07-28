import React, { useState, useEffect } from "react";
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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
  IonModal,
  IonDatetime,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSliders, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { HeaderEstudios } from "../../components";
import { Card } from "./Card";
import { servicesWh, serviciosConsultas } from "../../servicios/servicios";
import { formtFechaCorta, fechaFrontend } from "../../helpers";

const Consultas: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);
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

  useEffect(() => {
    fecth();
    getafiliados();
  }, []);

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
              <IonTitle className="text-center">
                Filtrar                
              </IonTitle>
              <span onClick={() => setIsOpen(false)} className="p-2 mt-2 mr-2 float-right cursor-pointer position-absolute right-0 top-0">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="fs-16"
                />
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
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      Hasta <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      type="date"
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

                {/*<IonCol size="12">
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
                </IonCol>*/}
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Consultas;
/*
- en tratamiento agregar recordatorio
- si el medicamento es prolongado 
- quitar icono de imagen
- enfermedad o alergia

- filtrado por enfermedad 

- en el editar usar la misma funcion que al guardar paciente
- en listar los medicamentos y enfermedades
- mis medicamentos
- mis medicos
- tipo de diagnostico

*/
