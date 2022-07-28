import { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonImg,
  IonButton,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
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

  const handelDetail = () => {
    history.push("/app/detalle-medicamento");
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
                        <div>
                          <IonImg
                            src="./images/juan.jpg"
                            alt="AAAA"
                            style={{ width: "50px", height: "50px" }}
                            className="float-left mr-2"
                          />
                          <div className="d-flex justify-content-between">
                            <div className="fs-15 font-w600 text-info mt-1 title">
                              <span className="w-100">{item.medicamento}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="mb-0 ml-5 pl-2 pt-1 fs-12">
                            <span className="float-left">
                              {item.diagnostico}
                            </span>
                            <IonButton
                              color="dark"
                              className="float-right m-0"
                              style={{ width: "28px", height: "20px" }}
                              fill="clear"
                              onClick={() => {
                                handelDetail();
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faAngleRight}
                                className="mr-0"
                              />
                            </IonButton>
                          </p>
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
