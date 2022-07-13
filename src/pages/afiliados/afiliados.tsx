import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonImg,
  IonProgressBar,
} from "@ionic/react";
import { Header } from "../../components";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/tema.css";
import "./afiliados.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSliders } from "@fortawesome/free-solid-svg-icons";
import { servicesWh } from "../../servicios/servicios";

const Afiliados = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any>([]);
  const [load, setLoad] = useState<Boolean>(true);

  const pacsearch = useCallback((searc: any) => {
    return function name(params: any) {
      return params.nombre.toUpperCase().includes(searc.toUpperCase());
    };
  }, []);

  useEffect(() => {
    setLoad(true);
    servicesWh
      .get("/controller/afiliados.php", {
        params: {
          op: "getAfiliados",
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data.data) {
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
  }, []);

  if (load) {
    return (
      <IonPage className="fondo">
        <Header title="Afiliados" isbotton={true} isBuger={false} />
        <IonContent fullscreen>
          <IonProgressBar type="indeterminate" color="success"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="fondo">
      <Header title="Afiliados" isbotton={true} isBuger={false} />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-2 px-3">
            <IonCol size="12" className="pb-3">
              <div
                className="searchContainer mt-1 d-inline-block"
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
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="px-3">
              <h5 className="font-w600 fs-16 text-blue-dark">Afiliados</h5>

              {data.length > 0
                ? data.filter(pacsearch(searchTerm)).map((item: any) => {
                    return (
                      <IonCard
                        className="m-0 mb-2 pb-2 card-slide w-100 afiliados"
                        key={item.id}
                      >
                        <IonCardContent
                          className="card-content-slide"
                          id={`employeeItem_${item.id}`}
                          key={item.id}
                        >
                          <IonImg
                            src={`https://toolkit.maxialatam.com/wallethealth/asset/css.jpeg`}
                            alt="employee avatar"
                            style={{ width: "50px" }}
                            className="float-left mr-2"
                          />
                          <div className="fs-15 font-w600 text-info mt-1 title">
                            <span className="w-100">{item.nombre}</span>
                            <span>
                              <FontAwesomeIcon
                                icon={faHeart}
                                className="mr-0 float-right"
                              />
                            </span>
                          </div>
                          <div>
                            <p className="mb-0 mt-1 fs-12 d-flex">
                              <span>
                                {item.descripcion}Cll 13a #76-52 - Piso 1
                              </span>
                            </p>
                          </div>
                        </IonCardContent>
                      </IonCard>
                    );
                  })
                : null}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Afiliados;
