import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  useIonViewDidEnter,
  IonLabel,
} from "@ionic/react";
import {
  faHospital,
  faLocationDot,
  faPhone,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { servicesWh } from "../../servicios/servicios";
import { Header, Boxfull } from "../../components";
import "../../style/tema.css";

const DetalleConsulta = () => {
  const { id }: any = useParams();
  const initial = {
    centroproduccion: "",
    descripcion: "",
    fecha: "",
    hora: "",
    idcentro: "",
    medico: "",
    motivovisita: "",
    observacionesdiagnosticos: "",
    tipo: "",
    year: "",
  };
  const [load, setLoad] = useState<Boolean>(true);
  const [detalle, setDetalle] = useState<any>(initial);
  const [tratamientos, setTratamientos] = useState<any>([]);
  const [diagnosticos, setDiagnosticos] = useState<any>([]);

  useIonViewDidEnter(() => {
    setLoad(true);
    servicesWh
      .get("/api/api-detalle-consultas.php", {
        params: {
          op: "consultasDetalle",
          id: id,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            setDetalle(data.data);
            setTratamientos(data.tratamientos);
            setDiagnosticos(data.diagnosticos);
          } else {
            setDetalle(initial);
            setTratamientos([]);
            setDiagnosticos([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  });

  return (
    <IonPage className="fondo">
      <Header title="Consultas" isbotton={true} isBuger={false} />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-2 px-3">
            <IonCol size="12" className="pb-3 border-bottom">
              <h5 className="font-w700 fs-15 text-info-dark mb-3">Histórico</h5>
              <IonCard
                className="m-0 card-slide shadow-full"
                style={{ height: "auto" }}
              >
                <IonCardContent className="card-content-slide">
                  <Boxfull
                    title={detalle.centroproduccion}
                    imageTitle=""
                    iconTop=""
                    fechaTop={detalle.fecha}
                    horaTop=""
                    yearTop={detalle.year}
                    iconTextoUno={faHospital}
                    textoUno="CSS - Policlínica Dr. Roberto"
                    iconTextoDos={faUserDoctor}
                    textoDos="Dr. Rolando Pacheco"
                    iconTextoTres={faLocationDot}
                    textoTres=""
                    iconTextoCuatro={faPhone}
                    textoCuatro=""
                    linkBottomLeft=""
                    linkBottomRight=""
                    textLinkBottomLeft=""
                    textLinkBottomRight=""
                    ir={false}
                    linkIr="#"
                    tipo=""
                  />

                  <div>
                    <div className="fs-15 font-w600 text-info my-3">Resumen de consulta</div>
                    <div className="mb-3">
                      <span className="fs-13 font-w600 d-block">
                        Motivo de la visita:{" "}
                      </span>
                      {detalle?.motivovisita}
                    </div>
                    <div className="mb-3">
                      <span className="fs-13 font-w600 d-block">
                        Observaciones del diagnósticos:{" "}
                      </span>
                      {detalle?.observacionesdiagnosticos}
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="fs-13 font-w600 d-block">
                      Lista de afecciones o diagnósticos:{" "}
                    </span>
                    {diagnosticos.map((item: any) => (
                      <div key={item.id}>
                        <ul className="content__frecuencia">
                          <li className="item__frecuencia fs-13 font-w500 active">
                            Primera vez
                          </li>
                          <li className="item__frecuencia fs-13 font-w500">
                            Subsecuente
                          </li>
                          <li className="item__frecuencia fs-13 font-w500">
                            Orient.Diagnóstica
                          </li>
                        </ul>
                        <div>
                          <IonLabel>{item.text}</IonLabel>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <span className="fs-13 font-w600 d-block">Tratamientos:</span>
                    {tratamientos.map((item: any, index: any) => (
                      <div key={index}>
                        <div>{item.textmedicamento}</div>
                        <div>
                          <span className="fs-13 font-w600">Desde: </span>
                          {item.fechaini}
                        </div>
                        <div>
                          <span className="fs-13 font-w600">Hasta: </span>
                          {item.fechafin}
                        </div>
                        <div>
                          {item.dosis}{" "}
                          <span className="fs-13 font-w600">cada </span>{" "}
                          {item.cadah}
                          horas <span className="fs-13 font-w600">durante </span>
                          {item.duracion}
                        </div>
                      </div>
                    ))}
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

export default DetalleConsulta;
