import { IonAccordion, IonItem, IonLabel } from "@ionic/react";
import {
  faCircle,
  faHospital,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { BoxfullGeneral } from "../../../components";
import { cadenaUpercase } from "../../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ContainerProps {
  item: any;
  value: any;
}

const ContentCard: React.FC<ContainerProps> = ({ item, value }) => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  return (
    <div>
      {item.tipo === "Consulta" && (
        <IonAccordion value={value}>
          <IonItem slot="header">
            <IonLabel className="text-body fs-14 d-flex">
              <FontAwesomeIcon icon={faCircle} className="fs-6 mr-2 mt-2" />
              {item.centroproduccion}
            </IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            Detalle de consulta
          </div>
        </IonAccordion>
      )}
      {item.tipo === "Laboratorio" && (
        <IonAccordion value={value}>
          <IonItem slot="header">
            <IonLabel className="text-body fs-14 d-flex">
              <FontAwesomeIcon icon={faCircle} className="fs-6 mr-2 mt-2" />
              Laboratorio -{item.desde}
            </IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            <BoxfullGeneral
              title="Titulo"
              imageTitle=""
              iconTop=""
              fechaTop="05 ENE"
              horaTop=""
              yearTop="2022"
              iconTextoUno={faHospital}
              textoUno={item.centro}
              iconTextoDos={faUserDoctor}
              textoDos={item.doctor}
              iconTextoTres=""
              textoTres=""
              iconTextoCuatro=""
              textoCuatro=""
              linkBottomLeft=""
              linkBottomRight=""
              textLinkBottomLeft=""
              textLinkBottomRight=""
              ir={false}
              linkIr=""
              tipo=""
              textoUrlExternaLeft="Ver informe"
              urlExternaLeft={`http://pid.maxialatam.com:5050/api/prrdd/v0/exam_lab?cip=${user.cedula}&rid=${item.rid}`}
            />
          </div>
        </IonAccordion>
      )}
      {item.tipo === "Imagenologia" && (
        <IonAccordion value={value}>
          <IonItem slot="header">
            <IonLabel className="text-body fs-14 d-flex">
              <FontAwesomeIcon icon={faCircle} className="fs-6 mr-2 mt-2" />
              Imagenología -
            </IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            <BoxfullGeneral
              title="Titulo"
              imageTitle=""
              iconTop=""
              fechaTop="05 ENE"
              horaTop=""
              yearTop="2022"
              iconTextoUno={faHospital}
              textoUno={"Policlínica Roberto Ramírez de Diego"}
              iconTextoDos={faUserDoctor}
              textoDos={"Rolando Yee Escobar"}
              iconTextoTres=""
              textoTres=""
              iconTextoCuatro=""
              textoCuatro=""
              linkBottomLeft=""
              linkBottomRight=""
              textLinkBottomLeft=""
              textLinkBottomRight=""
              ir={false}
              linkIr=""
              tipo=""
              textoUrlExternaLeft="Ver informe"
              urlExternaLeft={`http://pid.maxialatam.com:5050/api/prrdd/v0/exam_lab?cip=6-712-727&rid=123`}
            />
          </div>
        </IonAccordion>
      )}
    </div>
  );
};

export default ContentCard;

/*  {
        item.tipo === "Consulta" && (
          <Boxfull
            title="Consulta - 101-00 Consulta externa"
            imageTitle=""
            iconTop=""
            fechaTop="22 Mar"
            horaTop=""
            yearTop="2021"
            iconTextoUno={faHospital}
            textoUno="Policlínica Roberto Ramírez de Diego"
            iconTextoDos={faUserDoctor}
            textoDos="Rolando Yee Escobar"
            iconTextoTres=""
            textoTres=""
            iconTextoCuatro=""
            textoCuatro=""
            linkBottomLeft=""
            linkBottomRight=""
            textLinkBottomLeft=""
            textLinkBottomRight=""
            ir={true}
            linkIr={`detalle-consulta/1`}
            tipo=""
          />
        );
      }
      {
        <Boxfull
            title="LAB - COVID GENERAL"
            imageTitle=""
            iconTop=""
            fechaTop="06 Sep"
            horaTop=""
            yearTop="2020"
            iconTextoUno={faHospital}
            textoUno={cadenaUpercase(
              "Policlínica Dr. Roberto Ramirez de Diego"
            )}
            iconTextoDos={faUserDoctor}
            textoDos="Médico Css"
            iconTextoTres=""
            textoTres=""
            iconTextoCuatro=""
            textoCuatro=""
            linkBottomLeft=""
            linkBottomRight=""
            textLinkBottomLeft=""
            textLinkBottomRight=""
            ir={false}
            linkIr=""
            tipo=""
            textoUrlExternaLeft="Ver informe"
            urlExternaLeft={`http://pid.maxialatam.com:5050/api/prrdd/v0/exam_lab?cip=6-712-727&rid=141427`}
            />
      }
      {
        item.tipo === "Imagenologia" && (
          <Boxfull
            title="Imagenolog&iacute;a - Rx - Torax PA o AP"
            imageTitle=""
            iconTop=""
            fechaTop="27 MAY"
            horaTop=""
            yearTop="2022"
            iconTextoUno={faHospital}
            textoUno={cadenaUpercase("Policlínica Roberto Ramirez de Diego")}
            iconTextoDos={faXRay}
            textoDos=""
            iconTextoTres={faUserDoctor}
            textoTres=""
            iconTextoCuatro=""
            textoCuatro=""
            linkBottomLeft=""
            linkBottomRight=""
            textLinkBottomLeft=""
            textLinkBottomRight=""
            ir={false}
            linkIr=""
            tipo=""
            textoUrlExternaLeft="Ver informe"
            urlExternaLeft="https://toolkit.maxialatam.com/wallethealth/api/test.php"
          />
        );
      }*/
