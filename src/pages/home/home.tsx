import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonImg,
  useIonViewDidEnter,
  IonSlide,
  IonSlides,
  IonToast,
  IonSkeletonText,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBell,
  faHeart,
  faMicroscope,
  faXRay,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { servicesWh, serviciosAfiliados } from "../../servicios/servicios";
import { BoxAfiliado } from "../../components";
import {
  orderId,
  fechaActual,
  cadenaUpercase,
  INITIALIMAGENOLOGIA,
  INITIALLABORATORIO,
} from "../../helpers";
import "./home.css";

const Home: React.FC = () => {
  const history = useHistory();
  const user = useSelector((state: any) => state.reducerAuth.user);
  const handelNotificaciones = () => {
    history.push("/app/notificaciones");
  };

  const slideOpts = {
    initialSlide: 0,
    speed: 200,
    slidesPerView: 1.7,
    spaceBetween: 20,
  };

  const [load, setLoad] = useState<Boolean>(true);
  const [datos, setDatos] = useState<any>([]);
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const [laboratorio, setLaboratorio] = useState(INITIALLABORATORIO);

  const [imagenologia, setImagenologia] = useState(INITIALIMAGENOLOGIA);

  const isFavorito = (datos: any) => {
    let nuevo = datos.map((item: any) => {
      return {
        ...item,
        idfav: item.idusuario === user.id.toString() ? item.idfav : "",
      };
    });
    return nuevo;
  };

  const updateDatos = (item: any) => {
    let nuevo = datos.map((items: any) =>
      items.id === item.id ? (items = item) : items
    );
    setDatos(nuevo);
  };

  useIonViewDidEnter(() => {
    servicesWh
      .get("/controller/afiliados.php", {
        params: {
          op: "getAfiliadosRecientes",
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            setDatos(isFavorito(data.data));
          } else {
            setLoad(false);
            setDatos([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
    /*-IMAGENOLOGIA-*/
    servicesWh
      .get("/controller/homeback.php", {
        params: {
          op: "getUltimoImag",
          cedula: user.cedula,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            if (data.data.length > 0) {
              setImagenologia(orderId(data.data)[0]);
            }
          } else {
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
    /*-LABORATORIO-*/
    servicesWh
      .get("/controller/homeback.php", {
        params: {
          op: "getUltimoLab",
          cedula: user.cedula,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            const tratada = JSON.parse(data);
            const claves = Object.keys(tratada);
            const iterar = claves.map((item) => {
              return { ...tratada[item], id: item };
            });
            if (claves.length > 0) {
              setLaboratorio(orderId(iterar)[0]);
            }
          } else {
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  });

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

  const handleDetail = (id: any) => {
    history.push(`/app/afiliado/${id}`);
  };

  const handleNuevaCita = () => {
    history.push("/app/crear-cita");
  };

  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light pb-4">
          <IonRow className="bg-info-alt pt-3 pb-2 text-white">
            <IonCol size="12" className="px-3 fs-13">
              {fechaActual()}
              <FontAwesomeIcon
                icon={faBell}
                className="mr-0 float-right fs-18"
                onClick={handelNotificaciones}
                style={{ cursor: "pointer" }}
              />
              <div className="fs-20 font-w600 text-white">
                ¡Hola {}
                {user.nombre}!
              </div>
            </IonCol>
            <IonCol size="12" className="px-3 pt-3 mb-2">
              <IonCard className="m-0">
                <IonCardContent>
                  <IonImg src={"./images/auxiliar-enfermeria.png"} />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="mt-4">
            <IonCol size="12" className="px-3">
              <h5 className="font-w600 fs-16 text-info-dark">
                Próximas citas
                <Link to="proximas-citas" className="text-info-light">
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="mr-0 float-right text-info"
                  />
                </Link>
              </h5>
              <IonSlides pager={false} options={slideOpts} className="d-flex">
                <IonSlide>
                  <IonCard className="m-0 card-slide slide-mini">
                    <IonCardContent className="card-content-slide">
                      <div className="fs-23 font-w800 d-inline text-info">
                        15 Jun
                      </div>
                      <div className="float-right d-inline box-grey">17:30</div>
                      <div>
                        <p className="mb-0 fs-15 font-w400 text-dark">
                          Traumatología
                        </p>
                        <p className="mb-0 fs-12 text-dark">
                          Dr. Juan Fernando
                        </p>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide slide-mini">
                    <IonCardContent className="card-content-slide">
                      <div className="fs-23 font-w800 d-inline text-info">
                        16 Jun
                      </div>
                      <div className="float-right d-inline box-grey">09:30</div>
                      <div>
                        <p className="mb-0 fs-16 font-w400 text-dark">
                          Odontología
                        </p>
                        <p className="mb-0 fs-12 text-dark">
                          Dra. Maria Camila
                        </p>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide slide-mini">
                    <IonCardContent className="card-content-slide">
                      <div className="fs-23 font-w800 d-inline text-info">
                        17 Jun
                      </div>
                      <div className="float-right d-inline box-grey">17:30</div>
                      <div>
                        <p className="mb-0 fs-16 font-w400 text-dark">
                          Traumatología
                        </p>
                        <p className="mb-0 fs-12 text-dark">
                          Dr. Juan Fernando
                        </p>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide slide-mini">
                    <IonCardContent className="card-content-slide">
                      <div className="fs-23 font-w800 d-inline text-info">
                        18 Jun
                      </div>
                      <div className="float-right d-inline box-grey">16:30</div>
                      <div>
                        <p className="mb-0 fs-16 font-w400 text-dark">
                          Traumatología 2
                        </p>
                        <p className="mb-0 fs-12 text-dark">
                          Dr. Juan Fernando 2
                        </p>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide slide-mini">
                    <IonCardContent className="card-content-slide">
                      <div className="fs-23 font-w800 d-inline text-info">
                        19 Jun
                      </div>
                      <div className="float-right d-inline box-grey">16:30</div>
                      <div>
                        <p className="mb-0 fs-16 font-w400 text-dark">
                          Traumatología 2
                        </p>
                        <p className="mb-0 fs-12 text-dark">
                          Dr. Juan Fernando 2
                        </p>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide onClick={handleNuevaCita}>
                  <IonCard className="m-0 card-slide slide-mini button-deg cursor-pointer">
                    <IonCardContent className="card-content-slide d-grid">
                      <div>
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="float-right"
                          style={{
                            fontSize: "72px",
                            marginTop: "-20px",
                            marginRight: "-15px !important",
                          }}
                        />
                      </div>
                      <div>
                        <p className="mb-0 fs-12 text-white">
                          Crear nueva cita
                        </p>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
              </IonSlides>
            </IonCol>
          </IonRow>

          <IonRow className="mt-4">
            <IonCol size="12" className="px-3">
              <h5 className="font-w600 fs-16 text-info-dark">
                Últimas actualizaciones
              </h5>
              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slide ">
                  <div className="d-flex pt-2">
                    <div className="pt-1">
                      <FontAwesomeIcon
                        icon={faMicroscope}
                        className="mr-3 fs-16 text-info float-left"
                      />
                    </div>
                    <div className="slide-full d-grid pt-0">
                      <div className="w-100">
                        <span className="fs-15 font-w600 text-info float-left">
                          Resultados de laboratorio
                        </span>
                        <div className="float-right">
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            className="mr-0 float-right fs-18 text-info"
                          />
                        </div>
                      </div>
                      <div className="w-100">
                        <span className="d-block fs-13">
                          {laboratorio.centro === "" ? (
                            <IonSkeletonText
                              animated
                              style={{ width: "100%" }}
                            />
                          ) : (
                            cadenaUpercase(laboratorio.centro)
                          )}
                        </span>
                        <span className="d-block fs-13">
                          {laboratorio.desde === "" ? (
                            <IonSkeletonText
                              animated
                              style={{ width: "100%" }}
                            />
                          ) : (
                            cadenaUpercase(laboratorio.desde)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex pt-2">
                    <div className="pt-1">
                      <FontAwesomeIcon
                        icon={faXRay}
                        className="mr-3 fs-16 text-info float-left"
                      />
                    </div>
                    <div className="slide-full d-grid pt-0">
                      <div className="w-100">
                        <span className="fs-15 font-w600 text-info float-left">
                          Resultados de imágenes
                        </span>
                        <div className="float-right">
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            className="mr-0 float-right fs-18 text-info"
                          />
                        </div>
                      </div>
                      <div className="w-100">
                        <span className="d-block fs-13">
                          {imagenologia.unidad === "" ? (
                            <IonSkeletonText
                              animated
                              style={{ width: "100%" }}
                            />
                          ) : (
                            imagenologia.unidad
                          )}
                        </span>
                        <span className="d-block fs-13">
                          {imagenologia.estudio === "" ? (
                            <IonSkeletonText
                              animated
                              style={{ width: "100%" }}
                            />
                          ) : (
                            imagenologia.estudio
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="mt-4">
            <IonCol size="12" className="px-3">
              <h5 className="font-w600 fs-16 text-info-dark">
                Nuevos afiliados
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="mr-0 float-right text-info"
                />
              </h5>

              <IonCard className="m-0 mb-2 pb-2 card-slide w-100 afiliados">
                <IonCardContent className="card-content-slide">
                  {load
                    ? "Cargando"
                    : datos.map((item: any, index: any) => (
                        <div
                          key={index}
                          className="w-100 d-inline-block item-afiliado"
                        >
                          <BoxAfiliado
                            item={item}
                            id={item.id}
                            title={item.nombre}
                            descripcion={item.descripcion}
                            imageTitle={`https://toolkit.maxialatam.com/wallethealth/asset/${item.logo}`}
                            iconTop={faHeart}
                            texto="descripcion"
                            idfav={item.idfav}
                            handleAdd={handleFavorito}
                            handleDelet={handleDeletFavorito}
                            handleDetail={handleDetail}
                          />
                        </div>
                      ))}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
          isOpen={notificacion.estado}
          onDidDismiss={() =>
            setNotificacion({ ...notificacion, estado: false })
          }
          message={notificacion.msg}
          duration={500}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
