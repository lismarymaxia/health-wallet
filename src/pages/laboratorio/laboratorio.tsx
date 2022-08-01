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
import axios from "axios";
import { Card } from "./card";
import { HeaderEstudios } from "../../components";
import { getLaboratorios } from "../../servicios/servicios";
import { orderId } from "../../helpers";
//import Examen from "./examen";
const Laboratorio: React.FC = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [laboratorio, setLaboratorio] = useState({});
  const page = 1;
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const fecth = (cancelToken: any = null) => {
    getLaboratorios("", page, user.cedula, cancelToken)
      .then((rsp: any) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            const tratada = JSON.parse(data);
            const claves = Object.keys(tratada);
            //const iterar = claves.map((item) => tratada[item]);
            const iterar = claves.map((item) => {
              return { ...tratada[item], id: item };
            });
            setData(iterar);
            if (claves.length > 0) {
              setLaboratorio(orderId(iterar)[0]);
            }
            setTotalResults(iterar.length);
          } else {
            setLoad(false);
            setData([]);
          }
        }
      })
      .catch((error) => {
        console.error("Error en peticion laboratorio" + error);
      });
  };

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    fecth(source);
    return () => {
      source.cancel("Canceled");
    };
  }, [user]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log(searchTerm);
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
              <h5 className="font-w700 fs-15 text-info-dark mb-2">
                Último laboratorio
              </h5>
              {load ? (
                "Cargando..."
              ) : Object.entries(laboratorio).length === 0 ? (
                "Sin registro en laboratorio"
              ) : (
                <Card item={laboratorio} />
              )}

              <h5 className="font-w700 fs-15 text-info-dark mb-2 mt-2">
                Histórico
              </h5>

              {load
                ? "Cargando..."
                : data.length === 0
                ? "Sin registro en laboratorio"
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
