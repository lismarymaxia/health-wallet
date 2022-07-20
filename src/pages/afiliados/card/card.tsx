import {
  faHospital,
  faUserDoctor,
  faXRay,
} from "@fortawesome/free-solid-svg-icons";
import { Boxfull } from "../../../components";
import { cadenaUpercase } from "../../../helpers";

interface ContainerProps {
  item: any;
}

const ContentCard: React.FC<ContainerProps> = ({ item }) => {
  return (
    <div>
      {item.tipo === "Consulta" && (
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
      )}
      {/*<Boxfull
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
            />*/}
      {item.tipo === "Imagenologia" && (
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
      )}
    </div>
  );
};

export default ContentCard;
