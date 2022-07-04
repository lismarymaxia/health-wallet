import {
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { Boxfull } from "../../components";
import React, { useState } from "react";
import "./consultas.css";

interface ContainerProps {
  item: any;
}

export const Card: React.FC<ContainerProps> = ({ item }) => {
  const [transition, setTransition] = useState(false);
  return (
    
    <IonCard className="m-0 mt-2 card-slide shadow-full" style={{ height: "auto" }}>
      <IonCardContent className="card-content-slide">
        <Boxfull title={item.centroproduccion} imageTitle="" iconTop="" fechaTop={item.fecha} horaTop="" 
          yearTop={item.year} iconTextoUno={faHospital} textoUno="Centro médico OSDE" iconTextoDos={faUserDoctor} 
          textoDos={item.medico} iconTextoTres="" textoTres="" iconTextoCuatro="" textoCuatro=""  
          linkBottomLeft="" linkBottomRight="" textLinkBottomLeft="" textLinkBottomRight="" 
          ir={true} linkIr="detalle-consulta" tipo="" />

        <div className="d__flex justify__content__center ">
          <IonButton
            fill="clear"
            color="dark"
            className="button__capitalize botton__link"
            onClick={() => {
              setTransition(!transition);
            }}
          >
            {transition ? "Ocultar" : "ver más"}
          </IonButton>
        </div>
        {transition && (
          <>
            <div>
              <div className="mb-3">
                <span className="fs-14 font-w600 d-block">Motivo de la visita: </span>{item.motivovisita}
              </div>
              <div className="mb-3">
                <span className="fs-14 font-w600 d-block">Observaciones del diagnósticos: </span>
                {item.observacionesdiagnosticos}
              </div>
            </div>
            <div className="mb-3">
              <span className="fs-14 font-w600 d-block">Lista de afecciones o diagnósticos: </span>
              {item?.diagnosticos.map((item: any) => (
                <div key={item.id}>
                  <ul className="content__frecuencia">
                    <li className="item__frecuencia fs-13 font-w500 active">Primera vez</li>
                    <li className="item__frecuencia fs-13 font-w500">Subsecuente</li>
                    <li className="item__frecuencia fs-13 font-w500">Orient.Diagnóstica</li>
                  </ul>
                  <div>
                    <IonLabel>{item.text}</IonLabel>
                  </div>
                </div>
              ))}
            </div>            
            <div className="mb-3">
              <span className="fs-14 font-w600 d-block">Tratamientos:</span>
              {item.tratamientos.map((item: any, index: any) => (
                <div key={index}>
                  <div>{item.textmedicamento}</div>
                  <div>
                    <span className="fs-13 font-w600">Desde: </span>{item.fechaini} 
                  </div>
                  <div>
                    <span className="fs-13 font-w600">Hasta: </span>{item.fechafin}
                  </div>
                  <div>
                    {item.dosis} <span className="fs-13 font-w600">cada </span> {item.cadah}
                    horas <span className="fs-13 font-w600">durante </span>{item.duracion}
                  </div>
                </div>
              ))}
            </div>            
          </>
        )}
      </IonCardContent>
    </IonCard>
    
  );
};
