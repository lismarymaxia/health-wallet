import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonSearchbar
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faUserDoctor,
  faSliders
} from "@fortawesome/free-solid-svg-icons";
import { Header, Boxfull } from "../../components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../../style/tema.css";

const Perfil = () => { 

  return (
    <IonPage className="fondo">
      <div className="bg-info-alt">
        <Header title="Tratamientos activos" isbotton={true} isBuger={false}/>
        <h5 className="font-w700 fs-15 text-info-dark mb-2">
          Laura Cristina García
        </h5>
      </div>

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-2 px-3">
            <IonCol size="12" className="pb-3">
              <IonRow>
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Tratamiento transitorio
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                  <Boxfull 
                    title="Gastritis crónica, no especificada" 
                    imageTitle="" 
                    iconTop="" 
                    fechaTop="" 
                    horaTop="" 
                    yearTop="" 
                    iconTextoUno="" 
                    textoUno="Paracetamol (Acetaminofen) 500mg, tableta. 1 cada 6 horas durante 5 días" 
                    iconTextoDos=""
                    textoDos="Diagnostico" 
                    iconTextoTres="" 
                    textoTres="" 
                    iconTextoCuatro="" 
                    textoCuatro=""  
                    linkBottomLeft="" 
                    linkBottomRight="" 
                    textLinkBottomLeft="" 
                    textLinkBottomRight="" 
                    ir={false} 
                    linkIr="detalle-cita" 
                    tipo="" />
                </IonCardContent>
              </IonCard>

              <IonRow className="mt-4">
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Tratamiento permanente
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 mt-2 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                <Boxfull 
                    title="Asma" 
                    imageTitle="" 
                    iconTop="" 
                    fechaTop="" 
                    horaTop="" 
                    yearTop="" 
                    iconTextoUno="" 
                    textoUno="Medicina" 
                    iconTextoDos=""
                    textoDos="Diagnostico" 
                    iconTextoTres="" 
                    textoTres="" 
                    iconTextoCuatro="" 
                    textoCuatro=""  
                    linkBottomLeft="" 
                    linkBottomRight="" 
                    textLinkBottomLeft="" 
                    textLinkBottomRight="" 
                    ir={false} 
                    linkIr="detalle-cita" 
                    tipo="" />
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
