import {
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import React, { useState } from "react";
import "./consultas.css";

interface ContainerProps {
  item: any;
}

export const Card: React.FC<ContainerProps> = ({ item }) => {
  const [transition, setTransition] = useState(false);
  return (
    <IonCard className="card__consulta card_custon">
      <IonCardHeader>
        <IonCardTitle>{item.tipo}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div>
          <IonLabel>
            <b>Medico</b>: {item.medico}
          </IonLabel>
        </div>
        <div>
          <IonLabel>
            <b>Fecha</b>: {item.fecha} {item.hora}
          </IonLabel>
        </div>
        <div className="d__flex justify__content__center ">
          <IonButton
            fill="clear"
            color="dark"
            className="button__capitalize botton__link"
            onClick={() => {
              setTransition(!transition);
            }}
          >
            {transition ? "Ocultar" : "Ver mas"}
          </IonButton>
        </div>
        {transition && (
          <>
            <div>
              <div>
                <b>Motivo de la visita</b>:{item.motivovisita}
              </div>
              <div>
                <b>Observaciones del diagnósticos</b>:
                {item.observacionesdiagnosticos}
              </div>
            </div>
            <div className="ion-margin-top">
              <b>Lista de afecciones o diagnósticos:</b>
            </div>
            {item?.diagnosticos.map((item: any) => (
              <div key={item.id}>
                <ul className="content__frecuencia">
                  <li className="item__frecuencia active">Primera vez</li>
                  <li className="item__frecuencia">Subsecuente</li>
                  <li className="item__frecuencia">Orient.Diagnóstica</li>
                </ul>
                <div>
                  <IonLabel>{item.text}</IonLabel>
                </div>
              </div>
            ))}
            <div className="ion-margin-top">
              <b>Tratamientos:</b>
            </div>
            {item.tratamientos.map((item: any, index: any) => (
              <div key={index}>
                <div>{item.textmedicamento}</div>
                <div>
                  <b>Desde</b>:{item.fechaini} <b>Hasta</b>:{item.fechafin}
                </div>
                <div>
                  {item.dosis} <b>cada</b>:{item.cadah}
                  <b> horas durante:</b>:{item.duracion}
                </div>
              </div>
            ))}
          </>
        )}
      </IonCardContent>
    </IonCard>
  );
};
