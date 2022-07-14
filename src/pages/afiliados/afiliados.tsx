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
  IonButton,
} from "@ionic/react";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSliders } from "@fortawesome/free-solid-svg-icons";
import { Header } from "../../components";
import { servicesWh, serviciosAfiliados } from "../../servicios/servicios";
import "../../style/tema.css";
import "./afiliados.css";

const Afiliados = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [datos, setDatos] = useState<any>([]);
  const [load, setLoad] = useState<Boolean>(true);
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });
  const pacsearch = useCallback((searc: any) => {
    return function name(params: any) {
      return params.nombre.toUpperCase().includes(searc.toUpperCase());
    };
  }, []);

  const updateDatos = (item: any) => {
    let nuevo = datos.map((items: any) =>
      items.id === item.id ? (items = item) : items
    );
    setDatos(nuevo);
  };

  useEffect(() => {
    setLoad(true);
    servicesWh
      .get("/controller/afiliados.php", {
        params: {
          op: "getAfiliados",
          idusuario: user.id,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data.data) {
            setLoad(false);
            //setDatos([...data.fav, ...data.data]);
            setDatos(data.data);
          } else {
            setLoad(false);
            setDatos([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  }, []);

  const handleFavorito = (id: any, item: any) => {
    let formDa = new FormData();
    formDa.append("op", "addFavorito");
    formDa.append("idafiliado", id);
    formDa.append("idusuario", user.id);
    serviciosAfiliados(formDa)
      .then(function (response) {
        const { data, status } = response;
        if (status === 200) {
          if (data.rsp === 1) {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
            let clone = { ...item, idfav: data.id };
            updateDatos(clone);
          } else {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
          }
        }
      })
      .catch(function (err) {
        console.warn("Error:" + err);
      });
  };

  const handleDeletFavorito = (id: any, item: any) => {
    let formDa = new FormData();
    formDa.append("op", "deletFavorito");
    formDa.append("id", id);

    serviciosAfiliados(formDa)
      .then(function (response) {
        const { data, status } = response;
        if (status === 200) {
          if (data.rsp === 1) {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
            let clone = { ...item, idfav: "" };
            updateDatos(clone);
          } else {
            setNotificacion({
              msg: data.msg,
              estado: true,
            });
          }
        }
      })
      .catch(function (err) {
        console.warn("Error:" + err);
      });
  };
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
  console.log(datos);
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

              {datos.length > 0
                ? datos.filter(pacsearch(searchTerm)).map((item: any) => {
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
                            src={`https://toolkit.maxialatam.com/wallethealth/asset/${item.logo}`}
                            alt="employee avatar"
                            style={{ width: "50px" }}
                            className="float-left mr-2"
                          />
                          <div className="fs-15 font-w600 text-info mt-1 title">
                            <span className="w-100">{item.nombre}</span>
                            <span>
                              {item.idfav === "" ? (
                                <IonButton
                                  color="dark"
                                  fill="clear"
                                  onClick={() => handleFavorito(item.id, item)}
                                >
                                  <FontAwesomeIcon
                                    icon={faHeart}
                                    className="mr-0 float-right"
                                  />
                                </IonButton>
                              ) : (
                                <IonButton
                                  color="dark"
                                  fill="clear"
                                  onClick={() =>
                                    handleDeletFavorito(item.idfav, item)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faHeart}
                                    className="mr-0 float-right"
                                    style={{ color: "red" }}
                                  />
                                </IonButton>
                              )}
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
