import { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonButton,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCapsules } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { HeaderPerfil } from "../../../components";
import { getMisMedicamentos } from "../../../servicios";
import "../perfil.css";
const MisMedicamentos = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getMisMedicamentos(user.idpaciente)
      .then((rsp: any) => {
        const { data } = rsp;
        setLoad(false);
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error en triple peticion" + error);
      });
  }, [user]);

  const handleDetail = (id: any) => {
    history.push(`/app/mis-medicamentos-detalle/${id}`);
  };
  return (
    <IonPage className="fondo">
      <HeaderPerfil title="Mis medicamentos" />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonRow>
                <IonCol size="12">
                  <h5 className="font-w700 fs-15 text-info-dark mb-2">
                    Mi historial de medicamentos
                  </h5>
                </IonCol>
              </IonRow>

              {load
                ? "Cargando..."
                : data.length === 0
                ? "No hay medicamentos registrados"
                : data.map((item: any, index: number) => (
                    <IonCard
                      className="m-0 card-slide shadow-full mb-2"
                      style={{ height: "auto" }}
                      key={index}
                    >
                      <IonCardContent className="card-content-slide">
                        <div className="d-flex pt-2">
                          <div className="pt-1">
                            <FontAwesomeIcon
                              icon={faCapsules}
                              className="mr-3 fs-16 text-info float-left"
                            />
                          </div>
                          <div className="slide-full d-grid pt-0">
                            <div className="w-100">
                              <span
                                className="fs-15 font-w600 text-info float-left"
                                style={{ width: "95%" }}
                              >
                                {item.medicamento}
                              </span>
                              <div className="position-absolute right-0">
                                <IonButton
                                  color="dark"
                                  className="float-right m-0"
                                  style={{ width: "28px", height: "20px" }}
                                  fill="clear"
                                  onClick={() => {
                                    handleDetail(item.id);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className="mr-3"
                                  />
                                </IonButton>
                              </div>
                            </div>
                            <div className="w-100">
                              <span className="d-block fs-13">
                                {item.diagnostico}
                              </span>
                            </div>
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

export default MisMedicamentos;
