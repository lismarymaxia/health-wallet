import { IonCard, IonCardContent } from "@ionic/react";
import { faHospital, faXRay, faUser } from "@fortawesome/free-solid-svg-icons";
import { Boxfull } from "../../../components";
import "./card.css";

interface ContainerProps {
  item: any;
}

export const Card: React.FC<ContainerProps> = ({ item }) => {
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
          fechaTop={item.fecha}
          horaTop=""
          yearTop={item.year}
          iconTextoUno={faHospital}
          textoUno={item.unidad}
          iconTextoDos={faXRay}
          textoDos={item.estudio}
          iconTextoTres={faUser}
          textoTres={item.nombre}
          iconTextoCuatro=""
          textoCuatro=""
          linkBottomLeft=""
          linkBottomRight=""
          textLinkBottomLeft=""
          textLinkBottomRight=""
          ir={false}
          linkIr=""
          tipo=""
        />
      </IonCardContent>
    </IonCard>
  );
};
