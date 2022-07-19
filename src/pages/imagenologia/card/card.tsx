import { IonCard, IonCardContent } from "@ionic/react";
import {
  faHospital,
  faXRay,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { fecha_imagenologia, cadenaUpercase } from "../../../helpers";
import { Boxfull } from "../../../components";
import "./card.css";

interface ContainerProps {
  item: any;
}

export const Card: React.FC<ContainerProps> = ({ item }) => {
  const { daymonth, yy } = fecha_imagenologia(item.fecha);
  return (
    <IonCard
      className="m-0 mt-2 card-slide shadow-full"
      style={{ height: "auto" }}
    >
      <IonCardContent className="card-content-slide">
        <Boxfull
          title={item.estudio}
          imageTitle=""
          iconTop=""
          fechaTop={daymonth}
          horaTop=""
          yearTop={yy}
          iconTextoUno={faHospital}
          textoUno={cadenaUpercase(item.unidad)}
          iconTextoDos={faXRay}
          textoDos=""
          iconTextoTres={faUserDoctor}
          textoTres={cadenaUpercase(item.nombre)}
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
      </IonCardContent>
    </IonCard>
  );
};
