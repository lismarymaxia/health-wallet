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
import { HeaderPerfil } from "../../components";

const MisMedicos = () => { 
  return (
    <IonPage className="fondo">
      <HeaderPerfil title='Mis m&eacute;dicos' />      

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
