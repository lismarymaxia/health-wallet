import { IonCard, IonCardContent } from "@ionic/react";
import { faHospital, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { fecha_laboratorio } from "../../../helpers";
import { Boxfull } from "../../../components";
import "./card.css";

interface ContainerProps {
  item: any;
}

export const Card: React.FC<ContainerProps> = ({ item }) => {
  const { daymonth, yy } = fecha_laboratorio(item.fecha_solicitud);
  console.log({ daymonth, yy });
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
          urlExternaLeft="https://toolkit.maxialatam.com/wallethealth/api/test.php"
        />
      </IonCardContent>
    </IonCard>
  );
};
