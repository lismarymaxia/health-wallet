import React, { useState } from "react";
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
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonSlides,
  IonSlide
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faUserDoctor,
  faSliders,
  faAngleRight,
  faHospitalUser
} from "@fortawesome/free-solid-svg-icons";
import {
  faAccessibleIcon
} from "@fortawesome/free-brands-svg-icons";
import { Header, Boxfull } from "../../components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./perfil.css";
import "../../style/tema.css";
import { chevronBackOutline } from "ionicons/icons";

const Perfil = () => { 
  const history = useHistory();
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
  const slideOpts = {
    initialSlide: 0,
    speed: 200,
    slidesPerView: 1.7,
    spaceBetween: 20,
    //autoplay:true,
    //loop: true
  };

  return (
    <IonPage className="fondo">     
      <IonHeader>
        <div className="p-perfil bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle className="fs-16 font-w700" style={{paddingLeft:"12%"}} >
              Perfil
            </IonTitle>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} text="" className="custom-back text-white" />
            </IonButtons>
          </IonToolbar>
          <div className="mx-3 pb-2 text-white d-flex">
            <div className="float-left">
              <IonThumbnail slot="start" class="">
                <IonImg src={"./images/perfil.JPG"} />
              </IonThumbnail>
            </div>

            <div className="w-100 ml-3 float-right d-grid">
              <p className="fs-16 font-w500">
                Laura Cristina García
              </p>              
              <div className="">
                <span className="fs-12 float-left">
                  Edad: 
                </span>
                <span className="fs-12 float-right">
                  36 años 
                </span>
              </div>
              <div className="">
                <span className="fs-12 float-left">
                  Cédula: 
                </span>
                <span className="fs-12 float-right">
                  6-712-727
                </span>
              </div>
              <div className="pb-2 border-bottom">
                <span className="fs-12 float-left">
                  Grupo Sanguineo: 
                </span>
                <span className="fs-12 float-right">
                  ORH+
                </span>
              </div>
              <div className="pt-2">
                <span className="fs-12 float-left">
                  Ver ficha completa
                </span>
                <span className="fs-12 float-right">
                  editar
                </span>
              </div>
            </div>            
          </div>
          <IonRow className="mt-2 pb-3">
            <IonCol size="12" className="px-3">
              <IonSlides pager={false} options={slideOpts}>
                <IonSlide>
                  <IonCard className="m-0 card-slide px-2 box-op">
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span><FontAwesomeIcon icon={faHospital} className="mr-0 fs-16" /></span>
                      <span className="d-block">Aseguradora</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide px-2 box-op">
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span><FontAwesomeIcon icon={faAccessibleIcon} className="mr-0 fs-16" /></span>
                      <span className="d-block">Discapacidad</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className="m-0 card-slide px-2 box-op">
                    <IonCardContent className="card-content-slide text-center fs-12 py-2">
                      <span><FontAwesomeIcon icon={faHospitalUser} className="mr-0 fs-16" /></span>
                      <span className="d-block">C. Emergencia</span>
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

                  <div className="py-3 px-1 border-bottom cursor-pointer" onClick={handelPerfilAlergias}>
                    <IonLabel className="font-w500">Alergías</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div className="py-3 px-1 border-bottom cursor-pointer" onClick={handelPerfilEnfermedades}>
                    <IonLabel className="font-w500">Enfermedades</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div className="pt-3 pb-1 px-1 cursor-pointer" onClick={handelPerfilTratamientos}>
                    <IonLabel className="font-w500">Tratamientos activos</IonLabel>
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
                    Manejo de perfiles
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 mt-2 card-slide shadow-full">
                <IonCardContent className="card-content-slidex">
                  <div className="py-3 px-1 border-bottom cursor-pointer" onClick={handelPerfiles}>
                    <IonLabel className="font-w500">Seleccionar perfil</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div className="pt-3 pb-1 px-1 cursor-pointer" onClick={handelSoporte}>
                    <IonLabel className="font-w500">Soporte</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
