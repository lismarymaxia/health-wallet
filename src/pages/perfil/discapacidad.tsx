import React, { useEffect, useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import { HeaderPerfil } from "../../components";
import "./perfil.css";
import "../../style/tema.css";
import { INITIALPERFIL } from "../../helpers";

const Discapacidad = () => { 
  const [perfil, setPerfil] = useState(INITIALPERFIL);
  return (
    <IonPage className="fondo">     
      <HeaderPerfil title='Discapacidad' />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonCard className="m-0 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                  <span className="font-w600 fs-14 text-info-dark">
                    ¿Posee alguna discapacidad?
                  </span>
                  <IonList>
                    <IonItem>
                      <IonSelect interface="action-sheet" placeholder="Seleccionar" className="w-100">
                        <IonSelectOption value="Auditiva">Auditiva</IonSelectOption>
                        <IonSelectOption value="Intelectual">Intelectual</IonSelectOption>
                        <IonSelectOption value="Física">Física</IonSelectOption>
                        <IonSelectOption value="Mental">Mental</IonSelectOption>
                        <IonSelectOption value="Visual">Visual</IonSelectOption>
                        <IonSelectOption value="Visceral">Visceral</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardContent>
                  <div className="certificado">
                    <IonRow className="">                      
                      <IonCol size="4" className="pl-4 pr-3">
                        <img src='./images/senadis.png' className="mb-0" />
                      </IonCol>
                      <IonCol size="8" className="text-center" style={{lineHeight: "normal"}}>
                        <div className="font-w700 d-inline">REP&Uacute;BLICA DE PANAM&Aacute; </div>
                        <div className="font-w700 text-info d-inline">CERTIFICADO DE DISCAPACIDAD</div>
                      </IonCol>
                      <IonCol size="12">
                        <div className="font-w700 fs-8 ">Secretaria Nacional de Discapacidad</div>
                      </IonCol>
                      <IonCol size="12">
                        <div className="font-w700 fs-18 my-2 text-uppercase">Laura Cristina Garcia</div>
                      </IonCol>
                      <IonCol size="4">
                        <img src='./images/sandra.jpg' className="mt-0 mb-3 d-inline perfil-certificado" />
                      </IonCol>
                      <IonCol size="5">
                        <div className="font-w700 fs-12 d-block mb-2">C.I.P. X-XXX-XXXX</div>
                        <div className="font-w700 fs-12 d-block">NACIONALIDAD</div>
                        <div className="font-w700 fs-12 text-uppercase d-block mb-2">PANAMEÑA</div>
                        <div className="font-w700 fs-12 d-block">FECHA DE NACIMIENTO</div>
                        <div className="font-w700 fs-12 text-uppercase d-block">29/11/2005</div>
                      </IonCol>
                      <IonCol size="3" className="pl-2">
                        <div className="font-w700 fs-12 d-block">EXPEDICIÓN</div>
                        <div className="font-w700 fs-12 text-uppercase d-block mb-2">6/JUN/2015</div>
                        <div className="font-w700 fs-12 d-block text-danger">EXPIRACIÓN</div>
                        <div className="font-w700 fs-12 text-uppercase d-block">6/JUN/2020</div>
                      </IonCol>
                    </IonRow>
                  </div>
                </IonCardContent>
              </IonCard>
              <div className="mt-2 ml-1 fs-12 text-underline text-info cursor-pointer">Cargar carnet de SENADIS</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Discapacidad;
