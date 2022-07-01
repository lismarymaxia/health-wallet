import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonSearchbar,
  IonProgressBar,
  useIonViewDidEnter,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faUserDoctor,
  faSliders
} from "@fortawesome/free-solid-svg-icons";
import { Header, Boxfull } from "../../components";
import { servicesWh } from "../../servicios/servicios";
import { Card } from "./Card";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../../style/tema.css";

const Consultas: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);

  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useIonViewDidEnter(() => {
    setLoad(true);
    servicesWh
      .get("/controller/consultasback.php", {
        params: {
          op: "consultas",
          cedula: cedula,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            setData(data.data);
          } else {
            setLoad(false);
            setData([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  });

  const pacsearch = useCallback((searc: any) => {
    return function name(params: any) {
      return params?.medico?.toUpperCase().includes(searc.toUpperCase());
    };
  }, []);


  if (load) {
    return (
      <IonPage className="fondo">
        <Header title="Consultas" isbotton={true} isBuger={false} />
        <IonContent fullscreen>
          <IonProgressBar type="indeterminate" color="success"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="fondo">
      <Header title="Consultas" isbotton={true} isBuger={false}/>

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-2 px-3">
            <IonCol size="12" className="pb-3">
              <div className="searchContainer mt-1 mb-4 d-inline-block" style={{width: "88%"}}>
                <IonSearchbar
                  value={searchTerm}
                  onIonChange={(e) => setSearchTerm(e.detail.value!)}
                  placeholder="Buscar..."
                  slot="end"
                  class="px-0"
                />
              </div>
              <div className="d-inline-block text-right" style={{width: "12%"}}>
                <Link to="proximas-citas" className="bg-info-alt d-inline-block btn-filter fs-16 btn-shadow">
                  <FontAwesomeIcon icon={faSliders} className="mr-0 float-right text-white" />
                </Link>                
              </div>

              <h5 className="font-w700 fs-15 text-info-dark mb-2">
                Historial de consultas
              </h5>
              {data.filter(pacsearch(searchTerm)).map((item: any, index: any) => (
                <Card item={item} key={index} />
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Consultas;
