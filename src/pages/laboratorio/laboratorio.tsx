import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonCol,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
  IonSearchbar,
} from "@ionic/react";
import { Card } from "./card";
import { HeaderEstudios } from "../../components";
import { serviciosConsultas, servicesWh } from "../../servicios/servicios";
import Examen from "./examen";
const Laboratorio: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState<any>(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    servicesWh
      .get("/api/listado-laboratorio.php", {
        params: {
          op: "timeline_lab",
          page: page,
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
            const tratada = JSON.parse(data);
            const claves = Object.keys(tratada);
            //const iterar = claves.map((item) => tratada[item]);
            const iterar = claves.map((item) => {
              return { ...tratada[item], rid: item };
            });
            setData(iterar);
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
        // fecth();
      }
    }, 500);
  };

  return (
    <IonPage className="fondo">
      <HeaderEstudios title="Laboratorios" />
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

              <h5 className="font-w700 fs-15 text-info-dark mb-2">Dashboard</h5>
              <IonCard className="mx-0 mb-2 mt-2 card-slide shadow-full">
                <IonCardContent className="card-content-slide">
                  <span className="text-danger">Gráfico</span>
                </IonCardContent>
              </IonCard>
              <IonCard className="mx-0 mb-4 mt-2 card-slide shadow-full">
                <IonCardContent className="card-content-slide">
                  <span className="text-danger">Último laboratorio</span>
                </IonCardContent>
              </IonCard>

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

export default Laboratorio;
