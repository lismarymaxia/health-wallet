import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonImg,
  IonProgressBar,
  IonButton,
  IonToast,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Header } from "../../components";
import { servicesWh, serviciosAfiliados } from "../../servicios/servicios";
import "../../style/tema.css";
import "./afiliados.css";

const Afiliado = () => {
  const { id }: any = useParams();
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [datos, setDatos] = useState<any>([]);
  const [load, setLoad] = useState<Boolean>(true);
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

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
          op: "getAfiliadoId",
          id: id,
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

  useEffect(() => {
    //setLoad(true);
    servicesWh
      .get("/controller/afiliados.php", {
        params: {
          op: "getCentroProduccion",
          idafiliado: id,
          idusuario: user.id,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data.data) {
            //setLoad(false);
            ///setDatos(data.data);
          } else {
            //setLoad(false);
            //setDatos([]);
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
        <Header title="Afiliado" isbotton={true} isBuger={false} />
        <IonContent fullscreen>
          <IonProgressBar type="indeterminate" color="success"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="fondo">
      <Header title="Afiliado" isbotton={true} isBuger={false} />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-2 px-3">
            <IonCol size="12" className="pb-3">
              <div
                className="searchContainer mt-1 d-inline-block"
                style={{ width: "86%" }}
              >
                <h5 className="font-w600 fs-16 text-blue-dark">Histórico</h5>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="px-3">
              {datos.length > 0
                ? datos.map((item: any) => {
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
                          <div>
                            <IonImg
                              src={`https://toolkit.maxialatam.com/wallethealth/asset/${item.logo}`}
                              alt="employee avatar"
                              style={{ width: "50px", height: "50px" }}
                              className="float-left mr-2"
                            />
                            <div className="d-flex justify-content-between">                              
                              <div className="fs-15 font-w600 text-info mt-1 title">
                                <span className="w-100">{item.nombre}</span>
                              </div>

                              <span>
                                {item.idfav === "" ? (
                                  <IonButton
                                    color="dark"
                                    className="m-0"
                                    style={{ width: "28px" }}
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
                                    className="m-0"
                                    style={{ width: "28px" }}
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
                          </div>
                          <div>
                            <p className="mb-0 ml-5 pl-2 fs-12">
                              <span>{item.descripcion}</span>
                            </p>
                          </div>
                        </IonCardContent>
                      </IonCard>
                    );
                  })
                : null}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="px-3">
              <IonCard className="m-0 mb-2 pb-2 card-slide w-100 afiliados">
                <IonCardHeader>
                  <IonCardTitle>Especialidades</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="card-content-slide">
                  <div className="fs-15 font-w600 text-info mt-1 title">
                    <span className="w-100">una</span>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonToast
        isOpen={notificacion.estado}
        onDidDismiss={() => setNotificacion({ ...notificacion, estado: false })}
        message={notificacion.msg}
        duration={500}
      />
    </IonPage>
  );
};

export default Afiliado;
