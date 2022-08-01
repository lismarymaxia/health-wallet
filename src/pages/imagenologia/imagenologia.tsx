import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import { HeaderEstudios } from "../../components";
import { Card } from "./card";
import { getImagenologias } from "../../servicios/servicios";
import "./imagenologia.css";

const Imagenologia: React.FC = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [totalResults, setTotalResults] = useState(0);
  const page = 1;
  const [searchTerm, setSearchTerm] = useState("");
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const fecth = (cancelToken: any = null) => {
    getImagenologias("", page, user.cedula, cancelToken)
      .then((rsp: any) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            /*const filtrado = data.data.filter(
              (item: any) => item.unidad === institucion
            );*/
            setData(data.data);
            setTotalResults(data.data.length);
          } else {
            setLoad(false);
            setData({});
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
  }, [user, page]);

  const handleSearch = (e: any) => {
    e.preventDefault();
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
      <HeaderEstudios title="Imagenología" />
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
