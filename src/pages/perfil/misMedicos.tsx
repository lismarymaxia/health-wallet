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
  IonItem
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./perfil.css";
import "../../style/tema.css";
import { chevronBackOutline } from "ionicons/icons";

const MisMedicos = () => { 
  return (
    <IonPage className="fondo">
      <IonHeader>
        <div className="p-perfil-sub bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle className="fs-16 font-w700" style={{paddingLeft:"12%"}} >
                Mis m&eacute;dicos
            </IonTitle>
            <IonButtons slot="start">
              <IonBackButton icon={chevronBackOutline} text="" className="custom-back text-white" />
            </IonButtons>
          </IonToolbar>
          <div className="mx-3 pb-4 text-white">
            <IonThumbnail slot="start" class="float-left mr-3">
              <IonImg src={"./images/perfil.JPG"} />
            </IonThumbnail>

            <span className="font-w500 fs-14 d-block">
              Laura Cristina García
            </span>
            <span className="fs-12">
              Cabeza de familia
            </span>
          </div>
        </div>
      </IonHeader>      

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonRow>
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Mis m&eacute;dicos de cabecera
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                    <IonItem className="list-box">
                        <div className="py-3 pl-1">
                            <IonImg
                                src="./images/juan.jpg"
                                alt="AAA"
                                style={{ width: "35px", height: "35px" }}
                                className="float-left mr-2"
                            />       
                            <div className="d-flex justify-content-between">
                                <div className="text-body title" style={{flexDirection:"column"}}>
                                    <span className="w-100 fs-13 font-w500">Dr. Rolando Yee</span>
                                    <span className="w-100 fs-12">Traumatología</span>
                                </div>
                            </div>
                        </div>
                    </IonItem>
                    <IonItem className="list-box">
                        <div className="py-3 pl-1">
                            <IonImg
                                src="./images/juan.jpg"
                                alt="AAA"
                                style={{ width: "35px", height: "35px" }}
                                className="float-left mr-2"
                            />       
                            <div className="d-flex justify-content-between">
                                <div className="text-body title" style={{flexDirection:"column"}}>
                                    <span className="w-100 fs-13 font-w500">Dr. Rolando Yee</span>
                                    <span className="w-100 fs-12">Traumatología</span>
                                </div>
                            </div>
                        </div>
                    </IonItem>
                    <IonItem className="list-box">
                        <div className="py-3 pl-1">
                            <IonImg
                                src="./images/juan.jpg"
                                alt="AAA"
                                style={{ width: "35px", height: "35px" }}
                                className="float-left mr-2"
                            />       
                            <div className="d-flex justify-content-between">
                                <div className="text-body title" style={{flexDirection:"column"}}>
                                    <span className="w-100 fs-13 font-w500">Dr. Rolando Yee</span>
                                    <span className="w-100 fs-12">Traumatología</span>
                                </div>
                            </div>
                        </div>
                    </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MisMedicos;
