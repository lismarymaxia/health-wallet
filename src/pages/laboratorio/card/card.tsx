import { IonCard, IonCardContent } from "@ionic/react";
import { faHospital, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { Boxfull } from "../../../components";
import "./card.css";

interface ContainerProps {
  item: any;
}

export const Card: React.FC<ContainerProps> = ({ item }) => {
  console.log(item);
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
          fechaTop={item.fecha_solicitud}
          horaTop=""
          yearTop={item.year}
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
          textoUrlExternaLeft = "Ver informe"
          urlExternaLeft="https://toolkit.maxialatam.com/wallethealth/api/test.php"
        />
      </IonCardContent>
    </IonCard>
  );
};
