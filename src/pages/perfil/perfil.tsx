import { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonThumbnail,
  IonLabel,
  IonSlides,
  IonSlide,
  IonButton,
  useIonLoading,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faAngleRight,
  faWheelchair,
  faPhone,
  faCapsules,
  faUserDoctor,
  faHeadphonesSimple,
  faCircleInfo,
  faUser,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPerfiles, getPerfil } from "../../servicios";
import { INITIALPERFIL } from "../../helpers";
import { storeLocal } from "../../store/action/aut";
import { logout } from "../../store";
import "./perfil.css";
const Perfil = () => {
  const SLIDEOPTS = {
    initialSlide: 0,
    speed: 200,
    slidesPerView: 1.7,
    spaceBetween: 20,
  };
  const dispatch = useDispatch();
  const [present] = useIonLoading();
  const user = useSelector((state: any) => state.reducerAuth.user);
  const history = useHistory();
  const [perfil, setPerfil] = useState(INITIALPERFIL);
  const [perfiles, setPerfiles] = useState([]);

  const handelPerfilAlergias = () => {
    history.push("/app/perfil-alergias");
  };
  const handelPerfilEnfermedades = () => {
    history.push("/app/perfil-enfermedades");
  };
  const handelPerfilTratamientos = () => {
    history.push("/app/perfil-tratamientos");
  };
  const handelFichaCompleta = () => {
    history.push("/app/ficha-completa");
  };
  const handelAseguradora = () => {
    history.push("/app/aseguradora");
  };
  const handelDiscapacidad = () => {
    history.push("/app/discapacidad");
  };
  const handelContactoEmergencia = () => {
    history.push("/app/contacto-emergencia");
  };
  const handelMisMedicos = () => {
    history.push("/app/mis-medicos");
  };
  const handelMisMedicamentos = () => {
    history.push("/app/mis-medicamentos");
  };
  const handelSoporte = () => {
    history.push("/app/soporte");
  };
  const handleEditar = () => {
    history.push("/app/perfil-editar");
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    Promise.all([getPerfil(user.idpaciente), getPerfiles(user.id)])
      .then((rsp: any) => {
        const [prfil, prfiles] = rsp;
        setPerfil(prfil.data.data);
        setPerfiles(prfiles.data.data);
      })
      .catch((error) => {
        console.error("Error en triple peticion" + error);
      });
  }, [user]);

  const handleClicPerfil = (nombre: string, item: any) => {
    if (nombre === "nuevo-perfil") {
      history.push("/app/perfil-crear");
    } else {
      present({
        message: "Cargando perfil...",
        duration: 3000,
      });
      dispatch(storeLocal(item));
    }
  };
  return (
    <IonPage className="fondo">
      <IonHeader>
        <div className="p-perfil bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle
              className="fs-16 font-w700"
              style={{ paddingLeft: "12%" }}
            >
              Perfil
            </IonTitle>
            <IonButtons slot="start">
              <IonBackButton
                icon={chevronBackOutline}
                text=""
                className="custom-back text-white"
              />
            </IonButtons>
          </IonToolbar>
          <div className="mx-3 pb-2 text-white d-flex">
            <div className="float-left">
              <IonThumbnail slot="start" class="">
                <img src={`./images/${perfil?.imagen}`} alt="imagen" />
              </IonThumbnail>
            </div>

            <div className="w-100 ml-3 float-right d-grid">
              <p className="fs-14 font-w500 mb-1">{perfil?.nombre}</p>
              <div className="">
                <span className="fs-12 float-left">Edad:</span>
                <span className="fs-12 float-right">{perfil?.edad} años</span>
              </div>
              <div className="">
                <span className="fs-12 float-left">Cédula:</span>
                <span className="fs-12 float-right">{perfil?.cedula}</span>
              </div>
              <div className="pb-2 border-bottom">
                <span className="fs-12 float-left">Grupo Sanguineo:</span>
                <span className="fs-12 float-right">{perfil?.gruposangre}</span>
              </div>
              <div className="pt-2">
                <span
                  className="fs-12 float-left text-underline cursor-pointer"
                  onClick={handelFichaCompleta}
                >
                  Ver ficha completa
                </span>
                <span
                  className="fs-12 float-right text-underline"
                  onClick={handleEditar}
                >
                  Editar
                </span>
              </div>
            </div>
          </div>
          <IonRow className="mt-2 pb-3">
            <IonCol size="12" className="px-3">
              <IonSlides pager={false} options={SLIDEOPTS}>
                <IonSlide>
                  <IonCard
                    className="m-0 card-slide px-2 box-op"
                    onClick={handelAseguradora}
                  >
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span>
                        <FontAwesomeIcon
                          icon={faHospital}
                          className="mr-0 fs-16"
                        />
                      </span>
                      <span className="d-block">Aseguradora</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard
                    className="m-0 card-slide px-2 box-op"
                    onClick={handelDiscapacidad}
                  >
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span>
                        <FontAwesomeIcon
                          icon={faWheelchair}
                          className="mr-0 fs-16"
                        />
                      </span>
                      <span className="d-block">Discapacidad</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard
                    className="m-0 card-slide px-2 box-op"
                    onClick={handelContactoEmergencia}
                  >
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span>
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="mr-0 fs-16"
                        />
                      </span>
                      <span className="d-block">C. Emergencia</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard
                    className="m-0 card-slide px-2 box-op"
                    onClick={handelMisMedicos}
                  >
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span>
                        <FontAwesomeIcon
                          icon={faUserDoctor}
                          className="mr-0 fs-16"
                        />
                      </span>
                      <span className="d-block">Mis m&eacute;dicos</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard
                    className="m-0 card-slide px-2 box-op"
                    onClick={handelMisMedicamentos}
                  >
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span>
                        <FontAwesomeIcon
                          icon={faCapsules}
                          className="mr-0 fs-16"
                        />
                      </span>
                      <span className="d-block">Medicamentos</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
              </IonSlides>
            </IonCol>
          </IonRow>
        </div>
      </IonHeader>

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonRow>
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Información personal
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slide">
                  {/*<IonList>
                    <IonItem button >
                      <IonLabel className="font-w500">Alergías</IonLabel>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className="mr-0 float-right fs-18 text-info"
                        onClick={handelPerfilAlergias}
                        style={{ cursor: "pointer" }}
                      />
                    </IonItem>
                  </IonList>*/}

                  <div
                    className="py-3 px-1 border-bottom cursor-pointer"
                    onClick={handelPerfilAlergias}
                  >
                    <IonLabel className="font-w500">Alergías</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div
                    className="py-3 px-1 border-bottom cursor-pointer"
                    onClick={handelPerfilEnfermedades}
                  >
                    <IonLabel className="font-w500">Enfermedades</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div
                    className="pt-3 pb-1 px-1 cursor-pointer"
                    onClick={handelPerfilTratamientos}
                  >
                    <IonLabel className="font-w500">
                      Tratamientos activos
                    </IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                </IonCardContent>
              </IonCard>

              <IonRow className="mt-4">
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Mi familia
                  </h5>
                </IonCol>
                <IonCol size="12">
                  <IonSlides
                    pager={false}
                    options={SLIDEOPTS}
                    className="slide-perfiles"
                  >
                    {perfiles
                      .map((item: any, index: number) => (
                        <IonSlide
                          key={index}
                          onClick={() => handleClicPerfil(item.nombre, item)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={`./images/${item.imagen}`}
                            className="mb-2"
                            alt={item.imagen}
                          />
                        </IonSlide>
                      ))
                      .concat()}
                  </IonSlides>
                </IonCol>
              </IonRow>

              <IonRow className="mt-2">
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Configuración
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slidex">
                  <div
                    className="pt-3 pb-1 px-1 cursor-pointer"
                    onClick={handelSoporte}
                  >
                    <FontAwesomeIcon
                      icon={faHeadphonesSimple}
                      className="mr-2 fs-18 text-info"
                    />
                    <IonLabel className="font-w500">Soporte</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div
                    className="pt-3 pb-1 px-1 cursor-pointer"
                    onClick={handelSoporte}
                  >
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="mr-2 fs-18 text-info"
                    />
                    <IonLabel className="font-w500">
                      T&eacute;rminos y condiciones
                    </IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div
                    className="pt-3 pb-1 px-1 cursor-pointer"
                    onClick={handelSoporte}
                  >
                    <FontAwesomeIcon
                      icon={faShieldHalved}
                      className="mr-2 fs-18 text-info"
                    />
                    <IonLabel className="font-w500">Seguridad</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div
                    className="pt-3 pb-1 px-1 cursor-pointer"
                    onClick={handelSoporte}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="mr-2 fs-18 text-info"
                    />
                    <IonLabel className="font-w500">Mi cuenta</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                </IonCardContent>
              </IonCard>
              <div className="pt-2 text-center">
                <IonButton
                  className="border-radius"
                  fill="outline"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
