import { IonCard, IonCardContent } from "@ionic/react";
import { faHospital, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { fechaLaboratorio, cadenaUpercase } from "../../../helpers";
import { Boxfull } from "../../../components";
import "./card.css";

interface ContainerProps {
  item: any;
}

export const Card: React.FC<ContainerProps> = ({ item }) => {
  const { daymonth, yy } = fechaLaboratorio(item.fecha_solicitud);
  const user = useSelector((state: any) => state.reducerAuth.user);

  return (
    <IonCard
      className="m-0 mt-2 card-slide shadow-full"
      style={{ height: "auto" }}
    >
      <IonCardContent className="card-content-slide">
        <Boxfull
          title={item.desde}
          imageTitle=""
          iconTop=""
          fechaTop={daymonth}
          horaTop=""
          yearTop={yy}
          iconTextoUno={faHospital}
          textoUno={cadenaUpercase(item.centro.trim())}
          iconTextoDos={faUserDoctor}
          textoDos={cadenaUpercase(item.doctor)}
          iconTextoTres=""
          textoTres=""
          iconTextoCuatro=""
          textoCuatro=""
          linkBottomLeft=""
          linkBottomRight=""
          textLinkBottomLeft=""
          textLinkBottomRight=""
          ir={true}
          linkIr={`/app/laboratorio-examen/${item.id}`}
          tipo=""
          textoUrlExternaLeft="Ver informe"
          urlExternaLeft={`http://pid.maxialatam.com:5050/api/prrdd/v0/exam_lab?cip=${user.cedula}&rid=${item.id}`}
        />
      </IonCardContent>
    </IonCard>
  );
};
