import { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  useIonViewDidEnter,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { getDetailMedicamento } from "../../../servicios/servicios";
import { Header } from "../../../components";

const MiMedicamentoDetail = () => {
  const { id }: any = useParams();
  const [load, setLoad] = useState<Boolean>(true);
  const [detalle, setDetalle] = useState<any>([]);

  useIonViewDidEnter(() => {
    setLoad(true);
    getDetailMedicamento(id)
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            setDetalle(data.data);
          } else {
            setLoad(false);
            setDetalle([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  });
  return (
    <IonPage className="fondo">
      <Header title="Mis medicamentos" isbotton={true} isBuger={false} />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-2 px-3">
            <IonCol size="12" className="pb-3 border-bottom">
              <h5 className="font-w700 fs-15 text-info-dark mb-3">Detalle</h5>
              {load
                ? "Cargando"
                : detalle.length === 0
                ? "Sin detalle"
                : detalle.map((item: any, index: number) => (
                    <IonCard
                      className="m-0 card-slide shadow-full"
                      style={{ height: "auto" }}
                      key={index}
                    >
                      <IonCardContent className="card-content-slide">
                        <div>
                          <div className="fs-15 font-w600 text-info my-3">
                            Resumen de indicaciones
                          </div>
                          <div className="mb-3">
                            <span className="fs-13 font-w600 d-block">
                              Medicamento:{item.medicamento}
                            </span>
                          </div>
                          <div className="mb-3">
                            <span className="fs-13 font-w600 d-block">
                              Diagnostico:{item.diagnostico}
                            </span>
                          </div>
                          <div className="mb-3">
                            <span className="fs-13 font-w600 d-block">
                              {item.dosis} dosis cada {item.cada} horas, durante{" "}
                              {item.duracion} días
                            </span>
                          </div>
                          <div className="mb-3">
                            <span className="fs-13 font-w600 d-block"></span>
                          </div>
                          <div className="mb-3">
                            <span className="fs-13 font-w600 d-block">
                              Total dosis {item.totaldosis}
                            </span>
                          </div>
                          <div className="mb-3">
                            <span className="fs-13 font-w600 d-block">
                              inicia {item.fechainicio}, hasta {item.fechafin}
                            </span>
                          </div>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MiMedicamentoDetail;
