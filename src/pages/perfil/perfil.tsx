import React, { useState, useEffect } from "react";
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
  IonImg,
  IonLabel,
  IonSlides,
  IonSlide,
  IonButton,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faSliders,
  faAngleRight,
  faHospitalUser,
  faWheelchair,
  faPhone,
  faCapsules,
  faUserDoctor,
  faHeadphonesSimple,
  faCircleInfo,
  faUser,
  faShieldHalved
} from "@fortawesome/free-solid-svg-icons";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { servicesWh } from "../../servicios/servicios";
import "./perfil.css";
import "../../style/tema.css";
import { logout } from "../../store";
const Perfil = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.reducerAuth.user);
  const history = useHistory();
  const [perfil, setPerfil] = useState({ sangre: "", numemerg: "" });
  const handelPerfilAlergias = () => {
    history.push("/app/perfil-alergias");
  };
  const handelPerfilEnfermedades = () => {
    history.push("/app/perfil-enfermedades");
  };
  const handelPerfilTratamientos = () => {
    history.push("/app/perfil-tratamientos");
  };
  const handelPerfiles = () => {
    history.push("/app/perfiles");
  };
  const handelSoporte = () => {
    history.push("/app/soporte");
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const slideOpts = {
    initialSlide: 0,
    speed: 200,
    slidesPerView: 1.7,
    spaceBetween: 20,
    //autoplay:true,
    //loop: true
  };

  useEffect(() => {
    servicesWh
      .get("/controller/pacienteback.php", {
        params: {
          op: "getPacienteId",
          id: user.id,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setPerfil({ sangre: data.sangre, numemerg: data.numemerg });
          } else {
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  }, [user]);

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
                <IonImg src={"./images/perfil.JPG"} />
              </IonThumbnail>
            </div>

            <div className="w-100 ml-3 float-right d-grid">
              <p className="fs-14 font-w500 mb-1">{user.nombre}</p>
              <div className="">
                <span className="fs-12 float-left">Edad:</span>
                <span className="fs-12 float-right">36 años</span>
              </div>
              <div className="">
                <span className="fs-12 float-left">Cédula:</span>
                <span className="fs-12 float-right">{user.cedula}</span>
              </div>
              <div className="pb-2 border-bottom">
                <span className="fs-12 float-left">Grupo Sanguineo:</span>
                <span className="fs-12 float-right">{perfil.sangre}</span>
              </div>
              <div className="pt-2">
                <span className="fs-12 float-left text-underline">Ver ficha completa</span>
                <span className="fs-12 float-right text-underline">Editar</span>
              </div>
            </div>
          </div>
          <IonRow className="mt-2 pb-3">
            <IonCol size="12" className="px-3">
              <IonSlides pager={false} options={slideOpts}>
                <IonSlide>
                  <IonCard className="m-0 card-slide px-2 box-op">
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
                  <IonCard className="m-0 card-slide px-2 box-op">
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
                  <IonCard className="m-0 card-slide px-2 box-op">
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
                  <IonCard className="m-0 card-slide px-2 box-op">
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
                  <IonCard className="m-0 card-slide px-2 box-op">
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
                  <IonSlides pager={false} options={slideOpts} className="slide-perfiles">
                    <IonSlide>
                      <IonImg src={`./images/juan.jpg`} className="mb-2" />
                    </IonSlide>
                    <IonSlide>
                      <IonImg src={`./images/perfil.jpg`} className="mb-2" />
                    </IonSlide>
                    <IonSlide>
                      <IonImg src={`./images/nuevo-usuario.jpg`} className="mb-2" />
                    </IonSlide>
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
                    <IonLabel className="font-w500">T&eacute;rminos y condiciones</IonLabel>
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
                <IonButton className="border-radius" fill="outline" onClick={handleLogout}>Cerrar sesión</IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
