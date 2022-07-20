import React from "react";
import { faXRay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonContent,
  IonPage,
  IonCol,
  IonGrid,
  IonRow,
  IonCard,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { Header } from "../../components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { compartir } from "../../helpers";
const ExamenLab: React.FC = () => {
  const cedula = useSelector((state: any) => state.reducerAuth.user.cedula);
  const { id }: any = useParams();

  let url = `http://pid.maxialatam.com:5050/api/prrdd/v0/exam_lab?cip=${cedula}&rid=${id}`;

  /*useEffect(() => {
    let reader = new window.FileReader();
    fetch(pdfFile, options)
      .then((response) => response.blob())
      .then((blob) => {
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          let base64string = reader.result; //Passed to pdfjs
        };
      })
      .catch(() => console.log("Algo falló"));
  }, []);*/
  const handleCompartir = () => {
    compartir(url);
  };

  return (
    <IonPage className="fondo">
      <Header title="Resultado Laboratorio" isbotton={true} isBuger={false} />
      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-1 px-3">
            <IonCol size="12" className="pb-3">
              <div style={{ height: "400px" }}>
                <embed
                  src={url}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              </div>
            </IonCol>
            <IonCol size="12">
              <IonCard className="mx-0 mb-4 mt-2 card-slide shadow-full">
                <IonCardContent className="card-content-slide">
                  <IonButton
                    color="dark"
                    className="m-0"
                    style={{ width: "28px" }}
                    fill="clear"
                    onClick={() => {
                      handleCompartir();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faXRay}
                      className="mr-0 float-right"
                    />
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ExamenLab;
